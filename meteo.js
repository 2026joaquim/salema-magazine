/* =====================================================================
   TEMPO, MAR E SURF — previsão automática (Open-Meteo, gratuito, sem chave)
   Praias: lat/lon aproximadas e "virada" = para onde a praia olha (graus).
   ===================================================================== */
(function(){
const PRAIAS=[
  {nome:"Salema",            lat:37.0647, lon:-8.8236, virada:165, costa:"Costa sul", aqui:true},
  {nome:"Boca do Rio",       lat:37.0655, lon:-8.8106, virada:180, costa:"Costa sul"},
  {nome:"Burgau",            lat:37.0710, lon:-8.7740, virada:170, costa:"Costa sul"},
  {nome:"Praia da Luz",      lat:37.0855, lon:-8.7290, virada:180, costa:"Costa sul"},
  {nome:"Zavial",            lat:37.0510, lon:-8.8730, virada:200, costa:"Costa sul"},
  {nome:"Ingrina",           lat:37.0480, lon:-8.8800, virada:180, costa:"Costa sul"},
  {nome:"Martinhal",         lat:37.0190, lon:-8.9255, virada:140, costa:"Sagres"},
  {nome:"Tonel",             lat:37.0040, lon:-8.9440, virada:225, costa:"Sagres"},
  {nome:"Beliche",           lat:37.0275, lon:-8.9690, virada:240, costa:"Sagres"},
  {nome:"Cordoama",          lat:37.1080, lon:-8.9440, virada:275, costa:"Costa oeste"},
  {nome:"Castelejo",         lat:37.0990, lon:-8.9460, virada:270, costa:"Costa oeste"},
  {nome:"Amado",             lat:37.1680, lon:-8.9030, virada:280, costa:"Costa oeste"},
  {nome:"Arrifana",          lat:37.2940, lon:-8.8660, virada:290, costa:"Costa oeste"}
];
const DIAS=5, CHAVE="meteo-v1", VALIDADE=60*60*1000;
const SEMANA=["dom","seg","ter","qua","qui","sex","sáb"];
const ROTULO=["Plano","Fraco","Razoável","Bom","Muito bom","Excelente"];
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
const box=document.getElementById("meteo");
if(!box) return;

function tempo(c){
  if(c===0) return ["☀️","Céu limpo"];
  if(c<=2) return ["🌤️","Pouco nublado"];
  if(c===3) return ["☁️","Nublado"];
  if(c===45||c===48) return ["🌫️","Nevoeiro"];
  if(c>=51&&c<=57) return ["🌦️","Chuviscos"];
  if(c>=61&&c<=67) return ["🌧️","Chuva"];
  if(c>=71&&c<=77) return ["❄️","Neve"];
  if(c>=80&&c<=82) return ["🌦️","Aguaceiros"];
  if(c>=95) return ["⛈️","Trovoada"];
  return ["🌤️",""];
}
const PONTOS=["N","NE","E","SE","S","SO","O","NO"];
const rumo=g=>PONTOS[Math.round(((g%360)+360)%360/45)%8];
const dif=(a,b)=>{const d=Math.abs(((a-b)%360+360)%360); return d>180?360-d:d;};
const r1=n=>(Math.round(n*10)/10).toFixed(1).replace(".",",");
const hhmm=s=>String(s||"").slice(11,16);
const media=a=>{const v=a.filter(x=>x!=null&&!isNaN(x)); return v.length?v.reduce((p,c)=>p+c,0)/v.length:null;};

/* nota de surf de 0 a 5 para uma praia num dia (média das 7h às 13h) */
function nota(p,mar,vento,dia){
  const idx=[]; mar.hourly.time.forEach((t,i)=>{ if(t.slice(0,10)===dia){ const h=+t.slice(11,13); if(h>=7&&h<=13) idx.push(i);} });
  if(!idx.length) return null;
  const H=media(idx.map(i=>mar.hourly.swell_wave_height[i] ?? mar.hourly.wave_height[i]));
  const T=media(idx.map(i=>mar.hourly.swell_wave_period[i]));
  const D=media(idx.map(i=>mar.hourly.swell_wave_direction[i]));
  const V=media(idx.map(i=>vento.hourly.wind_speed_10m[i]));
  const VD=media(idx.map(i=>vento.hourly.wind_direction_10m[i]));
  if(H==null) return null;
  const ang=D==null?90:dif(D,p.virada);
  const expo= ang<=45?1 : ang<=75?0.65 : ang<=100?0.35 : 0.12;
  const h=H*expo;
  let s= h<0.3?0 : h<0.6?1 : h<1.0?2 : h<2.0?3 : h<3.0?2 : 1;
  if(s>0){
    if(T!=null){ if(T>=11) s+=1; else if(T<7) s-=1; }
    let tipoVento="cruzado";
    if(V!=null&&VD!=null){
      const off=dif(VD,(p.virada+180)%360)<=60, on=dif(VD,p.virada)<=60;
      tipoVento= off?"terral (offshore)":on?"do mar (onshore)":"cruzado";
      if(V<10){ s+=1; tipoVento="pouco vento"; }
      else if(off&&V<30) s+=1;
      else if(on&&V>=15) s-= V>=25?2:1;
    }
    s=Math.max(1,Math.min(5,Math.round(s)));
    return {s, h, T, V, tipoVento};
  }
  return {s:0, h, T, V, tipoVento:""};
}

/* marés: máximos e mínimos locais do nível do mar em Salema */
function mares(mar,dia){
  const t=mar.hourly.time, z=mar.hourly.sea_level_height_msl||[]; const alta=[],baixa=[];
  for(let i=1;i<t.length-1;i++){
    if(t[i].slice(0,10)!==dia||z[i]==null||z[i-1]==null||z[i+1]==null) continue;
    if(z[i]>z[i-1]&&z[i]>=z[i+1]) alta.push(hhmm(t[i]));
    if(z[i]<z[i-1]&&z[i]<=z[i+1]) baixa.push(hhmm(t[i]));
  }
  return {alta,baixa};
}

function estrelas(s){ return el("span",{class:"stars","aria-label":ROTULO[s]+" ("+s+" de 5)"}, "★".repeat(s)+"☆".repeat(5-s)); }

let estado=null, diaSel=0, todas=false;
function desenhar(){
  const {prev,mar}=estado; const L=prev[0], M=mar[0];
  const hoje=L.daily.time[0];
  const [ic,txt]=tempo(L.current?.weather_code ?? L.daily.weather_code[0]);
  const agua=media(M.hourly.time.map((t,i)=>t.slice(0,10)===hoje?M.hourly.sea_surface_temperature[i]:null));
  const ma=mares(M,hoje);
  box.replaceChildren();

  /* hoje */
  box.append(el("div",{class:"mt-hoje"},
    el("div",{class:"mt-agora"}, el("span",{class:"mt-ic",text:ic}),
      el("div",{}, el("b",{class:"mt-temp",text:Math.round(L.current?.temperature_2m ?? L.daily.temperature_2m_max[0])+"°"}),
        el("span",{text:txt+" · máx. "+Math.round(L.daily.temperature_2m_max[0])+"° / mín. "+Math.round(L.daily.temperature_2m_min[0])+"°"}))),
    el("ul",{class:"mt-dados"},
      el("li",{}, el("small",{text:"Vento"}), el("b",{text:Math.round(L.current?.wind_speed_10m ?? L.daily.wind_speed_10m_max[0])+" km/h "+rumo(L.current?.wind_direction_10m ?? L.daily.wind_direction_10m_dominant[0])})),
      el("li",{}, el("small",{text:"Chuva"}), el("b",{text:(L.daily.precipitation_probability_max[0]??0)+" %"})),
      agua!=null?el("li",{}, el("small",{text:"Água do mar"}), el("b",{text:Math.round(agua)+"°"})):null,
      el("li",{}, el("small",{text:"Índice UV"}), el("b",{text:String(Math.round(L.daily.uv_index_max[0]??0))})),
      el("li",{}, el("small",{text:"Nascer do sol"}), el("b",{text:hhmm(L.daily.sunrise[0])})),
      el("li",{}, el("small",{text:"Pôr do sol"}), el("b",{text:hhmm(L.daily.sunset[0])}))),
    (ma.alta.length||ma.baixa.length)?el("p",{class:"mt-mares"},
      el("b",{text:"Marés de hoje "}), "Preia-mar "+(ma.alta.join(" e ")||"–")+" · Baixa-mar "+(ma.baixa.join(" e ")||"–")+" (aprox.)"):null));

  /* próximos dias */
  box.append(el("div",{class:"mt-dias"}, ...L.daily.time.map((d,i)=>{ const [ic2]=tempo(L.daily.weather_code[i]); const dt=new Date(d+"T12:00");
    return el("div",{class:"mt-dia"}, el("small",{text:i===0?"Hoje":SEMANA[dt.getDay()]}), el("span",{class:"mt-ic2",text:ic2}),
      el("b",{text:Math.round(L.daily.temperature_2m_max[i])+"°"}), el("small",{text:Math.round(L.daily.temperature_2m_min[i])+"° · "+(L.daily.precipitation_probability_max[i]??0)+"%"})); })));

  /* surf */
  const dias=M.hourly.time.filter((t,i,a)=>t.endsWith("T00:00")).map(t=>t.slice(0,10)).slice(0,DIAS);
  const dia=dias[diaSel]||dias[0];
  const lista=PRAIAS.map((p,i)=>({p, n: prev[i]&&mar[i]?nota(p,mar[i],prev[i],dia):null})).filter(x=>x.n);
  lista.sort((a,b)=>b.n.s-a.n.s || (b.p.aqui?1:0)-(a.p.aqui?1:0));
  box.append(el("div",{class:"mt-surf"},
    el("div",{class:"row"}, el("h3",{text:"Surf nas praias da zona"})),
    el("div",{class:"chips mt-chips",role:"group","aria-label":"Dia"}, ...dias.map((d,i)=>{ const dt=new Date(d+"T12:00");
      return el("button",{class:"chip",type:"button","aria-pressed":String(i===diaSel),onclick:()=>{diaSel=i;desenhar();},text:i===0?"Hoje":i===1?"Amanhã":SEMANA[dt.getDay()]+" "+dt.getDate()}); })),
    el("ol",{class:"mt-praias"}, ...(todas?lista:lista.slice(0,6)).map(({p,n})=>el("li",{class:p.aqui?"aqui":""},
      el("div",{class:"mt-pnome"}, el("b",{text:p.nome+(p.aqui?" · aqui":"")}), el("small",{text:p.costa})),
      el("div",{class:"mt-pnota"}, estrelas(n.s), el("small",{text:ROTULO[n.s]})),
      el("small",{class:"mt-pdet",text: n.s===0?"Mar sem ondas para surf": r1(n.h)+" m"+(n.T?" · "+Math.round(n.T)+" s":"")+(n.tipoVento?" · vento "+n.tipoVento:"")})))),
    lista.length>6 ? el("button",{class:"btn ghost small",type:"button",style:"align-self:flex-start",onclick:()=>{todas=!todas;desenhar();},text:todas?"Mostrar menos":"Ver as "+lista.length+" praias"}) : null,
    el("p",{class:"note",text:"Previsão automática e aproximada, para a manhã (7h–13h). Antes de entrar na água, veja as condições no local e respeite as bandeiras e o nadador-salvador. Aulas de surf com a Surf Planet: Reservar › Atividades."})));

  /* resumo para a assistente */
  try{
    const resumo=["PREVISÃO (Open-Meteo, Salema): hoje "+txt.toLowerCase()+", máx. "+Math.round(L.daily.temperature_2m_max[0])+"°, mín. "+Math.round(L.daily.temperature_2m_min[0])+"°, chuva "+(L.daily.precipitation_probability_max[0]??0)+"%, nascer "+hhmm(L.daily.sunrise[0])+", pôr do sol "+hhmm(L.daily.sunset[0])+(agua!=null?", água "+Math.round(agua)+"°":"")+". Marés hoje (aprox.): preia-mar "+(ma.alta.join(" e ")||"–")+", baixa-mar "+(ma.baixa.join(" e ")||"–")+".",
      "Próximos dias: "+L.daily.time.map((d,i)=>d+" "+tempo(L.daily.weather_code[i])[1].toLowerCase()+" "+Math.round(L.daily.temperature_2m_min[i])+"–"+Math.round(L.daily.temperature_2m_max[i])+"°").join("; ")+".",
      "Surf hoje (0–5): "+PRAIAS.map((p,i)=>{const n=prev[i]&&mar[i]?nota(p,mar[i],prev[i],dias[0]):null; return n?p.nome+" "+n.s:null;}).filter(Boolean).join(", ")+". É uma estimativa automática; aconselhe sempre a ver as condições no local."];
    window.METEO_RESUMO=resumo.join("\n");
  }catch(e){}
}

async function carregar(){
  try{ const c=JSON.parse(localStorage.getItem(CHAVE)||"null"); if(c&&Date.now()-c.t<VALIDADE){ estado=c.d; desenhar(); return; } }catch(e){}
  const lat=PRAIAS.map(p=>p.lat).join(","), lon=PRAIAS.map(p=>p.lon).join(",");
  const u1="https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,uv_index_max&timezone=Europe%2FLisbon&forecast_days="+DIAS;
  const u2="https://marine-api.open-meteo.com/v1/marine?latitude="+lat+"&longitude="+lon+"&hourly=wave_height,swell_wave_height,swell_wave_period,swell_wave_direction,sea_surface_temperature,sea_level_height_msl&timezone=Europe%2FLisbon&forecast_days="+DIAS;
  try{
    const [a,b]=await Promise.all([fetch(u1).then(r=>{if(!r.ok) throw 0; return r.json();}), fetch(u2).then(r=>{if(!r.ok) throw 0; return r.json();})]);
    estado={prev:Array.isArray(a)?a:[a], mar:Array.isArray(b)?b:[b]};
    try{ localStorage.setItem(CHAVE,JSON.stringify({t:Date.now(),d:estado})); }catch(e){}
    desenhar();
  }catch(e){
    box.replaceChildren(el("div",{class:"empty",text:"Não foi possível carregar a previsão agora. Tente daqui a pouco."}));
  }
}
carregar();
})();
