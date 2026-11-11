/* =====================================================================
   SALEMA ECO CAMP MAGAZINE — funcionamento da página
   (o conteúdo está em conteudo.js e os contactos em config.js)
   ===================================================================== */
(function(){
"use strict";
const C = window.CONFIG || {};
const API = (C.APPS_SCRIPT_URL || "").trim();

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const el = (tag, attrs={}, ...kids) => {
  const e=document.createElement(tag);
  for(const [k,v] of Object.entries(attrs)){
    if(v==null) continue;
    if(k==="class") e.className=v; else if(k==="text") e.textContent=v;
    else if(k.startsWith("on")) e.addEventListener(k.slice(2),v); else e.setAttribute(k,v);
  }
  for(const k of kids) if(k!=null) e.append(k);
  return e;
};
const img = (src, alt, attrs={}) => {
  const i=el("img",{src:fotoURL(src), alt:alt||"", loading:"lazy", ...attrs});
  i.addEventListener("error",()=>i.classList.add("missing"));
  return i;
};
const digits = n => (n||"").replace(/[^\d]/g,"");
const waLink = (num, text) => "https://wa.me/"+digits(num)+"?text="+encodeURIComponent(text);
const mailLink = (to, subject, body) => "mailto:"+to+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
const sec = id => CATALOG.find(s=>s.id===id);
/* foto: nome de ficheiro em imagens/ ou link do Google Drive */
function fotoURL(src){
  src=String(src||"").trim();
  const m=src.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{20,})/);
  if(m) return "https://drive.google.com/thumbnail?id="+m[1]+"&sz=w1600";
  return /^https?:/.test(src)?src:"imagens/"+src;
}
const eur = n => n.toFixed(2).replace(".",",")+" €";
const MESES=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const fmtDate = iso => { if(!iso) return ""; const [y,m,d]=iso.slice(0,10).split("-"); return (+d)+" "+MESES[(+m||1)-1]; };
const store = {
  get(k){ try{ return JSON.parse(localStorage.getItem(k)||"null"); }catch{ return null; } },
  set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} }
};
/* imagens que ainda não foram postas na pasta "imagens" ficam escondidas */
function markMissing(i){
  i.classList.add("missing");
  if(i.id==="logo") i.closest(".brand-row")?.classList.remove("has-logo");
  if(i.id==="hero-img") $("#hero").hidden=true;
}
document.querySelectorAll("img").forEach(i=>{
  if(i.id==="hero-img"){ /* o desenho da capa: se falhar, tenta outra vez antes de esconder */
    i.addEventListener("load",()=>{ $("#hero").hidden=false; i.classList.remove("missing"); });
    i.addEventListener("error",()=>{ if(!i.dataset.retry){ i.dataset.retry="1"; setTimeout(()=>{ i.src="imagens/capa-desenho-pedro-pereira.jpg?r="+Date.now(); },800); } else markMissing(i); });
    if(i.complete && i.naturalWidth===0 && i.currentSrc){ i.dataset.retry="1"; i.src="imagens/capa-desenho-pedro-pereira.jpg?r="+Date.now(); }
    return;
  }
  if(i.complete && i.naturalWidth===0) markMissing(i);
  else i.addEventListener("error",()=>markMissing(i));
  if(i.id==="logo") i.addEventListener("load",()=>i.closest(".brand-row")?.classList.add("has-logo"));
});
if($("#logo").complete && $("#logo").naturalWidth>0) $("#logo").closest(".brand-row").classList.add("has-logo");
addEventListener("hashchange",()=>{ if(!$("#sheet").hidden) closeForm(); });
if(C.INSTAGRAM) $("#insta-link").href=C.INSTAGRAM;

/* ---------- secções ---------- */
function sectionCard(s, wide){
  const ph=s.foto?el("img",{src:fotoURL(s.foto),alt:"",class:"ph",loading:"eager"}):null;
  return el("button",{class:"sec tile"+(wide?" wide":""),type:"button",style:`--sc:var(${s.cor})`,onclick:()=>{location.hash="reservar";openSection(s.id);}},
    ph, el("span",{class:"tile-cap"}, el("b",{text:s.nome}), el("small",{text:s.curto})));
}
function renderSections(){
  CATALOG.forEach((s,i)=>{ const w=i===CATALOG.length-1; $("#home-sections").append(sectionCard(s,w)); $("#all-sections").append(sectionCard(s,w)); });
}
const gallery = list => el("div",{class:"gallery"}, ...list.map(([f,leg])=>{ const i=img(f,leg); const fig=el("figure",{}, i, el("figcaption",{text:leg})); i.addEventListener("error",()=>fig.remove()); return fig; }));
const table = rows => el("ul",{class:"contacts"}, ...rows.map(r=>el("li",{}, el("span",{text:r[0]}), el("b",{text:r[1]}))));

