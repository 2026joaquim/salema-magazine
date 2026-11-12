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
/* =====================================================================
   PRÓXIMOS EVENTOS (fixos no site; os da folha do Google juntam-se a estes)
   data: AAAA-MM-DD · datas: várias datas do mesmo evento
   contacto: {texto, wa | tel | url}
   ===================================================================== */
window.EVENTOS=[
  {datas:["2026-11-06","2026-11-07"], hora:"a partir das 19:00", banner:"banner-buffet-indonesio.jpg", tipo:"Restaurante", local:"Restaurante Nazari",
   titulo:"Buffet indonésio no Nazari", cartaz:"evento-nazari-indonesio.jpg",
   descricao:"Sexta e sábado, um buffet de cozinha indonésia no restaurante Nazari.",
   preco:"Adulto 18 € · Criança (3–11 anos) 50 %",
   contacto:{texto:"Reservar: +351 282 030 672", tel:"+351 282 030 672"}},
  {data:"2026-11-08", hora:"17:00", tipo:"Família · grátis", local:"Sala Alma Mater", banner:"banner-capoeira.jpg",
   titulo:"Capoeira para famílias · apresentação gratuita", cartaz:"evento-capoeira.jpg",
   descricao:"Um espaço acolhedor e seguro onde pais e filhos se ligam através do jogo, do movimento e do ritmo. Para crianças de todas as idades, acompanhadas por um ou pelos dois pais. Não é preciso experiência. Com Sara Saggin, professora de educação física, capoeirista e osteopata, com mais de 20 anos de experiência.",
   preco:"Gratuito · confirmar até sábado, 7 de novembro",
   contacto:{texto:"Confirmar por WhatsApp (Sara)", wa:"+39 347 425 2978"}},
  {data:"2026-11-08", hora:"17:00", tipo:"Workshop", banner:"banner-joalharia.jpg",
   titulo:"Workshop de joalharia",
   descricao:"Um workshop para criar a sua própria joia. Domingo às 17:00."},
  {datas:["2026-11-13","2026-11-20","2026-11-27"], hora:"10:30", tipo:"Workshop",
   titulo:"Workshop de pintura criativa em azulejo", cartaz:"evento-azulejo.jpg",
   descricao:"Técnica de pintura a frio. Aberto a todos, sem experiência: um momento de convívio em que cada um cria uma peça única num azulejo artesanal, seguindo a sua inspiração. Todos os materiais incluídos.",
   preco:"18 € por pessoa · crianças até 11 anos 8 € · azulejo adicional 3 €",
   contacto:{texto:"Reservar por WhatsApp (Massimo)", wa:"+39 345 246 0842"}},
  {data:"2027-05-29", tipo:"Festa", local:"Magic Garden",
   titulo:"Love Riot · festa debaixo das árvores", cartaz:"evento-love-riot.jpg",
   descricao:"Mais uma grande festa no Magic Garden do Salema Eco Camp: glamping, cocktails, dance offs e convidados muito especiais a anunciar.",
   preco:"Bilhetes e informações em loveriot.club",
   contacto:{texto:"Bilhetes: loveriot.club", url:"https://loveriot.club"}}
];
/* Horários do shuttle grátis para a Praia da Salema (ex.: ["10:00","12:00"]).
   Vazio: o hóspede escreve a hora que prefere. */
window.SHUTTLE_HORAS=["10:00","12:00","15:00","17:00"];
/* Avisos fixos (além dos da folha do Google). "ate": último dia em que aparece.
   "fim" (opcional): data e hora exatas em que deixa de aparecer, em hora de Portugal
   (no inverno escreve-se com Z no fim, ex.: "2026-11-11T19:00:00Z"; no verão, +01:00). */
