/* =====================================================================
   SALEMA ECO CAMP MAGAZINE — programa do Google (Apps Script)
   Guarda os anúncios, serve os avisos e eventos, e liga o assistente
   ao Claude sem mostrar a chave na página.

   Folhas usadas (criadas pela função configurar):
   - Avisos   : data | tipo | setor | texto          (a equipa escreve)
   - Eventos  : data | hora | titulo | tipo | local | descricao | preco | reservas | cartaz   (a equipa escreve)
               reservas: WhatsApp (+351 …) ou link; cartaz: link da foto no Google Drive (partilhada com «qualquer pessoa com o link»)
   - Anuncios : preenchida pelo Magazine (a equipa pode apagar linhas)

   Propriedades do script (Definições do projeto > Propriedades do script):
   - ANTHROPIC_API_KEY : a chave da conta Anthropic
   - LIMITE_DIARIO     : máximo de perguntas por dia ao assistente (ex.: 300)
   ===================================================================== */

const MODELO = 'claude-haiku-5-5';
const FUSO = 'Europe/Lisbon';
const MAX_ANUNCIOS_ATIVOS = 80;
const CATEGORIAS = ['boleias','entreajuda','arranjos','babysitting','geral'];

/* Corra esta função uma vez, no editor, para criar as folhas.
   Depois corra preencherConteudo() para pôr nas folhas o conteúdo que já está no site. */
function configurar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const folhas = {
    'Avisos':   ['data','tipo','setor','texto'],
    'Eventos':  ['data','hora','titulo','tipo','local','descricao','preco','reservas','cartaz'],
    'Anuncios': ['id','criado','expira','categoria','titulo','texto','nome','contacto','codigo','estado']
  };
  Object.keys(CONTEUDO_COLUNAS).forEach(function(n){ folhas[n] = CONTEUDO_COLUNAS[n]; });
  Object.keys(folhas).forEach(function(nome){
    let sh = ss.getSheetByName(nome);
    if (!sh) sh = ss.insertSheet(nome);
    if (sh.getLastRow() === 0) {
      sh.appendRow(folhas[nome]);
      sh.setFrozenRows(1);
      sh.getRange(1,1,1,folhas[nome].length).setFontWeight('bold');
    }
  });
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('LIMITE_DIARIO')) props.setProperty('LIMITE_DIARIO','300');
}

/* ---------- pedidos de leitura ---------- */
function doGet(e) {
  const acao = (e && e.parameter && e.parameter.acao) || 'dados';
  if (acao === 'dados') {
    return json({ ok: true, avisos: lerAvisos(), eventos: lerEventos(), anuncios: lerAnuncios(), conteudo: lerConteudo() });
  }
  return json({ ok: false, erro: 'Ação desconhecida.' });
}

/* ---------- pedidos de escrita ---------- */
function doPost(e) {
  let body = {};
  try { body = JSON.parse(e.postData.contents || '{}'); } catch (err) { return json({ ok:false, erro:'Pedido inválido.' }); }
  if (body.acao === 'anuncio')   return json(novoAnuncio(body));
  if (body.acao === 'retirar')   return json(retirarAnuncio(body));
  if (body.acao === 'perguntar') return json(perguntar(body));
  return json({ ok: false, erro: 'Ação desconhecida.' });
}

/* ---------- avisos e eventos ---------- */
function linhas(nome) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nome);
  if (!sh || sh.getLastRow() < 2) return [];
  const v = sh.getDataRange().getValues();
  const cab = v.shift().map(String);
  return v.filter(function(r){ return r.join('').trim() !== ''; }).map(function(r){
    const o = {}; cab.forEach(function(c,i){ o[c] = r[i]; }); return o;
  });
}
function dataISO(v) {
  if (v instanceof Date) return Utilities.formatDate(v, FUSO, 'yyyy-MM-dd');
  const s = String(v || '').trim();
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);   // 31/10/2026
  if (m) return m[3] + '-' + ('0'+m[2]).slice(-2) + '-' + ('0'+m[1]).slice(-2);
  return s.slice(0,10);
}
function horaTexto(v) {
  if (v instanceof Date) return Utilities.formatDate(v, FUSO, 'HH:mm');
  return String(v || '').trim();
}
function lerAvisos() {
  return linhas('Avisos').map(function(a){
    return { data: dataISO(a.data), tipo: String(a.tipo||'info').toLowerCase(), setor: String(a.setor||''), texto: String(a.texto||'') };
  }).filter(function(a){ return a.texto; }).reverse().slice(0, 20);
}
function lerEventos() {
  const hoje = Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
  return linhas('Eventos').map(function(e){
    const r = String(e.reservas||'').trim();
    const contacto = !r ? null : (/^https?:/i.test(r) ? { texto: 'Mais informações', url: r } : { texto: 'Reservar por WhatsApp', wa: r });
    return { data: dataISO(e.data), hora: horaTexto(e.hora), titulo: String(e.titulo||''), tipo: String(e.tipo||''), local: String(e.local||''), descricao: String(e.descricao||''),
             preco: String(e.preco||''), cartaz: String(e.cartaz||''), contacto: contacto };
  }).filter(function(e){ return e.titulo && e.data >= hoje; }).slice(0, 30);
}

