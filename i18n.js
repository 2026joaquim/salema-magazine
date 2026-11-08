/* =====================================================================
   LÍNGUAS DO MAGAZINE — português, English, Deutsch
   O site está escrito em português. Em inglês ou alemão, cada frase é
   trocada pela tradução: primeiro do dicionário (i18n/en.json, de.json),
   depois da memória do telemóvel e, se faltar, o programa do Google
   traduz e guarda na folha (separador "Traducoes").
   Para não traduzir um elemento: translate="no".
   ===================================================================== */
(function(){
  const API=(window.CONFIG||{}).APPS_SCRIPT_URL||"";
  const LANGS=[["pt","PT","Português"],["en","EN","English"],["de","DE","Deutsch"]];
  const store={get(k){try{return localStorage.getItem(k);}catch(e){return null;}},set(k,v){try{localStorage.setItem(k,v);}catch(e){}}};
  const guess=()=>{ const l=(navigator.languages||[navigator.language||"pt"]).map(x=>String(x).slice(0,2).toLowerCase());
    for(const x of l){ if(x==="pt") return "pt"; if(x==="de") return "de"; if(x==="en") return "en"; } return l.length?"en":"pt"; };
  let lang=store.get("lang")||guess(); if(!LANGS.some(l=>l[0]===lang)) lang="pt";
  window.I18N_LANG=lang;

  const SKIP_TAGS=new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","CODE","SVG","PATH","TITLE"]);
  const ATTRS=["placeholder","aria-label","title","alt"];
  const UNIDADES=/\b(km\/h|km|cm|mm|kg|min|h|m|s|g|l|ml|N|NE|E|SE|S|SO|O|NO|V|VG)\b/g;
  const NAO=/^([\w.+-]+@[\w.-]+|https?:\/\/\S+|www\.\S+|null|undefined)$/i;
  const precisa=t=>{ const s=t.trim(); if(!s||s.length>1500||NAO.test(s)) return false; return /\p{L}{2,}/u.test(s.replace(UNIDADES," ")); };

  let dic={}; const pend=new Set(); let timer=null; let aplicando=false;
  const memKey=()=>"i18n-"+lang;
  function carregarMemoria(){ try{ Object.assign(dic,JSON.parse(store.get(memKey())||"{}")); }catch(e){} }
  function guardarMemoria(){ try{ const s=JSON.stringify(dic); if(s.length<1500000) store.set(memKey(),s); }catch(e){} }

  function bloqueado(el){ for(let n=el;n&&n!==document.body;n=n.parentElement){ if(n.nodeType===1&&(SKIP_TAGS.has(n.tagName)||n.getAttribute("translate")==="no")) return true; } return false; }

  function traduzTexto(node){
    let orig;
    if(node.__i18nSet!==undefined&&node.__i18nSet===node.nodeValue) orig=node.__pt; else { orig=node.nodeValue; node.__pt=orig; }
    let alvo=orig;
    if(lang!=="pt"){ const k=orig.trim(); if(precisa(k)){ if(dic[k]) alvo=orig.replace(k,dic[k]); else pend.add(k); } }
    node.__i18nSet=alvo; if(node.nodeValue!==alvo) node.nodeValue=alvo;
  }
  function traduzAttrs(el){
    if(!el.getAttribute) return;
    el.__i18nA=el.__i18nA||{};
    for(const a of ATTRS){
      if(!el.hasAttribute(a)) continue;
      const st=el.__i18nA[a]; const cur=el.getAttribute(a);
      const orig=(st&&st.set===cur)?st.pt:cur;
      let alvo=orig;
      if(lang!=="pt"){ const k=orig.trim(); if(precisa(k)){ if(dic[k]) alvo=dic[k]; else pend.add(k); } }
      el.__i18nA[a]={pt:orig,set:alvo}; if(cur!==alvo) el.setAttribute(a,alvo);
    }
  }
  function percorrer(root){
    if(!root) return;
    if(root.nodeType===3){ if(root.parentElement&&!bloqueado(root.parentElement)) traduzTexto(root); return; }
    if(root.nodeType!==1||bloqueado(root)) return;
    traduzAttrs(root);
    const w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode(n){
      if(n.nodeType===1) return (SKIP_TAGS.has(n.tagName)||n.getAttribute("translate")==="no")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_ACCEPT; }});
    let n; while((n=w.nextNode())){ if(n.nodeType===3) traduzTexto(n); else traduzAttrs(n); }
  }
  function aplicar(root){ aplicando=true; try{ percorrer(root||document.body); } finally{ aplicando=false; } agendar(); }

  function agendar(){ if(lang==="pt"||!pend.size||!API) return; clearTimeout(timer); timer=setTimeout(pedir,250); }
  let aPedir=false;
  async function pedir(){
    if(aPedir){ agendar(); return; }
    const lista=[...pend].filter(k=>!dic[k]).slice(0,80); lista.forEach(k=>pend.delete(k));
    if(!lista.length) return;
    aPedir=true;
    try{
      const r=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({acao:"traduzir",lang,textos:lista})});
      const j=await r.json();
      if(j&&j.dic){ Object.assign(dic,j.dic); guardarMemoria(); aplicar(document.body); }
    }catch(e){}
    finally{ aPedir=false; if(pend.size) agendar(); }
  }

  const obs=new MutationObserver(ms=>{
    if(aplicando||lang==="pt") return;
    aplicando=true;
    try{
      for(const m of ms){
        if(m.type==="characterData") { if(m.target.parentElement&&!bloqueado(m.target.parentElement)) traduzTexto(m.target); }
        else if(m.type==="attributes"){ if(!bloqueado(m.target)) traduzAttrs(m.target); }
        else m.addedNodes.forEach(n=>percorrer(n));
      }
    } finally{ aplicando=false; }
    agendar();
  });

  function seletor(){
    const top=document.querySelector("header.top .wrap"); if(!top||document.getElementById("lang-sel")) return;
    const box=document.createElement("div"); box.id="lang-sel"; box.className="lang-sel"; box.setAttribute("translate","no"); box.setAttribute("role","group"); box.setAttribute("aria-label","Language");
    LANGS.forEach(([c,lab,nome])=>{ const b=document.createElement("button"); b.type="button"; b.textContent=lab; b.title=nome; b.setAttribute("aria-pressed",String(c===lang));
      b.onclick=()=>mudar(c); box.append(b); });
    top.append(box);
  }
  async function mudar(c){
    if(c===lang) return;
    lang=c; window.I18N_LANG=c; store.set("lang",c); document.documentElement.lang=c;
    document.querySelectorAll("#lang-sel button").forEach(b=>b.setAttribute("aria-pressed",String(b.textContent.toLowerCase()===c)));
    dic={}; pend.clear();
    if(c!=="pt"){ carregarMemoria(); await carregarDicionario(); }
    aplicar(document.body);
    document.dispatchEvent(new CustomEvent("lingua",{detail:c}));
  }
  async function carregarDicionario(){
    try{ const r=await fetch("i18n/"+lang+".json",{cache:"no-cache"}); if(r.ok){ const d=await r.json(); dic=Object.assign({},d,dic); } }catch(e){}
    dicionarioDaFolha();
  }
  /* traduções guardadas/corrigidas na folha (separador Traducoes): chegam depois e substituem */
  async function dicionarioDaFolha(){
    if(!API) return; const l=lang;
    try{ const r=await fetch(API+"?acao=dicionario&lang="+l); const j=await r.json();
      if(l===lang&&j&&j.ok&&j.dic&&Object.keys(j.dic).length){ Object.assign(dic,j.dic); guardarMemoria(); aplicar(document.body); } }catch(e){}
  }

  async function iniciar(){
    document.documentElement.lang=lang;
    seletor();
    if(lang!=="pt"){ carregarMemoria(); await carregarDicionario(); aplicar(document.body); }
    obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",iniciar); else iniciar();
})();