function extraFor(id){
  if(id==="restaurante") return el("div",{style:"display:flex;flex-direction:column;gap:10px"},
    GALERIAS.restaurante ? gallery(GALERIAS.restaurante) : null,
    el("div",{class:"card",style:"background:#EEF5EF"}, el("h3",{text:"Festas e eventos no Nazari"}),
      el("p",{text:"Organizamos aniversários, almoços e jantares de Natal, jantares temáticos e workshops, na sala ou na esplanada. Diga-nos a data, o número de pessoas e o que imagina, e preparamos uma proposta."}),
      el("button",{class:"btn",type:"button",style:"align-self:flex-start",onclick:()=>openForm("restaurante","eventos"),text:"Pedir proposta"})),
    menuCarta());
  if(id==="alma"){
    const descs = list => el("div",{style:"display:flex;flex-direction:column;gap:8px"}, ...list.map(([n,d])=>el("div",{}, el("b",{text:n}), el("p",{style:"font-size:.92rem;color:var(--muted)",text:d}))));
    const flyer = (f,alt) => el("a",{href:"imagens/"+f,target:"_blank",rel:"noopener"}, img(f,alt,{style:"width:100%;border-radius:12px;display:block"}));
    const dias=[...new Set(YOGA.map(y=>y[0]))];
    return el("div",{style:"display:flex;flex-direction:column;gap:10px"},
      (g=>{ g.style.gridTemplateColumns="1fr 1fr"; return g; })(gallery(GALERIAS.alma)),
      el("details",{class:"poi"}, el("summary",{text:"Horário semanal de yoga"}), el("div",{style:"margin-top:8px;display:flex;flex-direction:column;gap:12px"},
        ...dias.map(d=>el("div",{style:"display:flex;flex-direction:column;gap:4px"}, el("b",{text:d}),
          table(YOGA.filter(y=>y[0]===d).map(y=>[y[1]+" · "+y[2], y[3]])))),
        el("small",{class:"lead",text:"Sem aulas à quinta-feira. Horários sujeitos a alteração."}),
        flyer("alma-horario-yoga.jpg","Horário semanal de yoga do Alma Mater"))),
      el("details",{class:"poi"}, el("summary",{text:"As aulas de yoga"}), el("div",{style:"margin-top:8px"}, descs(YOGA_DESC))),
      el("details",{class:"poi"}, el("summary",{text:"Preçário das massagens"}), el("div",{style:"margin-top:8px;display:flex;flex-direction:column;gap:12px"},
        table(MASSAGENS), flyer("alma-precario-massagens.jpg","Preçário das massagens do Alma Mater"))),
      el("details",{class:"poi"}, el("summary",{text:"As massagens e terapias"}), el("div",{style:"margin-top:8px"}, descs(MASSAGEM_DESC))),
      el("ul",{class:"note",style:"margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:6px"}, ...ALMA_REGRAS.map(r=>el("li",{text:r}))));
  }
  if(id==="ser") return el("div",{style:"display:flex;flex-direction:column;gap:10px"}, gallery(GALERIAS.ser), el("p",{class:"note",text:NOTA_SER}));
  if(id==="store") return el("div",{style:"display:flex;flex-direction:column;gap:10px"}, gallery(GALERIAS.store),
    el("details",{class:"poi"}, el("summary",{text:"Pão e pastelaria: produtos e preços"}),
      el("div",{style:"margin-top:8px;display:flex;flex-direction:column;gap:12px"},
        ...PADARIAS.map(([nome,hora,lista,folheto])=>el("div",{style:"display:flex;flex-direction:column;gap:6px"},
          el("b",{text:nome}), el("small",{class:"lead",text:"Chega "+hora+"."}),
          folheto ? el("a",{href:"imagens/"+folheto,target:"_blank",rel:"noopener"}, img(folheto,"Folheto "+nome,{style:"width:100%;border-radius:12px;display:block"})) : null,
          table(lista.map(([p,v])=>[p,eur(v)])))),
        el("p",{class:"note",text:PAO_NOTA}))));
  if(id==="atividades") return ativExtra();
  return null;
}
function menuCarta(){
  const M=window.MENU; if(!M) return el("div",{class:"menu-text",text:window.MENU_NAZARI||""});
  const PEG={b:["baixa","Pegada de carbono baixa (até 999 g)"],m:["média","Pegada de carbono média (1000 a 1999 g)"],a:["alta","Pegada de carbono alta (mais de 2000 g)"]};
  const peg=g=>PEG[g]?el("span",{class:"mpeg "+g,title:PEG[g][1],text:"CO₂ "+PEG[g][0]}):null;
  const tag=t=>t==="vg"?el("span",{class:"mtag vg",title:"Vegan",text:"VG"}):t==="v"?el("span",{class:"mtag v",title:"Vegetariano",text:"V"}):null;
  const carta=el("div",{class:"carta"},
    el("div",{class:"carta-top"}, img("logo-ramo.png","",{class:"carta-ramo"}), el("div",{}, el("div",{class:"carta-titulo",text:"Nazari"}), el("div",{class:"carta-sub",text:"Restaurante · Salema Eco Camp"}))),
    el("ul",{class:"carta-horas"}, ...M.horario.map(([a,b])=>el("li",{}, el("span",{text:a}), el("b",{text:b})))),
    el("nav",{class:"carta-nav"}, ...M.seccoes.map(sc=>el("button",{type:"button",onclick:()=>document.getElementById("menu-"+sc.id).scrollIntoView({behavior:"smooth",block:"start"}),text:sc.titulo}))));
  M.seccoes.forEach(sc=>{
    const sec=el("section",{class:"carta-sec",id:"menu-"+sc.id}, el("h3",{class:"carta-h",text:sc.titulo}), sc.sub?el("div",{class:"carta-subsec",text:sc.sub}):null);
    sc.grupos.forEach(g=>{
      if(g.nome) sec.append(el("h4",{class:"carta-g",text:g.nome}));
      sec.append(el("ul",{class:"carta-lista"}, ...g.itens.map(([n,p,d,t,pg])=>el("li",{},
        el("div",{class:"carta-linha"}, el("span",{class:"carta-nome"}, n, tag(t), peg(pg)), el("span",{class:"carta-dots"}), p?el("span",{class:"carta-preco",text:p}):null),
        d?el("p",{class:"carta-desc",text:d}):null))));
    });
    carta.append(sec);
  });
  carta.append(el("p",{class:"carta-nota"}, el("span",{class:"mtag v",text:"V"})," vegetariano  ", el("span",{class:"mtag vg",text:"VG"})," vegan  ", el("span",{class:"mpeg b",text:"CO₂ baixa"})," ", el("span",{class:"mpeg m",text:"CO₂ média"})," ", el("span",{class:"mpeg a",text:"CO₂ alta"})," pegada de carbono por prato · "+M.nota));
  return carta;
}
function ativExtra(){
  const g=gallery(GALERIAS.atividades); g.style.gridTemplateColumns="1fr 1fr";
  const box=el("div",{style:"display:flex;flex-direction:column;gap:10px"}, g, el("div",{class:"eyebrow",text:"Preçário dos parceiros"}));
  OUTDOOR.forEach(([emp,sub,lista])=>{
    const ex=PARCEIRO_EXTRA[emp];
    box.append(el("details",{class:"poi"}, el("summary",{text:emp}),
      el("div",{style:"margin-top:8px;display:flex;flex-direction:column;gap:10px"},
        el("small",{class:"lead",text:sub}),
        ex ? el("div",{style:"display:flex;gap:12px;align-items:flex-start"},
              img(ex.foto,"Folheto "+emp,{style:"width:110px;border-radius:10px;flex:none"}),
              ex.site ? el("a",{href:ex.site,target:"_blank",rel:"noopener",text:ex.site.replace("https://","")}) : null) : null,
        ...lista.map(a=>el("div",{style:"display:flex;flex-direction:column;gap:2px;border-top:1px solid var(--line);padding-top:8px"},
          el("div",{style:"display:flex;justify-content:space-between;gap:10px"}, el("b",{text:a[0]}), el("b",{style:"white-space:nowrap;font-variant-numeric:tabular-nums",text:a[1]})),
          (a[2]||a[3]) ? el("small",{class:"lead",text:[a[2]?"Criança "+a[2]:"",a[3]].filter(Boolean).join(" · ")}) : null,
          a[4] ? el("small",{text:a[4]}) : null)))));
  });
  box.append(el("p",{class:"note",text:"Traga identificação, protetor solar, roupa confortável e um agasalho, mesmo no verão. Reserve no Quiosque de Atividades ou aqui."}));
  return box;
}
function contactNote(s){
  if(!s.email && !s.whatsapp) return null;
  return el("p",{class:"note"}, "Contacto: ",
    s.email ? el("a",{href:"mailto:"+s.email,text:s.email}) : null,
    s.whatsapp ? " · "+(s.whatsappNome||"WhatsApp do Quiosque de Atividades")+" "+s.whatsapp : null,
    s.telefone ? " · Telefone "+s.telefone : null,
    s.id==="alma" ? ". Massagens: no site do Salema Eco Camp." : null);
}
function openSection(id){
  try{ estat("seccao",(sec(id)||{}).nome||id); }catch(e){}
  const s=sec(id); const d=$("#reservar-detail"); d.replaceChildren();
  d.append(el("div",{class:"block",style:"display:flex;flex-direction:column;gap:16px"},
    el("button",{class:"back",type:"button",onclick:closeSection,text:"← Todas as secções"}),
    s.foto ? img(s.foto,s.nome,{class:"secphoto"}) : null,
    el("div",{class:"sechead",style:`--sc:var(${s.cor})`}, el("h1",{text:s.nome}), el("p",{class:"lead",text:s.intro})),
    extraFor(s.id),
    el("div",{class:"items"}, ...s.itens.map(it=>el("div",{class:"item"},
      (it.fotos||it.thumb) ? img((it.fotos||[it.thumb])[0],"",{class:"thumb"}) : null,
      el("div",{class:"info"}, el("b",{text:it.nome}), el("small",{text:it.desc})),
      it.link ? el("a",{class:"btn small",style:"text-decoration:none",href:it.link,target:"_blank",rel:"noopener",text:it.linkTexto||"Abrir"})
              : el("button",{class:"btn small",type:"button",onclick:()=>openForm(s.id,it.id),text:it.id==="perdidos"?"Perguntar":"Pedir"})))),
    contactNote(s)));
  $("#reservar-list").hidden=true; d.hidden=false; scrollTo(0,0);
}
function closeSection(){ $("#reservar-detail").hidden=true; $("#reservar-list").hidden=false; }

/* ---------- formulários ---------- */
function fld(id,label,type,attrs={},opts){
  let input;
  if(type==="textarea") input=el("textarea",{id,...attrs});
  else if(type==="select"){ input=el("select",{id,...attrs}); opts.forEach(o=>input.append(el("option",{value:o,text:o}))); }
  else input=el("input",{id,type,...attrs});
  return el("div",{class:"field"}, el("label",{for:id,text:label}), input);
}
function fldInscricao(){
  const f=fld("f-cliente","Nº de inscrição (se tiver)","text",{});
  f.append(el("small",{class:"hint",text:"Está no cartão do seu automóvel ou campervan"}));
  return f;
}
const FIELD = {
  data:   ()=>fld("f-data","Data","date",{required:""}),
  hora:   (it)=> it&&it.id==="shuttle"&&(window.SHUTTLE_HORAS||[]).length ? fld("f-hora","Horário","select",{required:""},SHUTTLE_HORAS) : fld("f-hora","Hora preferida","time"),
  pessoas:()=>fld("f-pessoas","Número de pessoas","number",{min:"1",max:"30",value:"2"}),
  quantidade:()=>fld("f-qtd","Quantidade","number",{min:"1",max:"50",value:"1"}),
  notas:  ()=>fld("f-notas","Notas (opcional)","textarea"),
  pedido: ()=>fld("f-pedido","O que quer?","textarea",{required:""}),
  objeto: ()=>fld("f-objeto","Que objeto perdeu e onde?","textarea",{required:""}),
  tipo:   (it)=>it.tipoOpts ? fld("f-tipo",it.tipoLabel||"Tipo","select",{},it.tipoOpts) : fld("f-tipo",it.tipoLabel||"Tipo","text"),
  tamanho:()=>fld("f-tam","Tamanho","select",{},["S","M","L","XL"]),
  destino:()=>fld("f-destino","Praia de destino","text",{placeholder:"Ex.: Praia do Zavial"}),
  telefone:()=>{ const f=fld("f-tel","Telemóvel / WhatsApp","tel",{required:"",autocomplete:"tel",inputmode:"tel",placeholder:"+351 …"}); f.append(el("small",{class:"hint",text:"Para o podermos contactar, se for preciso, e percebermos melhor o seu pedido."})); return f; },
  entrega:()=>{
    const box=el("div",{style:"display:flex;flex-direction:column;gap:14px"},
      fld("f-entrega","Como recebe?","select",{},["Levantar no restaurante","Entregar no alojamento","Entregar na minha zona do campismo"]),
      el("div",{id:"f-local-wrap",hidden:""},
        fld("f-local","Número do alojamento","text",{placeholder:"Ex.: Tenda Tipi 3, Apartamento 2"}),
        el("small",{class:"lead",id:"f-local-dica",style:"display:block;margin-top:4px",text:"O número está na porta ou na entrada do seu alojamento."})));
    const sel=box.querySelector("#f-entrega"), wrap=box.querySelector("#f-local-wrap"), inp=box.querySelector("#f-local"), lab=box.querySelector('label[for="f-local"]'), dica=box.querySelector("#f-local-dica");
    const upd=()=>{
      const v=sel.value;
      wrap.hidden = v.startsWith("Levantar");
      if(v.startsWith("Levantar")){ inp.removeAttribute("required"); return; }
      inp.setAttribute("required","");
      if(v.includes("zona")){ lab.textContent="Número da zona do campismo"; inp.placeholder="Ex.: Zona 13"; inp.inputMode="numeric"; dica.textContent="Veja o número da sua zona no mapa do parque (separador Parque)."; }
      else { lab.textContent="Número do alojamento"; inp.placeholder="Ex.: Tenda Tipi 3, Apartamento 2"; inp.inputMode="text"; dica.textContent="O número está na porta ou na entrada do seu alojamento."; }
    };
    sel.addEventListener("change",upd); upd();
    return box;
  },
  periodo:()=>el("div",{class:"pair"}, fld("f-de","Desde","date",{required:""}), fld("f-ate","Até","date")),
  paes:   ()=>el("div",{style:"display:flex;flex-direction:column;gap:12px"},
            el("p",{class:"note",text:PAO_NOTA}),
            ...PADARIAS.map(([nome,hora,lista],pi)=>el("div",{style:"display:flex;flex-direction:column;gap:6px"},
              el("b",{text:nome+" · chega "+hora}),
              ...lista.map(([p,v],i)=>el("div",{style:"display:grid;grid-template-columns:1fr auto 72px;gap:10px;align-items:center"},
                el("label",{for:"pao-"+pi+"-"+i,text:p}), el("small",{class:"lead",text:eur(v)}),
                el("input",{id:"pao-"+pi+"-"+i,type:"number",min:"0",max:"50",value:"0",inputmode:"numeric","data-pao":pi+"-"+i,style:"background:var(--surface);border:1.5px solid var(--line);border-radius:10px;padding:8px;width:100%"})))))),
  envio:  ()=>el("div",{style:"display:flex;flex-direction:column;gap:14px"},
            fld("f-envio","Entrega","select",{},["Levantar na Eco Store","Enviar por correio"]),
            fld("f-morada","Morada de envio (se for por correio)","textarea",{placeholder:"Rua, código postal, cidade, país"}))
};
const LABELS = {"f-cliente":"Nº de inscrição","f-nome":"Nome","f-tel":"Telemóvel","f-tipo":"Escolha","f-data":"Data","f-de":"Desde","f-ate":"Até","f-hora":"Hora","f-pessoas":"Pessoas","f-qtd":"Quantidade","f-tam":"Tamanho","f-destino":"Praia","f-entrega":"Entrega","f-local":"Onde entregar","f-envio":"Entrega","f-morada":"Morada","f-pedido":"Pedido","f-objeto":"Objeto","f-notas":"Notas"};