/* ---------- anúncios ---------- */
function folhaAnuncios() { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Anuncios'); }
function lerAnuncios() {
  const agora = Date.now();
  return linhas('Anuncios')
    .filter(function(a){ return a.estado === 'ativo' && Number(a.expira) > agora; })
    .map(function(a){ return { id: a.id, criado: new Date(Number(a.criado)).toISOString(), expira: new Date(Number(a.expira)).toISOString(), categoria: a.categoria, titulo: a.titulo, texto: a.texto, nome: a.nome, contacto: String(a.contacto) }; })
    .reverse();
}
function limpo(v, max) { return String(v || '').replace(/[\u0000-\u0008\u000B-\u001F]/g,'').trim().slice(0, max); }
function novoAnuncio(b) {
  const titulo = limpo(b.titulo, 60), texto = limpo(b.texto, 400), nome = limpo(b.nome, 40), contacto = limpo(b.contacto, 30);
  if (!titulo || !texto || !nome || !contacto) return { ok:false, erro:'Faltam dados no anúncio.' };
  const categoria = CATEGORIAS.indexOf(b.categoria) >= 0 ? b.categoria : 'geral';
  const dias = Math.min(7, Math.max(1, parseInt(b.dias, 10) || 1));
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    if (lerAnuncios().length >= MAX_ANUNCIOS_ATIVOS) return { ok:false, erro:'Há muitos anúncios ativos. Tente mais tarde.' };
    const codigo = novoCodigo();
    const agora = new Date();
    const expira = new Date(agora.getTime() + dias * 24 * 3600 * 1000);
    folhaAnuncios().appendRow([Utilities.getUuid(), agora.getTime(), expira.getTime(), categoria, titulo, texto, nome, "'" + contacto, codigo, 'ativo']);
    return { ok:true, codigo: codigo };
  } finally { lock.releaseLock(); }
}
function novoCodigo() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const usados = linhas('Anuncios').map(function(a){ return a.codigo; });
  let c;
  do { c = ''; for (let i = 0; i < 4; i++) c += letras.charAt(Math.floor(Math.random() * letras.length)); } while (usados.indexOf(c) >= 0);
  return c;
}
function retirarAnuncio(b) {
  const codigo = limpo(b.codigo, 8).toUpperCase();
  if (!codigo) return { ok:false, erro:'Escreva o código.' };
  const sh = folhaAnuncios();
  const v = sh.getDataRange().getValues();
  const cab = v[0];
  const iC = cab.indexOf('codigo'), iE = cab.indexOf('estado');
  for (let r = 1; r < v.length; r++) {
    if (String(v[r][iC]).toUpperCase() === codigo && v[r][iE] === 'ativo') {
      sh.getRange(r + 1, iE + 1).setValue('retirado');
      return { ok:true };
    }
  }
  return { ok:false, erro:'Não encontrámos um anúncio ativo com esse código.' };
}

/* ---------- assistente ---------- */
function perguntar(b) {
  const pergunta = limpo(b.pergunta, 300);
  const contexto = limpo(b.contexto, 60000);
  if (!pergunta) return { ok:false, erro:'Escreva a sua pergunta.' };
  const props = PropertiesService.getScriptProperties();
  const chave = props.getProperty('ANTHROPIC_API_KEY');
  if (!chave) return { ok:false, erro:'O assistente ainda não está ligado. Pergunte na receção.' };

  // limite diário de perguntas, para nunca haver surpresas na conta
  const hoje = Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
  const limite = parseInt(props.getProperty('LIMITE_DIARIO') || '300', 10);
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  let usadas;
  try {
    usadas = props.getProperty('PERGUNTAS_' + hoje);
    usadas = usadas ? parseInt(usadas, 10) : 0;
    if (usadas >= limite) return { ok:false, erro:'O assistente já respondeu a muitas perguntas hoje. Pergunte na receção.' };
    props.setProperty('PERGUNTAS_' + hoje, String(usadas + 1));
  } finally { lock.releaseLock(); }

  const sistema =
    'És o assistente do Salema Eco Camp Magazine, a app dos hóspedes do Salema Eco Camp.\n' +
    'Regras:\n' +
    '- Responde na língua da pergunta, de forma curta e simpática (no máximo 5 frases).\n' +
    '- Usa só a informação do parque abaixo. Se não souberes (preços ou horários que não estão aqui), diz que não tens essa informação e sugere perguntar na receção. Nunca inventes horários, preços ou regras.\n' +
    '- Para reservar, indica a secção certa no separador «Reservar» do Magazine. Para avarias, o botão «Avisar a equipa». Não marcas nada tu próprio.\n' +
    '- Responde só a perguntas sobre o parque, as atividades e a região. Para outros assuntos, diz com simpatia que só ajudas com o parque.\n' +
    '- Texto simples, sem markdown.\n\n' +
    'INFORMAÇÃO DO PARQUE:\n' + contexto;

  const resposta = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-api-key': chave, 'anthropic-version': '2023-06-01' },
    muteHttpExceptions: true,
    payload: JSON.stringify({
      model: MODELO,
      max_tokens: 400,
      system: [{ type: 'text', text: sistema, cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: pergunta }]
    })
  });
  if (resposta.getResponseCode() !== 200) {
    console.error('Anthropic ' + resposta.getResponseCode() + ': ' + resposta.getContentText());
    return { ok:false, erro:'Não consegui responder agora. Pergunte na receção.' };
  }
  const dados = JSON.parse(resposta.getContentText());
  const texto = (dados.content || []).filter(function(c){ return c.type === 'text'; }).map(function(c){ return c.text; }).join('\n').trim();
  return { ok:true, resposta: texto || 'Não consegui responder agora. Pergunte na receção.' };
}

