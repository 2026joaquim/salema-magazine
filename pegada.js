/* =====================================================================
   CALCULADORA DA PEGADA DE CARBONO DA ESTADIA
   Usa window.FATORES_CARBONO (fatores-carbono.js).
   Também pode ir para outro site: pegada.html?embed=1 (&lang=en|de)
   ===================================================================== */
(function(){
  const F = window.FATORES_CARBONO;
  const q = new URLSearchParams(location.search);
  const embed = q.has("embed");
  if (embed) document.body.classList.add("embed");
  const pl = (q.get("lang") || "").toLowerCase();
  if (["pt","en","de"].includes(pl)) { try { localStorage.setItem("lang", pl); } catch (e) {} }

  const $ = s => document.querySelector(s);
  const kg = v => v >= 1000 ? (v/1000).toLocaleString("pt-PT",{maximumFractionDigits:2}) + " t" : Math.round(v).toLocaleString("pt-PT") + " kg";
  const est = {pessoas:2, noites:5};
  let origem = "Lisboa";

  const meio = $("#p-meio"), dieta = $("#p-dieta");
  F.transportes.forEach(t => meio.append(new Option(t.nome, t.id)));
  F.dietas.forEach(d => dieta.append(new Option(d.nome, d.id)));
  dieta.value = "media";

  const chips = $("#p-origens");
  function desenharOrigens(){
    chips.replaceChildren();
    const t = F.transportes.find(x => x.id === meio.value);
    F.origens.forEach(o => {
      const b = document.createElement("button"); b.type = "button"; b.textContent = o.nome;
      b.setAttribute("aria-pressed", String(o.nome === origem));
      b.onclick = () => { origem = o.nome; $("#p-km").value = distancia(o, t); desenharOrigens(); calcular(); };
      chips.append(b);
    });
  }
  const distancia = (o, t) => t && t.id === "aviao" ? (o.voo || Math.round(o.estrada * 0.8)) : o.estrada;

  document.querySelectorAll(".stepper").forEach(st => {
    const campo = st.dataset.campo, min = +st.dataset.min || 0, out = st.querySelector("output");
    const [menos, mais] = st.querySelectorAll("button");
    const set = v => { est[campo] = Math.max(min, Math.min(campo === "noites" ? 120 : 30, v)); out.value = est[campo]; calcular(); };
    menos.addEventListener("click", () => set(est[campo] - 1));
    mais.addEventListener("click", () => set(est[campo] + 1));
    out.value = est[campo];
  });
  meio.addEventListener("input", () => {
    const o = F.origens.find(x => x.nome === origem); const t = F.transportes.find(x => x.id === meio.value);
    if (o) $("#p-km").value = distancia(o, t);
    desenharOrigens(); calcular();
  });
  $("#p-km").addEventListener("input", () => { origem = null; desenharOrigens(); calcular(); });
  ["#p-volta","#p-aluguer","#p-dieta"].forEach(s => $(s).addEventListener("input", calcular));

  function viagemKg(t, km, pessoas){
    const d = km * (t.fatorDistancia || 1);
    return t.por === "pessoa" ? d * t.kg * pessoas : d * t.kg;
  }

  function calcular(){
    const t = F.transportes.find(x => x.id === meio.value);
    const km = Math.max(0, +$("#p-km").value || 0);
    const vezes = $("#p-volta").checked ? 2 : 1;
    const aviao = t.id === "aviao";
    $("#p-aluguer-l").hidden = !aviao;
    const p = est.pessoas, n = est.noites, dias = n + 1;
    let viagem = viagemKg(t, km, p) * vezes;
    const carro = F.transportes.find(x => x.id === "carro-gasolina");
    const aluguer = aviao && $("#p-aluguer").checked ? viagemKg(carro, 100, p) * vezes : 0;
    const dt = F.dietas.find(x => x.id === dieta.value);
    const comida = dt.kg * p * dias;
    const total = viagem + aluguer + comida;

    $("#r-total").textContent = kg(total) + " de CO₂";
    $("#r-pp").textContent = kg(total / p) + " por pessoa · " + kg(total / p / dias) + " por pessoa e por dia";

    const partes = [["viagem", t.nome + (vezes === 2 ? " (ida e volta)" : " (só ida)"), viagem]];
    if (aluguer) partes.push(["viagem", "Carro alugado Faro – Salema", aluguer]);
    partes.push(["comida", "Comida (" + dias + " dias, dieta " + dt.nome.toLowerCase() + ")", comida]);
    const mx = Math.max(...partes.map(x => x[2]), 1);
    const box = $("#r-barras"); box.replaceChildren();
    partes.forEach(([cls, nome, v]) => {
      const d = document.createElement("div"); d.className = "barra " + cls;
      const top = document.createElement("div"); top.className = "top";
      const a = document.createElement("span"); a.textContent = nome; const b = document.createElement("b"); b.textContent = kg(v); top.append(a, b);
      const tr = document.createElement("div"); tr.className = "trilho"; const ch = document.createElement("div"); ch.className = "cheio"; ch.style.width = (v / mx * 100) + "%"; tr.append(ch);
      d.append(top, tr); box.append(d);
    });

    const ppd = total / p / dias, ref = F.referencia.portugalDia;
    $("#r-comp").textContent = "Uma pessoa em Portugal emite em média cerca de " + Math.round(ref) + " kg de CO₂ por dia, contando tudo (casa, transportes, comida, compras). A sua estadia: " + kg(ppd) + " por pessoa e por dia, só com a viagem e a comida.";

    const dicas = [];
    const comboio = F.transportes.find(x => x.id === "comboio");
    if (t.id === "aviao") {
      const o = F.origens.find(x => x.nome === origem); const kmTerra = o ? o.estrada : Math.round(km * 1.3);
      const alt = viagemKg(comboio, kmTerra, p) * vezes;
      dicas.push("De comboio, a viagem emitiria cerca de " + kg(alt) + " em vez de " + kg(viagem + aluguer) + ".");
    }
    if (t.por === "veiculo" && t.kg > 0 && p < 4) dicas.push("Partilhe o carro: a viagem emite o mesmo com 1 ou com 4 pessoas, por isso a pegada por pessoa desce muito.");
    if (n < 7 && viagem > comida) dicas.push("Fique mais tempo: a viagem é a maior parte da pegada e divide-se por mais dias.");
    if (dt.kg > 3.8) { const veg = F.dietas.find(x => x.id === "vegetariana"); dicas.push("Coma vegetariano durante a estadia e poupa cerca de " + kg((dt.kg - veg.kg) * p * dias) + ". No restaurante Nazari, cada prato mostra a sua pegada."); }
    dicas.push("No parque: use o shuttle grátis para a praia, as bicicletas e os caminhos a pé.");
    dicas.push("Separe o lixo e use a compostagem: o parque é zero waste.");
    const ul = $("#r-dicas"); ul.replaceChildren(); dicas.forEach(x => { const li = document.createElement("li"); li.textContent = x; ul.append(li); });
    altura();
  }

  function altura(){ if (embed && parent !== window) { try { parent.postMessage({salemaCalc: document.documentElement.scrollHeight, de: "pegada"}, "*"); } catch (e) {} } }
  window.addEventListener("resize", altura);
  desenharOrigens(); calcular(); setTimeout(altura, 600);
})();