function openSheet(){ $("#sheet").hidden=false; }
function closeForm(){ $("#sheet").hidden=true; $("#req-form").onsubmit=null; $("#req-form").replaceChildren(); }
$("#sheet").addEventListener("click",e=>{ if(e.target.id==="sheet") closeForm(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && !$("#sheet").hidden) closeForm(); });
const cancelBtn = (t="Cancelar") => el("button",{class:"btn ghost",type:"button",onclick:closeForm,text:t});
function missingField(f){
  const m=[...f.querySelectorAll("[required]")].find(i=>!i.value.trim());
  if(!m) return null;
  return f.querySelector(`label[for="${m.id}"]`)?.textContent || "um campo";
}
function showMsg(text, ok){ const m=$("#f-msg"); m.className="msg "+(ok?"ok":"err"); m.textContent=text; m.hidden=false; }

/* Mostra os botões de envio (WhatsApp / email) com a mensagem pronta */
function showSend(f, titulo, texto, destinos){
  estat("pedido",titulo);
  const actions=f.querySelector(".actions");
  const row=el("div",{class:"sendrow"},
    el("p",{class:"note",text:"A mensagem está pronta. Escolha como a quer enviar; só precisa de carregar em enviar na aplicação que se abrir."}),
    ...destinos.map(d=>el("a",{class:"btn block"+(d.wa?" wa":""),href:d.href,target:"_blank",rel:"noopener",text:d.label})),
    el("button",{class:"btn ghost",type:"button",onclick:closeForm,text:"Fechar"}));
  actions.replaceWith(row);
}
function destinosFor(s, it, assunto, texto){
  const out=[];
  if(it.destino==="rececao"){
    if(C.WHATSAPP_RECECAO) out.push({wa:1,label:"Enviar por WhatsApp à receção",href:waLink(C.WHATSAPP_RECECAO,texto)});
    else out.push({label:"Ligar para a receção "+(C.TELEFONE_PARQUE||""),href:"tel:"+digits(C.TELEFONE_PARQUE)});
    return out;
  }
  if(s.whatsapp) out.push({wa:1,label:"Enviar por "+(s.whatsappNome||"WhatsApp"),href:waLink(s.whatsapp,texto)});
  if(s.email) out.push({label:"Enviar por email para "+s.email,href:mailLink(s.email,assunto,texto)});
  return out;
}