/* Apaga as linhas de anúncios com mais de 30 dias (opcional: ligar a um acionador diário). */
function limparAnunciosAntigos() {
  const sh = folhaAnuncios(); const v = sh.getDataRange().getValues();
  const limite = Date.now() - 30 * 24 * 3600 * 1000;
  const iCriado = v[0].indexOf('criado');
  for (let r = v.length - 1; r >= 1; r--) if (Number(v[r][iCriado]) < limite) sh.deleteRow(r + 1);
  // apaga também os contadores de perguntas antigos
  const props = PropertiesService.getScriptProperties(); const hoje = Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
  Object.keys(props.getProperties()).forEach(function(k){ if (k.indexOf('PERGUNTAS_') === 0 && k !== 'PERGUNTAS_' + hoje) props.deleteProperty(k); });
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}


/* =====================================================================
   CONTEÚDO GERIDO NA FOLHA
   Cada separador abaixo substitui a parte correspondente do site.
   Uma linha = um produto / prato / aula / atividade. Para esconder uma
   linha sem a apagar (só em Produtos), escreva "não" na coluna ativo.
   Fotos: o nome de uma foto que já está no site (ex.: produto-luffa-1.jpg)
   ou o link de partilha de uma foto no Google Drive (partilhada com
   "qualquer pessoa com o link").
   ===================================================================== */
const CONTEUDO_COLUNAS = {
  "Produtos": [
    "nome",
    "preco",
    "resumo",
    "descricao",
    "foto1",
    "foto2",
    "ativo"
  ],
  "Pao": [
    "padaria",
    "chegada",
    "produto",
    "preco",
    "folheto"
  ],
  "Menu": [
    "seccao",
    "subtitulo",
    "grupo",
    "prato",
    "preco",
    "descricao",
    "tipo"
  ],
  "Yoga": [
    "dia",
    "hora",
    "aula",
    "preco"
  ],
  "Massagens": [
    "nome",
    "preco"
  ],
  "Atividades": [
    "empresa",
    "sobre",
    "atividade",
    "adulto",
    "crianca",
    "duracao",
    "descricao"
  ]
};
const CONTEUDO_CHAVES = {"Produtos": "produtos", "Pao": "pao", "Menu": "menu", "Yoga": "yoga", "Massagens": "massagens", "Atividades": "parceiros"};

function lerConteudo() {
  const cache = CacheService.getScriptCache();
  const guardado = cache.get('conteudo');
  if (guardado) return JSON.parse(guardado);
  const out = {};
  Object.keys(CONTEUDO_CHAVES).forEach(function(folha){
    const linhasFolha = linhas(folha).map(function(r){
      const o = {}; Object.keys(r).forEach(function(k){ o[k] = (r[k] instanceof Date) ? Utilities.formatDate(r[k], FUSO, 'HH:mm') : String(r[k]).trim(); }); return o;
    }).filter(function(r){ return String(r.ativo || 'sim').toLowerCase().indexOf('n') !== 0; });
    if (linhasFolha.length) out[CONTEUDO_CHAVES[folha]] = linhasFolha;
  });
  try { cache.put('conteudo', JSON.stringify(out), 60); } catch (e) {}
  return out;
}

/* Corra uma vez, depois de configurar(), para copiar o conteúdo atual do site para as folhas.
   Só preenche separadores que ainda estão vazios (não apaga nada). */
function preencherConteudo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inicial = CONTEUDO_INICIAL;
  Object.keys(CONTEUDO_CHAVES).forEach(function(folha){
    const sh = ss.getSheetByName(folha); if (!sh || sh.getLastRow() > 1) return;
    const cab = CONTEUDO_COLUNAS[folha];
    const dados = (inicial[CONTEUDO_CHAVES[folha]] || []).map(function(o){ return cab.map(function(c){ return o[c] || ''; }); });
    if (dados.length) {
      sh.getRange(2, 1, dados.length, cab.length).setNumberFormat('@').setValues(dados);
      sh.autoResizeColumns(1, cab.length);
    }
  });
}

