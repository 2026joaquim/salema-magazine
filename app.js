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
  const i=el("img",{src:(/^https?:/.test(src)?src:"imagens/"+src), alt:alt||"", loading:"lazy", ...attrs});
  i.addEventListener("error",()=>i.classList.add("missing"));
  return i;
};
const digits = n => (n||"").replace(/[^\d]/g,"");
const waLink = (num, text) => "https://wa.me/"+digits(num)+"?text="+encodeURIComponent(text);
const mailLink = (to, subject, body) => "mailto:"+to+"?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
const sec = id => CATALOG.find(s=>s.id===id);
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
  if(i.complete && i.naturalWidth===0) markMissing(i);
  else i.addEventListener("error",()=>markMissing(i));
  if(i.id==="logo") i.addEventListener("load",()=>i.closest(".brand-row")?.classList.add("has-logo"));
});
if($("#logo").complete && $("#logo").naturalWidth>0) $("#logo").closest(".brand-row").classList.add("has-logo");
addEventListener("hashchange",()=>{ if(!$("#sheet").hidden) closeForm(); });
if(C.INSTAGRAM) $("#insta-link").href=C.INSTAGRAM;

/* ---------- secções ---------- */
function sectionCard(s, wide){
  return el("button",{class:"sec"+(wide?" wide":""),type:"button",style:`--sc:var(${s.cor})`,onclick:()=>{location.hash="reservar";openSection(s.id);}},
    s.foto?img(s.foto,"",{class:"ph"}):el("span",{class:"dot"}), el("b",{text:s.nome}), el("small",{text:s.curto}));
}
function renderSections(){
  CATALOG.forEach((s,i)=>{ const w=i===CATALOG.length-1; $("#home-sections").append(sectionCard(s,w)); $("#all-sections").append(sectionCard(s,w)); });
}
const gallery = list => el("div",{class:"gallery"}, ...list.map(([f,leg])=>{ const i=img(f,leg); const fig=el("figure",{}, i, el("figcaption",{text:leg})); i.addEventListener("error",()=>fig.remove()); return fig; }));
const table = rows => el("ul",{class:"contacts"}, ...rows.map(r=>el("li",{}, el("span",{text:r[0]}), el("b",{text:r[1]}))));

