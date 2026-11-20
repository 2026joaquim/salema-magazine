/* Shisima (Quénia) — regras e computador.
   Pontos 0..7 à volta do octógono (0 em cima, no sentido dos ponteiros do relógio) e 8 no centro.
   Cada jogador tem 3 peças. Move-se uma peça para um ponto vizinho livre.
   Ganha quem alinhar as 3 peças numa reta que passa pelo centro. */
(function(root){
  const P1=1, P2=2;
  const ADJ=Array.from({length:9},()=>[]);
  const lig=(a,b)=>{ ADJ[a].push(b); ADJ[b].push(a); };
  for(let k=0;k<8;k++){ lig(k,(k+1)%8); lig(k,8); }
  const LINHAS=[[0,8,4],[1,8,5],[2,8,6],[3,8,7]];
  const outra=p=>p===P1?P2:P1;

  function novo(){
    const t=Array(9).fill(0);
    t[0]=t[1]=t[2]=P1;        /* claras em cima */
    t[4]=t[5]=t[6]=P2;        /* escuras em baixo */
    return {t,vez:P1,n:0};
  }
  const ganhou=(t,p)=>LINHAS.some(l=>l.every(i=>t[i]===p));
  function jogadas(s){
    const out=[];
    for(let i=0;i<9;i++) if(s.t[i]===s.vez) for(const j of ADJ[i]) if(!s.t[j]) out.push({de:i,para:j});
    return out;
  }
  function aplicar(s,j){
    const t=s.t.slice(); t[j.para]=t[j.de]; t[j.de]=0;
    return {t,vez:outra(s.vez),n:s.n+1};
  }
  /* depois de uma jogada, a vez é de s.vez: {acabou, venc} (venc 0 = empate) */
  function fim(s){
    const p=outra(s.vez);
    if(ganhou(s.t,p)) return {acabou:true,venc:p};
    if(ganhou(s.t,s.vez)) return {acabou:true,venc:s.vez};
    if(!jogadas(s).length) return {acabou:true,venc:p};
    if(s.n>=80) return {acabou:true,venc:0};
    return {acabou:false};
  }

  function avaliar(s,p){
    const adv=outra(p), t=s.t; let v=0;
    if(t[8]===p) v+=3; else if(t[8]===adv) v-=3;
    for(const l of LINHAS){
      let a=0,b=0; for(const i of l){ if(t[i]===p) a++; else if(t[i]===adv) b++; }
      if(b===0) v+=a*a; if(a===0) v-=b*b;
    }
    return v;
  }
  function negamax(s,prof,alfa,beta){
    const f=fim(s);
    if(f.acabou) return f.venc===0?0:(f.venc===s.vez?10000+prof:-(10000+prof));
    if(prof===0) return avaliar(s,s.vez);
    let melhor=-Infinity;
    for(const j of jogadas(s)){
      const v=-negamax(aplicar(s,j),prof-1,-beta,-alfa);
      if(v>melhor) melhor=v;
      if(v>alfa) alfa=v;
      if(alfa>=beta) break;
    }
    return melhor;
  }
  function escolher(s,prof){
    const js=jogadas(s); if(!js.length) return null;
    prof=prof||4;
    let melhor=-Infinity, boas=[];
    for(const j of js){
      const v=-negamax(aplicar(s,j),prof-1,-Infinity,Infinity);
      if(v>melhor){ melhor=v; boas=[j]; } else if(v===melhor) boas.push(j);
    }
    return boas[Math.floor(Math.random()*boas.length)];
  }

  const api={P1,P2,ADJ,LINHAS,novo,jogadas,aplicar,fim,escolher,outra,ganhou};
  if(typeof module!=="undefined"&&module.exports) module.exports=api; else root.ShisimaLogica=api;
})(typeof window!=="undefined"?window:globalThis);