const CONTEUDO_INICIAL = {"produtos": [{"nome": "Manta", "preco": "sob consulta", "resumo": "peça única", "descricao": "", "foto1": "", "foto2": "", "ativo": "sim"}, {"nome": "AllMatters · Intimate wash for your body and menstrual cup, 75 ml", "preco": "6,30 €", "resumo": "vegan e biológico", "descricao": "Gel de limpeza 2 em 1: serve para limpar o copo menstrual antes da inserção/após a remoção e também como sabão de higiene íntima. Com pH equilibrado, o gel contém ingredientes biológicos e naturais, sem perfume. Vegan e Certificado Hipoalergénico pelo Allergy-Certified™. Apropriado para todos os tipos de pele.", "foto1": "produto-allmatters-1.jpg", "foto2": "produto-allmatters-2.jpg", "ativo": "sim"}, {"nome": "Ode Oliva · Loção corporal / Body lotion 100 ml", "preco": "13,80 €", "resumo": "artesanal e natural", "descricao": "Loção corporal hidratante artesanal, contém azeite, hidrolato de rosas, emulsionante, extrato de semente de romã, vitamina E, óleo essencial de gerânio e milefólio. Produto natural e biodegradável, consumindo o mínimo de recursos e reduzindo o impacto ambiental.", "foto1": "produto-odeoliva-1.jpg", "foto2": "produto-odeoliva-2.jpg", "ativo": "sim"}, {"nome": "Champô Sólido Mind the Trash · Cabelos normais (com condicionador)", "preco": "9,30 €", "resumo": "natural, sem embalagem de plástico", "descricao": "Champô Sólido Mind The Trash desenvolvido de forma a respeitar o pH do cabelo, ajudando a hidratá-lo e nutri-lo. Formulado com ingredientes naturais e de origem natural, incluindo ingredientes provenientes de agricultura biológica. É indicado para cabelos normais deixando o cabelo leve, solto e macio.", "foto1": "produto-mindthetrash-1.jpg", "foto2": "produto-mindthetrash-2.jpg", "ativo": "sim"}, {"nome": "Alkarub · Chai de alfarroba e especiarias, 30 saquetas", "preco": "8,80 €", "resumo": "o único chai de alfarroba do mundo", "descricao": "O único chai de alfarroba do mundo: imperdível. Alfarroba do Algarve com canela, gengibre, cardamomo, funcho, cravinho, pimenta preta e anis-estrelado. Naturalmente doce, sem açúcar adicionado e sem cafeína nem teína. 30 saquetas de papel biodegradável (120 g). Feito no Algarve.", "foto1": "produto-alkarub-chai-1.jpg", "foto2": "produto-alkarub-chai-2.jpg", "ativo": "sim"}, {"nome": "Alkarub · Chá de alfarroba com plantas do Algarve (alecrim, laranja ou hortelã-pimenta)", "preco": "9,20 €", "resumo": "premiado pela inovação na Dieta Mediterrânica", "descricao": "Chá de alfarroba misturado com plantas do Algarve, premiado pela inovação na Dieta Mediterrânica. Naturalmente doce, sem açúcar adicionado e sem cafeína nem teína. Sabores: alecrim, laranja e hortelã-pimenta. Feito no Algarve.", "foto1": "produto-alkarub-alecrim.jpg", "foto2": "produto-alkarub-hortela.jpg", "ativo": "sim"}, {"nome": "Bell Surf Gel · Protetor solar SPF 50 resistente à água, 40 g", "preco": "9,50 €", "resumo": "vegan e reef safe", "descricao": "Gel protetor solar SPF 50 (UVA/UVB), resistente à água, pensado para o surf e outros desportos aquáticos. Vegan, Reef Safe e aprovado pela PETA. Aplicar no rosto, pescoço, orelhas e decote cerca de 20 minutos antes da exposição ao sol; reaplicar de 2 em 2 horas e depois de nadar ou de secar com a toalha. Fabricado na Polónia.", "foto1": "produto-surfgel-1.jpg", "foto2": "produto-surfgel-2.jpg", "ativo": "sim"}, {"nome": "Esponja vegetal de Luffa", "preco": "3,60 €", "resumo": "vegan e compostável", "descricao": "Usada para cuidar do corpo, esta esponja vegetal é feita através da polpa seca da abóbora, formada por uma rede de fibras. Produzida em plantações em agrobiologia florestal em Benin e Burkina. Vegan e completamente compostável, de descontaminação muito simples e prática, pode ser usada também para a lavagem da roupa e limpeza da casa.", "foto1": "produto-luffa-1.jpg", "foto2": "", "ativo": "sim"}], "pao": [{"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Bola de cereais", "preco": "0,85", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Papo-seco", "preco": "0,35", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Meia baguete", "preco": "1,10", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Pão branco pequeno · 400 g", "preco": "1,80", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Pão integral · 500 g", "preco": "1,95", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Croissant com chocolate", "preco": "1,80", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Croissant simples", "preco": "1,75", "folheto": "pao-nicolay.jpg"}, {"padaria": "Pão Nicolay", "chegada": "entre as 08h00 e as 08h15", "produto": "Pastel de nata", "preco": "1,80", "folheto": "pao-nicolay.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Baguete · trigo, 350 g", "preco": "1,65", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Pão pequeno · trigo e centeio, 400 g", "preco": "1,80", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Pão de cereais · multicereais, 400 g", "preco": "2,50", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Pão médio · trigo e centeio, 785 g", "preco": "3,00", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Croissant simples · contém leite e ovos", "preco": "1,40", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Pastel de nata", "preco": "1,30", "folheto": "pao-budens.jpg"}, {"padaria": "Padaria Budens", "chegada": "entre as 08h30 e as 08h45", "produto": "Pastel de amêndoa", "preco": "1,30", "folheto": "pao-budens.jpg"}], "menu": [{"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Buffet de pequeno-almoço", "preco": "13 €", "descricao": "Pão, croissant, panquecas, fiambre, cogumelos salteados, queijo, chouriço, compota, mel, ovos mexidos, iogurte, granola, cereais, fruta, bolo caseiro, café, leite, sumos e chá. Preço por pessoa; não se pode partilhar nem levar.", "tipo": ""}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Bowl de iogurte", "preco": "4,50 €", "descricao": "Iogurte grego, fruta, granola de chocolate e mel", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Bolo do dia", "preco": "4 €", "descricao": "", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Croissant de manteiga ou compota", "preco": "3,50 €", "descricao": "", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Croissant misto", "preco": "3,50 €", "descricao": "Fiambre e queijo", "tipo": ""}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Pastel de nata", "preco": "1,90 €", "descricao": "", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Torrada", "preco": "3 €", "descricao": "", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Tosta de queijo", "preco": "4,90 €", "descricao": "", "tipo": "v"}, {"seccao": "Pequeno-almoço", "subtitulo": "Das 8:00 às 10:30", "grupo": "", "prato": "Tosta mista", "preco": "4,90 €", "descricao": "", "tipo": ""}, {"seccao": "Entradas", "subtitulo": "", "grupo": "", "prato": "Azeitonas", "preco": "1,50 €", "descricao": "", "tipo": "vg"}, {"seccao": "Entradas", "subtitulo": "", "grupo": "", "prato": "Sopa do dia", "preco": "4 €", "descricao": "", "tipo": ""}, {"seccao": "Entradas", "subtitulo": "", "grupo": "", "prato": "Guacamole com nachos", "preco": "6 €", "descricao": "", "tipo": "vg"}, {"seccao": "Entradas", "subtitulo": "", "grupo": "", "prato": "Húmus", "preco": "5 €", "descricao": "", "tipo": "vg"}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Moussaka", "preco": "15 €", "descricao": "Beringela assada, carne picada em molho de tomate e creme de feta gratinado", "tipo": ""}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Moussaka vegan", "preco": "16 €", "descricao": "Beringela assada, \"beyond meat\" em molho de tomate e gratinado de queijo vegetal", "tipo": "vg"}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Batata-doce e beterraba assadas", "preco": "16 €", "descricao": "Com burrata e pesto de nozes", "tipo": "v"}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Souvlaki", "preco": "16 €", "descricao": "Espetadas de frango com pimentos, tzatziki e pão pita", "tipo": ""}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Salada mediterrânica de couscous", "preco": "14 €", "descricao": "Salada quente de couscous salteado com legumes e hortelã", "tipo": "vg"}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Poke bowl de frango", "preco": "15 €", "descricao": "Arroz de sashimi, abacate, manga, batata-doce, edamame, gengibre, coentros e sésamo", "tipo": ""}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Poke bowl de salmão", "preco": "17 €", "descricao": "", "tipo": ""}, {"seccao": "Pratos", "subtitulo": "Das 12:00 às 21:30", "grupo": "", "prato": "Poke bowl de tofu", "preco": "15 €", "descricao": "", "tipo": "vg"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Duo", "preco": "9 €", "descricao": "Tomate, mozzarella e fiambre", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Calabresa", "preco": "9,50 €", "descricao": "Tomate, mozzarella, chouriço e cebola", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Havaiana", "preco": "10 €", "descricao": "Tomate, mozzarella, fiambre e ananás", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Salami", "preco": "10 €", "descricao": "Tomate, mozzarella e salami", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Napolitana", "preco": "9,90 €", "descricao": "Tomate, mozzarella, anchovas e azeitonas", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Al Tonno", "preco": "9,50 €", "descricao": "Tomate, mozzarella e atum", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Algarve", "preco": "10,50 €", "descricao": "Tomate, mozzarella, sardinha, alcaparras e tomate cherry", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Nazari", "preco": "9,50 €", "descricao": "Tomate, mozzarella, gorgonzola, bechamel, nozes e mel", "tipo": "v"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Clássicas", "prato": "Calzone", "preco": "9,90 €", "descricao": "Tomate, mozzarella, fiambre, cogumelos e cebola", "tipo": ""}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Vegetarianas", "prato": "Margarita", "preco": "9 €", "descricao": "Tomate e mozzarella", "tipo": "v"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Vegetarianas", "prato": "Quattro Formaggi", "preco": "12 €", "descricao": "Tomate, mozzarella, queijo de cabra, roquefort e parmesão", "tipo": "v"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Vegetarianas", "prato": "Al Funghi", "preco": "9,50 €", "descricao": "Tomate, mozzarella e cogumelos", "tipo": "v"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Veganas", "prato": "Las Vegans", "preco": "12 €", "descricao": "Tomate, mozzarella vegan, cogumelos, courgette, tomate cherry e rúcula", "tipo": "vg"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Veganas", "prato": "Al Funghi vegan", "preco": "9,50 €", "descricao": "Tomate, mozzarella vegan e cogumelos", "tipo": "vg"}, {"seccao": "Pizzas", "subtitulo": "Massa sem glúten +4 € · caixa take away 0,50 €", "grupo": "Veganas", "prato": "Margarita vegan", "preco": "9,50 €", "descricao": "Tomate e mozzarella vegan", "tipo": "vg"}, {"seccao": "Menu infantil", "subtitulo": "", "grupo": "", "prato": "Esparguete à bolonhesa", "preco": "9 €", "descricao": "", "tipo": ""}, {"seccao": "Menu infantil", "subtitulo": "", "grupo": "", "prato": "Mini pizza margarita", "preco": "8 €", "descricao": "", "tipo": "v"}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Água filtrada 1 L", "preco": "1 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Água com gás 0,25 L", "preco": "2,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Água com gás 0,75 L", "preco": "4 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Sumo do dia", "preco": "3,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Limonada", "preco": "3 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Sem álcool", "prato": "Ice tea caseiro", "preco": "3 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Smoothies · 5,90 €", "prato": "Hiperproteico", "preco": "", "descricao": "Bebida de soja, aveia, banana, whey e canela", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Smoothies · 5,90 €", "prato": "Detox", "preco": "", "descricao": "Ananás, espinafres, spirulina, gengibre e hortelã", "tipo": "vg"}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Smoothies · 5,90 €", "prato": "Tropicolada", "preco": "", "descricao": "Banana, ananás, leite de coco e hortelã", "tipo": "vg"}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Smoothies · 5,90 €", "prato": "Morango", "preco": "", "descricao": "Iogurte natural, banana e morango", "tipo": "v"}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Smoothies · 5,90 €", "prato": "Café", "preco": "", "descricao": "Amêndoas, nozes, banana, cacau e café", "tipo": "vg"}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Espresso", "preco": "1,20 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Americano", "preco": "1,80 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Galão", "preco": "2,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Cappuccino", "preco": "2,80 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Iced coffee", "preco": "2,80 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Iced latte", "preco": "2,80 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Tisana, bule pequeno", "preco": "3 €", "descricao": "Camomila, erva-príncipe, cidreira, carqueja ou lúcia-lima", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Café e chá biológicos · até às 18:00", "prato": "Tisana, bule grande", "preco": "5 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "Imperial", "preco": "2,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "Caneca", "preco": "4,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "IPA artesanal 0,25 L / pint", "preco": "4 € / 6 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "Stout artesanal 0,25 L / pint", "preco": "4 € / 6 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "Sidra local 0,25 L / pint", "preco": "4 € / 6 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cerveja e sidra", "prato": "Sem álcool", "preco": "2,50 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Gin tónico", "preco": "7 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Porto tónico", "preco": "7 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Caipirinha", "preco": "9 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Mojito", "preco": "9 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Aperol Spritz", "preco": "7 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Cocktails", "prato": "Vodka com sumo natural", "preco": "7 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Vinho da casa a copo", "preco": "5 €", "descricao": "Qta Vale Santa Luzia: branco, rosé ou tinto", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Tinto reserva a copo", "preco": "6 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Garrafas", "preco": "16 € a 26 €", "descricao": "Seleção de vinhos portugueses, incluindo biológicos e um vinho natural", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Vinhos do Porto", "preco": "5 € a 6 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Aguardentes", "preco": "5 € a 8 €", "descricao": "", "tipo": ""}, {"seccao": "Bebidas", "subtitulo": "", "grupo": "Vinhos", "prato": "Licores artesanais e portugueses", "preco": "4 € a 6 €", "descricao": "", "tipo": ""}], "yoga": [{"dia": "Segunda", "hora": "18:30–19:30", "aula": "Yoga Nidra com Paul", "preco": "15 €"}, {"dia": "Terça", "hora": "9:00–10:00", "aula": "Free Yoga com Michelle Bavaresco (só hóspedes)", "preco": "Grátis"}, {"dia": "Quarta", "hora": "8:00–9:15", "aula": "Yoga Sādhanā com Mukta", "preco": "15 €"}, {"dia": "Quarta", "hora": "9:30–10:45", "aula": "Power Yoga com Sara Soldado", "preco": "15 €"}, {"dia": "Quarta", "hora": "11:15–12:30", "aula": "Hatha Flow com Michelle Bavaresco", "preco": "15 €"}, {"dia": "Quarta", "hora": "18:30–19:30", "aula": "Yoga Nidra com Paul", "preco": "15 €"}, {"dia": "Sexta", "hora": "9:00–10:15", "aula": "Hatha Flow com Michelle Bavaresco", "preco": "15 €"}, {"dia": "Sexta", "hora": "11:00–12:15", "aula": "Yoga Sādhanā com Mukta", "preco": "15 €"}, {"dia": "Sexta", "hora": "18:30–19:30", "aula": "Yoga Nidra com Paul", "preco": "15 €"}, {"dia": "Sábado", "hora": "9:00–10:15", "aula": "Hatha Flow com Michelle Bavaresco", "preco": "15 €"}, {"dia": "Sábado", "hora": "18:30–19:30", "aula": "Yoga Nidra com Paul", "preco": "15 €"}], "massagens": [{"nome": "Facial Lift 30 min", "preco": "35 €"}, {"nome": "Pescoço e ombros 30 min", "preco": "35 €"}, {"nome": "Clássica relaxante com óleo 45 min", "preco": "45 €"}, {"nome": "Drenagem linfática 45 min", "preco": "45 €"}, {"nome": "Facial Lift 45 min", "preco": "45 €"}, {"nome": "Deep Tissue 45 min", "preco": "50 €"}, {"nome": "Clássica relaxante com óleo 60 min", "preco": "55 €"}, {"nome": "Drenagem linfática 60 min", "preco": "55 €"}, {"nome": "Facial Lift 60 min", "preco": "55 €"}, {"nome": "Deep Tissue 60 min", "preco": "60 €"}, {"nome": "Clássica relaxante com óleo 90 min", "preco": "80 €"}, {"nome": "Massagem ayurvédica 75 min", "preco": "90 €"}, {"nome": "Reflexologia podal 30 min", "preco": "35 €"}, {"nome": "Reflexologia podal 45 min", "preco": "45 €"}, {"nome": "Reflexologia podal 60 min", "preco": "55 €"}, {"nome": "Massagem na cadeira 45 min", "preco": "40 €"}, {"nome": "Kobido, lifting natural da fáscia 60 min", "preco": "55 €"}, {"nome": "Massagem personalizada com o terapeuta", "preco": "sob consulta"}], "parceiros": [{"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Grutas da Ponta da Piedade", "adulto": "22,50 €", "crianca": "12,50 €", "duracao": "1h15", "descricao": "Passeio de barco às grutas da Ponta da Piedade, das mais bonitas da costa algarvia."}, {"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Grutas em kayak", "adulto": "40 €", "crianca": "40 €", "duracao": "2h15", "descricao": "Catamaran da Marina até ao ponto de partida e kayak nas grutas da Ponta da Piedade, com guia certificado."}, {"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Observação de golfinhos", "adulto": "40 €", "crianca": "25 €", "duracao": "1h30", "descricao": "Semi-rígido até mar aberto, com skipper e guias. Avistamento em cerca de 97% das saídas."}, {"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Algar de Benagil", "adulto": "40 €", "crianca": "25 €", "duracao": "2h", "descricao": "Semi-rígido até Carvoeiro e Benagil, entrando em várias grutas. Não se sai do barco. De manhã é mais confortável."}, {"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Blue Cruise", "adulto": "50 €", "crianca": "25 €", "duracao": "3h30", "descricao": "Catamaran pela costa de Lagos e Ponta da Piedade, com almoço incluído."}, {"empresa": "Blue Fleet", "sobre": "Passeios de barco a partir da Marina de Lagos", "atividade": "Passeio na costa de Lagos", "adulto": "30 €", "crianca": "15 €", "duracao": "2h30", "descricao": "Passeio tranquilo pela costa de Lagos e pelas formações rochosas da Ponta da Piedade."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Observação de golfinhos", "adulto": "40 €", "crianca": "30 €", "duracao": "1h30", "descricao": "Com apresentação educativa antes da saída. A rota depende do mar."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Ocean Safari", "adulto": "85 €", "crianca": "", "duracao": "3h", "descricao": "Mais longe no Atlântico, com biólogo marinho: golfinhos e, com sorte, baleias, tartarugas, tubarões ou peixes-lua. A partir dos 10 anos."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Observação de aves marinhas", "adulto": "55 €", "crianca": "40 €", "duracao": "2h30", "descricao": "Para fotografar aves marinhas raras em pleno oceano. A partir dos 8 anos."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Encantos da Costa Sul", "adulto": "30 €", "crianca": "25 €", "duracao": "1h", "descricao": "Os pequenos segredos da costa sul. A partir dos 3 anos."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Cabo de São Vicente", "adulto": "30 €", "crianca": "25 €", "duracao": "1h", "descricao": "O farol visto do mar e o «Gigante», uma rocha esculpida pela natureza. A partir dos 3 anos."}, {"empresa": "Mar Ilimitado", "sobre": "Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes", "atividade": "Viagem de investigação", "adulto": "70 €", "crianca": "", "duracao": "4h", "descricao": "Monitorização de cetáceos com a equipa de investigação: 1h30 em terra e 2h30 no mar. A partir dos 12 anos."}, {"empresa": "Salema Tours", "sobre": "Passeios de barco na costa sul", "atividade": "Golfinhos e grutas locais", "adulto": "55 €", "crianca": "45 €", "duracao": "2h", "descricao": "Duas experiências numa: a costa e os golfinhos, com explicações do guia."}, {"empresa": "Salema Tours", "sobre": "Passeios de barco na costa sul", "atividade": "Observação de golfinhos", "adulto": "40 €", "crianca": "40 €", "duracao": "1h30", "descricao": "Golfinhos no seu habitat natural."}, {"empresa": "Salema Tours", "sobre": "Passeios de barco na costa sul", "atividade": "Grutas locais", "adulto": "30 €", "crianca": "25 €", "duracao": "1h", "descricao": "Grutas da costa sul entre Sagres e a Salema. Opção pelo Cabo de São Vicente e costa oeste."}, {"empresa": "Salema Tours", "sobre": "Passeios de barco na costa sul", "atividade": "Benagil e golfinhos", "adulto": "75 €", "crianca": "55 €", "duracao": "3h", "descricao": "Golfinhos, a gruta de Benagil e a costa do Barlavento."}, {"empresa": "Salema Tours", "sobre": "Passeios de barco na costa sul", "atividade": "Passeio de kayak", "adulto": "40 €", "crianca": "", "duracao": "3h", "descricao": "Grutas locais de kayak, com guia e barco de apoio."}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Arborismo · nível Curioso", "adulto": "13 €", "crianca": "", "duracao": "", "descricao": "Percursos nas árvores com pontes, redes e slides. Formação no início."}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Arborismo · nível Aventureiro", "adulto": "16 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Arborismo · nível Destemido", "adulto": "20 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Paintball · Trooper", "adulto": "18 €", "crianca": "", "duracao": "", "descricao": "Campo de 2500 m² na floresta. A partir dos 10 anos, mínimo 6 jogadores."}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Paintball · Comando", "adulto": "22 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Paintball · Elite", "adulto": "26 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Parque Aventura", "sobre": "Arborismo e paintball na floresta", "atividade": "Arborismo + paintball", "adulto": "30 €", "crianca": "", "duracao": "", "descricao": "Todos os percursos, 150 bolas e equipamento completo."}, {"empresa": "Surf Planet", "sobre": "Escola de surf de Sagres para iniciantes e intermédios, com instrutores qualificados. Aulas em grupo ou privadas, normalmente às 9:00, 9:15 ou 9:30. Inclui prancha, fato, transporte e seguro.", "atividade": "Aula de surf · 1 dia", "adulto": "65 €", "crianca": "", "duracao": "", "descricao": "Traga água, um snack, protetor solar e toalha."}, {"empresa": "Surf Planet", "sobre": "Escola de surf de Sagres para iniciantes e intermédios, com instrutores qualificados. Aulas em grupo ou privadas, normalmente às 9:00, 9:15 ou 9:30. Inclui prancha, fato, transporte e seguro.", "atividade": "Aula de surf · 2 dias", "adulto": "180 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Surf Planet", "sobre": "Escola de surf de Sagres para iniciantes e intermédios, com instrutores qualificados. Aulas em grupo ou privadas, normalmente às 9:00, 9:15 ou 9:30. Inclui prancha, fato, transporte e seguro.", "atividade": "Aula de surf · 3 dias", "adulto": "275 €", "crianca": "", "duracao": "", "descricao": ""}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Sagres e Costa Vicentina · meio dia", "adulto": "68 €", "crianca": "42 €", "duracao": "8:45–13:00", "descricao": "Sagres, Cabo de São Vicente, parque natural e caminhada."}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Sagres e Costa Vicentina · dia inteiro", "adulto": "97 €", "crianca": "66 €", "duracao": "8:45–16:30", "descricao": "O mesmo, com almoço, jipe pelas serras e visita a uma aldeia."}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Monchique e barragem da Bravura · meio dia", "adulto": "69 €", "crianca": "42 €", "duracao": "8:30–13:00", "descricao": "Barragem da Bravura, caminhada, aldeia e o ponto mais alto, a Fóia."}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Monchique e barragem da Bravura · dia inteiro", "adulto": "106 €", "crianca": "68 €", "duracao": "8:45–15:30", "descricao": "O mesmo, com almoço, vila de Monchique, destilaria de medronho e jipe pela serra."}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Sagres off-road ao pôr do sol", "adulto": "53 €", "crianca": "42 €", "duracao": "3h, desde as 17:00", "descricao": "Sagres, Cabo de São Vicente e o pôr do sol num ponto secreto."}, {"empresa": "Sagres Discovery", "sobre": "Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos", "atividade": "Prova de vinhos", "adulto": "56 € · 63 € com tapas", "crianca": "48 € (só tapas)", "duracao": "3h", "descricao": "Jipe fora de estrada, aldeia, caminhada e prova de 3 vinhos."}, {"empresa": "A Rocha", "sobre": "Observação de aves com guia", "atividade": "Aves de Sagres", "adulto": "103 €", "crianca": "", "duracao": "8h · segundas", "descricao": "Aves marinhas, de rapina, cegonhas e migratórias. 5 km, fácil, todas as idades."}, {"empresa": "A Rocha", "sobre": "Observação de aves com guia", "atividade": "Aves de Monchique", "adulto": "85 €", "crianca": "", "duracao": "8h · terças", "descricao": "Fóia e Caldas de Monchique: aves florestais e de montanha. 5 km, médio."}, {"empresa": "A Rocha", "sobre": "Observação de aves com guia", "atividade": "Lagoa da Abicada", "adulto": "45 €", "crianca": "", "duracao": "4h · domingo de manhã", "descricao": "Flamingos, colhereiros e limícolas, entre sapais e ruínas romanas. 4 km, fácil."}, {"empresa": "A Rocha", "sobre": "Observação de aves com guia", "atividade": "Dunas de Alvor", "adulto": "47 €", "crianca": "", "duracao": "4h · domingo à tarde", "descricao": "Aves costeiras pela ria e pelo passadiço, com mergulho no fim. 3 km, fácil."}, {"empresa": "A Rocha", "sobre": "Observação de aves com guia", "atividade": "Abicada + Dunas de Alvor", "adulto": "80 €", "crianca": "", "duracao": "8h · domingos", "descricao": "Os dois locais num dia. 7 km, fácil."}, {"empresa": "Lagos Nature", "sobre": "Aventuras da costa ao campo, da Blue Fleet", "atividade": "Passeio de bicicleta elétrica", "adulto": "sob consulta", "crianca": "", "duracao": "", "descricao": "Da costa ao interior, em bicicleta elétrica."}, {"empresa": "Lagos Nature", "sobre": "Aventuras da costa ao campo, da Blue Fleet", "atividade": "Passeio de buggy", "adulto": "sob consulta", "crianca": "", "duracao": "", "descricao": "Caminhos de terra entre o mar e o campo, em buggy."}, {"empresa": "Algarve Quad Tours", "sobre": "Moto-4 pela costa oeste do Algarve", "atividade": "Moto-4 · 90 minutos", "adulto": "sob consulta", "crianca": "", "duracao": "1h30", "descricao": ""}, {"empresa": "Algarve Quad Tours", "sobre": "Moto-4 pela costa oeste do Algarve", "atividade": "Moto-4 · 3 horas", "adulto": "sob consulta", "crianca": "", "duracao": "3h", "descricao": ""}, {"empresa": "Algarve Quad Tours", "sobre": "Moto-4 pela costa oeste do Algarve", "atividade": "Moto-4 ao pôr do sol", "adulto": "sob consulta", "crianca": "", "duracao": "", "descricao": "O pôr do sol visto da costa."}]};
