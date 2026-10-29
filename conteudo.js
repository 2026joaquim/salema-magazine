/* =====================================================================
   CONTEÚDO DO SALEMA ECO CAMP MAGAZINE
   Tudo o que os hóspedes leem está aqui: secções, preços, produtos,
   parceiros, trilho e menu. Para mudar um preço ou juntar um produto,
   altera-se este ficheiro (o Claude faz isso e envia o ficheiro novo).
   ===================================================================== */
window.MASSAGENS=[["Facial Lift 30 min","35 €"],["Pescoço e ombros 30 min","35 €"],["Clássica relaxante com óleo 45 min","45 €"],["Drenagem linfática 45 min","45 €"],["Facial Lift 45 min","45 €"],["Deep Tissue 45 min","50 €"],["Clássica relaxante com óleo 60 min","55 €"],["Drenagem linfática 60 min","55 €"],["Facial Lift 60 min","55 €"],["Deep Tissue 60 min","60 €"],["Clássica relaxante com óleo 90 min","80 €"],["Massagem ayurvédica 75 min","90 €"],["Reflexologia podal 30 min","35 €"],["Reflexologia podal 45 min","45 €"],["Reflexologia podal 60 min","55 €"],["Massagem na cadeira 45 min","40 €"],["Kobido, lifting natural da fáscia 60 min","55 €"],["Massagem personalizada com o terapeuta","sob consulta"]];
/* Horário de yoga: [dia, hora, aula, preço] */
window.YOGA=[
  ["Segunda","18:30–19:30","Yoga Nidra com Paul","15 €"],
  ["Terça","9:00–10:00","Free Yoga com Michelle Bavaresco (só hóspedes)","Grátis"],
  ["Quarta","8:00–9:15","Yoga Sādhanā com Mukta","15 €"],
  ["Quarta","9:30–10:45","Power Yoga com Sara Soldado","15 €"],
  ["Quarta","11:15–12:30","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Quarta","18:30–19:30","Yoga Nidra com Paul","15 €"],
  ["Sexta","9:00–10:15","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Sexta","11:00–12:15","Yoga Sādhanā com Mukta","15 €"],
  ["Sexta","18:30–19:30","Yoga Nidra com Paul","15 €"],
  ["Sábado","9:00–10:15","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Sábado","18:30–19:30","Yoga Nidra com Paul","15 €"]
];

/* Descrições das massagens e das aulas (Alma Mater) */
window.MASSAGEM_DESC=[
  ["Clássica relaxante com óleo","Massagem suave e fluida, com óleo morno, que acalma os músculos, reduz o stress e promove um relaxamento profundo."],
  ["Deep Tissue","Pressão dirigida para libertar tensões musculares crónicas e nós, e aliviar a dor nas camadas mais profundas dos tecidos."],
  ["Drenagem linfática","Técnica leve e rítmica que estimula a circulação linfática, reduz o inchaço, desintoxica e reforça a imunidade."],
  ["Massagem ayurvédica","Massagem holística com óleo morno, adaptada ao seu dosha, que equilibra corpo, mente e espírito e favorece a desintoxicação."],
  ["Reflexologia podal","Pressão em pontos específicos dos pés que estimula os órgãos e sistemas correspondentes, para o bem-estar geral."],
  ["Massagem na cadeira","Massagem rápida e revitalizante nas costas, pescoço e ombros, feita vestido, numa cadeira própria."],
  ["Kobido, lifting natural da fáscia","Antiga técnica japonesa de massagem facial que trabalha a fáscia em profundidade para levantar, tonificar e rejuvenescer o rosto de forma natural."]
];
window.YOGA_DESC=[
  ["Power Yoga","Prática enérgica e intensa que junta posturas de força e movimento dinâmico. Aumenta a resistência, a força e a flexibilidade, com foco e clareza mental. Para quem procura um treino exigente, com atenção plena."],
  ["Hatha Yoga / Hatha Flow","Prática clássica de posturas (asanas), controlo da respiração (pranayama) e movimento consciente. Trabalha flexibilidade, força e equilíbrio, com atenção ao alinhamento e à respiração. Para todos os níveis."],
  ["Yoga Sādhanā","Prática tradicional integrada de āsana dinâmico, mantra, prāṇāyāma e kriyā. Com raízes nos ensinamentos de Krishnamacharya e no Tantra clássico, privilegia o movimento firme e preciso com respiração consciente."],
  ["Yoga Nidra","Uma viagem guiada pelo Paul para um relaxamento mental, emocional e físico profundo. Ajuda a reencontrar os seus recursos interiores e a enfrentar os desafios com calma e clareza."]
];
window.ALMA_REGRAS=[
  "Massagens de domingo a sexta-feira, reservadas com pelo menos 24 horas de antecedência, no site do Salema Eco Camp.",
  "Yoga: reserve até às 18:00 da véspera, sujeito a disponibilidade. Máximo de 12 pessoas por aula; os tapetes são fornecidos.",
  "Aulas pagas: 15 €, em dinheiro, diretamente ao professor. A Free Yoga de terça é só para hóspedes do Salema Eco Camp.",
  "Se tiver alguma condição de saúde ou necessidade especial, indique-a ao reservar e diga-a ao professor ou terapeuta antes da sessão."
];
window.MASSAGENS_URL="https://www.salemaecocamp.com/experiencia/massagens/";