function openForm(sid,iid){
  const s=sec(sid), it=s.itens.find(i=>i.id===iid);
  const f=$("#req-form"); f.replaceChildren();
  f.append(...[
    el("div",{class:"sechead",style:`--sc:var(${s.cor})`}, el("span",{class:"eyebrow",text:s.nome}), el("h2",{text:it.nome})),
    it.fotos ? el("div",{class:"prodfotos"}, ...it.fotos.map(p=>img(p,it.nome))) : null,
    it.detalhe ? el("p",{text:it.detalhe}) : null,
    it.site ? el("a",{class:"btn ghost",style:"align-self:flex-start;text-decoration:none",href:it.site.url,target:"_blank",rel:"noopener",text:it.site.texto}) : null,
    el("div",{class:"pair"},
      fldInscricao(),
      fld("f-nome","Nome","text",{required:"",autocomplete:"name"})),
    FIELD.telefone(),
    ...it.campos.filter(c=>c!=="telefone").map(c=>FIELD[c](it)),
    el("p",{class:"note",text:it.fotos?"Isto é um pedido, não um pagamento. A Eco Store confirma consigo a disponibilidade e, se for por correio, o custo do envio.":"Isto é um pedido, não um pagamento. A equipa confirma a disponibilidade e o preço consigo."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Preparar mensagem"}))].filter(Boolean));
  const today=new Date().toISOString().slice(0,10);
  f.querySelectorAll('input[type="date"]').forEach(i=>{ if(iid!=="perdidos") i.min=today; });
  if(it.campos.includes("paes")){ const d=new Date(); d.setDate(d.getDate()+1); const t=d.toISOString().slice(0,10); const di=f.querySelector("#f-data"); di.value=t; di.min=t; f.querySelector('label[for="f-data"]').textContent="Para o dia"; }
  f.onsubmit=e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const linhas=["Olá! Pedido pelo Salema Eco Camp Magazine:", s.nome+" · "+it.nome, ""];
    f.querySelectorAll("input,select,textarea").forEach(i=>{ if(i.closest("[hidden]")) return; let v=i.value.trim(); if(i.type==="date"&&v) v=v.split("-").reverse().join("/"); if(v && LABELS[i.id]) linhas.push((i.id==="f-local" ? (f.querySelector("#f-entrega").value.includes("zona")?"Zona do campismo":"Alojamento") : LABELS[i.id])+": "+v); });
    const paes=[...f.querySelectorAll("[data-pao]")].filter(i=>(parseInt(i.value,10)||0)>0);
    if(it.campos.includes("paes")){
      if(!paes.length){ showMsg("Escolha pelo menos um produto.",false); return; }
      let total=0; linhas.push("", "Encomenda:");
      paes.forEach(i=>{ const [pi,k]=i.dataset.pao.split("-").map(Number); const [nome,,lista]=PADARIAS[pi]; const [p,v]=lista[k]; const q=parseInt(i.value,10); total+=q*v; linhas.push(q+" × "+p+" ("+nome+") · "+eur(q*v)); });
      linhas.push("Total previsto: "+eur(total));
    }
    const texto=linhas.join("\n");
    const dest=destinosFor(s,it,"Pedido Magazine: "+it.nome,texto);
    $("#f-msg").hidden=true;
    showSend(f,it.nome,texto,dest);
  };
  openSheet(); setTimeout(()=>$("#f-cliente")?.focus(),50);
}
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{ const [s,i]=b.dataset.open.split(":"); openForm(s,i); }));

/* ---------- avarias ---------- */
function openAvaria(){
  const f=$("#req-form"); f.replaceChildren();
  f.append(el("div",{class:"sechead",style:"--sc:var(--danger)"}, el("span",{class:"eyebrow",text:"Manutenção"}), el("h2",{text:"Avisar uma avaria"})),
    el("p",{class:"lead",style:"font-size:.9rem",text:"O aviso vai só para a equipa, por WhatsApp. Não aparece nos anúncios."}),
    el("div",{class:"pair"}, fldInscricao(), fld("f-nome","Nome","text",{required:""})),
    FIELD.telefone(),
    fld("a-local","Onde? (número da zona no mapa)","text",{required:"",placeholder:"Ex.: Zona 12, bloco sanitário"}),
    fld("a-desc","O que está estragado?","textarea",{required:"",placeholder:"Ex.: Autoclismo partido no 2.º WC"}),
    el("p",{class:"note",text:"Depois de abrir o WhatsApp, junte uma foto da avaria à mensagem: ajuda a equipa a resolver mais depressa."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Preparar mensagem"})));
  f.onsubmit=e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const v=id=>$("#"+id).value.trim();
    const texto=["Avaria (Salema Eco Camp Magazine)",v("f-cliente")?"Nº de inscrição: "+v("f-cliente"):null,"Nome: "+v("f-nome"),"Telemóvel: "+v("f-tel"),"Local: "+v("a-local"),"O que se passa: "+v("a-desc"),"","(foto em anexo)"].filter(x=>x!==null).join("\n");
    const d=[];
    if(C.WHATSAPP_RECECAO) d.push({wa:1,label:"Enviar à receção (WhatsApp)",href:waLink(C.WHATSAPP_RECECAO,texto)});
    if(C.WHATSAPP_MANUTENCAO) d.push({wa:1,label:"Enviar à manutenção (WhatsApp)",href:waLink(C.WHATSAPP_MANUTENCAO,texto)});
    if(!d.length) d.push({label:"Ligar para a receção "+(C.TELEFONE_PARQUE||""),href:"tel:"+digits(C.TELEFONE_PARQUE)});
    showSend(f,"Avaria",texto,d);
  };
  openSheet();
}
document.querySelectorAll("[data-avaria]").forEach(b=>b.addEventListener("click",openAvaria));

/* ---------- Eco Living ---------- */
function openEco(){
  const f=$("#req-form"); f.replaceChildren();
  f.append(el("div",{class:"sechead",style:"--sc:var(--brand)"}, el("span",{class:"eyebrow",text:"Eco Living"}), el("h2",{text:"I'd like to know more"})),
    el("div",{class:"pair"}, fld("e-nome","Name","text",{required:"",autocomplete:"name"}), fld("e-pais","Country","text",{autocomplete:"country-name"})),
    fld("e-interesse","I'm interested in","select",{},["Bringing my own tiny house","Buying a new mobile home","Not sure yet"]),
    fld("e-notas","Anything you'd like to tell us (optional)","textarea"),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn("Cancel"), el("button",{class:"btn",type:"submit",text:"Prepare message"})));
  f.onsubmit=e=>{
    e.preventDefault();
    const v=id=>$("#"+id).value.trim();
    if(!v("e-nome")){ showMsg("Please add your name.",false); return; }
    const texto=["Hello! Eco Living enquiry from the Salema Eco Camp Magazine.","Name: "+v("e-nome"),v("e-pais")?"Country: "+v("e-pais"):"","Interested in: "+v("e-interesse"),v("e-notas")?"Notes: "+v("e-notas"):""].filter(Boolean).join("\n");
    const d=[];
    if(C.ECOLIVING_WHATSAPP) d.push({wa:1,label:"Send by WhatsApp",href:waLink(C.ECOLIVING_WHATSAPP,texto)});
    if(C.ECOLIVING_EMAIL) d.push({label:"Send by email",href:mailLink(C.ECOLIVING_EMAIL,"Eco Living enquiry",texto)});
    showSend(f,"Eco Living",texto,d);
  };
  openSheet();
}
document.querySelectorAll("[data-eco]").forEach(b=>b.addEventListener("click",openEco));

/* ---------- pedido de reserva / prolongar ---------- */
function openPedidoReserva(){
  const f=$("#req-form"); f.replaceChildren();
  const hoje=new Date().toISOString().slice(0,10);
  f.append(el("div",{class:"sechead",style:"--sc:var(--brand)"}, el("span",{class:"eyebrow",text:"Alojamento"}), el("h2",{text:"Pedir reserva ou prolongar a estadia"})),
    fld("r-motivo","O que pretende","select",{},["Nova reserva","Prolongar a minha estadia atual"]),
    el("div",{class:"pair"}, fld("r-nome","Nome","text",{required:"",autocomplete:"name"}), FIELD.telefone()),
    fld("r-email","E-mail (opcional)","email",{autocomplete:"email"}),
    el("div",{class:"pair"}, fld("r-de","Chegada","date",{required:"",min:hoje}), fld("r-ate","Partida","date",{required:"",min:hoje})),
    el("div",{class:"pair"}, fld("r-adultos","Adultos","number",{min:"1",value:"2",inputmode:"numeric"}), fld("r-criancas","Crianças","number",{min:"0",value:"0",inputmode:"numeric"})),
    fld("r-tipo","Tipo de alojamento","select",{},window.TIPOS_ALOJAMENTO||["Ainda não sei"]),
    fld("r-notas","Notas (opcional)","textarea",{placeholder:"Ex.: viajamos com um cão; precisamos de eletricidade para a autocaravana"}),
    el("p",{class:"note",text:"Isto é um pedido, não uma reserva confirmada. A receção responde com a disponibilidade e o preço."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Preparar mensagem"})));
  f.onsubmit=e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const v=id=>$("#"+id).value.trim();
    if(v("r-ate")<=v("r-de")){ showMsg("A data de partida tem de ser depois da chegada.",false); return; }
    const d2=s=>s.split("-").reverse().join("/");
    const texto=["Pedido de alojamento (Salema Eco Camp Magazine)","Pedido: "+v("r-motivo"),"Nome: "+v("r-nome"),"Telemóvel: "+v("f-tel"),v("r-email")?"E-mail: "+v("r-email"):null,
      "Datas: "+d2(v("r-de"))+" a "+d2(v("r-ate")),"Pessoas: "+v("r-adultos")+" adultos"+(+v("r-criancas")?", "+v("r-criancas")+" crianças":""),"Alojamento: "+v("r-tipo"),v("r-notas")?"Notas: "+v("r-notas"):null].filter(Boolean).join("\n");
    const d=[];
    if(C.WHATSAPP_RECECAO) d.push({wa:1,label:"Enviar por WhatsApp à receção",href:waLink(C.WHATSAPP_RECECAO,texto)});
    d.push({label:"Enviar por e-mail para "+RESERVAS_EMAIL,href:mailLink(RESERVAS_EMAIL,"Pedido de alojamento",texto)});
    showSend(f,"Pedido de alojamento",texto,d);
  };
  openSheet();
}
document.querySelectorAll("[data-pedido-reserva]").forEach(b=>b.addEventListener("click",openPedidoReserva));
document.querySelectorAll("[data-reserva-link]").forEach(b=>b.addEventListener("click",()=>estat("pedido","Reserva online (Cloudbeds)")));
/* motor de reservas na língua do hóspede */
function linguaReservas(){ const l={en:"en",de:"de"}[window.I18N_LANG]||"pt-br";
  document.querySelectorAll("[data-reserva-link]").forEach(a=>{ a.href=a.href.replace(/cloudbeds\.com\/[a-z-]+\/reservation/,"cloudbeds.com/"+l+"/reservation"); }); }
linguaReservas(); document.addEventListener("lingua",linguaReservas);

/* ---------- vales-presente ---------- */
function openVale(){
  const f=$("#req-form"); f.replaceChildren();
  f.append(el("div",{class:"sechead",style:"--sc:var(--brand)"}, el("span",{class:"eyebrow",text:"Oferecer"}), el("h2",{text:"Vales-presente"})),
    fld("v-tipo","O que gostaria de oferecer","select",{},["Estadia no Salema Eco Camp","Massagem ou terapia na Alma Mater","Jantar no Restaurante Nazari","Atividade ou tour","Um valor à escolha","Ainda não sei"]),
    el("div",{class:"pair"}, fld("v-nome","O seu nome","text",{required:"",autocomplete:"name"}), FIELD.telefone()),
    fld("v-email","E-mail (opcional)","email",{autocomplete:"email"}),
    fld("v-notas","Detalhes (opcional)","textarea",{placeholder:"Ex.: para 2 pessoas, valor até 100 €, para o aniversário da minha mãe"}),
    el("p",{class:"note",text:"Enviamos-lhe as opções, os preços e como receber o vale."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Preparar mensagem"})));
  f.onsubmit=e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const v=id=>$("#"+id).value.trim();
    const texto=["Pedido de informação: vale-presente (Salema Eco Camp Magazine)","Oferecer: "+v("v-tipo"),"Nome: "+v("v-nome"),"Telemóvel: "+v("f-tel"),v("v-email")?"E-mail: "+v("v-email"):null,v("v-notas")?"Detalhes: "+v("v-notas"):null].filter(Boolean).join("\n");
    const d=[];
    if(C.WHATSAPP_RECECAO) d.push({wa:1,label:"Enviar por WhatsApp à receção",href:waLink(C.WHATSAPP_RECECAO,texto)});
    d.push({label:"Enviar por e-mail para "+VALES_EMAIL,href:mailLink(VALES_EMAIL,"Vale-presente",texto)});
    showSend(f,"Vale-presente",texto,d);
  };
  openSheet();
}
document.querySelectorAll("[data-vale]").forEach(b=>b.addEventListener("click",openVale));

/* ---------- painel de sustentabilidade ---------- */
(function(){ const box=$("#sust-nums"); const n=window.SUSTENTABILIDADE||[]; if(!box||!n.length) return;
  n.forEach(([num,lab])=>box.append(el("div",{}, el("b",{text:num}), el("span",{text:lab})))); box.hidden=false; })();
document.querySelectorAll("[data-ir]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>{ const t=document.getElementById(a.dataset.ir); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); },60)));

/* ---------- shuttle ---------- */
(function(){ const b=$("#shuttle-horas"); if(!b) return; const hs=window.SHUTTLE_HORAS||[];
  if(hs.length){ b.append(el("div",{class:"eyebrow",text:"Horários"}), el("div",{class:"chips"}, ...hs.map(h=>el("span",{class:"chip",text:h})))); }
})();
/* ---------- trilho ---------- */
const LVL={facil:"Fácil",moderado:"Moderado",dificil:"Difícil"};
STAGES.forEach(([n,km,l],i)=>$("#stages")?.append(el("li",{class:/Salema/.test(n)?"here":""}, el("span",{class:"n",text:String(i+1)}),
  el("div",{style:"min-width:0;display:flex;flex-direction:column"}, el("span",{text:n}), el("span",{class:"lvl "+l,text:LVL[l]})), el("span",{class:"km",text:km}))));
POIS.forEach(p=>$("#pois")?.append(el("li",{text:p})));

/* ---------- ligação ao programa do Google ---------- */
async function apiGet(params){
  const r=await fetch(API+"?"+new URLSearchParams(params));
  if(!r.ok) throw new Error("http "+r.status);
  return r.json();
}
async function apiPost(body){
  const r=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(body)});
  if(!r.ok) throw new Error("http "+r.status);
  return r.json();
}

/* ---------- estatísticas anónimas ---------- */
function estat(evento,detalhe){
  if(!API) return;
  try{
    const body=JSON.stringify({acao:"estat",evento,detalhe:detalhe||""});
    if(navigator.sendBeacon && navigator.sendBeacon(API,new Blob([body],{type:"text/plain;charset=utf-8"}))) return;
    fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body,keepalive:true}).catch(()=>{});
  }catch(e){}
}
try{ if(!sessionStorage.getItem("visita")){ sessionStorage.setItem("visita","1"); estat("visita",(matchMedia("(display-mode: standalone)").matches||navigator.standalone===true)?"app":"browser"); } }catch(e){}

/* ---------- novidades (bolinha e "Novo") ---------- */
const NOV_KEY="vistos-v1";
let vistos=null, novosSessao=new Set();
try{ vistos=JSON.parse(localStorage.getItem(NOV_KEY)||"null"); }catch(e){}
const primeiraVez = !vistos;
if(!vistos) vistos={a:[],e:[],n:[]};
const chaveAviso=x=>"a|"+(x.data||"")+"|"+(x.texto||"").slice(0,60);
const chaveEvento=x=>"e|"+(x.titulo||"")+"|"+(x.data||(x.datas||[])[0]||"");
const chaveAnuncio=x=>"n|"+(x.id||x.titulo||"");
function guardarVistos(){ try{ localStorage.setItem(NOV_KEY,JSON.stringify(vistos)); }catch(e){} }
function isNovo(tipo,k){ if(primeiraVez) return false; if(novosSessao.has(k)) return true; if(!vistos[tipo].includes(k)){ novosSessao.add(k); return true; } return false; }
function marcarVistos(tipo,chaves){ let mudou=false; chaves.forEach(k=>{ if(!vistos[tipo].includes(k)){ vistos[tipo].push(k); mudou=true; } }); if(vistos[tipo].length>300) vistos[tipo]=vistos[tipo].slice(-300); if(mudou) guardarVistos(); }
const novoTag=()=>el("span",{class:"novo",text:"Novo"});
function atualizarBolinhas(){
  const nInicio=[...avisosAtuais.map(chaveAviso).filter(k=>!vistos.a.includes(k)), ...eventosAtuais.map(chaveEvento).filter(k=>!vistos.e.includes(k))].length;
  const nAds=(ads||[]).map(chaveAnuncio).filter(k=>!vistos.n.includes(k)).length;
  const marca=(tab,n)=>{ const t=document.querySelector('nav.tabs a[data-tab="'+tab+'"]'); if(!t) return; let d=t.querySelector(".dot-novo"); if(n&&!primeiraVez){ if(!d){ d=el("span",{class:"dot-novo","aria-label":"Novidades"}); t.append(d);} } else if(d) d.remove(); };
  marca("inicio",nInicio); marca("anuncios",nAds);
  const total=primeiraVez?0:nInicio+nAds;
  try{ if(navigator.setAppBadge){ total?navigator.setAppBadge(total):navigator.clearAppBadge(); } }catch(e){}
}
function vistoAgora(){
  const v=(location.hash||"#inicio").slice(1);
  if(primeiraVez){ marcarVistos("a",avisosAtuais.map(chaveAviso)); marcarVistos("e",eventosAtuais.map(chaveEvento)); marcarVistos("n",(ads||[]).map(chaveAnuncio)); }
  else if(document.visibilityState==="visible"){
    if(v==="inicio"||v===""){ marcarVistos("a",avisosAtuais.map(chaveAviso)); marcarVistos("e",eventosAtuais.map(chaveEvento)); }
    if(v==="anuncios") marcarVistos("n",(ads||[]).map(chaveAnuncio));
  }
  atualizarBolinhas();
}

/* ---------- avisos e eventos ---------- */
const AVISO_LABEL={alerta:"Alerta",laranja:"Aviso",info:"Info",corte:"Corte",loja:"Eco Store"};
function renderAvisos(list){
  const box=$("#avisos"); box.replaceChildren();
  if(!list.length){ box.append(el("div",{class:"empty",text:"Sem avisos de momento."})); return; }
  const peso=x=>({alerta:2,laranja:1})[(x.tipo||"").toLowerCase()]||0;
  list=[...list].sort((a,b)=>peso(b)-peso(a));
  list.forEach(a=>{
    const t=(a.tipo||"info").toLowerCase();
    box.append(el("div",{class:"aviso"+(t==="alerta"?" alerta":"")+(t==="laranja"?" laranja":"")}, el("span",{class:"tag "+(AVISO_LABEL[t]?t:"info"),text:AVISO_LABEL[t]||"Info"}),
      el("p",{}, isNovo("a",chaveAviso(a))?el("span",{class:"novo",style:"margin-right:6px;vertical-align:1px",text:"Novo"}):null, a.setor?el("b",{text:a.setor+(t==="alerta"||t==="laranja"?"":": ")}):null, a.texto||"", a.site?el("a",{class:"aviso-link",href:a.site,target:"_blank",rel:"noopener",text:a.siteTexto||"Saber mais"}):null), el("time",{text:fmtDate(a.data)})));
  });
}
function contactoHref(c){
  if(c.wa) return "https://wa.me/"+c.wa.replace(/\D/g,"");
  if(c.tel) return "tel:"+c.tel.replace(/[^\d+]/g,"");
  return c.url||"";
}
function proximosEventos(list){
  const hoje=new Date().toISOString().slice(0,10), prox=[];
  list.forEach(e=>{
    if(e.datas){ const fut=e.datas.filter(d=>d>=hoje).sort(); if(fut.length) prox.push({...e,data:fut[0],outras:fut.slice(1)}); }
    else if((e.data||"")>=hoje) prox.push(e);
  });
  return prox.sort((a,b)=>((a.data||"")+(a.hora||"")).localeCompare((b.data||"")+(b.hora||"")));
}
function diaMes(iso,ano){ const [y,m,d]=(iso||"").split("-"); const ext=(+d||"")+" "+MESES[(+m||1)-1]; return ano&&y&&y!==new Date().toISOString().slice(0,4)?ext+" "+y:ext; }
function quandoTexto(e){
  const ds=[e.data,...(e.outras||[])].map(x=>diaMes(x,true));
  return (ds.length>1?ds.slice(0,-1).join(", ")+" e "+ds[ds.length-1]:ds[0])+(e.hora?" · "+e.hora:"");
}
function renderEventos(list){
  const box=$("#eventos"); box.replaceChildren();
  const prox=proximosEventos(list);
  if(!prox.length){ box.append(el("div",{class:"empty",text:"Sem eventos marcados. Festas, música ao vivo e workshops aparecem aqui."})); return; }
  prox.forEach(e=>{
    const [,m,d]=(e.data||"").split("-");
    const capaSrc = e.banner || e.cartaz;
    const capa = capaSrc
      ? el("img",{src:fotoURL(capaSrc),alt:(e.banner?"":"Cartaz: ")+(e.titulo||""),loading:"lazy"})
      : el("div",{class:"ev-sem"}, el("b",{text:String(+d||"")}), el("span",{text:MESES[(+m||1)-1]}));
    box.append(el("button",{class:"evcard",type:"button",onclick:()=>abrirEvento(e)},
      el("span",{class:"ev-capa"}, capa, el("span",{class:"ev-data",text:diaMes(e.data,true)}), isNovo("e",chaveEvento(e))?el("span",{class:"novo ev-novo",text:"Novo"}):null),
      el("span",{class:"ev-cap"}, el("small",{text:e.tipo||"Evento"}), el("b",{text:e.titulo||""}))));
  });
}
function abrirEvento(e){
  estat("evento",e.titulo||"");
  const f=$("#req-form"); f.replaceChildren(); f.onsubmit=ev=>ev.preventDefault();
  const c=e.contacto, href=c&&contactoHref(c);
  f.append(...[
    e.banner ? el("img",{class:"ev-banner",src:fotoURL(e.banner),alt:e.titulo||""}) : (e.cartaz ? el("a",{class:"ev-poster",href:fotoURL(e.cartaz),target:"_blank",rel:"noopener"}, el("img",{src:fotoURL(e.cartaz),alt:"Cartaz: "+(e.titulo||"")})) : null),
    el("span",{class:"pill",style:"align-self:flex-start",text:e.tipo||"Evento"}),
    el("h2",{text:e.titulo||""}),
    el("p",{class:"ev-quando",text:quandoTexto(e)+(e.local?" · "+e.local:"")}),
    e.descricao ? el("p",{text:e.descricao}) : null,
    e.preco ? el("p",{class:"ev-preco",text:e.preco}) : null,
    e.banner && e.cartaz ? el("a",{class:"ev-vercartaz",href:fotoURL(e.cartaz),target:"_blank",rel:"noopener",text:"Ver o cartaz completo"}) : null,
    el("div",{class:"actions"}, cancelBtn("Fechar"),
      href ? el("a",{class:"btn",href,target:"_blank",rel:"noopener",text:c.texto||"Reservar"}) : null)
  ].filter(Boolean));
  openSheet();
}

/* ---------- anúncios ---------- */
let ads=[], topic="todos", adsLoaded=false;
function renderTopics(){
  const t=$("#topics"); t.replaceChildren();
  TOPICS.forEach(tp=>t.append(el("button",{class:"chip",type:"button","aria-pressed":String(tp.id===topic),onclick:()=>{topic=tp.id;renderTopics();renderAds();},text:tp.nome})));
  const n=TOPICS.find(x=>x.id===topic).nota; $("#topic-note").hidden=!n; $("#topic-note").textContent=n||"";
}
function renderAds(){
  const box=$("#ads"); box.replaceChildren();
  if(!API){ box.append(el("div",{class:"empty",text:"Os anúncios ficam disponíveis em breve."})); return; }
  if(!adsLoaded){ box.append(el("div",{class:"empty",text:"A carregar anúncios…"})); return; }
  const list=ads.filter(a=>topic==="todos"||a.categoria===topic);
  if(!list.length){ box.append(el("div",{class:"empty",text:"Ainda não há anúncios aqui. Vai à praia com lugares livres no carro? Ponha o primeiro."})); return; }
  list.forEach(a=>{
    const cat=(TOPICS.find(x=>x.id===a.categoria)||{nome:"Outros"}).nome;
    const tel=digits(a.contacto);
    box.append(el("article",{class:"ad",translate:"no"},
      el("div",{class:"meta",style:"display:flex;gap:8px;flex-wrap:wrap;font-size:.8rem;color:var(--muted)"}, el("span",{class:"pill",text:cat}), isNovo("n",chaveAnuncio(a))?novoTag():null, el("span",{text:"até "+fmtDate(a.expira)})),
      el("h3",{text:a.titulo}), el("p",{style:"white-space:pre-wrap;overflow-wrap:anywhere",text:a.texto}),
      el("p",{}, el("span",{text:(a.nome||"")+" · "}), tel.length>=9 ? el("a",{class:"contact",href:"https://wa.me/"+tel,target:"_blank",rel:"noopener",text:a.contacto}) : el("span",{class:"contact",text:a.contacto}))));
  });
}
function openNewAd(){
  const f=$("#req-form"); f.replaceChildren();
  const cats=TOPICS.filter(t=>t.id!=="todos");
  const sel=el("select",{id:"n-cat"}); cats.forEach(t=>sel.append(el("option",{value:t.id,text:t.nome}))); if(topic!=="todos") sel.value=topic;
  f.append(el("h2",{text:"Pôr um anúncio"}),
    el("div",{class:"field"}, el("label",{for:"n-cat",text:"Categoria"}), sel),
    fld("n-titulo","Título","text",{required:"",maxlength:"60",placeholder:"Ex.: Boleia para o Zavial às 10h"}),
    fld("n-texto","Texto","textarea",{required:"",maxlength:"400",placeholder:"Ex.: Tenho 3 lugares no carro, volto às 17h."}),
    el("div",{class:"pair"}, fld("n-nome","Nome a mostrar","text",{required:"",maxlength:"40",placeholder:"Ex.: Ana, tenda 12"}), fld("n-contacto","Contacto (telemóvel ou WhatsApp)","tel",{required:"",maxlength:"30",placeholder:"+351 …"})),
    fld("n-dias","Fica visível durante","select",{},["1 dia","2 dias","3 dias","5 dias","7 dias"]),
    el("div",{class:"regra",text:"Só anúncios de entreajuda entre hóspedes. É proibido fazer anúncios comerciais (vender produtos ou serviços, publicidade). A equipa retira os anúncios que não cumpram esta regra."}),
    el("label",{class:"check"}, el("input",{type:"checkbox",id:"n-regra"}), el("span",{text:"Confirmo que este anúncio é de entreajuda e não é comercial."})),
    el("p",{class:"note",text:"O seu contacto fica visível para quem abrir o Magazine. Ao publicar, recebe um código para retirar o anúncio quando quiser."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Publicar"})));
  f.onsubmit=async e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    if(!$("#n-regra").checked){ showMsg("Confirme que o anúncio é de entreajuda e não é comercial.",false); return; }
    const v=id=>$("#"+id).value.trim();
    const btn=f.querySelector('button[type="submit"]'); btn.disabled=true; btn.textContent="A publicar…";
    try{
      const r=await apiPost({acao:"anuncio",categoria:sel.value,titulo:v("n-titulo"),texto:v("n-texto"),nome:v("n-nome"),contacto:v("n-contacto"),dias:parseInt(v("n-dias"),10)||1});
      if(!r.ok) throw new Error(r.erro||"erro");
      estat("anuncio",sel.value);
      const mine=store.get("meusAnuncios")||[]; mine.push({codigo:r.codigo,titulo:v("n-titulo")}); store.set("meusAnuncios",mine.slice(-10));
      f.replaceChildren(el("h2",{text:"Anúncio publicado"}),
        el("p",{text:"Guarde este código. Precisa dele para retirar o anúncio antes do tempo:"}),
        el("div",{class:"codebox",text:r.codigo}),
        el("div",{class:"actions"}, el("button",{class:"btn",type:"button",onclick:closeForm,text:"Fechar"})));
      loadDados();
    }catch(err){
      showMsg(err.message&&err.message!=="erro"&&!/http|fetch/i.test(err.message)?err.message:"Não foi possível publicar agora. Tente daqui a pouco.",false);
      btn.disabled=false; btn.textContent="Publicar";
    }
  };
  openSheet(); setTimeout(()=>$("#n-titulo").focus(),50);
}
function openRemoveAd(){
  const f=$("#req-form"); f.replaceChildren();
  const mine=store.get("meusAnuncios")||[];
  f.append(el("h2",{text:"Retirar o meu anúncio"}),
    fld("r-codigo","Código do anúncio","text",{required:"",maxlength:"8",autocapitalize:"characters",placeholder:"Ex.: K7QM"}),
    mine.length ? el("p",{class:"note",text:"Neste telemóvel: "+mine.map(m=>m.codigo+" ("+m.titulo+")").join(", ")}) : null,
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn danger",type:"submit",text:"Retirar"})));
  f.onsubmit=async e=>{
    e.preventDefault();
    const code=$("#r-codigo").value.trim().toUpperCase(); if(!code){ showMsg("Escreva o código.",false); return; }
    try{
      const r=await apiPost({acao:"retirar",codigo:code});
      if(!r.ok){ showMsg(r.erro||"Não encontrámos um anúncio ativo com esse código.",false); return; }
      store.set("meusAnuncios",(store.get("meusAnuncios")||[]).filter(m=>m.codigo!==code));
      showMsg("Anúncio retirado.",true); loadDados();
    }catch{ showMsg("Não foi possível retirar agora. Tente daqui a pouco.",false); }
  };
  openSheet();
}
$("#new-ad").addEventListener("click",()=>{ if(!API){ alertSoon(); return; } openNewAd(); });
$("#remove-ad").addEventListener("click",()=>{ if(!API){ alertSoon(); return; } openRemoveAd(); });
function alertSoon(){
  const f=$("#req-form"); f.replaceChildren(el("h2",{text:"Em breve"}), el("p",{text:"Os anúncios ainda não estão ligados. Volte daqui a uns dias."}), el("div",{class:"actions"}, el("button",{class:"btn",type:"button",onclick:closeForm,text:"Fechar"})));
  openSheet();
}

/* ---------- assistente ---------- */
const SUGESTOES=["A que horas é o pequeno-almoço?","Como vou a pé para a praia?","Quanto custa ver golfinhos?","Where can I rent a surfboard?"];
function contexto(){
  const t=[];
  t.push("SALEMA ECO CAMP: parque de campismo e glamping ecológico em Budens, Algarve (Quinta dos Carriços, Praia da Salema, 8650-196 Budens), a 1 km da Praia da Salema, no Trilho dos Pescadores da Rota Vicentina. Aberto todo o ano. Telefone "+(C.TELEFONE_PARQUE||"")+".");
  t.push("CONTACTOS: Receção/Portaria 24 horas +351 282 695 201 ou +351 926 636 033; Restaurante Nazari +351 282 030 672; Eco Store +351 968 727 036; Atividades +351 961 956 143 (só WhatsApp). EMERGÊNCIA: 112 (Número Europeu de Emergência); Linha Saúde 24 +351 808 24 24 24; Bombeiros de Vila do Bispo +351 282 639 285; GNR de Vila do Bispo +351 282 630 010. Numa emergência médica ou de segurança, diga sempre primeiro para ligar o 112.");
  t.push("ANÚNCIOS DO MAGAZINE: só anúncios de entreajuda entre hóspedes, no espírito de comunidade e de campismo (boleias, empréstimos, trocas, ajuda, playdates entre crianças com os pais presentes). É proibido fazer anúncios comerciais (vender produtos ou serviços, publicidade, angariar clientes); a equipa retira os que não cumpram. O anúncio fica visível de 1 a 7 dias, à escolha de quem o publica.");
  if(window.METEO_RESUMO) t.push(window.METEO_RESUMO);
  t.push("BANDEIRA AZUL 2026 (praias perto): Salema, Burgau, Zavial, Ingrina, Martinhal, Tonel, Cordoama, Castelejo, Praia da Luz e Arrifana. Boca do Rio, Beliche e Amado não têm Bandeira Azul em 2026.");
  t.push("SHUTTLE GRÁTIS para a Praia da Salema, para hóspedes. Reserva-se na receção por WhatsApp (+351 926 636 033), no Magazine em Parque ou na página inicial."+((window.SHUTTLE_HORAS||[]).length?" Horários (ida e volta): "+SHUTTLE_HORAS.join(", ")+".":" Os horários dá-os a receção."));
  t.push("SALEMA BASE CAMP: caminhar o Trilho dos Pescadores (5 etapas, 77,5 km, Carrapateira a Lagos) dormindo sempre no parque; o parque trata da logística (leva de manhã, vai buscar ao fim do dia). Reservas do Base Camp: reservas@salemaecocamp.com ou +351 282 695 201. Não há pedidos de transfer de etapa pelo Magazine.");
  t.push("ALOJAMENTO: reservas online em "+document.querySelector("[data-reserva-link]")?.href+" ou pedido de reserva/prolongar estadia no Magazine (Parque › Reservar alojamento), que vai para a receção e para reservas@salemaecocamp.com. Tipos: glamping (tendas Inländ, yurt, tipi, safari, dome), Eco Lodge, mobile homes T2/T3, apartamentos e estúdios, e campismo. Algumas tendas fecham de novembro a março. VALES-PRESENTE: estadias, massagens, jantares no Nazari e atividades; pedido de informação em Parque › Vales-presente. AVALIAÇÕES: Google e Booking, em Parque.");
  t.push("SUSTENTABILIDADE: parque carbono-neutro (pegada calculada todos os anos e compensada), Green Key desde 2022, a caminho do zero desperdício (separação e compostagem), ETAR própria com água para rega, pegada de carbono por prato no Nazari, departamento SER.");
  t.push("PASSAGEM PEDONAL: aberta das 7:00 às 22:00. Tem um código que muda regularmente; nunca dê o código, diga para o pedir na receção.");
  t.push("\nSECÇÕES E SERVIÇOS (reservas no separador «Reservar» do Magazine):");
  CATALOG.forEach(s=>{
    t.push("\n"+s.nome+": "+s.intro+(s.email?" Contacto: "+s.email+(s.whatsapp?", WhatsApp "+s.whatsapp:"")+".":""));
    s.itens.forEach(i=>t.push("- "+i.nome+" ("+i.desc+")"+(i.detalhe?" "+i.detalhe:"")));
  });
  t.push("\nPREÇÁRIO DAS MASSAGENS (Alma Mater):"); MASSAGENS.forEach(m=>t.push("- "+m[0]+": "+m[1]));
  t.push("\nHORÁRIO DE YOGA (sem aulas à quinta; sujeito a alteração):"); YOGA.forEach(y=>t.push("- "+y.join(" · ")));
  t.push("\nAS AULAS DE YOGA:"); YOGA_DESC.forEach(([n,d])=>t.push("- "+n+": "+d));
  t.push("\nAS MASSAGENS E TERAPIAS:"); MASSAGEM_DESC.forEach(([n,d])=>t.push("- "+n+": "+d));
  t.push("\nREGRAS DO ALMA MATER:"); ALMA_REGRAS.forEach(r=>t.push("- "+r));
  t.push("Reservas de massagens no site: "+MASSAGENS_URL+". Reservas de yoga: no Espaço de Atividades, almamater@salemaecocamp.com ou WhatsApp +351 961 956 143. Não há workshops nem cerimónias previstos de momento.");
  t.push("\nATIVIDADES COM PARCEIROS (preço adulto / criança / duração):");
  OUTDOOR.forEach(([e,sub,l])=>{ t.push(e+" ("+sub+"):"); l.forEach(a=>t.push("- "+a[0]+": "+a[1]+(a[2]?" / criança "+a[2]:"")+(a[3]?" / "+a[3]:"")+(a[4]?". "+a[4]:""))); });
  t.push("\nPÃO E PASTELARIA DA ECO STORE ("+PAO_NOTA+"):");
  PADARIAS.forEach(([n,h,l])=>t.push(n+" (chega "+h+"): "+l.map(([p,v])=>p+" "+eur(v)).join("; ")));
  t.push("\nMENU DO RESTAURANTE NAZARI:\n"+(window.MENU_NAZARI||""));
  t.push("\nTRILHO DOS PESCADORES (o parque é Base Camp e organiza transfers para o início das etapas):");
  STAGES.forEach((s,i)=>t.push("Etapa "+(i+1)+": "+s[0]+", "+s[1]+", "+LVL[s[2]]));
  t.push("Pontos de interesse: "+POIS.join("; "));
  t.push("\nAVARIAS: botão «Avisar a equipa» (vai por WhatsApp, com foto). ANÚNCIOS entre hóspedes: separador «Anúncios».");
  t.push("Contactos úteis: emergência 112; Saúde 24 808 24 24 24.");
  if(avisosAtuais.length) t.push("\nAVISOS ATUAIS:\n"+avisosAtuais.map(a=>"- "+(a.setor?a.setor+": ":"")+a.texto).join("\n"));
  if(eventosAtuais.length) t.push("\nPRÓXIMOS EVENTOS:\n"+eventosAtuais.map(e=>"- "+(e.datas?e.datas.join(", "):e.data)+(e.hora?" "+e.hora:"")+": "+e.titulo+(e.local?" ("+e.local+")":"")+(e.descricao?" — "+e.descricao:"")+(e.preco?" Preço: "+e.preco+".":"")+(e.contacto?" "+e.contacto.texto+(e.contacto.wa?" "+e.contacto.wa:""):"")).join("\n"));
  return t.join("\n");
}
async function ask(q){
  const a=$("#ask-a"); a.hidden=false;
  if(!API){ a.textContent="O assistente fica disponível em breve. Até lá, pergunte na receção."; return; }
  a.textContent="A pensar…";
  try{
    estat("pergunta");
    const r=await apiPost({acao:"perguntar",pergunta:q.slice(0,300),contexto:contexto()});
    a.textContent = r.ok ? r.resposta : (r.erro||"Não consegui responder agora. Pergunte na receção.");
  }catch{ a.textContent="Não consegui responder agora. Pergunte na receção."; }
}
$("#ask-form").addEventListener("submit",e=>{ e.preventDefault(); const q=$("#ask-q").value.trim(); if(q) ask(q); });
SUGESTOES.forEach(s=>$("#ask-sug").append(el("button",{type:"button",onclick:()=>{ $("#ask-q").value=s; ask(s); },text:s})));

/* ---------- conteúdo vindo da folha de gestão ---------- */
const precoNum = v => { const n=parseFloat(String(v).replace(/[^\d,.-]/g,"").replace(",",".")); return isNaN(n)?0:n; };
const precoTxt = v => { v=String(v||"").trim(); if(!v) return ""; return /€|consulta|grátis|gratuit/i.test(v)?v:(v+" €"); };
const grupoPor = (rows,key) => { const m=new Map(); rows.forEach(r=>{ const k=r[key]||""; if(!m.has(k)) m.set(k,[]); m.get(k).push(r); }); return m; };
let conteudoAssinatura="";
function aplicarConteudo(c){
  if(!c || typeof c!=="object") return;
  const sig=JSON.stringify(c); if(sig===conteudoAssinatura) return; conteudoAssinatura=sig;
  const store=sec("store"), alma=sec("alma"), ativ=sec("atividades");
  if(c.produtos && store){
    const fixos=store.itens.filter(i=>!i.loja||i.id==="outro");
    const outro=fixos.filter(i=>i.id==="outro"), resto=fixos.filter(i=>i.id!=="outro");
    const norm=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();
    const doSite=store.itens.filter(i=>i.loja&&i.id!=="outro");
    const subst=new Set(doSite.flatMap(i=>i.substitui||[]).map(norm));
    const prods=c.produtos.filter(r=>r.nome && !subst.has(norm(r.nome))).map((r,k)=>{
      const n=norm(r.nome), base=doSite.find(i=>n===norm(i.nome)||n.startsWith(norm(i.nome)));
      const fotosFolha=[r.foto1,r.foto2].filter(Boolean);
      const fotos = base?.fotos && (!fotosFolha.length || base.fotos.includes(fotosFolha[0])) ? base.fotos : fotosFolha;
      return {...(base||{}), id:base?.id||"p"+k, daFolha:true, loja:true, nome:r.nome,
        desc:[precoTxt(r.preco), r.resumo].filter(Boolean).join(" · "), detalhe:r.descricao||base?.detalhe||"",
        fotos, campos:base?.campos||["quantidade","envio","notas"]};
    });
    prods.forEach(p=>{ if(!p.fotos.length) delete p.fotos; });
    const usados=new Set(prods.map(p=>p.id));
    const soSite=doSite.filter(i=>!usados.has(i.id));
    store.itens=[...resto, ...prods, ...soSite, ...outro];
  }
  if(c.pao){
    window.PADARIAS=[...grupoPor(c.pao,"padaria")].filter(([n])=>n).map(([n,rows])=>[n, rows[0].chegada||"", rows.filter(r=>r.produto).map(r=>[r.produto, precoNum(r.preco)]), rows.find(r=>r.folheto)?.folheto||""]);
  }
  if(c.menu && window.MENU && c.menu.some(r=>"pegada" in r)){
    const antigos=Object.fromEntries((MENU.seccoes||[]).map(x=>[x.titulo,x]));
    MENU.seccoes=[...grupoPor(c.menu,"seccao")].filter(([t])=>t).map(([t,rows],i)=>({
      id:"s"+i, titulo:t, sub:rows.find(r=>r.subtitulo)?.subtitulo || antigos[t]?.sub || "",
      grupos:[...grupoPor(rows,"grupo")].map(([g,rs])=>({nome:g||undefined, itens:rs.filter(r=>r.prato).map(r=>[r.prato, precoTxt(r.preco), r.descricao||"", (r.tipo||"").toLowerCase(), String(r.pegada||"").toLowerCase().charAt(0)])}))}));
  }
  if(c.yoga){
    window.YOGA=c.yoga.filter(r=>r.aula).map(r=>[r.dia,r.hora,r.aula,precoTxt(r.preco)]);
    const y=alma&&alma.itens.find(i=>i.id==="yoga"); if(y) y.tipoOpts=YOGA.map(v=>v[0]+" "+v[1]+" · "+v[2]+" · "+v[3]);
  }
  if(c.massagens) window.MASSAGENS=c.massagens.filter(r=>r.nome).map(r=>[r.nome,precoTxt(r.preco)]);
  if(c.parceiros){
    window.OUTDOOR=[...grupoPor(c.parceiros,"empresa")].filter(([e])=>e).map(([e,rows])=>[e, rows.find(r=>r.sobre)?.sobre||"", rows.filter(r=>r.atividade).map(r=>[r.atividade, precoTxt(r.adulto), precoTxt(r.crianca), r.duracao||"", r.descricao||""])]);
    const t=ativ&&ativ.itens.find(i=>i.id==="tour"); if(t) t.tipoOpts=OUTDOOR.flatMap(([e,,l])=>l.map(a=>a[0]+" · "+e+(a[1]?" · "+a[1]:"")));
  }
  const aberta=document.querySelector("#reservar-detail:not([hidden]) .sechead h1");
  if(aberta && $("#sheet").hidden){ const s2=CATALOG.find(x=>x.nome===aberta.textContent); if(s2){ const y=scrollY; openSection(s2.id); scrollTo(0,y); } }
}

/* ---------- carregar dados ---------- */
let avisosAtuais=[], eventosAtuais=[];
const avisosFixos=()=>{ const h=new Date().toISOString().slice(0,10); return (window.AVISOS||[]).filter(x=>(!x.ate||x.ate>=h)&&(!x.data||x.data<=h)); };
async function loadDados(){
  eventosAtuais=[...(window.EVENTOS||[])];
  avisosAtuais=avisosFixos();
  if(!API){ renderAvisos(avisosAtuais); renderEventos(eventosAtuais); renderAds(); return; }
  try{
    const d=await apiGet({acao:"dados"});
    avisosAtuais=[...avisosFixos(),...(d.avisos||[])]; eventosAtuais=[...(window.EVENTOS||[]),...(d.eventos||[])]; ads=d.anuncios||[]; adsLoaded=true;
    try{ aplicarConteudo(d.conteudo); }catch(e){ console.warn("conteúdo da folha",e); }
    renderAvisos(avisosAtuais); renderEventos(eventosAtuais); renderAds();
    atualizarBolinhas(); setTimeout(vistoAgora,2500);
  }catch{
    if(avisosAtuais.length) renderAvisos(avisosAtuais); else $("#avisos").replaceChildren(el("div",{class:"empty",text:"Não foi possível carregar os avisos agora."}));
    renderEventos(eventosAtuais);
    adsLoaded=true; renderAds();
  }
}

/* ---------- navegação ---------- */
const VIEWS=["inicio","reservar","anuncios","parque","ecoliving"];
function route(){
  let v=(location.hash||"#inicio").slice(1); if(!VIEWS.includes(v)) v="inicio";
  VIEWS.forEach(x=>{ const n=$("#v-"+x); if(n) n.hidden=x!==v; });
  document.querySelectorAll("nav.tabs a").forEach(a=>{ if(a.dataset.tab===v) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  if(v!=="reservar") closeSection();
}
addEventListener("hashchange",()=>{ route(); scrollTo(0,0); setTimeout(vistoAgora,2500); });
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") loadDados(); });

/* ---------- notificações no telemóvel ---------- */
(async function(){
  const card=$("#push-card"); if(!card||!API) return;
  const temPush=("serviceWorker" in navigator)&&("PushManager" in window)&&("Notification" in window);
  const ua=navigator.userAgent||""; const ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
  let chave=null; try{ const r=await apiGet({acao:"vapid"}); chave=r&&r.chave; }catch(e){}
  if(!chave) return;
  const btn=$("#push-btn"), msg=$("#push-msg"), tit=$("#push-titulo");
  const estado=(t,m,b)=>{ tit.textContent=t; msg.textContent=m; if(b){ btn.hidden=false; btn.textContent=b; } else btn.hidden=true; };
  card.hidden=false;
  if(!temPush||(ios&&!standalone)){
    if(ios&&!standalone){ estado("Receber as novidades no iPhone","No iPhone, as notificações só funcionam com o Magazine instalado: no Safari toque em Partilhar › «Adicionar ao ecrã principal» (com «Abrir como app web» ligado). Depois abra o Magazine pelo ícone novo e ative aqui.",null); }
    else { card.hidden=true; }
    return;
  }
  const b64=s=>{ s=s.replace(/-/g,"+").replace(/_/g,"/"); while(s.length%4) s+="="; return Uint8Array.from(atob(s),c=>c.charCodeAt(0)); };
  const reg=await navigator.serviceWorker.ready;
  let sub=await reg.pushManager.getSubscription();
  const pp=$("#push-parque");
  const ligado=()=>{ card.hidden=true; if(pp) pp.hidden=false; };
  const desligado=()=>{ card.hidden=false; if(pp) pp.hidden=true; estado("Receber as novidades no telemóvel","Avisos do parque, eventos e a nova ementa, assim que saem.","Ativar"); };
  const off=$("#push-off");
  if(off) off.onclick=async()=>{ off.disabled=true; try{ if(sub){ try{ await apiPost({acao:"cancelar",endpoint:sub.endpoint}); }catch(e){} await sub.unsubscribe(); sub=null; } desligado(); }finally{ off.disabled=false; } };
  if(Notification.permission==="denied"){ estado("Notificações bloqueadas",ios?"Para as receber: Definições do iPhone › Notificações › Salema Eco Camp › Permitir notificações. Depois volte aqui e toque em Ativar.":"Para as receber, autorize as notificações do Magazine nas definições do telemóvel e volte a tocar em Ativar.","Ativar"); }
  if(sub&&Notification.permission==="granted"){ ligado(); try{ await apiPost({acao:"subscrever",endpoint:sub.endpoint}); }catch(e){} } else desligado();
  btn.onclick=async()=>{
    btn.disabled=true;
    try{
      {
        const p=await Notification.requestPermission();
        if(p==="denied"){ estado("Notificações bloqueadas",ios?"Para as receber: Definições do iPhone › Notificações › Salema Eco Camp › Permitir notificações. Depois volte aqui e toque em Ativar.":"Para as receber, autorize as notificações do Magazine nas definições do telemóvel e volte a tocar em Ativar.","Ativar"); return; }
        if(p!=="granted"){ estado("Receber as novidades no telemóvel","Toque em Ativar e depois em «Permitir».","Ativar"); return; }
        sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64(chave)});
        await apiPost({acao:"subscrever",endpoint:sub.endpoint});
        ligado(); estat("notificacoes");
      }
    }catch(e){ estado("Não foi possível ativar agora","Tente de novo daqui a pouco.","Tentar de novo"); }
    finally{ btn.disabled=false; }
  };
})();

renderSections(); renderTopics(); renderAds(); route(); loadDados();
setInterval(loadDados, 5*60*1000);
})();

/* ---------- guardar no telemóvel ---------- */
(function(){
  const $=s=>document.querySelector(s);
  const ua=navigator.userAgent||"";
  const isIOS=/iPhone|iPad|iPod/.test(ua) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1);
  const isAndroid=/Android/.test(ua);
  const isMobile=isIOS||isAndroid;
  const standalone=window.matchMedia("(display-mode: standalone)").matches || navigator.standalone===true;
  let deferred=null;
  const get=k=>{ try{ return localStorage.getItem(k); }catch{ return null; } };
  const set=(k,v)=>{ try{ localStorage.setItem(k,v); }catch{} };

  if(standalone){ const c=$("#install-card"); if(c) c.hidden=true; return; }

  addEventListener("beforeinstallprompt",e=>{ e.preventDefault(); deferred=e; });
  addEventListener("appinstalled",()=>{ $("#install-bar").hidden=true; set("instalado","1"); });

  const ico=(path)=>'<span class="kbd"><svg viewBox="0 0 24 24">'+path+'</svg></span>';
  const SHARE=ico('<path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>');
  const DOTS=ico('<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>');
  const PLUS=ico('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>');

  function showHelp(){
    const f=$("#req-form"); f.replaceChildren(); f.onsubmit=null;
    const h=document.createElement("h2"); h.textContent="Guardar o Magazine no telemóvel"; f.append(h);
    const p=document.createElement("p"); p.className="lead"; p.textContent="Fica com um ícone no ecrã principal e abre como uma aplicação, em ecrã inteiro."; f.append(p);
    const ol=document.createElement("ol"); ol.className="steps-install";
    let steps;
    if(isIOS) steps=[
      "Abra esta página no <b>Safari</b> (no iPhone, só o Safari permite guardar).",
      "Toque no botão <b>Partilhar</b> "+SHARE+", em baixo no ecrã.",
      "Deslize e escolha <b>Adicionar ao ecrã principal</b> "+PLUS+".",
      "Toque em <b>Adicionar</b>. O ícone Salema Magazine aparece no ecrã."];
    else if(isAndroid) steps=[
      "No <b>Chrome</b>, toque no menu "+DOTS+", no canto de cima.",
      "Escolha <b>Instalar aplicação</b> ou <b>Adicionar ao ecrã principal</b>.",
      "Confirme. O ícone Salema Magazine aparece no ecrã."];
    else steps=[
      "No telemóvel, leia o QR code da receção ou abra <b>ecomagazine.pt</b>.",
      "<b>iPhone:</b> no Safari, toque em Partilhar "+SHARE+" e depois em Adicionar ao ecrã principal.",
      "<b>Android:</b> no Chrome, toque no menu "+DOTS+" e depois em Instalar aplicação.",
      "No computador, guarde a página nos favoritos."];
    steps.forEach(t=>{ const li=document.createElement("li"); li.innerHTML=t; ol.append(li); });
    f.append(ol);
    const a=document.createElement("div"); a.className="actions";
    const close=document.createElement("button"); close.type="button"; close.className="btn"; close.textContent="Percebi";
    close.onclick=()=>{ $("#sheet").hidden=true; f.replaceChildren(); };
    a.append(close); f.append(a);
    $("#sheet").hidden=false;
  }
  async function install(){
    if(deferred){ deferred.prompt(); const r=await deferred.userChoice; deferred=null; if(r&&r.outcome==="accepted"){ $("#install-bar").hidden=true; set("instalado","1"); } return; }
    showHelp();
  }
  document.querySelectorAll("[data-install]").forEach(b=>b.addEventListener("click",install));
  $("#install-close").addEventListener("click",()=>{ $("#install-bar").hidden=true; set("installAdiado",String(Date.now())); });

  const adiado=parseInt(get("installAdiado")||"0",10);
  const semana=7*24*3600*1000;
  if(isMobile && !get("instalado") && Date.now()-adiado>semana){
    setTimeout(()=>{ if($("#sheet").hidden) $("#install-bar").hidden=false; }, 4000);
  }
})();

/* guarda as páginas para abrirem mesmo com pouca rede */
if("serviceWorker" in navigator && location.protocol==="https:"){
  addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