window.AVISOS=[
  {data:"2026-11-11", ate:"2026-11-13", tipo:"laranja", setor:"A tempestade passou ao lado 🍂", texto:"As piores previsões não se confirmaram e estamos muito gratos por a tempestade não nos ter atingido. Ficou um dia de outono com as primeiras chuvas a sério, que na próxima semana devem trazer os primeiros cogumelos do ano: a natureza a ser natureza. Estes 20 graus em novembro e o vento quente do sul deixam-nos sempre de sobreaviso, mas está tudo bem. Hoje muitos de nós ficaram em casa; amanhã o parque volta ao seu dia normal. É o outono a dizer que o verão acabou, mas não por muito tempo: hoje é dia de São Martinho e, segundo a tradição, vem aí o verão de São Martinho, com sol outra vez e castanhas assadas.", site:"https://www.infopedia.pt/artigos/$lenda-de-s.-martinho", siteTexto:"Conheça a lenda de São Martinho ›"},
  {data:"2026-11-10", ate:"2026-11-12", tipo:"info", setor:"Algum fumo no ar", texto:"Nestes dias pode sentir algum fumo no parque. São queimadas controladas feitas pelos nossos vizinhos agricultores. Com as primeiras chuvas, é a altura das limpezas nos terrenos à volta. Não é uma situação habitual, está sob controlo e não representa qualquer perigo. Coisas da vida do campo! 🌾 Se tiver alguma dúvida, fale connosco na receção."},
  {data:"2026-11-08", ate:"2026-11-12", tipo:"info", setor:"Restaurante Nazari", texto:"O nosso Nazari tem uma nova ementa a partir de hoje: comida de conforto (comfort food) para os dias mais frescos. Tamboril com camarão, bochechas de porco, guisado de grão com damascos, novas pizzas e muito mais, com a pegada de carbono de cada prato. Veja em Reservar › Restaurante Nazari."}
].filter(x=>!x.fim||new Date()<new Date(x.fim));
/* Painel de sustentabilidade: números (aparecem quando houver dados). Ex.: ["120 t","CO₂ compensado em 2025"] */
window.SUSTENTABILIDADE=[];
window.RESERVAS_EMAIL="reservas@salemaecocamp.com";
window.VALES_EMAIL="info@salemaecocamp.com";
window.TIPOS_ALOJAMENTO=["Glamping (tenda Inländ, yurt, tipi, safari ou dome)","Glamping Eco Lodge","Mobile home (T2 ou T3)","Apartamento ou estúdio","Campismo: tenda","Campismo: autocaravana ou caravana","Ainda não sei"];
window.CATALOG=[
  {id:"restaurante", nome:"Restaurante Nazari", cor:"--c-rest", email:"nazari@salemaecocamp.com", telefone:"+351 282 030 672", foto:"nazari-1.jpg", curto:"Mesas, refeições e pequeno-almoço",
   intro:"Cozinha mediterrânica com influências gregas, italianas e do Médio Oriente. Nova ementa de comida de conforto desde 8 de novembro. Cada prato mostra a sua pegada de carbono. Aberto das 8:00 às 21:00; às terças só há pequeno-almoço.",
   itens:[
    {id:"mesa", nome:"Reservar mesa", desc:"Almoço e jantar, até às 21:00", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"encomenda", nome:"Encomendar refeição para levar", desc:"Levante no restaurante · caixa 0,5 €. Para já não fazemos entregas no alojamento: em breve teremos entregas!", campos:["telefone","data","hora","pedido"]},
    {id:"pequeno-almoco", nome:"Pequeno-almoço", fotos:["evento-pequeno-almoco.jpg"], desc:"Buffet 13 € por pessoa · todos os dias, 8:00–10:30 · 27 % de desconto se reservar até à véspera", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"eventos", nome:"Festas e eventos", desc:"Aniversários, almoços e jantares de Natal, jantares temáticos e workshops", campos:["telefone","tipo","data","pessoas","notas"], tipoLabel:"Que tipo de evento?", tipoOpts:["Aniversário","Almoço de Natal","Jantar de Natal","Almoço ou jantar temático","Workshop","Outro evento"]},
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
    {id:"manta-la", nome:"Manta de lã virgem «Molly», 125 × 170 cm", desc:"40 € · 100 % lã virgem", fotos:["produto-manta-la-molly.jpg"], substitui:["Manta"],
     detalhe:"Manta de 100 % lã virgem com a ovelha «Molly», em castanho e cru, com franjas. Mede 125 × 170 cm. Quentinha para as noites frescas no parque, no sofá ou na cama dos mais pequenos.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"manta-espinha", nome:"Manta / Blanket, 140 × 180 cm", desc:"30 € · várias cores, com franjas", fotos:["produto-mantas-espinha.jpg"],
     detalhe:"Manta tecida em espinha, com franjas, em várias cores: rosa-claro, bordeaux, azul-petróleo, cinzento, castanho, verde, amarelo e cor-de-rosa. Mede 140 × 180 cm. Diga nas notas a cor que prefere, ou escolha na loja.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"cestas", nome:"Cesta feita em Portugal", desc:"grande 28 € · pequena 25 €", fotos:["produto-cestas.jpg"],
     detalhe:"Cestas entrançadas, feitas em Portugal, com riscas de cor e pegas castanhas. Boas para a praia, o mercado ou as compras do dia. Há dois tamanhos: a grande custa 28 € e a pequena 25 €.",
     tipoLabel:"Tamanho", tipoOpts:["Cesta grande · 28 €","Cesta pequena · 25 €"],
     campos:["tipo","quantidade","envio","notas"], loja:true},
    {id:"allmatters-gel", nome:"AllMatters · Intimate wash for your body and menstrual cup, 75 ml", desc:"6,30 € · vegan e biológico", fotos:["produto-allmatters-1.jpg","produto-allmatters-2.jpg"],
     detalhe:"Gel de limpeza 2 em 1: serve para limpar o copo menstrual antes da inserção/após a remoção e também como sabão de higiene íntima. Com pH equilibrado, o gel contém ingredientes biológicos e naturais, sem perfume. Vegan e Certificado Hipoalergénico pelo Allergy-Certified™. Apropriado para todos os tipos de pele.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"odeoliva-locao", nome:"Ode Oliva · Loção corporal / Body lotion 100 ml", desc:"13,80 € · artesanal e natural", fotos:["produto-odeoliva-1.jpg","produto-odeoliva-2.jpg"],
     detalhe:"Loção corporal hidratante artesanal, contém azeite, hidrolato de rosas, emulsionante, extrato de semente de romã, vitamina E, óleo essencial de gerânio e milefólio. Produto natural e biodegradável, consumindo o mínimo de recursos e reduzindo o impacto ambiental.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"mindthetrash-champo", nome:"Champô Sólido Mind the Trash · Cabelos normais (com condicionador)", desc:"9,30 € · natural, sem embalagem de plástico", fotos:["produto-mindthetrash-1.jpg","produto-mindthetrash-2.jpg"],
     detalhe:"Champô Sólido Mind The Trash desenvolvido de forma a respeitar o pH do cabelo, ajudando a hidratá-lo e nutri-lo. Formulado com ingredientes naturais e de origem natural, incluindo ingredientes provenientes de agricultura biológica. É indicado para cabelos normais deixando o cabelo leve, solto e macio.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"canecas", nome:"Caneca Salema Eco Camp", desc:"5,10 € · esmaltada, três desenhos", fotos:["produto-canecas.jpg"],
     detalhe:"A caneca do Salema Eco Camp, esmaltada, com os nossos desenhos e a inscrição «West Coast – Algarve». Três desenhos à escolha: a carrinha com o ramo, o ramo do Salema Eco Camp ou a carrinha com as pranchas de surf. Uma recordação do parque para o café da manhã, em casa ou na estrada.",
     tipoLabel:"Desenho", tipoOpts:["Carrinha com o ramo","Ramo do Salema Eco Camp","Carrinha com pranchas de surf"],
     campos:["tipo","quantidade","envio","notas"], loja:true},
    {id:"albustan-cabaz", nome:"Cabaz de legumes biológicos · Albustan – Hortas do Sol", desc:"desde 18 € · colhido na semana, de Bensafrim",
     detalhe:"Legumes biológicos certificados, da época, de uma pequena quinta em Bensafrim, aqui ao lado, que cultiva com práticas de agricultura regenerativa. São colhidos frescos todas as semanas para preparar os cabazes. Há dois cabazes, Regular e Green, a partir de 18 €. Peça aqui e nós tratamos da encomenda com a quinta. Para ver o que vem em cada cabaz, abra o site da Albustan.",
     site:{texto:"Ver os cabazes no site da Albustan", url:"https://albustanhortas.com/albustan-hortas-do-sol"},
     tipoLabel:"Cabaz", tipoOpts:["Regular Box","Green Box","Ainda não sei, quero mais informação"],
     campos:["tipo","quantidade","notas"], loja:true},
    {id:"alkarub-chai", nome:"Alkarub · Chai de alfarroba e especiarias, 30 saquetas", desc:"8,80 € · o único chai de alfarroba do mundo", fotos:["produto-alkarub-chai-1.jpg","produto-alkarub-chai-2.jpg"],
     detalhe:"O único chai de alfarroba do mundo: imperdível. Alfarroba do Algarve, apenas seca e triturada, com as especiarias da antiga rota da Índia: canela, gengibre, cardamomo, funcho, cravinho, pimenta preta e anis-estrelado. Um chai quente e aconchegante, naturalmente doce, sem açúcar adicionado e sem cafeína nem teína, por isso também é bom à noite. Ferva uma saqueta em 100 ml de água durante 5 minutos, junte 200 ml de leite ou bebida vegetal e aqueça. 30 saquetas de papel biodegradável (120 g). Feito no Algarve.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"alkarub-infusoes", nome:"Alkarub · Chá de alfarroba com plantas do Algarve", desc:"9,20 € · alecrim, laranja ou hortelã-pimenta", fotos:["produto-alkarub-alecrim.jpg","produto-alkarub-laranja.jpg","produto-alkarub-hortela.jpg","produto-alkarub-hortela-verso.jpg"],
     detalhe:"Chá de alfarroba misturado com plantas do Algarve, premiado pela inovação na Dieta Mediterrânica. Feito a partir das vagens da alfarroba: naturalmente doce, sem açúcar adicionado e sem cafeína nem teína. Três sabores: alecrim, laranja desidratada e hortelã-pimenta. Ferva a água, junte 2 colheres de chá e deixe em infusão 5 a 7 minutos. Feito no Algarve.",
     tipoLabel:"Sabor", tipoOpts:["Alecrim","Laranja","Hortelã-pimenta"],
     campos:["tipo","quantidade","envio","notas"], loja:true},
    {id:"kraus-mate", nome:"Kraus · Yerba Mate biológica, 25 saquetas", desc:"11,40 € · biológica e comércio justo", fotos:["produto-kraus-mate.jpg"],
     detalhe:"Yerba mate 100 % biológica e de comércio justo (Organic & Fair Trade), da Argentina. Sem fumo e secada ao ar, como manda a tradição, e sem glúten. Contém a cafeína natural do mate. Uma saqueta para 250 ml de água quente. Caixa de 25 saquetas (50 g). Certificação biológica OIA.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"arvore-sabao", nome:"Árvore do Sabão · Sabão de azeite feito à mão", desc:"8,00 € · artesanal, quatro aromas", fotos:["produto-arvore-sabao.jpg"],
     detalhe:"Sabões de azeite feitos à mão pela Árvore do Sabão, de produção artesanal portuguesa. Quatro aromas: canela e laranja doce, alfazema, lima e gengibre, e gengibre e framboesa. Embalados em cartão, sem plástico.",
     tipoLabel:"Aroma", tipoOpts:["Canela e laranja doce","Alfazema","Lima e gengibre","Gengibre e framboesa"],
     campos:["tipo","quantidade","envio","notas"], loja:true},
    {id:"sabao-alfarroba", nome:"Gabstar · Sabão artesanal de alfarroba", desc:"11,10 € a barra · feito na Raposeira, três aromas", fotos:["produto-sabao-alfarroba.jpg"],
     detalhe:"Sabonetes artesanais da Gabstar, feitos na Raposeira, em Vila do Bispo, aqui perto do parque. Levam alfarroba, azeite, óleo de coco e óleo de rícino, com menta, alecrim ou casca de laranja. Embalados em cartão, sem plástico. Preço por barra.",
     tipoLabel:"Aroma", tipoOpts:["Alfarroba e menta","Alfarroba e alecrim","Alfarroba e laranja"],
     campos:["tipo","quantidade","envio","notas"], loja:true},
    {id:"surfgel-spf50", nome:"Bell Surf Gel · Protetor solar SPF 50 resistente à água, 40 g", desc:"9,50 € · vegan e reef safe", fotos:["produto-surfgel-1.jpg","produto-surfgel-2.jpg"],
     detalhe:"Gel protetor solar SPF 50 (UVA/UVB), resistente à água, pensado para o surf e outros desportos aquáticos. Vegan, Reef Safe e aprovado pela PETA. Aplicar no rosto, pescoço, orelhas e decote cerca de 20 minutos antes da exposição ao sol; reaplicar de 2 em 2 horas e depois de nadar ou de secar com a toalha. Fabricado na Polónia.",
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
    {id:"shuttle", nome:"Shuttle grátis para a Praia da Salema", desc:"Grátis · 10:00, 12:00, 15:00 e 17:00, ida e volta · reserva na receção", destino:"rececao", campos:["data","hora","pessoas","notas"]},
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
  {id:"babysitting", nome:"Playdates", nota:"Para combinar brincadeiras entre crianças, sempre com os pais ou um adulto responsável presente. Combinado diretamente entre famílias; o parque não organiza nem se responsabiliza por estes encontros."},
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
   "8:00–21:00"
  ],
  [
   "Pequeno-almoço",
   "8:00–10:30"
  ],
  [
   "Terças",
   "só pequeno-almoço"
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
       "Pão, croissant, panquecas, fiambre, cogumelos salteados, queijo, chouriço, compota, mel, ovos mexidos, iogurte, granola, cereais, fruta, bolo caseiro, café, leite, sumos de fruta e chá. Preço por pessoa; não se pode partilhar nem levar.",
       "",
       ""
      ],
      [
       "Bowl de iogurte",
       "4,50 €",
       "Iogurte grego, fruta e granola de chocolate com mel",
       "v",
       ""
      ],
      [
       "Bolo do dia",
       "4 €",
       "",
       "v",
       ""
      ],
      [
       "Croissant de manteiga ou compota",
       "3 €",
       "",
       "v",
       ""
      ],
      [
       "Croissant misto",
       "3,50 €",
       "Fiambre e queijo",
       "",
       ""
      ],
      [
       "Pastel de nata",
       "1,90 €",
       "",
       "v",
       ""
      ],
      [
       "Torrada",
       "3 €",
       "Com manteiga",
       "v",
       ""
      ],
      [
       "Tosta de queijo",
       "4,90 €",
       "",
       "v",
       ""
      ],
      [
       "Tosta mista",
       "4,90 €",
       "Fiambre e queijo",
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
   "sub": "",
   "grupos": [
    {
     "itens": [
      [
       "Azeitonas",
       "1,50 €",
       "",
       "vg",
       ""
      ],
      [
       "Sopa do dia",
       "4 €",
       "",
       "",
       ""
      ],
      [
       "Guacamole com nachos",
       "6 €",
       "",
       "vg",
       ""
      ],
      [
       "Escabeche de legumes",
       "5 €",
       "",
       "vg",
       ""
      ],
      [
       "Salada mista",
       "4 €",
       "",
       "v",
       ""
      ]
     ]
    }
   ]
  },
  {
   "id": "pratos",
   "titulo": "Pratos",
   "sub": "",
   "grupos": [
    {
     "nome": "Peixe e carne",
     "itens": [
      [
       "Espetadas de tamboril com camarão",
       "17 €",
       "Com batata assada e legumes",
       "",
       ""
      ],
      [
       "Filetes de dourada com esmagada de batata",
       "16 €",
       "Com batata esmagada e tomate",
       "",
       ""
      ],
      [
       "Bochechas de porco a baixa temperatura",
       "16 €",
       "Com legumes salteados",
       "",
       ""
      ],
      [
       "Moussaka",
       "15 €",
       "Prato tradicional grego: beringela assada, carne picada em molho de tomate e queijo feta gratinado",
       "",
       "a"
      ],
      [
       "Souvlaki",
       "15 €",
       "Espetadas de frango com pimentos, molho tzatziki e pão pita",
       "",
       "a"
      ]
     ]
    },
    {
     "nome": "Vegetarianos e veganos",
     "itens": [
      [
       "Moussaka vegan",
       "15 €",
       "Beringela assada, \"beyond meat\" em molho de tomate e gratinado de queijo vegan",
       "vg",
       "b"
      ],
      [
       "Batata-doce assada com beterraba e burrata",
       "16 €",
       "Com molho pesto de nozes",
       "v",
       "b"
      ],
      [
       "Guisado de grão com damascos",
       "14 €",
       "Com espinafres e couscous",
       "v",
       "b"
      ],
      [
       "Espetadas de tofu com legumes",
       "16 €",
       "Com legumes salteados",
       "vg",
       "b"
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
       "11 €",
       "Tomate, mozzarella e fiambre",
       "",
       "m"
      ],
      [
       "Calabresa",
       "11 €",
       "Tomate, mozzarella, chouriço e cebola",
       "",
       "a"
      ],
      [
       "Havaiana",
       "12 €",
       "Tomate, mozzarella, fiambre e ananás",
       "",
       "m"
      ],
      [
       "Salami",
       "12 €",
       "Tomate, mozzarella e salami",
       "",
       "a"
      ],
      [
       "Al Tonno",
       "12 €",
       "Tomate, mozzarella, atum, cebola e azeitonas",
       "",
       "m"
      ],
      [
       "Algarve",
       "12 €",
       "Tomate, mozzarella, sardinha, alcaparras e tomate cherry",
       "",
       "m"
      ],
      [
       "Campestre",
       "13 €",
       "Tomate, mozzarella, frango desfiado e cogumelos",
       "",
       "m"
      ],
      [
       "Calzone",
       "12 €",
       "Tomate, mozzarella, fiambre, cogumelos e cebola",
       "",
       "m"
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
       "v",
       "m"
      ],
      [
       "Quattro Formaggi",
       "14 €",
       "Tomate, mozzarella, queijo de cabra, roquefort e parmesão",
       "v",
       ""
      ],
      [
       "Al Funghi",
       "12 €",
       "Tomate, mozzarella e cogumelos",
       "v",
       ""
      ],
      [
       "Nazari",
       "13 €",
       "Tomate, mozzarella, gorgonzola, bechamel, nozes e mel",
       "v",
       ""
      ],
      [
       "Burrata",
       "15 €",
       "Tomate, mozzarella, burrata e amêndoas",
       "v",
       "m"
      ]
     ]
    },
    {
     "nome": "Veganas",
     "itens": [
      [
       "Las Vegans",
       "13 €",
       "Tomate, mozzarella vegan, cogumelos, courgette, tomate cherry e rúcula",
       "vg",
       "b"
      ],
      [
       "Al Funghi vegan",
       "13 €",
       "Tomate, mozzarella vegan e cogumelos",
       "vg",
       "b"
      ],
      [
       "Margarita vegan",
       "11 €",
       "Tomate e mozzarella vegan",
       "vg",
       "b"
      ]
     ]
    }
   ]
  },
  {
   "id": "infantil",
   "titulo": "Menu infantil",
   "sub": "",
   "grupos": [
    {
     "itens": [
      [
       "Esparguete à bolonhesa",
       "9 €",
       "",
       "",
       "a"
      ],
      [
       "Mini pizza margarita",
       "8 €",
       "",
       "v",
       ""
      ]
     ]
    }
   ]
  },
  {
   "id": "bebidas",
   "titulo": "Bebidas",
   "sub": "",
   "grupos": [
    {
     "nome": "Café",
     "itens": [
      [
       "Espresso",
       "1,20 €",
       "",
       "",
       ""
      ],
      [
       "Americano",
       "1,80 €",
       "",
       "",
       ""
      ],
      [
       "Galão",
       "2,50 €",
       "",
       "",
       ""
      ],
      [
       "Cappuccino",
       "2,80 €",
       "",
       "",
       ""
      ],
      [
       "Iced coffee",
       "2,80 €",
       "",
       "",
       ""
      ],
      [
       "Iced latte",
       "2,80 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Tisanas",
     "itens": [
      [
       "Bule pequeno",
       "3 €",
       "Camomila, erva-príncipe, cidreira, alfarroba ou bela-luísa",
       "",
       ""
      ],
      [
       "Bule grande",
       "5 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Smoothies · 5,90 €",
     "itens": [
      [
       "Detox",
       "",
       "Ananás, espinafres, spirulina, gengibre e hortelã",
       "vg",
       ""
      ],
      [
       "Tropicolada",
       "",
       "Banana, ananás, leite de coco e hortelã",
       "vg",
       ""
      ],
      [
       "Morango",
       "",
       "Iogurte natural, banana e morango",
       "v",
       ""
      ],
      [
       "Café",
       "",
       "Amêndoas, nozes, banana, cacau e café",
       "vg",
       ""
      ]
     ]
    },
    {
     "nome": "Sem álcool",
     "itens": [
      [
       "Água filtrada 1 L",
       "1 €",
       "",
       "",
       ""
      ],
      [
       "Água com gás 0,25 L",
       "2,50 €",
       "",
       "",
       ""
      ],
      [
       "Água com gás 0,75 L",
       "4 €",
       "",
       "",
       ""
      ],
      [
       "Sumo do dia",
       "3,50 €",
       "",
       "",
       ""
      ],
      [
       "Limonada",
       "3 €",
       "",
       "",
       ""
      ],
      [
       "Ice tea caseiro",
       "3 €",
       "",
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
       "",
       ""
      ],
      [
       "Caneca",
       "4,50 €",
       "",
       "",
       ""
      ],
      [
       "IPA artesanal 0,25 L / pint",
       "4 € / 6 €",
       "",
       "",
       ""
      ],
      [
       "Stout artesanal 0,25 L / pint",
       "4 € / 6 €",
       "",
       "",
       ""
      ],
      [
       "Sidra local 0,25 L / pint",
       "4 € / 6 €",
       "",
       "",
       ""
      ],
      [
       "Cerveja sem álcool",
       "2,50 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Bar",
     "itens": [
      [
       "Gin tónico",
       "7 €",
       "",
       "",
       ""
      ],
      [
       "Porto tónico",
       "7 €",
       "",
       "",
       ""
      ],
      [
       "Caipirinha",
       "9 €",
       "",
       "",
       ""
      ],
      [
       "Mojito",
       "9 €",
       "",
       "",
       ""
      ],
      [
       "Aperol Spritz",
       "7 €",
       "",
       "",
       ""
      ],
      [
       "Vodka com sumo natural",
       "7 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinhos do Porto",
     "itens": [
      [
       "Branco seco, branco doce, tawny ou ruby",
       "5 €",
       "",
       "",
       ""
      ],
      [
       "Tawny reserva",
       "6 €",
       "",
       "",
       ""
      ],
      [
       "Late Bottled Vintage",
       "6 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Licores e aguardentes",
     "itens": [
      [
       "Licores artesanais",
       "4 €",
       "Amêndoa, figo, poejo, alfarroba e outros",
       "",
       ""
      ],
      [
       "Amarguinha, Licor Beirão ou ginginha",
       "4 €",
       "",
       "",
       ""
      ],
      [
       "Baileys",
       "6 €",
       "",
       "",
       ""
      ],
      [
       "Medronho ou brandy",
       "5 €",
       "",
       "",
       ""
      ],
      [
       "Scotch",
       "6 €",
       "",
       "",
       ""
      ],
      [
       "Scotch 12/15 anos",
       "8 €",
       "",
       "",
       ""
      ],
      [
       "Irish whiskey ou bourbon",
       "7 €",
       "",
       "",
       ""
      ]
     ]
    }
   ]
  },
  {
   "id": "vinhos",
   "titulo": "Vinhos",
   "sub": "Copo / garrafa",
   "grupos": [
    {
     "nome": "Vinho da casa · Qta Vale Santa Luzia",
     "itens": [
      [
       "Branco, rosé ou tinto",
       "5 € / 19 €",
       "",
       "",
       ""
      ],
      [
       "Tinto reserva",
       "6 € / 24 €",
       "",
       "",
       ""
      ],
      [
       "Sangria branca ou tinta",
       "5 € / 16 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinhos biológicos · brancos",
     "itens": [
      [
       "Beyras · Sauvignon Blanc",
       "21 €",
       "",
       "",
       ""
      ],
      [
       "Ânfora · Quinta de Montalto",
       "22 €",
       "",
       "",
       ""
      ],
      [
       "Quinta do Romeu",
       "22 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinhos biológicos · rosé",
     "itens": [
      [
       "Quinta do Romeu",
       "22 €",
       "",
       "",
       ""
      ],
      [
       "Altano",
       "19 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinhos biológicos · tintos",
     "itens": [
      [
       "Monte da Peceguina",
       "26 €",
       "",
       "",
       ""
      ],
      [
       "Ânfora · Quinta de Montalto",
       "22 €",
       "",
       "",
       ""
      ],
      [
       "Beyras",
       "21 €",
       "",
       "",
       ""
      ],
      [
       "Beyras · vinho natural",
       "24 €",
       "",
       "",
       ""
      ],
      [
       "Quinta do Romeu",
       "24 €",
       "",
       "",
       ""
      ],
      [
       "Altano",
       "19 €",
       "",
       "",
       ""
      ],
      [
       "Malhada · Quinta de Montalto",
       "19 €",
       "",
       "",
       ""
      ],
      [
       "Moinho de Gato",
       "19 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Vinho verde",
     "itens": [
      [
       "Aveleda",
       "18 €",
       "",
       "",
       ""
      ],
      [
       "Qta de S. Salvador da Torre",
       "16 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Outros brancos",
     "itens": [
      [
       "Barranco Longo Grande Escolha",
       "22 €",
       "",
       "",
       ""
      ],
      [
       "Ursos · Qta dos Vales",
       "19 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Outros rosés",
     "itens": [
      [
       "Ursos · Qta dos Vales",
       "19 €",
       "",
       "",
       ""
      ],
      [
       "Blush · Tête de Cuvée",
       "22 €",
       "",
       "",
       ""
      ]
     ]
    },
    {
     "nome": "Outros tintos",
     "itens": [
      [
       "Selecta · Quinta dos Vales",
       "19 €",
       "",
       "",
       ""
      ],
      [
       "Barranco Longo Private Selection",
       "22 €",
       "",
       "",
       ""
      ],
      [
       "Adega Maior Reserva",
       "24 €",
       "",
       "",
       ""
      ]
     ]
    }
   ]
  }
 ],
 "nota": "IVA incluído. Se tiver alguma alergia ou intolerância alimentar, avise antes de pedir. Este estabelecimento dispõe de livro de reclamações."
};

/* Menu do Restaurante Nazari (texto corrido, usado pelo assistente) */
window.MENU_NAZARI = "RESTAURANTE NAZARI — cozinha mediterrânica com produtos do Algarve e de Portugal. Nova ementa de comida de conforto (comfort food) desde 8 de novembro de 2026. Pegada de carbono por prato: baixa (até 999 g CO2), média (1000–1999 g), alta (mais de 2000 g).\n\nHORÁRIO\nAberto das 8:00 às 21:00. Pequeno-almoço das 8:00 às 10:30. Às terças-feiras só há pequeno-almoço.\n\nPEQUENO-ALMOÇO (Das 8:00 às 10:30)\n- Buffet de pequeno-almoço (Pão, croissant, panquecas, fiambre, cogumelos salteados, queijo, chouriço, compota, mel, ovos mexidos, iogurte, granola, cereais, fruta, bolo caseiro, café, leite, sumos de fruta e chá. Preço por pessoa; não se pode partilhar nem levar.) · 13 €\n- Bowl de iogurte (Iogurte grego, fruta e granola de chocolate com mel) · 4,50 € [vegetariano]\n- Bolo do dia · 4 € [vegetariano]\n- Croissant de manteiga ou compota · 3 € [vegetariano]\n- Croissant misto (Fiambre e queijo) · 3,50 €\n- Pastel de nata · 1,90 € [vegetariano]\n- Torrada (Com manteiga) · 3 € [vegetariano]\n- Tosta de queijo · 4,90 € [vegetariano]\n- Tosta mista (Fiambre e queijo) · 4,90 €\n\nENTRADAS\n- Azeitonas · 1,50 € [vegan]\n- Sopa do dia · 4 €\n- Guacamole com nachos · 6 € [vegan]\n- Escabeche de legumes · 5 € [vegan]\n- Salada mista · 4 € [vegetariano]\n\nPRATOS\nPeixe e carne:\n- Espetadas de tamboril com camarão (Com batata assada e legumes) · 17 €\n- Filetes de dourada com esmagada de batata (Com batata esmagada e tomate) · 16 €\n- Bochechas de porco a baixa temperatura (Com legumes salteados) · 16 €\n- Moussaka (Prato tradicional grego: beringela assada, carne picada em molho de tomate e queijo feta gratinado) · 15 € [pegada alta]\n- Souvlaki (Espetadas de frango com pimentos, molho tzatziki e pão pita) · 15 € [pegada alta]\nVegetarianos e veganos:\n- Moussaka vegan (Beringela assada, \"beyond meat\" em molho de tomate e gratinado de queijo vegan) · 15 € [vegan, pegada baixa]\n- Batata-doce assada com beterraba e burrata (Com molho pesto de nozes) · 16 € [vegetariano, pegada baixa]\n- Guisado de grão com damascos (Com espinafres e couscous) · 14 € [vegetariano, pegada baixa]\n- Espetadas de tofu com legumes (Com legumes salteados) · 16 € [vegan, pegada baixa]\n\nPIZZAS (Massa sem glúten +4 € · caixa take away 0,50 €)\nClássicas:\n- Duo (Tomate, mozzarella e fiambre) · 11 € [pegada média]\n- Calabresa (Tomate, mozzarella, chouriço e cebola) · 11 € [pegada alta]\n- Havaiana (Tomate, mozzarella, fiambre e ananás) · 12 € [pegada média]\n- Salami (Tomate, mozzarella e salami) · 12 € [pegada alta]\n- Al Tonno (Tomate, mozzarella, atum, cebola e azeitonas) · 12 € [pegada média]\n- Algarve (Tomate, mozzarella, sardinha, alcaparras e tomate cherry) · 12 € [pegada média]\n- Campestre (Tomate, mozzarella, frango desfiado e cogumelos) · 13 € [pegada média]\n- Calzone (Tomate, mozzarella, fiambre, cogumelos e cebola) · 12 € [pegada média]\nVegetarianas:\n- Margarita (Tomate e mozzarella) · 9 € [vegetariano, pegada média]\n- Quattro Formaggi (Tomate, mozzarella, queijo de cabra, roquefort e parmesão) · 14 € [vegetariano]\n- Al Funghi (Tomate, mozzarella e cogumelos) · 12 € [vegetariano]\n- Nazari (Tomate, mozzarella, gorgonzola, bechamel, nozes e mel) · 13 € [vegetariano]\n- Burrata (Tomate, mozzarella, burrata e amêndoas) · 15 € [vegetariano, pegada média]\nVeganas:\n- Las Vegans (Tomate, mozzarella vegan, cogumelos, courgette, tomate cherry e rúcula) · 13 € [vegan, pegada baixa]\n- Al Funghi vegan (Tomate, mozzarella vegan e cogumelos) · 13 € [vegan, pegada baixa]\n- Margarita vegan (Tomate e mozzarella vegan) · 11 € [vegan, pegada baixa]\n\nMENU INFANTIL\n- Esparguete à bolonhesa · 9 € [pegada alta]\n- Mini pizza margarita · 8 € [vegetariano]\n\nBEBIDAS\nCafé:\n- Espresso · 1,20 €\n- Americano · 1,80 €\n- Galão · 2,50 €\n- Cappuccino · 2,80 €\n- Iced coffee · 2,80 €\n- Iced latte · 2,80 €\nTisanas:\n- Bule pequeno (Camomila, erva-príncipe, cidreira, alfarroba ou bela-luísa) · 3 €\n- Bule grande · 5 €\nSmoothies · 5,90 €:\n- Detox (Ananás, espinafres, spirulina, gengibre e hortelã) [vegan]\n- Tropicolada (Banana, ananás, leite de coco e hortelã) [vegan]\n- Morango (Iogurte natural, banana e morango) [vegetariano]\n- Café (Amêndoas, nozes, banana, cacau e café) [vegan]\nSem álcool:\n- Água filtrada 1 L · 1 €\n- Água com gás 0,25 L · 2,50 €\n- Água com gás 0,75 L · 4 €\n- Sumo do dia · 3,50 €\n- Limonada · 3 €\n- Ice tea caseiro · 3 €\nCerveja e sidra:\n- Imperial · 2,50 €\n- Caneca · 4,50 €\n- IPA artesanal 0,25 L / pint · 4 € / 6 €\n- Stout artesanal 0,25 L / pint · 4 € / 6 €\n- Sidra local 0,25 L / pint · 4 € / 6 €\n- Cerveja sem álcool · 2,50 €\nBar:\n- Gin tónico · 7 €\n- Porto tónico · 7 €\n- Caipirinha · 9 €\n- Mojito · 9 €\n- Aperol Spritz · 7 €\n- Vodka com sumo natural · 7 €\nVinhos do Porto:\n- Branco seco, branco doce, tawny ou ruby · 5 €\n- Tawny reserva · 6 €\n- Late Bottled Vintage · 6 €\nLicores e aguardentes:\n- Licores artesanais (Amêndoa, figo, poejo, alfarroba e outros) · 4 €\n- Amarguinha, Licor Beirão ou ginginha · 4 €\n- Baileys · 6 €\n- Medronho ou brandy · 5 €\n- Scotch · 6 €\n- Scotch 12/15 anos · 8 €\n- Irish whiskey ou bourbon · 7 €\n\nVINHOS (Copo / garrafa)\nVinho da casa · Qta Vale Santa Luzia:\n- Branco, rosé ou tinto · 5 € / 19 €\n- Tinto reserva · 6 € / 24 €\n- Sangria branca ou tinta · 5 € / 16 €\nVinhos biológicos · brancos:\n- Beyras · Sauvignon Blanc · 21 €\n- Ânfora · Quinta de Montalto · 22 €\n- Quinta do Romeu · 22 €\nVinhos biológicos · rosé:\n- Quinta do Romeu · 22 €\n- Altano · 19 €\nVinhos biológicos · tintos:\n- Monte da Peceguina · 26 €\n- Ânfora · Quinta de Montalto · 22 €\n- Beyras · 21 €\n- Beyras · vinho natural · 24 €\n- Quinta do Romeu · 24 €\n- Altano · 19 €\n- Malhada · Quinta de Montalto · 19 €\n- Moinho de Gato · 19 €\nVinho verde:\n- Aveleda · 18 €\n- Qta de S. Salvador da Torre · 16 €\nOutros brancos:\n- Barranco Longo Grande Escolha · 22 €\n- Ursos · Qta dos Vales · 19 €\nOutros rosés:\n- Ursos · Qta dos Vales · 19 €\n- Blush · Tête de Cuvée · 22 €\nOutros tintos:\n- Selecta · Quinta dos Vales · 19 €\n- Barranco Longo Private Selection · 22 €\n- Adega Maior Reserva · 24 €\n\nIVA incluído. Se tiver alguma alergia ou intolerância alimentar, avise antes de pedir. Este estabelecimento dispõe de livro de reclamações.";

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
  restaurante: [["nazari-2.jpg","A esplanada ao anoitecer"],["nazari-9.jpg","A entrada do Nazari"],["nazari-10.jpg","A sala"],["nazari-4.jpg","Sob a buganvília"],["nazari-3.jpg","Pizza no forno a lenha"],["nazari-8.jpg","Poke bowls"],["nazari-7.jpg","Smoothies"],["nazari-5.jpg","A sala à noite"],["nazari-6.jpg","Recanto da esplanada"]],
  alma: [["alma-yoga-meditacao.jpg","Aula de yoga no Alma Mater"],["alma-yoga-aula.jpg","Hatha Flow"]],
  ser: [["ser-porta.jpg","A casa do SER"],["ser-plantacao.jpg","Plantação no parque"],["ser-angela-green-key.jpg","Ângela e o certificado Green Key"]],
  store: [["loja-cosmetica-cestos.jpg","Cosmética, cestos e calçado"],["loja-mercearia.jpg","Mercearia biológica"],["loja-entrada.jpg","Mantas e artesanato à entrada"]],
  atividades: [["ativ-ebike.jpg","Bicicletas elétricas"],["ativ-quiosque.jpg","Pranchas e fatos"]]
};
window.NOTA_SER = "Certificados Green Key desde 2022, a caminho do Zero Desperdício, com pegada de carbono calculada todos os anos.";