window.PARCEIRO_EXTRA={"Blue Fleet":{foto:"parceiro-bluefleet.jpg",site:"https://www.bluefleet.pt"},"Surf Planet":{foto:"parceiro-surfplanet.jpg"},"Lagos Nature":{foto:"parceiro-lagosnature.jpg",site:"https://www.lagosnature.com"},"Algarve Quad Tours":{foto:"parceiro-quadtours.jpg"}};

window.OUTDOOR=[
 ["Blue Fleet","Passeios de barco a partir da Marina de Lagos",[
  ["Grutas da Ponta da Piedade","22,50 €","12,50 €","1h15","Passeio de barco às grutas da Ponta da Piedade, das mais bonitas da costa algarvia."],
  ["Grutas em kayak","40 €","40 €","2h15","Catamaran da Marina até ao ponto de partida e kayak nas grutas da Ponta da Piedade, com guia certificado."],
  ["Observação de golfinhos","40 €","25 €","1h30","Semi-rígido até mar aberto, com skipper e guias. Avistamento em cerca de 97% das saídas."],
  ["Algar de Benagil","40 €","25 €","2h","Semi-rígido até Carvoeiro e Benagil, entrando em várias grutas. Não se sai do barco. De manhã é mais confortável."],
  ["Blue Cruise","50 €","25 €","3h30","Catamaran pela costa de Lagos e Ponta da Piedade, com almoço incluído."],
  ["Passeio na costa de Lagos","30 €","15 €","2h30","Passeio tranquilo pela costa de Lagos e pelas formações rochosas da Ponta da Piedade."]]],
 ["Mar Ilimitado","Semi-rígido · mínimo 6 pessoas · check-in 15 a 45 min antes",[
  ["Observação de golfinhos","40 €","30 €","1h30","Com apresentação educativa antes da saída. A rota depende do mar."],
  ["Ocean Safari","85 €","","3h","Mais longe no Atlântico, com biólogo marinho: golfinhos e, com sorte, baleias, tartarugas, tubarões ou peixes-lua. A partir dos 10 anos."],
  ["Observação de aves marinhas","55 €","40 €","2h30","Para fotografar aves marinhas raras em pleno oceano. A partir dos 8 anos."],
  ["Encantos da Costa Sul","30 €","25 €","1h","Os pequenos segredos da costa sul. A partir dos 3 anos."],
  ["Cabo de São Vicente","30 €","25 €","1h","O farol visto do mar e o «Gigante», uma rocha esculpida pela natureza. A partir dos 3 anos."],
  ["Viagem de investigação","70 €","","4h","Monitorização de cetáceos com a equipa de investigação: 1h30 em terra e 2h30 no mar. A partir dos 12 anos."]]],
 ["Salema Tours","Passeios de barco na costa sul",[
  ["Golfinhos e grutas locais","55 €","45 €","2h","Duas experiências numa: a costa e os golfinhos, com explicações do guia."],
  ["Observação de golfinhos","40 €","40 €","1h30","Golfinhos no seu habitat natural."],
  ["Grutas locais","30 €","25 €","1h","Grutas da costa sul entre Sagres e a Salema. Opção pelo Cabo de São Vicente e costa oeste."],
  ["Benagil e golfinhos","75 €","55 €","3h","Golfinhos, a gruta de Benagil e a costa do Barlavento."],
  ["Passeio de kayak","40 €","","3h","Grutas locais de kayak, com guia e barco de apoio."]]],
 ["Parque Aventura","Arborismo e paintball na floresta",[
  ["Arborismo · nível Curioso","13 €","","","Percursos nas árvores com pontes, redes e slides. Formação no início."],
  ["Arborismo · nível Aventureiro","16 €","","",""],
  ["Arborismo · nível Destemido","20 €","","",""],
  ["Paintball · Trooper","18 €","","","Campo de 2500 m² na floresta. A partir dos 10 anos, mínimo 6 jogadores."],
  ["Paintball · Comando","22 €","","",""],
  ["Paintball · Elite","26 €","","",""],
  ["Arborismo + paintball","30 €","","","Todos os percursos, 150 bolas e equipamento completo."]]],
 ["Surf Planet","Escola de surf de Sagres para iniciantes e intermédios, com instrutores qualificados. Aulas em grupo ou privadas, normalmente às 9:00, 9:15 ou 9:30. Inclui prancha, fato, transporte e seguro.",[
  ["Aula de surf · 1 dia","65 €","","","Traga água, um snack, protetor solar e toalha."],
  ["Aula de surf · 2 dias","180 €","","",""],
  ["Aula de surf · 3 dias","275 €","","",""]]],
 ["Sagres Discovery","Tours de jipe com recolha (pick-up) · preço de criança até aos 12 anos",[
  ["Sagres e Costa Vicentina · meio dia","68 €","42 €","8:45–13:00","Sagres, Cabo de São Vicente, parque natural e caminhada."],
  ["Sagres e Costa Vicentina · dia inteiro","97 €","66 €","8:45–16:30","O mesmo, com almoço, jipe pelas serras e visita a uma aldeia."],
  ["Monchique e barragem da Bravura · meio dia","69 €","42 €","8:30–13:00","Barragem da Bravura, caminhada, aldeia e o ponto mais alto, a Fóia."],
  ["Monchique e barragem da Bravura · dia inteiro","106 €","68 €","8:45–15:30","O mesmo, com almoço, vila de Monchique, destilaria de medronho e jipe pela serra."],
  ["Sagres off-road ao pôr do sol","53 €","42 €","3h, desde as 17:00","Sagres, Cabo de São Vicente e o pôr do sol num ponto secreto."],
  ["Prova de vinhos","56 € · 63 € com tapas","48 € (só tapas)","3h","Jipe fora de estrada, aldeia, caminhada e prova de 3 vinhos."]]],
 ["A Rocha","Observação de aves com guia",[
  ["Aves de Sagres","103 €","","8h · segundas","Aves marinhas, de rapina, cegonhas e migratórias. 5 km, fácil, todas as idades."],
  ["Aves de Monchique","85 €","","8h · terças","Fóia e Caldas de Monchique: aves florestais e de montanha. 5 km, médio."],
  ["Lagoa da Abicada","45 €","","4h · domingo de manhã","Flamingos, colhereiros e limícolas, entre sapais e ruínas romanas. 4 km, fácil."],
  ["Dunas de Alvor","47 €","","4h · domingo à tarde","Aves costeiras pela ria e pelo passadiço, com mergulho no fim. 3 km, fácil."],
  ["Abicada + Dunas de Alvor","80 €","","8h · domingos","Os dois locais num dia. 7 km, fácil."]]],
 ["Lagos Nature","Aventuras da costa ao campo, da Blue Fleet",[
  ["Passeio de bicicleta elétrica","sob consulta","","","Da costa ao interior, em bicicleta elétrica."],
  ["Passeio de buggy","sob consulta","","","Caminhos de terra entre o mar e o campo, em buggy."]]],
 ["Algarve Quad Tours","Moto-4 pela costa oeste do Algarve",[
  ["Moto-4 · 90 minutos","sob consulta","","1h30",""],
  ["Moto-4 · 3 horas","sob consulta","","3h",""],
  ["Moto-4 ao pôr do sol","sob consulta","","","O pôr do sol visto da costa."]]]
];
window.CATALOG=[
  {id:"restaurante", nome:"Restaurante Nazari", cor:"--c-rest", email:"nazari@salemaecocamp.com", foto:"nazari.jpg", curto:"Mesas, refeições e pequeno-almoço",
   intro:"Cozinha mediterrânica com influências gregas, italianas e do Médio Oriente. Cada prato mostra a sua pegada de carbono. Aberto das 8:00 às 21:30; às terças só há pequeno-almoço e pizzas.",
   itens:[
    {id:"mesa", nome:"Reservar mesa", desc:"Almoço e jantar, das 12:00 às 21:30", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"encomenda", nome:"Encomendar refeição", desc:"Para levar ou entregar no alojamento ou na sua zona · caixa 0,5 €", campos:["telefone","data","hora","pedido","entrega"]},
    {id:"pequeno-almoco", nome:"Pequeno-almoço", desc:"Buffet 13 € por pessoa · 8:00–10:30", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"perdidos", nome:"Perdidos e achados", desc:"Esqueceu-se de alguma coisa? Vai para a receção", campos:["objeto","data"], destino:"rececao"}
   ]},
  {id:"alma", nome:"Alma Mater", cor:"--c-alma", email:"almamater@salemaecocamp.com", whatsapp:"+351 961 956 143", foto:"alma-mater.jpg", curto:"Massagens, terapias e yoga",
   intro:"A raiz espiritual do parque: massagens, terapias e aulas de yoga num espaço de madeira aberto para o vale.",
   itens:[
    {id:"massagem", nome:"Massagem ou terapia", desc:"Domingo a sexta · reserve com 24 h de antecedência no site", link:MASSAGENS_URL, linkTexto:"Reservar no site"},
    {id:"yoga", nome:"Aula de yoga", desc:"Até às 18:00 da véspera · máx. 12 pessoas · tapetes fornecidos", campos:["tipo","data","pessoas","notas"], tipoLabel:"Que aula?", tipoOpts:YOGA.map(y=>y[0]+" "+y[1]+" · "+y[2]+" · "+y[3])}
   ]},
  {id:"ser", nome:"SER", cor:"--c-ser", foto:"ser-fachada.jpg", email:"atividades@salemaecocamp.com", whatsapp:"+351 961 956 143", curto:"Sustentabilidade, Ecologia e Regeneração",
   intro:"Sustentabilidade, Ecologia e Regeneração. A equipa SER, liderada pela Ângela, cuida das áreas verdes, do alcofre onde crescem as plantas do parque, da ribeira e da fauna e flora. Venha conhecer o vale e o trabalho de regeneração num passeio ou workshop.",
   itens:[
    {id:"borboletas-dia", nome:"Tour semanal das borboletas", desc:"Quartas às 12:00 · 1 h · donativo para a Tagis", campos:["data","pessoas"]},
    {id:"borboletas-noite", nome:"Observação de borboletas noturnas", desc:"Quintas, de 2 em 2 semanas, às 9:15 · 1 h · gratuito", campos:["data","pessoas"]},
    {id:"orquideas", nome:"Tour das orquídeas selvagens", desc:"Passeio guiado", campos:["data","pessoas"]},
    {id:"nascer", nome:"Caminhada do nascer do sol", desc:"Saída antes do amanhecer", campos:["data","pessoas"]},
    {id:"por", nome:"Caminhada do pôr do sol", desc:"Fim de tarde", campos:["data","pessoas"]},
    {id:"regeneracao", nome:"Workshops de regeneração", desc:"Datas anunciadas no Magazine", campos:["data","pessoas","notas"]}
   ]},
  {id:"store", nome:"Eco Store", cor:"--c-store", foto:"loja-fachada.jpg", email:"sales@salemaecostore.com", whatsapp:"+351 968 727 036", whatsappNome:"WhatsApp da Eco Store", curto:"Pão, produtos biológicos e peças únicas",
   intro:"Aberta das 8:00 às 13:00 e das 14:00 às 18:00. Produtos biológicos e locais. As peças únicas podem ser enviadas por correio para Portugal ou para o estrangeiro: diga-nos o que quer e enviamos o preço.",
   itens:[
    {id:"pao", nome:"Encomendar pão e pastelaria", desc:"Para o dia seguinte · encomendas até às 17h30", thumb:"pao-nicolay.jpg", campos:["data","paes","notas"]},
    {id:"manta", nome:"Manta", desc:"Peça única · preço sob consulta", campos:["quantidade","envio","notas"], loja:true},
    {id:"perfume", nome:"Perfume", desc:"Peça única · preço sob consulta", campos:["quantidade","envio","notas"], loja:true},
    {id:"allmatters-gel", nome:"AllMatters · Intimate wash for your body and menstrual cup, 75 ml", desc:"6,30 € · vegan e biológico", fotos:["produto-allmatters-1.jpg","produto-allmatters-2.jpg"],
     detalhe:"Gel de limpeza 2 em 1: serve para limpar o copo menstrual antes da inserção/após a remoção e também como sabão de higiene íntima. Com pH equilibrado, o gel contém ingredientes biológicos e naturais, sem perfume. Vegan e Certificado Hipoalergénico pelo Allergy-Certified™. Apropriado para todos os tipos de pele.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"odeoliva-locao", nome:"Ode Oliva · Loção corporal / Body lotion 100 ml", desc:"13,80 € · artesanal e natural", fotos:["produto-odeoliva-1.jpg","produto-odeoliva-2.jpg"],
     detalhe:"Loção corporal hidratante artesanal, contém azeite, hidrolato de rosas, emulsionante, extrato de semente de romã, vitamina E, óleo essencial de gerânio e milefólio. Produto natural e biodegradável, consumindo o mínimo de recursos e reduzindo o impacto ambiental.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"mindthetrash-champo", nome:"Champô Sólido Mind the Trash · Cabelos normais (com condicionador)", desc:"9,30 € · natural, sem embalagem de plástico", fotos:["produto-mindthetrash-1.jpg","produto-mindthetrash-2.jpg"],
     detalhe:"Champô Sólido Mind The Trash desenvolvido de forma a respeitar o pH do cabelo, ajudando a hidratá-lo e nutri-lo. Formulado com ingredientes naturais e de origem natural, incluindo ingredientes provenientes de agricultura biológica. É indicado para cabelos normais deixando o cabelo leve, solto e macio.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"luffa", nome:"Esponja vegetal de Luffa", desc:"3,60 € · vegan e compostável", fotos:["produto-luffa-1.jpg"],
     detalhe:"Usada para cuidar do corpo, esta esponja vegetal é feita através da polpa seca da abóbora, formada por uma rede de fibras. Produzida em plantações em agrobiologia florestal em Benin e Burkina. Vegan e completamente compostável, de descontaminação muito simples e prática, pode ser usada também para a lavagem da roupa e limpeza da casa.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"outro", nome:"Outro produto da loja", desc:"Viu algo na loja? Peça aqui", campos:["pedido","quantidade","envio"], loja:true}
   ]},
  {id:"atividades", nome:"Eco-atividades", cor:"--c-ativ", foto:"ativ-quiosque.jpg", email:"atividades@salemaecocamp.com", whatsapp:"+351 961 956 143", curto:"Surf, bicicletas, transfers e tours",
   intro:"Aluguer de material e passeios na costa, no Quiosque de Atividades. Os preços e horários dos tours são confirmados pela equipa.",
   itens:[
    {id:"prancha", nome:"Prancha de surf", desc:"1 dia 20 € · 2 dias 30 € · 3 dias 40 € · dia extra 10 € · com fato", campos:["periodo","quantidade"]},
    {id:"fato", nome:"Fato de surf", desc:"1 dia 10 € · 2 dias 18 € · 3 dias 24 €", campos:["periodo","quantidade","tamanho"]},
    {id:"transfer", nome:"Transfer para as praias", desc:"Ida e volta", campos:["data","hora","pessoas","destino"]},
    {id:"bicicleta", nome:"Bicicleta", desc:"1 h 6 € · meio dia 10 € · 1 dia 18 €", campos:["periodo","quantidade"]},
    {id:"ebike", nome:"Bicicleta elétrica", desc:"Meio dia 15 € · 1 dia 22 €", campos:["periodo","quantidade"]},
    {id:"tour", nome:"Passeios, tours e aulas de surf", desc:"Golfinhos, grutas, kayak, surf, jipe, aves e mais · veja o preçário", campos:["tipo","data","pessoas","notas"], tipoLabel:"Que atividade?", tipoOpts:OUTDOOR.flatMap(([e,,l])=>l.map(a=>a[0]+" · "+e+" · "+a[1]))}
   ]}
];
window.TOPICS=[
  {id:"todos", nome:"Tudo"},
  {id:"boleias", nome:"Boleias", nota:"Vai à praia ou à vila? Ofereça os lugares livres do carro. Menos carros, menos emissões."},
  {id:"entreajuda", nome:"Entreajuda", nota:"Peça ou ofereça uma mão: emprestar uma ferramenta, partilhar comida, ajudar a montar a tenda."},
  {id:"arranjos", nome:"Arranjos", nota:"Ajuda entre hóspedes, por conta própria. O parque não se responsabiliza por serviços combinados entre hóspedes. Para avarias do parque, fale com a receção."},
  {id:"babysitting", nome:"Babysitting", nota:"Combinado diretamente entre famílias. O parque não verifica nem se responsabiliza por estes serviços."},
  {id:"geral", nome:"Outros"}
];
window.STAGES=[
  ["Carrapateira › Vila do Bispo","15,3 km · 4h18","moderado"],
  ["Vila do Bispo › Sagres","20,2 km · 5h18","moderado"],
  ["Sagres › Salema Eco Camp","19,6 km · 5h25","dificil"],
  ["Salema Eco Camp › Praia da Luz","11,5 km · 3h24","moderado"],
  ["Praia da Luz › Lagos","10,9 km · 3h25","facil"]];

window.POIS=["Miradouro da Cordoama","Museu do Mar e da Terra da Carrapateira","Igreja de Nossa Senhora da Conceição · Aljezur","Farol do Cabo de São Vicente · Sagres","Fortaleza de Sagres","Farol da Baleeira · Sagres","Forte do Beliche · Sagres","Museu de Vila do Bispo","Centro de Interpretação de Vila do Bispo","Ermida de Nossa Senhora de Guadalupe","Menires de Vila do Bispo","Ruínas do Forte de Almadena","Pegadas de dinossauros da Praia da Salema","Estação Arqueológica Romana Boca do Rio · Budens","Forte da Figueira · Budens","Menir da Praia da Ingrina","Ponta da Piedade · Lagos","Praça do Infante · Lagos","Centro Cultural de Lagos","Igreja de Santo António · Lagos","Igreja de Santa Maria · Lagos","Museu de Lagos","Museu dos Escravos · Lagos"];

/* Menu do Restaurante Nazari, por secções: [nome, preço, descrição, "v" vegetariano | "vg" vegan] */
window.MENU = {
 "horario": [
  [
   "Aberto",
   "8:00–21:30"
  ],
  [
   "Pequeno-almoço",
   "8:00–10:30"
  ],
  [
   "Almoço e jantar",
   "12:00–21:30"
  ],
  [
   "Terças",
   "só pequeno-almoço e pizzas"
  ],
  [
   "Café e chá",
   "até às 18:00"
  ]
 ],
 "seccoes": [
  {
   "id": "pequeno-almoco",
   "titulo": "Pequeno-almoço",
   "sub": "Das 8:00 às 10:30",
   "grupos": [
    {
     "itens": [
      [
       "Buffet de pequeno-almoço",
       "13 €",
       "Pão, croissant, panquecas, fiambre, cogumelos salteados, queijo, chouriço, compota, mel, ovos mexidos, iogurte, granola, cereais, fruta, bolo caseiro, café, leite, sumos e chá. Preço por pessoa; não se pode partilhar nem levar.",
       ""
      ],
      [
       "Bowl de iogurte",
       "4,50 €",
       "Iogurte grego, fruta, granola de chocolate e mel",
       "v"
      ],
      [
       "Bolo do dia",
       "4 €",
       "",
       "v"
      ],
      [
       "Croissant de manteiga ou compota",
       "3,50 €",
       "",
       "v"
      ],
      [
       "Croissant misto",
       "3,50 €",
       "Fiambre e queijo",
       ""
      ],
      [
       "Pastel de nata",
       "1,90 €",
       "",
       "v"
      ],
      [
       "Torrada",
       "3 €",
       "",
       "v"
      ],
      [
       "Tosta de queijo",
       "4,90 €",
       "",
       "v"
      ],
      [
       "Tosta mista",
       "4,90 €",
       "",
       ""
      ]
     ]
    }
   ]
  },
  {
   "id": "entradas",
   "titulo": "Entradas",
   "grupos": [
    {
     "itens": [
      [
       "Azeitonas",
       "1,50 €",
       "",
       "vg"
      ],
      [
       "Sopa do dia",
       "4 €",
       "",
       ""
      ],
      [
       "Guacamole com nachos",
       "6 €",
       "",
       "vg"
      ],
      [
       "Húmus",
       "5 €",
       "",
       "vg"
      ]
     ]
    }
   ]
  },
  {
   "id": "pratos",
   "titulo": "Pratos",
   "sub": "Das 12:00 às 21:30",
   "grupos": [
    {
     "itens": [
      [
       "Moussaka",
       "15 €",
       "Beringela assada, carne picada em molho de tomate e creme de feta gratinado",
       ""
      ],
      [
       "Moussaka vegan",
       "16 €",
       "Beringela assada, \"beyond meat\" em molho de tomate e gratinado de queijo vegetal",
       "vg"
      ],
      [
       "Batata-doce e beterraba assadas",
       "16 €",
       "Com burrata e pesto de nozes",
       "v"
      ],
      [
       "Souvlaki",
       "16 €",
       "Espetadas de frango com pimentos, tzatziki e pão pita",
       ""
      ],
      [
       "Salada mediterrânica de couscous",
       "14 €",
       "Salada quente de couscous salteado com legumes e hortelã",
       "vg"
      ],
      [
       "Poke bowl de frango",
       "15 €",
       "Arroz de sashimi, abacate, manga, batata-doce, edamame, gengibre, coentros e sésamo",
       ""
      ],
      [
       "Poke bowl de salmão",
       "17 €",
       "",
       ""
      ],
      [
       "Poke bowl de tofu",
       "15 €",
       "",
       "vg"
      ]
     ]
    }
   ]
  },
  {
   "id": "pizzas",
   "titulo": "Pizzas",
   "sub": "Massa sem glúten +4 € · caixa take away 0,50 €",
   "grupos": [
    {
     "nome": "Clássicas",
     "itens": [
      [
       "Duo",
       "9 €",
       "Tomate, mozzarella e fiambre",
       ""
      ],
      [
       "Calabresa",
       "9,50 €",
       "Tomate, mozzarella, chouriço e cebola",
       ""
      ],
      [
       "Havaiana",
       "10 €",
       "Tomate, mozzarella, fiambre e ananás",
       ""
      ],
      [
       "Salami",
       "10 €",
       "Tomate, mozzarella e salami",
       ""
      ],
      [
       "Napolitana",
       "9,90 €",
       "Tomate, mozzarella, anchovas e azeitonas",
       ""
      ],
      [
       "Al Tonno",
       "9,50 €",
       "Tomate, mozzarella e atum",
       ""
      ],
      [
       "Algarve",
       "10,50 €",
       "Tomate, mozzarella, sardinha, alcaparras e tomate cherry",
       ""
      ],
      [
       "Nazari",
       "9,50 €",
       "Tomate, mozzarella, gorgonzola, bechamel, nozes e mel",
       "v"
      ],
      [
       "Calzone",
       "9,90 €",
       "Tomate, mozzarella, fiambre, cogumelos e cebola",
       ""
      ]
     ]
    },
    {
     "nome": "Vegetarianas",
     "itens": [
      [
       "Margarita",
       "9 €",
       "Tomate e mozzarella",
       "v"
      ],
      [
       "Quattro Formaggi",
       "12 €",
       "Tomate, mozzarella, queijo de cabra, roquefort e parmesão",
       "v"
      ],
      [
       "Al Funghi",
       "9,50 €",
       "Tomate, mozzarella e cogumelos",
       "v"
      ]
     ]
    },
    {
     "nome": "Veganas",
     "itens": [
      [
       "Las Vegans",
       "12 €",
       "Tomate, mozzarella vegan, cogumelos, courgette, tomate cherry e rúcula",
       "vg"
      ],
      [
       "Al Funghi vegan",
       "9,50 €",
       "Tomate, mozzarella vegan e cogumelos",
       "vg"
      ],
      [
       "Margarita vegan",
       "9,50 €",
       "Tomate e mozzarella vegan",
       "vg"
      ]
     ]
    }
   ]
  },
  {
   "id": "infantil",
   "titulo": "Menu infantil",
   "grupos": [
    {
     "itens": [
      [
       "Esparguete à bolonhesa",
       "9 €",
       "",
       ""
      ],
      [
       "Mini pizza margarita",
       "8 €",
       "",
       "v"
      ]
     ]
    }
   ]
  },
  {
   "id": "bebidas",
   "titulo": "Bebidas",
   "grupos": [
    {
     "nome": "Sem álcool",
     "itens": [
      [
       "Água filtrada 1 L",
       "1 €",
       "",
       ""
      ],
      [
       "Água com gás 0,25 L",
       "2,50 €",
       "",
       ""
      ],
      [
       "Água com gás 0,75 L",
       "4 €",
       "",
       ""
      ],
      [
       "Sumo do dia",
       "3,50 €",
       "",
       ""
      ],
      [
       "Limonada",
       "3 €",
       "",
       ""
      ],
      [
       "Ice tea caseiro",
       "3 €",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Smoothies · 5,90 €",
     "itens": [
      [
       "Hiperproteico",
       "",
       "Bebida de soja, aveia, banana, whey e canela",
       ""
      ],
      [
       "Detox",
       "",
       "Ananás, espinafres, spirulina, gengibre e hortelã",
       "vg"
      ],
      [
       "Tropicolada",
       "",
       "Banana, ananás, leite de coco e hortelã",
       "vg"
      ],
      [
       "Morango",
       "",
       "Iogurte natural, banana e morango",
       "v"
      ],
      [
       "Café",
       "",
       "Amêndoas, nozes, banana, cacau e café",
       "vg"
      ]
     ]
    },
    {
     "nome": "Café e chá biológicos · até às 18:00",
     "itens": [
      [
       "Espresso",
       "1,20 €",
       "",
       ""
      ],
      [
       "Americano",
       "1,80 €",
       "",
       ""
      ],
      [
       "Galão",
       "2,50 €",
       "",
       ""
      ],
      [
       "Cappuccino",
       "2,80 €",
       "",
       ""
      ],
      [
       "Iced coffee",
       "2,80 €",
       "",
       ""
      ],
      [
       "Iced latte",
       "2,80 €",
       "",
       ""
      ],
      [
       "Tisana, bule pequeno",
       "3 €",
       "Camomila, erva-príncipe, cidreira, carqueja ou lúcia-lima",
       ""
      ],
      [
       "Tisana, bule grande",
       "5 €",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Cerveja e sidra",
     "itens": [
      [
       "Imperial",
       "2,50 €",
       "",
       ""
      ],
      [
       "Caneca",
       "4,50 €",
       "",
       ""
      ],
      [
       "IPA artesanal 0,25 L / pint",
       "4 € / 6 €",
       "",
       ""
      ],
      [
       "Stout artesanal 0,25 L / pint",
       "4 € / 6 €",
       "",
       ""
      ],
      [
       "Sidra local 0,25 L / pint",
       "4 € / 6 €",
       "",
       ""
      ],
      [
       "Sem álcool",
       "2,50 €",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Cocktails",
     "itens": [
      [
       "Gin tónico",
       "7 €",
       "",
       ""
      ],
      [
       "Porto tónico",
       "7 €",
       "",
       ""
      ],
      [
       "Caipirinha",
       "9 €",
       "",
       ""
      ],
      [
       "Mojito",
       "9 €",
       "",
       ""
      ],
      [
       "Aperol Spritz",
       "7 €",
       "",
       ""
      ],
      [
       "Vodka com sumo natural",
       "7 €",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinhos",
     "itens": [
      [
       "Vinho da casa a copo",
       "5 €",
       "Qta Vale Santa Luzia: branco, rosé ou tinto",
       ""
      ],
      [
       "Tinto reserva a copo",
       "6 €",
       "",
       ""
      ],
      [
       "Garrafas",
       "16 € a 26 €",
       "Seleção de vinhos portugueses, incluindo biológicos e um vinho natural",
       ""
      ],
      [
       "Vinhos do Porto",
       "5 € a 6 €",
       "",
       ""
      ],
      [
       "Aguardentes",
       "5 € a 8 €",
       "",
       ""
      ],
      [
       "Licores artesanais e portugueses",
       "4 € a 6 €",
       "",
       ""
      ]
     ]
    }
   ]
  }
 ],
 "nota": "IVA incluído. Se tiver alguma alergia ou intolerância alimentar, avise antes de pedir. Cada prato mostra a sua pegada de carbono no menu do restaurante."
};

/* Menu do Restaurante Nazari (texto corrido, usado pelo assistente) */
window.MENU_NAZARI = "RESTAURANTE NAZARI — cozinha mediterrânica (grega, italiana, Médio Oriente) com produtos do Algarve e de Portugal. Cada prato mostra a sua pegada de carbono.\n\nHORÁRIO\nAberto das 8:00 às 21:30\nPequeno-almoço: 8:00–10:30\nAlmoço e jantar: 12:00–21:30\nÀs terças-feiras só há pequeno-almoço e pizzas.\nCafés orgânicos e chás até às 18:00.\n\nPEQUENO-ALMOÇO\nBuffet de pequeno-almoço · 13 € por pessoa (não se pode partilhar nem levar)\n  Pão, croissant, panquecas, fiambre, cogumelos salteados, queijo, chouriço, compota, mel, ovos mexidos, iogurte, granola, cereais, fruta, bolo caseiro, café, leite, sumos de fruta, chá\nBowl de iogurte (iogurte grego, fruta, granola de chocolate e mel) · 4,5 €\nBolo do dia · 4 €\nCroissant de manteiga ou compota / croissant misto · 3,5 €\nPastel de nata · 1,9 €\nTorrada · 3 €\nTosta de queijo · 4,9 €\nTosta mista · 4,9 €\n\nENTRADAS\nAzeitonas · 1,5 €\nSopa do dia · 4 €\nGuacamole com nachos · 6 €\nHúmus · 5 €\n\nPRATOS\nMoussaka (beringela assada, carne picada, molho de tomate, creme de feta gratinado) · 15 €\nMoussaka vegan (beringela, \"beyond meat\", queijo vegetal) · 16 €\nBatata-doce e beterraba assadas com burrata e pesto de nozes · 16 €\nSouvlaki (espetadas de frango com pimentos, tzatziki e pão pita) · 16 €\nSalada mediterrânica de couscous (quente, com legumes e hortelã) · 14 €\nPoke bowl (arroz de sashimi, abacate, manga, batata-doce, edamame, gengibre, coentros, sésamo): frango 15 € · salmão 17 € · tofu 15 €\n\nPIZZAS — CLÁSSICAS\nDuo (tomate, mozzarella, fiambre) · 9 €\nCalabresa (tomate, mozzarella, chouriço, cebola) · 9,5 €\nHavaiana (tomate, mozzarella, fiambre, ananás) · 10 €\nSalami · 10 €\nNapolitana (anchovas e azeitonas) · 9,9 €\nAl Tonno (atum) · 9,5 €\nAlgarve (sardinha, alcaparras, tomate cherry) · 10,5 €\nNazari (tomate, mozzarella, gorgonzola, bechamel, nozes e mel) · 9,5 €\nCalzone (fiambre, cogumelos, cebola) · 9,9 €\n\nPIZZAS — VEGETARIANAS\nMargarita · 9 €\nQuattro Formaggi (cabra, roquefort, parmesão) · 12 €\nAl Funghi (cogumelos) · 9,5 €\n\nPIZZAS — VEGANAS\nLas Vegans (mozzarella vegan, cogumelos, courgette, tomate cherry, rúcula) · 12 €\nAl Funghi vegan · 9,5 €\nMargarita vegan · 9,5 €\n\nMassa sem glúten · +4 €\nCaixa take away · 0,5 €\n\nMENU INFANTIL\nEsparguete à bolonhesa · 9 €\nMini pizza margarita · 8 €\n\nBEBIDAS SEM ÁLCOOL\nÁgua filtrada 1 L · 1 € · Água com gás 0,25 L · 2,5 € / 0,75 L · 4 €\nSumo do dia · 3,5 € · Limonada · 3 € · Ice tea caseiro · 3 €\nSmoothies · 5,9 € (Hiperproteico, Detox, Tropicolada, Morango, Café)\n\nCAFÉ E CHÁ (orgânicos, até às 18:00)\nEspresso 1,2 € · Americano 1,8 € · Galão 2,5 € · Cappuccino 2,8 € · Iced coffee 2,8 € · Iced latte 2,8 €\nTisanas (camomila, erva-príncipe, cidreira, carqueja, lúcia-lima): bule pequeno 3 € · bule grande 5 €\n\nCERVEJA E SIDRA\nImperial 2,5 € · Caneca 4,5 € · IPA artesanal 4 € / pint 6 € · Stout artesanal 4 € / pint 6 € · Sidra local 4 € / pint 6 € · Sem álcool 2,5 €\n\nCOCKTAILS\nGin tónico 7 € · Porto tónico 7 € · Caipirinha 9 € · Mojito 9 € · Aperol Spritz 7 € · Vodka com sumo natural 7 €\n\nVINHOS\nVinho da casa (Qta Vale Santa Luzia) a copo: branco, rosé ou tinto 5 € · tinto reserva 6 €\nSangria branca ou tinta\nGarrafas de 16 € a 26 €, incluindo vinhos biológicos e um vinho natural (Beyras).\nVinhos do Porto 5–6 € · Aguardentes 5–8 € · Licores artesanais e portugueses 4–6 €\n\nIVA incluído. Se tiver alguma alergia ou intolerância alimentar, avise antes de pedir.";

/* Galerias de fotos de cada secção */
/* Pão e pastelaria da Eco Store: [padaria, hora de chegada, [[produto, preço]], folheto] */
window.PADARIAS = [
  ["Pão Nicolay", "entre as 08h00 e as 08h15", [
    ["Bola de cereais", 0.85], ["Papo-seco", 0.35], ["Meia baguete", 1.10], ["Pão branco pequeno · 400 g", 1.80],
    ["Pão integral · 500 g", 1.95], ["Croissant com chocolate", 1.80], ["Croissant simples", 1.75], ["Pastel de nata", 1.80]], "pao-nicolay.jpg"],
  ["Padaria Budens", "entre as 08h30 e as 08h45", [
    ["Baguete · trigo, 350 g", 1.65], ["Pão pequeno · trigo e centeio, 400 g", 1.80], ["Pão de cereais · multicereais, 400 g", 2.50], ["Pão médio · trigo e centeio, 785 g", 3.00],
    ["Croissant simples · contém leite e ovos", 1.40], ["Pastel de nata", 1.30], ["Pastel de amêndoa", 1.30]], "pao-budens.jpg"]
];
window.PAO_NOTA = "A Eco Store aceita encomendas de pão e pastelaria para o dia seguinte, até às 17h30. Assim garante que os produtos que quer estão disponíveis.";

window.GALERIAS = {
  restaurante: [["nazari-esplanada.jpg","Na esplanada"],["nazari-almoco.jpg","Almoço no Nazari"],["nazari-jantar.jpg","Jantar em família"]],
  alma: [["alma-yoga-meditacao.jpg","Aula de yoga no Alma Mater"],["alma-yoga-aula.jpg","Hatha Flow"]],
  ser: [["ser-porta.jpg","A casa do SER"],["ser-plantacao.jpg","Plantação no parque"],["ser-angela-green-key.jpg","Ângela e o certificado Green Key"]],
  store: [["loja-cosmetica-cestos.jpg","Cosmética, cestos e calçado"],["loja-mercearia.jpg","Mercearia biológica"],["loja-entrada.jpg","Mantas e artesanato à entrada"]],
  atividades: [["ativ-ebike.jpg","Bicicletas elétricas"],["ativ-quiosque.jpg","Pranchas e fatos"]]
};
window.NOTA_SER = "Certificados Green Key desde 2022, a caminho do Zero Desperdício, com pegada de carbono calculada todos os anos.";
