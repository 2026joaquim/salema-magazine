/* =====================================================================
   NOTIFICAÇÕES NO TELEMÓVEL (Web Push) — Salema Eco Camp Magazine
   Tudo corre na conta Google do parque, sem serviços externos.

   Como funciona:
   - O hóspede carrega em "Receber novidades" no Magazine e aceita.
     O endereço do telemóvel fica no separador "Subscricoes".
   - Quando há um aviso ou evento novo na folha, o envio automático
     (de 10 em 10 minutos) manda uma notificação a todos.
   - Também se pode enviar à mão: menu "Magazine" na folha.

   Para ativar (uma vez): correr configurarNotificacoes() no editor.
   ===================================================================== */

const PUSH_CONTACTO = 'mailto:joaquimlourenco@salemaecocamp.com';
const SITE_URL = 'https://ecomagazine.pt/';

/* ---------- menu na folha ---------- */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Magazine')
    .addItem('Enviar notificação aos hóspedes…', 'menuEnviarNotificacao')
    .addItem('Ver quantos recebem notificações', 'menuContarSubscricoes')
    .addItem('Ver estatísticas', 'menuEstatisticas')
    .addToUi();
}
function menuEnviarNotificacao() {
  const ui = SpreadsheetApp.getUi();
  const t = ui.prompt('Notificação', 'Título (ex.: Nova ementa no Nazari)', ui.ButtonSet.OK_CANCEL);
  if (t.getSelectedButton() !== ui.Button.OK || !t.getResponseText().trim()) return;
  const m = ui.prompt('Notificação', 'Texto (ex.: Comida de conforto a partir de hoje!)', ui.ButtonSet.OK_CANCEL);
  if (m.getSelectedButton() !== ui.Button.OK) return;
  const r = enviarNotificacao(t.getResponseText().trim(), m.getResponseText().trim(), SITE_URL);
  ui.alert('Enviada para ' + r.enviadas + ' telemóveis.' + (r.removidas ? ' (' + r.removidas + ' já não estavam ativos e foram retirados.)' : ''));
}
function menuContarSubscricoes() {
  SpreadsheetApp.getUi().alert(lerSubscricoes().length + ' telemóveis recebem as notificações do Magazine.');
}