function extraFor(id){
  if(id==="restaurante") return el("div",{style:"display:flex;flex-direction:column;gap:10px"},
    GALERIAS.restaurante ? gallery(GALERIAS.restaurante) : null,
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
  const tag=t=>t==="vg"?el("span",{class:"mtag vg",title:"Vegan",text:"VG"}):t==="v"?el("span",{class:"mtag v",title:"Vegetariano",text:"V"}):null;
  const carta=el("div",{class:"carta"},
    el("div",{class:"carta-top"}, img("logo-ramo.png","",{class:"carta-ramo"}), el("div",{}, el("div",{class:"carta-titulo",text:"Nazari"}), el("div",{class:"carta-sub",text:"Restaurante · Salema Eco Camp"}))),
    el("ul",{class:"carta-horas"}, ...M.horario.map(([a,b])=>el("li",{}, el("span",{text:a}), el("b",{text:b})))),
    el("nav",{class:"carta-nav"}, ...M.seccoes.map(sc=>el("button",{type:"button",onclick:()=>document.getElementById("menu-"+sc.id).scrollIntoView({behavior:"smooth",block:"start"}),text:sc.titulo}))));
  M.seccoes.forEach(sc=>{
    const sec=el("section",{class:"carta-sec",id:"menu-"+sc.id}, el("h3",{class:"carta-h",text:sc.titulo}), sc.sub?el("div",{class:"carta-subsec",text:sc.sub}):null);
    sc.grupos.forEach(g=>{
      if(g.nome) sec.append(el("h4",{class:"carta-g",text:g.nome}));
      sec.append(el("ul",{class:"carta-lista"}, ...g.itens.map(([n,p,d,t])=>el("li",{},
        el("div",{class:"carta-linha"}, el("span",{class:"carta-nome"}, n, tag(t)), el("span",{class:"carta-dots"}), p?el("span",{class:"carta-preco",text:p}):null),
        d?el("p",{class:"carta-desc",text:d}):null))));
    });
    carta.append(sec);
  });
  carta.append(el("p",{class:"carta-nota"}, el("span",{class:"mtag v",text:"V"})," vegetariano  ", el("span",{class:"mtag vg",text:"VG"})," vegan · "+M.nota));
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
    s.id==="alma" ? ". Massagens: no site do Salema Eco Camp." : null);
}
function openSection(id){
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
const FIELD = {
  data:   ()=>fld("f-data","Data","date",{required:""}),
  hora:   ()=>fld("f-hora","Hora preferida","time"),
  pessoas:()=>fld("f-pessoas","Número de pessoas","number",{min:"1",max:"30",value:"2"}),
  quantidade:()=>fld("f-qtd","Quantidade","number",{min:"1",max:"50",value:"1"}),
  notas:  ()=>fld("f-notas","Notas (opcional)","textarea"),
  pedido: ()=>fld("f-pedido","O que quer?","textarea",{required:""}),
  objeto: ()=>fld("f-objeto","Que objeto perdeu e onde?","textarea",{required:""}),
  tipo:   (it)=>it.tipoOpts ? fld("f-tipo",it.tipoLabel||"Tipo","select",{},it.tipoOpts) : fld("f-tipo",it.tipoLabel||"Tipo","text"),
  tamanho:()=>fld("f-tam","Tamanho","select",{},["S","M","L","XL"]),
  destino:()=>fld("f-destino","Praia de destino","text",{placeholder:"Ex.: Praia do Zavial"}),
  telefone:()=>fld("f-tel","Telemóvel / WhatsApp","tel",{required:"",autocomplete:"tel",inputmode:"tel",placeholder:"+351 …"}),
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
const LABELS = {"f-cliente":"Nº de cliente","f-nome":"Nome","f-tel":"Telemóvel","f-tipo":"Escolha","f-data":"Data","f-de":"Desde","f-ate":"Até","f-hora":"Hora","f-pessoas":"Pessoas","f-qtd":"Quantidade","f-tam":"Tamanho","f-destino":"Praia","f-entrega":"Entrega","f-local":"Onde entregar","f-envio":"Entrega","f-morada":"Morada","f-pedido":"Pedido","f-objeto":"Objeto","f-notas":"Notas"};

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
  const clienteReq = !it.loja;
  f.append(...[
    el("div",{class:"sechead",style:`--sc:var(${s.cor})`}, el("span",{class:"eyebrow",text:s.nome}), el("h2",{text:it.nome})),
    it.fotos ? el("div",{class:"prodfotos"}, ...it.fotos.map(p=>img(p,it.nome))) : null,
    it.detalhe ? el("p",{text:it.detalhe}) : null,
    el("div",{class:"pair"},
      fld("f-cliente","Nº de cliente"+(clienteReq?"":" (se tiver)"),"text",clienteReq?{required:"",inputmode:"numeric",placeholder:"Ex.: 10482"}:{inputmode:"numeric"}),
      fld("f-nome","Nome","text",{required:"",autocomplete:"name"})),
    ...it.campos.map(c=>FIELD[c](it)),
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
    el("div",{class:"pair"}, fld("f-cliente","Nº de cliente","text",{required:"",inputmode:"numeric"}), fld("f-nome","Nome","text",{required:""})),
    fld("a-local","Onde? (número da zona no mapa)","text",{required:"",placeholder:"Ex.: Zona 12, bloco sanitário"}),
    fld("a-desc","O que está estragado?","textarea",{required:"",placeholder:"Ex.: Autoclismo partido no 2.º WC"}),
    el("p",{class:"note",text:"Depois de abrir o WhatsApp, junte uma foto da avaria à mensagem: ajuda a equipa a resolver mais depressa."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Preparar mensagem"})));
  f.onsubmit=e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const v=id=>$("#"+id).value.trim();
    const texto=["Avaria (Salema Eco Camp Magazine)","Nº de cliente: "+v("f-cliente"),"Nome: "+v("f-nome"),"Local: "+v("a-local"),"O que se passa: "+v("a-desc"),"","(foto em anexo)"].join("\n");
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
    fld("e-interesse","I'm interested in","select",{},["A new mobile home","Bringing my tiny house","Both / not sure yet"]),
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

/* ---------- avisos e eventos ---------- */
const AVISO_LABEL={info:"Info",corte:"Corte",loja:"Eco Store"};
function renderAvisos(list){
  const box=$("#avisos"); box.replaceChildren();
  if(!list.length){ box.append(el("div",{class:"empty",text:"Sem avisos de momento."})); return; }
  list.forEach(a=>{
    const t=(a.tipo||"info").toLowerCase();
    box.append(el("div",{class:"aviso"}, el("span",{class:"tag "+(AVISO_LABEL[t]?t:"info"),text:AVISO_LABEL[t]||"Info"}),
      el("p",{}, a.setor?el("b",{text:a.setor+": "}):null, a.texto||""), el("time",{text:fmtDate(a.data)})));
  });
}
function renderEventos(list){
  const box=$("#eventos"); box.replaceChildren();
  const hoje=new Date().toISOString().slice(0,10);
  const prox=list.filter(e=>(e.data||"")>=hoje).sort((a,b)=>((a.data||"")+(a.hora||"")).localeCompare((b.data||"")+(b.hora||"")));
  if(!prox.length){ box.append(el("div",{class:"empty",text:"Sem eventos marcados. Festas, música ao vivo e workshops aparecem aqui."})); return; }
  prox.forEach(e=>{
    const [y,m,d]=(e.data||"").split("-");
    box.append(el("article",{class:"event"},
      el("div",{class:"date"}, el("b",{text:String(+d||"")}), el("span",{text:MESES[(+m||1)-1]})),
      el("div",{class:"body"}, el("span",{class:"pill",style:"align-self:flex-start",text:e.tipo||"Evento"}), el("b",{text:e.titulo||""}),
        el("small",{text:[e.hora,e.local].filter(Boolean).join(" · ")}), e.descricao?el("p",{text:e.descricao}):null)));
  });
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
    box.append(el("article",{class:"ad"},
      el("div",{class:"meta",style:"display:flex;gap:8px;flex-wrap:wrap;font-size:.8rem;color:var(--muted)"}, el("span",{class:"pill",text:cat}), el("span",{text:"até "+fmtDate(a.expira)})),
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
    el("p",{class:"note",text:"O seu contacto fica visível para quem abrir o Magazine. Ao publicar, recebe um código para retirar o anúncio quando quiser."}),
    el("div",{class:"msg",id:"f-msg",hidden:""}),
    el("div",{class:"actions"}, cancelBtn(), el("button",{class:"btn",type:"submit",text:"Publicar"})));
  f.onsubmit=async e=>{
    e.preventDefault();
    const miss=missingField(f); if(miss){ showMsg("Falta preencher: "+miss+".",false); return; }
    const v=id=>$("#"+id).value.trim();
    const btn=f.querySelector('button[type="submit"]'); btn.disabled=true; btn.textContent="A publicar…";
    try{
      const r=await apiPost({acao:"anuncio",categoria:sel.value,titulo:v("n-titulo"),texto:v("n-texto"),nome:v("n-nome"),contacto:v("n-contacto"),dias:parseInt(v("n-dias"),10)||1});
      if(!r.ok) throw new Error(r.erro||"erro");
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
  if(eventosAtuais.length) t.push("\nPRÓXIMOS EVENTOS:\n"+eventosAtuais.map(e=>"- "+e.data+(e.hora?" "+e.hora:"")+": "+e.titulo+(e.local?" ("+e.local+")":"")+(e.descricao?" — "+e.descricao:"")).join("\n"));
  return t.join("\n");
}
async function ask(q){
  const a=$("#ask-a"); a.hidden=false;
  if(!API){ a.textContent="O assistente fica disponível em breve. Até lá, pergunte na receção."; return; }
  a.textContent="A pensar…";
  try{
    const r=await apiPost({acao:"perguntar",pergunta:q.slice(0,300),contexto:contexto()});
    a.textContent = r.ok ? r.resposta : (r.erro||"Não consegui responder agora. Pergunte na receção.");
  }catch{ a.textContent="Não consegui responder agora. Pergunte na receção."; }
}
$("#ask-form").addEventListener("submit",e=>{ e.preventDefault(); const q=$("#ask-q").value.trim(); if(q) ask(q); });
SUGESTOES.forEach(s=>$("#ask-sug").append(el("button",{type:"button",onclick:()=>{ $("#ask-q").value=s; ask(s); },text:s})));

/* ---------- carregar dados ---------- */
let avisosAtuais=[], eventosAtuais=[];
async function loadDados(){
  if(!API){ renderAvisos([]); renderEventos([]); renderAds(); return; }
  try{
    const d=await apiGet({acao:"dados"});
    avisosAtuais=d.avisos||[]; eventosAtuais=d.eventos||[]; ads=d.anuncios||[]; adsLoaded=true;
    renderAvisos(avisosAtuais); renderEventos(eventosAtuais); renderAds();
  }catch{
    $("#avisos").replaceChildren(el("div",{class:"empty",text:"Não foi possível carregar os avisos agora."}));
    $("#eventos").replaceChildren(el("div",{class:"empty",text:"Não foi possível carregar os eventos agora."}));
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
addEventListener("hashchange",()=>{ route(); scrollTo(0,0); });

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
