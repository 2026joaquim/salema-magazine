/* =====================================================================
   ESTATÍSTICAS DO MAGAZINE — contagens anónimas por dia
   Não guarda nomes, telefones, IPs nem identificadores de pessoas.
   Separador "Estatisticas": data | evento | detalhe | total
   ===================================================================== */
const EVENTOS_OK = ['visita','separador','seccao','pedido','evento','pergunta','anuncio','notificacoes','instalada'];

function estatPost(body) {
  if (body.acao !== 'estat') return null;
  const ev = String(body.evento || ''); if (EVENTOS_OK.indexOf(ev) < 0) return { ok: false };
  const det = String(body.detalhe || '').replace(/[\r\n]+/g, ' ').slice(0, 80);
  registarEstat(ev, det);
  return { ok: true };
}
function registarEstat(ev, det) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName('Estatisticas');
    if (!sh) { sh = ss.insertSheet('Estatisticas'); sh.appendRow(['data','evento','detalhe','total']); sh.setFrozenRows(1); sh.getRange(1,1,1,4).setFontWeight('bold'); }
    const hoje = Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
    const n = sh.getLastRow();
    const inicio = Math.max(2, n - 400);
    if (n >= 2) {
      const v = sh.getRange(inicio, 1, n - inicio + 1, 3).getDisplayValues();
      for (let i = v.length - 1; i >= 0; i--) {
        if (v[i][0] !== hoje) break;
        if (v[i][1] === ev && v[i][2] === det) { const c = sh.getRange(inicio + i, 4); c.setValue((Number(c.getValue()) || 0) + 1); return; }
      }
    }
    sh.appendRow([hoje, ev, det, 1]);
    sh.getRange(sh.getLastRow(), 1).setNumberFormat('@');
  } finally { lock.releaseLock(); }
}

/* Resumo dos últimos 7 e 30 dias (menu Magazine) */
function menuEstatisticas() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Estatisticas');
  const ui = SpreadsheetApp.getUi();
  if (!sh || sh.getLastRow() < 2) { ui.alert('Ainda não há estatísticas.'); return; }
  const v = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues();
  const lim = function(d){ return Utilities.formatDate(new Date(Date.now() - d * 864e5), FUSO, 'yyyy-MM-dd'); };
  const soma = function(dias, ev, det){ const l = lim(dias); return v.filter(function(r){ return r[0] > l && r[1] === ev && (det === undefined || r[2] === det); }).reduce(function(s, r){ return s + Number(r[3]); }, 0); };
  const top = function(dias, ev){ const l = lim(dias), m = {}; v.forEach(function(r){ if (r[0] > l && r[1] === ev) m[r[2]] = (m[r[2]] || 0) + Number(r[3]); });
    return Object.keys(m).sort(function(a, b){ return m[b] - m[a]; }).slice(0, 5).map(function(k){ return '   ' + k + ': ' + m[k]; }).join('\n') || '   —'; };
  const hoje = soma(1, 'visita');
  ui.alert('Estatísticas do Magazine',
    'Visitas hoje: ' + hoje + '\nVisitas últimos 7 dias: ' + soma(7, 'visita') + '\nVisitas últimos 30 dias: ' + soma(30, 'visita') +
    '\n   pela app instalada: ' + soma(30, 'visita', 'app') + ' · no browser: ' + soma(30, 'visita', 'browser') +
    '\n\nÚltimos 30 dias:\nPedidos enviados: ' + soma(30, 'pedido') + '\n' + top(30, 'pedido') +
    '\nSecções mais vistas:\n' + top(30, 'seccao') +
    '\nEventos mais abertos:\n' + top(30, 'evento') +
    '\nPerguntas à assistente: ' + soma(30, 'pergunta') +
    '\nAnúncios publicados: ' + soma(30, 'anuncio') +
    '\nNotificações ativadas: ' + soma(30, 'notificacoes') +
    '\n\nTotal de telemóveis com notificações: ' + (typeof lerSubscricoes === 'function' ? lerSubscricoes().length : '—'),
    ui.ButtonSet.OK);
}