/* ---------- configurar (uma vez) ---------- */
function configurarNotificacoes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Subscricoes');
  if (!sh) { sh = ss.insertSheet('Subscricoes'); sh.appendRow(['endpoint', 'criado']); sh.setFrozenRows(1); sh.getRange(1,1,1,2).setFontWeight('bold'); }
  chavesVapid();
  ScriptApp.getProjectTriggers().forEach(function(t){ if (t.getHandlerFunction() === 'verificarNovidades') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('verificarNovidades').timeBased().everyMinutes(10).create();
  verificarNovidades(true);
  Logger.log('Notificações ativas. Chave pública: ' + chavesVapid().publica);
}

/* ---------- pedidos do site ---------- */
function pushGet(acao) {
  if (acao === 'vapid') return { ok: true, chave: chavesVapid().publica };
  if (acao === 'ultima') {
    const u = PropertiesService.getScriptProperties().getProperty('PUSH_ULTIMA');
    return Object.assign({ ok: true }, u ? JSON.parse(u) : { titulo: 'Salema Eco Camp Magazine', texto: 'Há novidades no Magazine.', url: SITE_URL });
  }
  return null;
}
function pushPost(body) {
  if (body.acao === 'subscrever') {
    const ep = String(body.endpoint || '');
    if (!/^https:\/\/[\w.-]+\//.test(ep) || ep.length > 1000) return { ok: false, erro: 'Endereço inválido.' };
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      if (lerSubscricoes().indexOf(ep) < 0) folhaSubscricoes().appendRow([ep, new Date()]);
    } finally { lock.releaseLock(); }
    return { ok: true };
  }
  if (body.acao === 'cancelar') { removerSubscricoes([String(body.endpoint || '')]); return { ok: true }; }
  return null;
}

/* ---------- envio automático de avisos e eventos novos ---------- */
function verificarNovidades(soMarcar) {
  const props = PropertiesService.getScriptProperties();
  const vistos = JSON.parse(props.getProperty('PUSH_VISTOS') || 'null');
  const itens = [];
  lerAvisos().forEach(function(a){ itens.push({ k: 'a|' + a.data + '|' + a.texto.slice(0, 60), titulo: a.setor ? a.setor : 'Aviso do parque', texto: a.texto }); });
  lerEventos().forEach(function(e){ itens.push({ k: 'e|' + e.titulo + '|' + e.data, titulo: 'Novo evento: ' + e.titulo, texto: [e.data.split('-').reverse().join('/'), e.hora, e.local].filter(String).join(' · ') + (e.descricao ? '. ' + e.descricao : '') }); });
  const chaves = itens.map(function(i){ return i.k; });
  if (!vistos || soMarcar === true) { props.setProperty('PUSH_VISTOS', JSON.stringify(chaves.slice(-200))); return; }
  const novos = itens.filter(function(i){ return vistos.indexOf(i.k) < 0; });
  props.setProperty('PUSH_VISTOS', JSON.stringify(vistos.concat(novos.map(function(i){ return i.k; })).slice(-200)));
  if (!novos.length) return;
  if (novos.length === 1) enviarNotificacao(novos[0].titulo, novos[0].texto.slice(0, 180), SITE_URL);
  else enviarNotificacao('Novidades no Magazine', novos.map(function(i){ return i.titulo; }).join(' · ').slice(0, 180), SITE_URL);
}

/* ---------- enviar ---------- */
function enviarNotificacao(titulo, texto, url) {
  PropertiesService.getScriptProperties().setProperty('PUSH_ULTIMA', JSON.stringify({ titulo: titulo, texto: texto || '', url: url || SITE_URL, t: Date.now() }));
  const subs = lerSubscricoes(); if (!subs.length) return { enviadas: 0, removidas: 0 };
  const k = chavesVapid(); const jwts = {};
  const pedidos = subs.map(function(ep){
    const aud = ep.match(/^https:\/\/[^\/]+/)[0];
    if (!jwts[aud]) jwts[aud] = jwtVapid(aud, k.privada);
    return { url: ep, method: 'post', muteHttpExceptions: true, payload: '',
             headers: { 'Authorization': 'vapid t=' + jwts[aud] + ', k=' + k.publica, 'TTL': '86400', 'Urgency': 'normal' } };
  });
  const mortas = []; let ok = 0;
  for (let i = 0; i < pedidos.length; i += 50) {
    UrlFetchApp.fetchAll(pedidos.slice(i, i + 50)).forEach(function(r, j){
      const c = r.getResponseCode();
      if (c >= 200 && c < 300) ok++; else if (c === 404 || c === 410) mortas.push(subs[i + j]);
    });
  }
  if (mortas.length) removerSubscricoes(mortas);
  return { enviadas: ok, removidas: mortas.length };
}

/* ---------- subscrições ---------- */
function folhaSubscricoes() { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Subscricoes'); }
function lerSubscricoes() {
  const sh = folhaSubscricoes(); if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(function(r){ return String(r[0]); }).filter(String);
}
function removerSubscricoes(lista) {
  const sh = folhaSubscricoes(); if (!sh || sh.getLastRow() < 2) return;
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
  for (let i = v.length - 1; i >= 0; i--) if (lista.indexOf(String(v[i][0])) >= 0) sh.deleteRow(i + 2);
}

/* ---------- chaves VAPID e assinatura ES256 (curva P-256) ---------- */
function chavesVapid() {
  const props = PropertiesService.getScriptProperties();
  let priv = props.getProperty('VAPID_PRIVADA'), pub = props.getProperty('VAPID_PUBLICA');
  if (!priv || !pub) {
    let d = BigInt(0);
    while (d <= BigInt(0) || d >= EC.n) d = bytesParaInt(bytesAleatorios(32));
    const Q = ecMul(d, [EC.gx, EC.gy]);
    priv = b64u(intParaBytes(d, 32));
    pub = b64u([4].concat(intParaBytes(Q[0], 32), intParaBytes(Q[1], 32)));
    props.setProperty('VAPID_PRIVADA', priv); props.setProperty('VAPID_PUBLICA', pub);
  }
  return { privada: priv, publica: pub };
}
function jwtVapid(aud, privB64) {
  const h = b64u(textoBytes(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const c = b64u(textoBytes(JSON.stringify({ aud: aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: PUSH_CONTACTO })));
  const dados = h + '.' + c;
  const sig = ecdsaAssinar(textoBytes(dados), bytesParaInt(desB64u(privB64)));
  return dados + '.' + b64u(sig);
}

const EC = {
  p:  BigInt('0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff'),
  n:  BigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551'),
  gx: BigInt('0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296'),
  gy: BigInt('0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5')
};
function modp(a, m) { const r = a % m; return r < BigInt(0) ? r + m : r; }
function modInv(a, m) {
  let t = BigInt(0), nt = BigInt(1), r = m, nr = modp(a, m);
  while (nr !== BigInt(0)) { const q = r / nr; [t, nt] = [nt, t - q * nt]; [r, nr] = [nr, r - q * nr]; }
  return modp(t, m);
}
/* coordenadas jacobianas, a = -3 */
function jDouble(P) {
  const p = EC.p; const [X, Y, Z] = P;
  if (Y === BigInt(0)) return [BigInt(0), BigInt(1), BigInt(0)];
  const ZZ = Z * Z % p, YY = Y * Y % p;
  const M = BigInt(3) * modp((X - ZZ) * (X + ZZ), p) % p;
  const S = BigInt(4) * X % p * YY % p;
  const X3 = modp(M * M - BigInt(2) * S, p);
  const Y3 = modp(M * (S - X3) - BigInt(8) * YY % p * YY, p);
  const Z3 = BigInt(2) * Y % p * Z % p;
  return [X3, Y3, Z3];
}
function jAdd(P, Q) {
  const p = EC.p;
  if (P[2] === BigInt(0)) return Q; if (Q[2] === BigInt(0)) return P;
  const Z1Z1 = P[2] * P[2] % p, Z2Z2 = Q[2] * Q[2] % p;
  const U1 = P[0] * Z2Z2 % p, U2 = Q[0] * Z1Z1 % p;
  const S1 = P[1] * Q[2] % p * Z2Z2 % p, S2 = Q[1] * P[2] % p * Z1Z1 % p;
  if (U1 === U2) return S1 === S2 ? jDouble(P) : [BigInt(0), BigInt(1), BigInt(0)];
  const H = modp(U2 - U1, p), R = modp(S2 - S1, p);
  const HH = H * H % p, HHH = H * HH % p, V = U1 * HH % p;
  const X3 = modp(R * R - HHH - BigInt(2) * V, p);
  const Y3 = modp(R * (V - X3) - S1 * HHH, p);
  const Z3 = P[2] * Q[2] % p * H % p;
  return [X3, Y3, Z3];
}
function ecMul(k, G) {
  let R = [BigInt(0), BigInt(1), BigInt(0)], A = [G[0], G[1], BigInt(1)];
  while (k > BigInt(0)) { if (k & BigInt(1)) R = jAdd(R, A); A = jDouble(A); k >>= BigInt(1); }
  const zi = modInv(R[2], EC.p), zi2 = zi * zi % EC.p;
  return [R[0] * zi2 % EC.p, R[1] * zi2 % EC.p * zi % EC.p];
}
function ecdsaAssinar(msg, d) {
  const n = EC.n;
  const e = bytesParaInt(sha256(msg)) % n;
  for (;;) {
    const k = bytesParaInt(sha256(bytesAleatorios(32).concat(intParaBytes(d, 32), msg))) % n;
    if (k === BigInt(0)) continue;
    const r = ecMul(k, [EC.gx, EC.gy])[0] % n; if (r === BigInt(0)) continue;
    const s = modInv(k, n) * (e + r * d) % n; if (s === BigInt(0)) continue;
    return intParaBytes(r, 32).concat(intParaBytes(s, 32));
  }
}

/* ---------- bytes ---------- */
function u8(b) { return b.map(function(x){ return x & 255; }); }
function s8(b) { return b.map(function(x){ x &= 255; return x > 127 ? x - 256 : x; }); }
function sha256(bytes) { return u8(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s8(bytes))); }
function bytesAleatorios(n) {
  let out = [];
  while (out.length < n) out = out.concat(sha256(textoBytes(Utilities.getUuid() + Math.random() + Date.now())));
  return out.slice(0, n);
}
function textoBytes(s) { return u8(Utilities.newBlob(s).getBytes()); }
function b64u(bytes) { return Utilities.base64EncodeWebSafe(s8(bytes)).replace(/=+$/, ''); }
function desB64u(s) { while (s.length % 4) s += '='; return u8(Utilities.base64DecodeWebSafe(s)); }
function bytesParaInt(b) { let x = BigInt(0); u8(b).forEach(function(v){ x = (x << BigInt(8)) + BigInt(v); }); return x; }
function intParaBytes(x, len) { const out = []; for (let i = 0; i < len; i++) { out.unshift(Number(x & BigInt(255))); x >>= BigInt(8); } return out; }
