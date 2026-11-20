/* Moinho (Nine Men's Morris) — regras e computador.
   Funciona no telemóvel (variável global MoinhoLogica) e em Node (para testes).
   Pontos 0..23: 3 quadrados (0-7 exterior, 8-15 meio, 16-23 interior).
   Em cada quadrado: 0 canto sup. esq., 1 meio de cima, 2 canto sup. dir., 3 meio dir.,
   4 canto inf. dir., 5 meio de baixo, 6 canto inf. esq., 7 meio esq. */
(function(root){
  const P1=1, P2=2;
  const ADJ=Array.from({length:24},()=>[]);
  const lig=(a,b)=>{ ADJ[a].push(b); ADJ[b].push(a); };
  for(let r=0;r<3;r++) for(let k=0;k<8;k++) lig(r*8+k, r*8+(k+1)%8);
  for(let r=0;r<2;r++) for(const k of [1,3,5,7]) lig(r*8+k,(r+1)*8+k);
  const MOINHOS=[];
  for(let r=0;r<3;r++) for(const s of [0,2,4,6]) MOINHOS.push([r*8+s, r*8+s+1, r*8+(s+2)%8]);
  for(const k of [1,3,5,7]) MOINHOS.push([k,8+k,16+k]);
  const MP=Array.from({length:24},(_,i)=>MOINHOS.filter(m=>m.includes(i)));

  const outra=p=>p===P1?P2:P1;
  const contar=(t,p)=>{ let n=0; for(let i=0;i<24;i++) if(t[i]===p) n++; return n; };
  const total=(s,p)=>contar(s.t,p)+s.por[p];

  function novo(){ return {t:Array(24).fill(0), vez:P1, por:[0,9,9], sem:0}; }
  function fase(s,p){ return s.por[p]>0?"colocar":(contar(s.t,p)===3?"voar":"mover"); }
  const formaMoinho=(t,i,p)=>MP[i].some(m=>m.every(j=>t[j]===p));
  function removiveis(t,adv){
    const todas=[]; for(let i=0;i<24;i++) if(t[i]===adv) todas.push(i);
    const livres=todas.filter(i=>!formaMoinho(t,i,adv));
    return livres.length?livres:todas;
  }
  /* jogadas sem a captura: {de:-1 se for colocar, para} */
  function base(s){
    const p=s.vez, f=fase(s,p), t=s.t, out=[];
    if(f==="colocar"){ for(let i=0;i<24;i++) if(!t[i]) out.push({de:-1,para:i}); return out; }
    for(let i=0;i<24;i++) if(t[i]===p){
      if(f==="voar"){ for(let j=0;j<24;j++) if(!t[j]) out.push({de:i,para:j}); }
      else for(const j of ADJ[i]) if(!t[j]) out.push({de:i,para:j});
    }
    return out;
  }
  /* jogada completa, com a peça a tirar (tira=-1 se não houver moinho) */
  function aplicar(s,j){
    const p=s.vez, t=s.t.slice();
    if(j.de>=0) t[j.de]=0;
    t[j.para]=p;
    const por=s.por.slice(); if(j.de<0) por[p]--;
    let sem=s.sem+1;
    if(j.tira>=0){ t[j.tira]=0; sem=0; }
    if(j.de<0) sem=0;
    return {t,vez:outra(p),por,sem};
  }
  function jogadas(s){
    const p=s.vez, adv=outra(p), out=[];
    for(const b of base(s)){
      const t2=s.t.slice(); if(b.de>=0) t2[b.de]=0; t2[b.para]=p;
      if(formaMoinho(t2,b.para,p)){ for(const x of removiveis(t2,adv)) out.push({de:b.de,para:b.para,tira:x}); }
      else out.push({de:b.de,para:b.para,tira:-1});
    }
    return out;
  }
  /* vez de s.vez jogar: devolve {acabou, venc} (venc 0 = empate) */
  function fim(s){
    const p=s.vez;
    if(total(s,p)<3) return {acabou:true,venc:outra(p)};
    if(s.sem>=60) return {acabou:true,venc:0};
    if(!base(s).length) return {acabou:true,venc:outra(p)};
    return {acabou:false};
  }

  /* ---------- computador ---------- */
  function avaliar(s,p){
    const adv=outra(p), t=s.t;
    let v=(total(s,p)-total(s,adv))*100;
    let dois=0;
    for(const m of MOINHOS){
      let a=0,b=0,z=0; for(const i of m){ if(t[i]===p) a++; else if(t[i]===adv) b++; else z++; }
      if(a===2&&z===1) dois+=4; if(b===2&&z===1) dois-=4;
      if(a===3) dois+=3; if(b===3) dois-=3;
    }
    v+=dois;
    let mp=0, ma=0; for(let i=0;i<24;i++) if(!t[i]) for(const j of ADJ[i]){ if(t[j]===p) mp++; else if(t[j]===adv) ma++; }
    v+=(mp-ma)*1.5;
    return v;
  }
  function negamax(s,prof,alfa,beta){
    const f=fim(s);
    if(f.acabou) return f.venc===0?0:-(10000+prof);
    if(prof===0) return avaliar(s,s.vez);
    const js=jogadas(s);
    js.sort((a,b)=>(b.tira>=0)-(a.tira>=0));
    let melhor=-Infinity;
    for(const j of js){
      const v=-negamax(aplicar(s,j),prof-1,-beta,-alfa);
      if(v>melhor) melhor=v;
      if(v>alfa) alfa=v;
      if(alfa>=beta) break;
    }
    return melhor;
  }
  function escolher(s,prof){
    const js=jogadas(s); if(!js.length) return null;
    prof=prof||(fase(s,s.vez)==="colocar"?3:4);
    let melhor=-Infinity, boas=[];
    for(const j of js){
      const v=-negamax(aplicar(s,j),prof-1,-Infinity,Infinity)+Math.random()*0.01;
      if(v>melhor+0.5){ melhor=v; boas=[j]; } else if(Math.abs(v-melhor)<=0.5) boas.push(j);
    }
    return boas[Math.floor(Math.random()*boas.length)];
  }

  const api={P1,P2,ADJ,MOINHOS,novo,fase,contar,total,formaMoinho,removiveis,base,jogadas,aplicar,fim,escolher,outra};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.MoinhoLogica=api;
})(typeof window!=="undefined"?window:globalThis);
