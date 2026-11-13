/* =====================================================================
   FATORES DE EMISSÃO — usados pela calculadora de pegada (pegada.html)
   kg de CO₂ equivalente.
   Transportes: fatores de conversão do Governo do Reino Unido (DESNZ, 2024),
   por km de veículo (carro, mota, autocaravana) ou por km de passageiro
   (avião, comboio, autocarro). Aviões: inclui o efeito das emissões em
   altitude e +8% de distância por rotas não diretas.
   Alimentação: Scarborough et al. (2014), Climatic Change — pegada média
   diária por tipo de dieta.
   ===================================================================== */
window.FATORES_CARBONO = {
  transportes: [
    {id:"carro-gasolina",  nome:"Carro a gasolina",            kg:0.164, por:"veiculo"},
    {id:"carro-gasoleo",   nome:"Carro a gasóleo",             kg:0.168, por:"veiculo"},
    {id:"carro-hibrido",   nome:"Carro híbrido",               kg:0.120, por:"veiculo"},
    {id:"carro-eletrico",  nome:"Carro elétrico",              kg:0.047, por:"veiculo"},
    {id:"carro-caravana",  nome:"Carro com caravana",          kg:0.230, por:"veiculo"},   // carro a gasóleo +35% a rebocar
    {id:"autocaravana",    nome:"Autocaravana ou van",         kg:0.250, por:"veiculo"},   // carrinha a gasóleo até 3,5 t
    {id:"mota",            nome:"Mota",                        kg:0.113, por:"veiculo"},
    {id:"aviao",           nome:"Avião",                       kg:0.153, por:"pessoa", fatorDistancia:1.08},
    {id:"comboio",         nome:"Comboio",                     kg:0.035, por:"pessoa"},
    {id:"autocarro",       nome:"Autocarro de longo curso",    kg:0.027, por:"pessoa"},
    {id:"bicicleta",       nome:"Bicicleta ou a pé",           kg:0,     por:"pessoa"}
  ],
  // distâncias aproximadas até à Salema (km, só ida)
  origens: [
    {nome:"Lisboa", estrada:270},
    {nome:"Porto", estrada:580},
    {nome:"Sevilha", estrada:290},
    {nome:"Madrid", estrada:790},
    {nome:"Paris", estrada:2050, voo:1450},
    {nome:"Londres", estrada:2400, voo:1750},
    {nome:"Amesterdão", estrada:2500, voo:1850},
    {nome:"Berlim", estrada:3000, voo:2250},
    {nome:"Munique", estrada:2650, voo:1950},
    {nome:"Zurique", estrada:2350, voo:1650}
  ],
  // kg CO₂e por pessoa e por dia
  dietas: [
    {id:"vegana",       nome:"Vegana",                          kg:2.9},
    {id:"vegetariana",  nome:"Vegetariana",                     kg:3.8},
    {id:"peixe",        nome:"Peixe, sem carne",                kg:3.9},
    {id:"pouca-carne",  nome:"Pouca carne",                     kg:4.7},
    {id:"media",        nome:"Carne às vezes",                  kg:5.6},
    {id:"muita-carne",  nome:"Muita carne",                     kg:7.2}
  ],
  referencia: {
    // média de emissões de uma pessoa em Portugal, por dia (cerca de 5,6 t por ano)
    portugalDia: 15.3
  }
};
