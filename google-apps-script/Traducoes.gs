/* =====================================================================
   TRADUÇÕES DO MAGAZINE (inglês e alemão)
   O site pede as frases que ainda não tem traduzidas; o programa vê no
   separador "Traducoes" e, se faltar, traduz com o Claude e guarda.
   A equipa pode corrigir qualquer tradução diretamente na folha.
   Separador "Traducoes": pt | en | de
   ===================================================================== */
const LINGUAS = { en: 'English (UK)', de: 'German' };
const LIMITE_TRADUCOES_DIA = 3000;

function traducoesGet(acao, e) {
  if (acao !== 'dicionario') return null;
  const lang = String((e && e.parameter && e.parameter.lang) || '');
  if (!LINGUAS[lang]) return { ok: false };
  return { ok: true, lang: lang, dic: lerTraducoes(lang) };
}
function traducoesPost(body) {
  if (body.acao !== 'traduzir') return null;
  const lang = String(body.lang || '');
  if (!LINGUAS[lang]) return { ok: false, erro: 'Língua desconhecida.' };
  const textos = (Array.isArray(body.textos) ? body.textos : []).map(function(t){ return String(t || '').trim().slice(0, 1500); })
    .filter(function(t, i, a){ return t && a.indexOf(t) === i; }).slice(0, 80);
  if (!textos.length) return { ok: true, dic: {} };
  const dic = lerTraducoes(lang);
  const falta = textos.filter(function(t){ return !dic[t]; });
  if (falta.length) {
    const props = PropertiesService.getScriptProperties();
    const chaveDia = 'TRAD_' + Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
    const usados = parseInt(props.getProperty(chaveDia) || '0', 10);
    if (usados + falta.length <= LIMITE_TRADUCOES_DIA) {
      props.setProperty(chaveDia, String(usados + falta.length));
      const novos = traduzirComClaude(falta, lang);
      if (novos) { guardarTraducoes(lang, novos); Object.keys(novos).forEach(function(k){ dic[k] = novos[k]; }); }
    }
  }
  const out = {}; textos.forEach(function(t){ if (dic[t]) out[t] = dic[t]; });
  return { ok: true, dic: out };
}

function folhaTraducoes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Traducoes');
  if (!sh) { sh = ss.insertSheet('Traducoes'); sh.appendRow(['pt','en','de']); sh.setFrozenRows(1); sh.getRange(1,1,1,3).setFontWeight('bold'); sh.getRange('A:C').setNumberFormat('@'); }
  return sh;
}
function lerTraducoes(lang) {
  const cache = CacheService.getScriptCache();
  const c = cache.get('trad_' + lang); if (c) { try { return JSON.parse(c); } catch (e) {} }
  const sh = folhaTraducoes(); const dic = {};
  if (sh.getLastRow() >= 2) {
    const col = lang === 'en' ? 1 : 2;
    sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues().forEach(function(r){ if (r[0] && r[col]) dic[String(r[0])] = String(r[col]); });
  }
  try { const s = JSON.stringify(dic); if (s.length < 90000) cache.put('trad_' + lang, s, 300); } catch (e) {}
  return dic;
}
function guardarTraducoes(lang, novos) {
  const lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    const sh = folhaTraducoes(); const col = lang === 'en' ? 2 : 3;
    const linhas = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i){ linhas[String(r[0])] = i + 2; });
    const acrescentar = [];
    Object.keys(novos).forEach(function(pt){
      if (linhas[pt]) sh.getRange(linhas[pt], col).setValue(novos[pt]);
      else { const row = [pt, '', '']; row[col - 1] = novos[pt]; acrescentar.push(row); }
    });
    if (acrescentar.length) sh.getRange(sh.getLastRow() + 1, 1, acrescentar.length, 3).setNumberFormat('@').setValues(acrescentar);
    CacheService.getScriptCache().remove('trad_' + lang);
  } finally { lock.releaseLock(); }
}
function traduzirComClaude(textos, lang) {
  const chave = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!chave) return null;
  const sistema = 'You translate the user interface and content of the Salema Eco Camp Magazine, the guest web app of an eco campsite and glamping park in the Algarve, Portugal. ' +
    'Translate each item from Portuguese (some items may already be in English) into ' + LINGUAS[lang] + '. Rules: natural, friendly, concise; keep proper names unchanged ' +
    '(Salema Eco Camp, Nazari, Alma Mater, SER, Eco Store, Eco Living, Base Camp, Magazine, Rota Vicentina, beach and place names, product and brand names, dish names like Moussaka or Souvlaki); ' +
    'keep numbers, prices, times, emoji, phone numbers, e-mails and punctuation like « » or · as they are; translate dish descriptions; keep leading/trailing spaces. ' +
    'Answer ONLY with a JSON array of strings, same length and order as the input.';
  const r = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { 'x-api-key': chave, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify({ model: MODELO, max_tokens: 8000, system: sistema, messages: [{ role: 'user', content: JSON.stringify(textos) }] })
  });
  if (r.getResponseCode() !== 200) { console.error('Tradução ' + r.getResponseCode() + ': ' + r.getContentText()); return null; }
  const txt = (JSON.parse(r.getContentText()).content || []).map(function(c){ return c.text || ''; }).join('');
  const m = txt.match(/\[[\s\S]*\]/); if (!m) return null;
  let arr; try { arr = JSON.parse(m[0]); } catch (e) { return null; }
  if (!Array.isArray(arr) || arr.length !== textos.length) return null;
  const out = {}; textos.forEach(function(t, i){ if (typeof arr[i] === 'string' && arr[i].trim()) out[t] = arr[i]; });
  return out;
}

/* Corre no editor quando for preciso: acerta algumas palavras e volta a
   traduzir as frases em alemão que ficaram em inglês por engano. */
const CORRECOES = {
  'Anúncios': { en: 'Notice board', de: 'Pinnwand' },
  'Arranjos': { en: 'Repairs', de: 'Reparaturen' },
  'Pôr um anúncio': { en: 'Post a notice', de: 'Aushang erstellen' },
  'Retirar o meu anúncio': { en: 'Remove my notice', de: 'Meinen Aushang entfernen' },
  'Só anúncios de entreajuda.': { en: 'Only mutual-help notices.', de: 'Nur Aushänge zur gegenseitigen Hilfe.' }
};
function corrigirTraducoes() {
  Object.keys(CORRECOES).forEach(function(pt){ ['en','de'].forEach(function(l){ const o = {}; o[pt] = CORRECOES[pt][l]; guardarTraducoes(l, o); }); });
  const sh = folhaTraducoes(); const n = sh.getLastRow() - 1; if (n < 1) return;
  const linhas = sh.getRange(2, 1, n, 3).getValues();
  const ingles = /\b(the|and|with|your|you|of|for|my|is|are|from|at)\b/i, alemao = /\b(und|der|die|das|mit|Sie|für|ist|von|zum|zur|ein|eine)\b/;
  const refazer = linhas.filter(function(r){ return r[0] && r[2] && ingles.test(r[2]) && !alemao.test(r[2]) && !CORRECOES[r[0]]; }).map(function(r){ return String(r[0]); });
  console.log('A refazer em alemão: ' + refazer.length);
  for (let i = 0; i < refazer.length; i += 30) {
    const novos = traduzirComClaude(refazer.slice(i, i + 30), 'de');
    if (novos) guardarTraducoes('de', novos);
  }
  CacheService.getScriptCache().removeAll(['trad_en', 'trad_de']);
}
