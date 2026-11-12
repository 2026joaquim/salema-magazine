/* =====================================================================
   PREÇÁRIO DE CAMPISMO — usado pela calculadora (calculadora.html)
   Fonte: salemaecocamp.com/tabela-de-precos-campismo (novembro 2026).
   Preços por noite, em euros. Para mudar um preço, muda só o número.
   Épocas: baixa 16/10–31/05 · média 01/06–31/07 e 01/09–15/10 · alta 01/08–31/08
   ===================================================================== */
window.PRECOS_CAMPISMO = {
  atualizado: "novembro de 2026",
  //                         baixa  média  alta
  adulto:                   [6.00,  7.50,  8.20],
  crianca7a14:              [3.80,  4.60,  5.20],   // até aos 7 anos: grátis
  carro:                    [5.20,  6.50,  7.80],
  mota:                     [4.80,  5.20,  5.60],
  atrelado:                 [6.00,  7.00,  8.00],
  cao:                      [3.50,  4.00,  4.50],
  eletricidade:             [6.00,  6.00,  6.00],
  taxaResiduos: 0.30,       // por pessoa (a partir dos 6 anos) e por noite
  acsi: 21.00,              // cartão ACSI / ADAC / Camping Key Europe, por noite
  // períodos do cartão ACSI (mês-dia, inclusive)
  acsiPeriodos: [["01-01","06-15"],["09-15","12-31"]],
  alojamentos: [
    {id:"tenda-p",  nome:"Tenda até 5 m²",                                   precos:[7.00, 8.20, 9.50]},
    {id:"tenda-g",  nome:"Tenda com 5 m² ou mais",                           precos:[8.30, 10.20, 12.20]},
    {id:"van-p",    nome:"Autocaravana, caravana ou van até 5 m",            precos:[7.00, 8.20, 9.50]},
    {id:"van-m",    nome:"Autocaravana, caravana ou van de 5 a 7 m",         precos:[8.30, 10.20, 12.20]},
    {id:"van-g",    nome:"Autocaravana ou caravana com 7 m ou mais",         precos:[9.60, 12.20, 14.90]},
    {id:"grande",   nome:"Camião, autocarro ou tiny house",                  precos:[9.60, 12.20, 14.90]},
    {id:"tejadilho",nome:"Tenda de tejadilho (no carro)",                    precos:[6.80, 8.00, 9.20]},
    {id:"nenhum",   nome:"Sem alojamento (só pessoas ou visita)",            precos:[0, 0, 0]}
  ],
  // descontos
  estadaLonga: [
    // estadas com mais de 3 noites: desconto nas noites deste período
    {de:"11-01", ate:"04-15", pct:22, semEletricidade:true},
    {de:"04-16", ate:"05-31", pct:10, semEletricidade:true}
  ],
  // os descontos nunca incidem na eletricidade
  familiaPct: 10,           // famílias com 3 crianças até aos 14 anos (não com cartão ACSI)
  ciclistaPct: 10           // ciclistas com tenda (não acumulável)
};
