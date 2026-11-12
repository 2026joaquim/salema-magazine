/* =====================================================================
   CALCULADORA DE CAMPISMO
   Usa window.PRECOS_CAMPISMO (precos-campismo.js).
   Para pôr noutro site: <iframe src="https://ecomagazine.pt/calculadora.html?embed=1">
   (?lang=en ou ?lang=de escolhe a língua)
   ===================================================================== */
(function(){
  const P = window.PRECOS_CAMPISMO, C = window.CONFIG || {};
  const q = new URLSearchParams(location.search);
  const embed = q.has("embed");
  if (embed) document.body.classList.add("embed");
  const pl = (q.get("lang") || "").toLowerCase();
  if (["pt","en","de"].includes(pl)) { try { localStorage.setItem("lang", pl); } catch (e) {} }

  const $ = s => document.querySelector(s);
  const eur = v => v.toLocaleString("pt-PT", {minimumFractionDigits:2, maximumFractionDigits:2}) + " €";
  const est = {adultos:2, criancas:0, pequenos:0, carros:0, motas:0, atrelados:0, caes:0};

  /* ---- campos ---- */
  const sel = $("#c-aloj");
  P.alojamentos.forEach(a => sel.append(new Option(a.nome, a.id)));
  const hoje = new Date(); const iso = d => d.toISOString().slice(0,10);
  const amanha = new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1));
  $("#c-chegada").value = iso(amanha); $("#c-chegada").min = iso(new Date(Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())));

  document.querySelectorAll(".stepper").forEach(st => {
    const campo = st.dataset.campo, min = +st.dataset.min || 0, out = st.querySelector("output");
    const [menos, mais] = st.querySelectorAll("button");
    const set = v => { est[campo] = Math.max(min, Math.min(20, v)); out.value = est[campo]; calcular(); };
    menos.addEventListener("click", () => set(est[campo] - 1));
    mais.addEventListener("click", () => set(est[campo] + 1));
    out.value = est[campo];
  });
  ["#c-chegada","#c-noites","#c-aloj","#c-luz","#c-acsi","#c-ciclista"].forEach(s => $(s).addEventListener("input", calcular));

  /* ---- regras ---- */
  const md = d => String(d.getUTCMonth()+1).padStart(2,"0") + "-" + String(d.getUTCDate()).padStart(2,"0");
  const dentro = (m, de, ate) => de <= ate ? (m >= de && m <= ate) : (m >= de || m <= ate);
  function epoca(d){ const m = md(d); if (dentro(m,"08-01","08-31")) return 2; if (dentro(m,"06-01","07-31") || dentro(m,"09-01","10-15")) return 1; return 0; }
  const NOME_EPOCA = ["época baixa", "época média", "época alta"];
  const acsiValido = d => P.acsiPeriodos.some(([a,b]) => dentro(md(d), a, b));

  function noitesDe(chegada, n){ const out = []; for (let i = 0; i < n; i++) out.push(new Date(Date.UTC(chegada.getUTCFullYear(), chegada.getUTCMonth(), chegada.getUTCDate() + i))); return out; }

  /* uma noite, sem descontos: lista de [rubrica, valor, entraNoDesconto, eEletricidade] */
  function noite(d, o){
    const e = epoca(d), L = [];
    const aloj = P.alojamentos.find(a => a.id === o.aloj) || P.alojamentos[0];
    if (o.acsi && acsiValido(d)) {
      L.push(["Cartão ACSI / ADAC / Camping Key Europe", P.acsi, false, false]);
      const extraAd = Math.max(0, o.adultos - 2), extraCarro = Math.max(0, o.carros - 1);
      if (extraAd) L.push(["Adultos", extraAd * P.adulto[e], false, false]);
      if (o.criancas) L.push(["Crianças dos 7 aos 14 anos", o.criancas * P.crianca7a14[e], false, false]);
      if (extraCarro) L.push(["Carros", extraCarro * P.carro[e], false, false]);
    } else {
      if (aloj.precos[e]) L.push([aloj.nome, aloj.precos[e], true, false]);
      if (o.adultos) L.push(["Adultos", o.adultos * P.adulto[e], true, false]);
      if (o.criancas) L.push(["Crianças dos 7 aos 14 anos", o.criancas * P.crianca7a14[e], true, false]);
      if (o.carros) L.push(["Carros", o.carros * P.carro[e], true, false]);
      if (o.luz) L.push(["Eletricidade", P.eletricidade[e], false, true]); // os descontos nunca incidem na eletricidade
    }
    if (o.motas) L.push(["Motas", o.motas * P.mota[e], true, false]);
    if (o.atrelados) L.push(["Atrelados", o.atrelados * P.atrelado[e], true, false]);
    if (o.caes) L.push(["Cães", o.caes * P.cao[e], true, false]);
    const pessoasTaxa = o.adultos + o.criancas;
    if (pessoasTaxa) L.push(["Taxa de gestão de resíduos", pessoasTaxa * P.taxaResiduos, false, false]);
    return {e, acsi: o.acsi && acsiValido(d), linhas: L};
  }

  function calcularCom(o, modo){ // modo: "estada", "familia" ou "ciclista" — os descontos nunca se juntam
    const noites = noitesDe(o.chegada, o.n);
    const soma = new Map(); let bruto = 0, descEstada = 0, descFamilia = 0, descCiclista = 0; const epocas = new Set(); let noitesAcsi = 0;
    noites.forEach(d => {
      const r = noite(d, o); epocas.add(r.e); if (r.acsi) noitesAcsi++;
      let baseEstada = 0, baseGeral = 0;
      r.linhas.forEach(([nome, v, desc, luz]) => {
        soma.set(nome, (soma.get(nome) || 0) + v); bruto += v;
        if (desc && !r.acsi) { baseGeral += v; if (!luz) baseEstada += v; }
      });
      if (r.acsi) return;
      if (modo === "ciclista") { descCiclista += baseGeral * P.ciclistaPct / 100; return; }
      if (modo === "familia") { descFamilia += baseGeral * P.familiaPct / 100; return; }
      if (o.n > 3) {
        const p = P.estadaLonga.find(x => dentro(md(d), x.de, x.ate));
        if (p) { const base = p.semEletricidade ? baseEstada : baseGeral; descEstada += base * p.pct / 100; }
      }
    });
    const total = bruto - descEstada - descFamilia - descCiclista;
    return {soma, bruto, descEstada, descFamilia, descCiclista, total, epocas, noitesAcsi};
  }

  function calcular(){
    const chegadaTxt = $("#c-chegada").value;
    let n = Math.round(+$("#c-noites").value || 0);
    if (!chegadaTxt || n < 1) { $("#r-total").textContent = "—"; $("#r-noite").textContent = "Escolha a data de chegada e as noites."; $("#r-linhas").replaceChildren(); return; }
    n = Math.min(n, 120);
    const [y,m,d] = chegadaTxt.split("-").map(Number); const chegada = new Date(Date.UTC(y, m-1, d));
    const saida = new Date(Date.UTC(y, m-1, d + n));
    $("#c-saida").textContent = "Saída: " + saida.toLocaleDateString("pt-PT", {weekday:"long", day:"numeric", month:"long", year:"numeric", timeZone:"UTC"});
    const aloj = sel.value;
    const tendas = ["tenda-p","tenda-g"].includes(aloj);
    $("#c-ciclista").disabled = !tendas; if (!tendas) $("#c-ciclista").checked = false;
    const o = {chegada, n, aloj, luz: $("#c-luz").checked, acsi: $("#c-acsi").checked, ...est,
               familia: !$("#c-acsi").checked && (est.criancas + est.pequenos) >= 3};
    /* os descontos não se juntam: conta-se o que fica mais barato ao cliente */
    const opcoes = [calcularCom(o, "estada")];
    if (o.familia) opcoes.push(calcularCom(o, "familia"));
    if ($("#c-ciclista").checked && !o.acsi) opcoes.push(calcularCom(o, "ciclista"));
    const r = opcoes.reduce((a, b) => b.total < a.total ? b : a);
    const variosDescontos = opcoes.filter(x => x.total < x.bruto).length > 1;

    $("#r-total").textContent = eur(r.total);
    $("#r-noite").textContent = n + (n === 1 ? " noite" : " noites") + " · em média " + eur(r.total / n) + " por noite · " + [...r.epocas].sort().map(e => NOME_EPOCA[e]).join(" e ");

    const tb = $("#r-linhas"); tb.replaceChildren();
    const linha = (a, b, cls, nota) => { const tr = document.createElement("tr"); if (cls) tr.className = cls; const t1 = document.createElement("td"); t1.textContent = a; if (nota) { const s = document.createElement("small"); s.textContent = nota; t1.append(s); } const t2 = document.createElement("td"); t2.textContent = b; tr.append(t1, t2); tb.append(tr); };
    r.soma.forEach((v, nome) => linha(nome, eur(v), "", nome.startsWith("Cartão") ? r.noitesAcsi + (r.noitesAcsi === 1 ? " noite" : " noites") : (nome === "Taxa de gestão de resíduos" ? "0,30 € por pessoa e por noite" : "")));
    if (r.descEstada) linha("Desconto de estada longa", "− " + eur(r.descEstada), "desc", "Mais de 3 noites, de novembro a maio");
    if (r.descFamilia) linha("Desconto de família (10%)", "− " + eur(r.descFamilia), "desc", "3 ou mais crianças até aos 14 anos");
    if (r.descCiclista) linha("Desconto de ciclista (10%)", "− " + eur(r.descCiclista), "desc");
    linha("Total", eur(r.total), "sub");

    const nd = $("#r-nota-desc"); const notas = [];
    if (variosDescontos) notas.push("Os descontos não se juntam: contámos só o que lhe fica mais barato.");
    if (o.acsi && r.noitesAcsi < n) notas.push("O cartão ACSI só vale de 1 de janeiro a 15 de junho e de 15 de setembro a 31 de dezembro. As outras noites foram contadas ao preço normal.");
    if (o.acsi) notas.push("Com o cartão ACSI, os 21 € por noite incluem 2 adultos, a eletricidade e a autocaravana, ou a caravana com o carro.");
    nd.textContent = notas.join(" "); nd.hidden = !notas.length;
    $("#r-atual").textContent = P.atualizado;

    /* pedido */
    const fmt = dt => dt.toLocaleDateString("pt-PT", {day:"2-digit", month:"2-digit", year:"numeric", timeZone:"UTC"});
    const quem = [est.adultos + " adulto(s)", est.criancas ? est.criancas + " criança(s) 7–14" : "", est.pequenos ? est.pequenos + " criança(s) <7" : ""].filter(Boolean).join(", ");
    const extras = [est.carros ? est.carros + " carro(s)" : "", est.motas ? est.motas + " mota(s)" : "", est.atrelados ? est.atrelados + " atrelado(s)" : "", est.caes ? est.caes + " cão/cães" : "", o.luz ? "eletricidade" : "", o.acsi ? "cartão ACSI" : "", $("#c-ciclista").checked ? "ciclista" : ""].filter(Boolean).join(", ");
    const msg = "Olá! Gostaria de reservar campismo no Salema Eco Camp.\n" +
      "Chegada: " + fmt(chegada) + " · Saída: " + fmt(saida) + " (" + n + " noites)\n" +
      "Pessoas: " + quem + "\n" +
      "Alojamento: " + sel.options[sel.selectedIndex].text + "\n" +
      (extras ? "Extras: " + extras + "\n" : "") +
      "Valor indicado na calculadora: " + eur(r.total);
    if (C.WHATSAPP_RECECAO) $("#r-wa").href = "https://wa.me/" + C.WHATSAPP_RECECAO.replace(/\D/g,"") + "?text=" + encodeURIComponent(msg);
    $("#r-mail").href = "mailto:reservas@salemaecocamp.com?subject=" + encodeURIComponent("Pedido de reserva de campismo") + "&body=" + encodeURIComponent(msg);
    altura();
  }

  /* dentro de outro site: diz a altura à página que a mostra */
  function altura(){ if (embed && parent !== window) { try { parent.postMessage({salemaCalc: document.documentElement.scrollHeight}, "*"); } catch (e) {} } }
  window.addEventListener("resize", altura);
  calcular();
  setTimeout(altura, 600);
})();
