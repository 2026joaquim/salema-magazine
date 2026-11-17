/* =====================================================================
   CONTEÚDO DO SALEMA ECO CAMP MAGAZINE
   Tudo o que os hóspedes leem está aqui: secções, preços, produtos,
   parceiros, trilho e menu. Para mudar um preço ou juntar um produto,
   altera-se este ficheiro (o Claude faz isso e envia o ficheiro novo).
   ===================================================================== */
window.MASSAGENS=[["Facial Lift 30 min","35 €"],["Pescoço e ombros 30 min","35 €"],["Clássica relaxante com óleo 45 min","45 €"],["Drenagem linfática 45 min","45 €"],["Facial Lift 45 min","45 €"],["Deep Tissue 45 min","50 €"],["Clássica relaxante com óleo 60 min","55 €"],["Drenagem linfática 60 min","55 €"],["Facial Lift 60 min","55 €"],["Deep Tissue 60 min","60 €"],["Clássica relaxante com óleo 90 min","80 €"],["Massagem ayurvédica 75 min","90 €"],["Reflexologia podal 30 min","35 €"],["Reflexologia podal 45 min","45 €"],["Reflexologia podal 60 min","55 €"],["Massagem na cadeira 45 min","40 €"],["Kobido, lifting natural da fáscia 60 min","55 €"],["Massagem personalizada com o terapeuta","sob consulta"]];
/* Horário de yoga: [dia, hora, aula, preço] */
window.YOGA=[
  ["Segunda","17:30–18:30","Yoga Nidra com Paul","15 €"],
  ["Terça","9:00–10:00","Free Yoga com Michelle Bavaresco (só hóspedes)","Grátis"],
  ["Quarta","8:00–9:15","Yoga Sādhanā com Mukta","15 €"],
  ["Quarta","9:30–10:45","Power Yoga com Sara Soldado","15 €"],
  ["Quarta","11:15–12:30","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Quarta","17:30–18:30","Yoga Nidra com Paul","15 €"],
  ["Sexta","9:00–10:15","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Sexta","11:00–12:15","Yoga Sādhanā com Mukta","15 €"],
  ["Sexta","17:30–18:30","Yoga Nidra com Paul","15 €"],
  ["Sábado","9:00–10:15","Hatha Flow com Michelle Bavaresco","15 €"],
  ["Sábado","17:30–18:30","Yoga Nidra com Paul","15 €"]
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
  {datas:["2026-11-17","2026-11-24"], hora:"16:30", tipo:"Família", local:"Sala Alma Mater", banner:"banner-capoeira.jpg",
   titulo:"Capoeira para famílias · terças-feiras",
   descricao:"Escolha o seu dia: terças às 16:30 ou domingos às 11:30, por marcação. Com Sara Saggin.",
   preco:"10 € por pessoa · lugares limitados",
   contacto:{texto:"Reservar por telefone ou WhatsApp (Sara)", wa:"+39 347 425 2978"}},
  {datas:["2026-11-22","2026-11-29"], hora:"11:30", tipo:"Família", local:"Sala Alma Mater", banner:"banner-capoeira.jpg",
   titulo:"Capoeira para famílias · domingos",
   descricao:"Escolha o seu dia: terças às 16:30 ou domingos às 11:30, por marcação. Com Sara Saggin.",
   preco:"10 € por pessoa · lugares limitados",
   contacto:{texto:"Reservar por telefone ou WhatsApp (Sara)", wa:"+39 347 425 2978"}},
  {data:"2026-11-08", hora:"17:00", tipo:"Workshop", banner:"banner-joalharia.jpg",
   titulo:"Workshop de joalharia",
   descricao:"Um workshop para criar a sua própria joia. Domingo às 17:00."},
  {datas:["2026-11-13","2026-11-20","2026-11-27"], hora:"10:30", tipo:"Workshop",
   titulo:"Workshop de pintura criativa em azulejo", cartaz:"evento-azulejo.jpg",
   descricao:"Técnica de pintura a frio. Aberto a todos, sem experiência: um momento de convívio em que cada um cria uma peça única num azulejo artesanal, seguindo a sua inspiração. Todos os materiais incluídos.",
   preco:"18 € por pessoa · crianças até 11 anos 8 € · azulejo adicional 3 €",
   contacto:{texto:"Reservar por WhatsApp (Massimo)", wa:"+39 345 246 0842"}},
  {datas:["2026-11-15","2026-11-29"], tipo:"Workshop",
   titulo:"Workshop de argila que seca ao ar", cartaz:"evento-argila.jpg",
   descricao:"Vamos pôr as mãos na massa! Um workshop de modelagem com argila que seca ao ar, sem forno: cada um cria e leva para casa a sua peça. Domingos, 15 e 29 de novembro.",
   contacto:{texto:"Informações e reservas por WhatsApp", wa:"+49 152 59466534"}},
  {data:"2026-11-21", tipo:"SER · Natureza",
   titulo:"Descubra a biodiversidade da Salema, com Vasco Fonseca", cartaz:"evento-biodiversidade.jpg",
   descricao:"Um passeio para conhecer as plantas, os animais e os ecossistemas à volta da Salema, com o Vasco Fonseca. Mais informações em breve."},
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
  {data:"2026-11-10", ate:"2026-11-12", tipo:"info", setor:"Algum fumo no ar", texto:"Nestes dias pode sentir algum fumo no parque. São queimadas controladas feitas pelos nossos vizinhos agricultores. Com as primeiras chuvas, é a altura das limpezas nos terrenos à volta. Não é uma situação habitual, está sob controlo e não representa qualquer perigo. Coisas da vida do campo! 🌾 Se tiver alguma dúvida, fale connosco na receção."},
  {data:"2026-11-08", ate:"2026-11-12", tipo:"info", setor:"Restaurante Nazari", texto:"O nosso Nazari tem uma nova ementa a partir de hoje: comida de conforto (comfort food) para os dias mais frescos. Tamboril com camarão, bochechas de porco, guisado de grão com damascos, novas pizzas e muito mais, com a pegada de carbono de cada prato. Veja em Reservar › Restaurante Nazari."}
].filter(x=>!x.fim||new Date()<new Date(x.fim));
/* Painel de sustentabilidade: números (aparecem quando houver dados). Ex.: ["120 t","CO₂ compensado em 2025"] */
window.SUSTENTABILIDADE=[];
window.RESERVAS_EMAIL="reservas@salemaecocamp.com";
window.VALES_EMAIL="info@salemaecocamp.com";
window.TIPOS_ALOJAMENTO=["Glamping (tenda Inländ, yurt, tipi, safari ou dome)","Glamping Eco Lodge","Mobile home (T2 ou T3)","Apartamento ou estúdio","Campismo: tenda","Campismo: autocaravana ou caravana","Ainda não sei"];
window.CATALOG=[
  {id:"restaurante", nome:"Restaurante Nazari", cor:"--c-rest", email:"reservas.nazari@salemaecocamp.com", whatsapp:"+351 938 903 456", whatsappNome:"WhatsApp do Nazari", telefone:"+351 282 030 672", foto:"nazari-1.jpg", curto:"Mesas, refeições e pequeno-almoço",
   intro:"Cozinha mediterrânica com influências gregas, italianas e do Médio Oriente. Nova ementa de comida de conforto desde 8 de novembro. Cada prato mostra a sua pegada de carbono. Aberto das 8:00 às 21:00; às terças só há pequeno-almoço.",
   itens:[
    {id:"mesa", nome:"Reservar mesa", canal:"wa", desc:"Almoço e jantar, até às 21:00 · por WhatsApp", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"encomenda", nome:"Encomendar refeição para levar", canal:"wa", desc:"Levante no restaurante · caixa 0,5 €. Para já não fazemos entregas no alojamento: em breve teremos entregas!", campos:["telefone","data","hora","pedido"]},
    {id:"pequeno-almoco", nome:"Pequeno-almoço", canal:"wa", fotos:["evento-pequeno-almoco.jpg"], desc:"Buffet 13 € por pessoa · todos os dias, 8:00–10:30 · 27 % de desconto se reservar até à véspera", campos:["telefone","data","hora","pessoas","notas"]},
    {id:"eventos", nome:"Festas, grupos e eventos", canal:"email", desc:"Aniversários, jantares de grupo, team building, Natal e outros eventos · por email", campos:["telefone","tipo","data","pessoas","notas"], tipoLabel:"Que tipo de evento?", tipoOpts:["Aniversário","Jantar ou almoço de grupo","Team building","Almoço de Natal","Jantar de Natal","Almoço ou jantar temático","Workshop","Outro evento"]},
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
    {id:"manta-espinha", nome:"Manta / Blanket, 140 × 180 cm", desc:"30 € · várias cores, com franjas", fotos:["produto-mantas-espinha.jpg"], substitui:["Manta"],
     detalhe:"Manta tecida em espinha, com franjas, em várias cores: rosa-claro, bordeaux, azul-petróleo, cinzento, castanho, verde, amarelo e cor-de-rosa. Mede 140 × 180 cm. Diga nas notas a cor que prefere, ou escolha na loja.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"manta-algodao", nome:"Manta / Blanket, 140 × 210 cm", desc:"35 € · 100 % algodão, várias cores", fotos:["produto-mantas-algodao.jpg"],
     detalhe:"Manta tecida em 100 % algodão, com franjas, em vários padrões e cores. Mede 140 × 210 cm. Diga nas notas o padrão que prefere, ou escolha na loja.",
     campos:["quantidade","envio","notas"], loja:true},
    {id:"tapete", nome:"Tapete / Rug", desc:"28 € · 150 × 100 cm ou 150 × 200 cm", fotos:["produto-tapetes.jpg"],
     detalhe:"Tapete tecido, em várias cores e padrões, nos tamanhos 150 × 100 cm e 150 × 200 cm. Diga nas notas o tamanho e a cor que prefere, ou escolha na loja.",
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

/* =====================================================================
   ZERO WASTE STORE — dentro da Eco Store
   cosmetica: o produto ecológico de cosmética da semana (20% de desconto)
     {nome, desc, preco (preço de loja, ex.: "11,10 €"), foto (em imagens/), ate:"AAAA-MM-DD"}
     null = ainda não há (aparece "em breve").
   validade: produtos com a data a terminar. O desconto conta-se sozinho:
     faltam 8 a 14 dias → 30%; faltam 7 dias ou menos → 50%. Depois da data, sai sozinho.
     {nome, preco (de loja), data:"AAAA-MM-DD" (a data do rótulo), foto (opcional), nota (opcional)}
     Só produtos com "consumir de preferência antes de". Nunca "consumir até".
   ===================================================================== */
window.ZERO_WASTE = {
  cosmetica: {nome:"Herbacin Kamille Hand Cream Soft (75 ml)",
    desc:"Creme de mãos com camomila e pantenol, de absorção rápida. Hidrata e deixa as mãos macias. Sem parabenos.",
    preco:"6,10 €", foto:"cosmetica-herbacin.jpg", ate:"2026-11-22"},
  cosmeticaDesconto: 20,
  validade: [],
  textoIntro: "Na nossa loja, nada se deita fora. Aqui encontra produtos que, de outra forma, iam para o lixo, com descontos a sério. Poupa o seu bolso e o planeta.",
  textoValidade: "Produtos com a data a terminar dentro de 1 ou 2 semanas. Têm a indicação «consumir de preferência antes de»: esta data indica até quando o produto mantém a melhor qualidade, não é um prazo de segurança. Com a embalagem fechada e bem guardada, continua excelente para consumir, mesmo depois da data. Faltam 2 semanas: −30%. Última semana: −50%.",
  textoPao: "Zero waste também no pão e nos bolos. A partir das 15:00, o pão e os bolos que sobraram da manhã passam a ser vendidos ao preço de compra, até a loja fechar. E para que não sobre nada: reserve hoje o seu pão para amanhã.",
  textoCosmetica: "A indústria cosmética é uma das que mais pesa no planeta: microplásticos e químicos que acabam nos rios e no mar, montanhas de embalagens de plástico, ingredientes de origem duvidosa e animais usados em testes. Os produtos de cosmética da nossa Eco Store são diferentes. São amigos do ambiente, com ingredientes naturais e embalagens que respeitam a terra. São amigos da sociedade, feitos por pequenos produtores e artesãos, muitos deles aqui do Algarve. E são amigos dos animais. Todas as semanas escolhemos um, com 20% de desconto, para o convidar a experimentar."
};

/* =====================================================================
   CONHEÇA A NOSSA REGIÃO — artigos e histórias (separador "Região")
   {id, titulo, eyebrow, fotos:[[ficheiro, legenda]], resumo, texto:[parágrafos], dicas:[...]}
   ===================================================================== */
window.REGIAO_INTRO = [
  "O Salema Eco Camp fica no extremo sudoeste da Europa, uma terra que já os antigos achavam especial. Gregos e romanos chamavam a esta ponta da Península o Promontório Sagrado, «Promontorium Sacrum»: o fim do mundo conhecido, onde o sol se afundava no oceano.",
  "O geógrafo grego Estrabão, citando Artemidoro, conta que ninguém podia passar ali a noite, porque à noite o lugar pertencia aos deuses. Aqui contamos as histórias desta terra onde os deuses dormiam: a natureza, as pedras, o mar, a história e as pessoas."
];
window.REGIAO = [
  {id:"aves", eyebrow:"Natureza · Migração das aves", titulo:"A grande passagem: as aves da Europa a caminho de África",
   fotos:[["https://commons.wikimedia.org/wiki/Special:FilePath/Phoenicopterus_roseus,_Lido_de_Thau_cf05.jpg?width=1400","Um bando de flamingos em voo. (Foto: Christian Ferrer, Wikimedia Commons)"],["https://commons.wikimedia.org/wiki/Special:FilePath/The_flight_of_a_griffon.jpg?width=1200","Um grifo a planar. Em outubro e novembro passam por aqui às centenas. (Foto: Artemy Voikhansky, Wikimedia Commons)"]],
   resumo:"Todos os outonos, milhares de aves de toda a Europa passam por cima de nós a caminho de África. Sagres é um dos grandes corredores migratórios da Europa, e tem o maior festival de observação de aves do país.",
   texto:[
     "Entre agosto e novembro acontece por cima das nossas cabeças um dos maiores espetáculos da natureza. Aves que fizeram ninho na Europa, da Escandinávia à Alemanha, de França a Espanha, descem para sul para passar o inverno em África, onde há comida e calor. Muitas delas passam por aqui: Sagres é considerado o terceiro corredor de aves migratórias mais importante da Europa, a seguir aos estreitos do Bósforo, na Turquia, e de Gibraltar.",
     "As grandes aves planadoras, como grifos, britangos, águias-calçadas, águias-cobreiras, milhafres e cegonhas-pretas, quase não batem as asas. Viajam como os planadores: procuram as correntes de ar quente que sobem da terra aquecida pelo sol, as térmicas, e sobem em espiral até ganharem altura. Depois deslizam, a perder altura devagar, até encontrarem a térmica seguinte. Por isso evitam o mar aberto, onde não há térmicas, e procuram a travessia mais curta para África: o Estreito de Gibraltar, com apenas 14 km.",
     "É aqui que o nosso cabo entra na história. Muitas aves, sobretudo as jovens na sua primeira viagem, descem pela costa oeste e chegam ao fim da terra, em Sagres e no Cabo de São Vicente. Ali o mar corta-lhes o caminho. Ficam a rodar sobre a península, a ganhar altura nas térmicas, até tomarem o rumo de leste, ao longo da costa do Algarve, em direção a Gibraltar. Às vezes passam mesmo por cima do parque.",
     "Os grifos são os últimos a partir: os grandes bandos passam sobretudo no fim de outubro e em novembro. Em dias bons contam-se centenas no céu de Sagres, e há registos de mais de 500 grifos num só dia. Com eles aparecem, por vezes, raridades como o grifo-de-Rüppell, um abutre africano, ou a águia-imperial-ibérica. Ao mesmo tempo, no mar, passam alcatrazes, cagarras e tordas-mergulheiras.",
     "Também os flamingos fazem parte deste vaivém entre a Europa e África. O lugar mais perto do parque para os ver é a Ria de Alvor, numa lagoa de água salgada na margem ocidental da ria, onde não é raro ver mais de 50 flamingos na primavera e no outono. Por vezes aparecem também aqui ao lado, no Paul da Boca do Rio.",
     "Para celebrar esta passagem, Sagres organiza todos os anos, no início de outubro, o Festival de Observação de Aves & Atividades de Natureza, organizado pela Câmara de Vila do Bispo, pela SPEA-BirdLife e pela Associação Almargem. É o maior evento do género em Portugal: em 2026, na 17.ª edição, teve 314 atividades em quatro dias, com observação de aves em terra e no mar, anilhagem, caminhadas, passeios de barco e a devolução à natureza de aves recuperadas."
   ],
   dicas:[
     "Os melhores dias são de sol, com pouco vento, a partir do fim da manhã, quando as térmicas se formam. Olhe para o céu: os bandos de grifos parecem um redemoinho de pontos escuros.",
     "Os melhores miradouros são o Cabo de São Vicente e os cerros à volta de Sagres. Leve binóculos e um casaco: na ponta do cabo faz vento.",
     "Para os flamingos, faça o passadiço da Ria de Alvor (cerca de 5 km, plano, a 30 minutos de carro).",
     "Marque já o festival no calendário: é sempre no início de outubro. O programa sai em birdwatchingsagres.com."
   ]},
  {id:"boca-do-rio", eyebrow:"Romanos · Boca do Rio, Budens", titulo:"Boca do Rio: o baú romano do atum",
   fotos:[["https://commons.wikimedia.org/wiki/Special:FilePath/ForteAlmadena2.jpg?width=1200","O Forte de Almádena, no alto da falésia, vigia a Boca do Rio."]],
   resumo:"Há 2000 anos, ali onde hoje há um paul e uma praia, havia um porto, uma casa senhorial com mosaicos e uma fábrica de conservas de peixe. O atum desta costa seguia em ânforas para Roma.",
   texto:[
     "Na época romana, o mar entrava pelo estuário da ribeira de Budens e formava uma grande laguna, onde hoje fica o Paul da Boca do Rio. Nas margens dessa laguna cresceu uma villa marítima: uma grande casa virada ao mar, com mosaicos e paredes pintadas, e ao lado um complexo industrial com grandes tanques de salga, alguns com 27 mil litros cada, e o seu próprio porto. Funcionou sobretudo entre os séculos II e V. Em 2018, uma equipa das universidades do Algarve e de Marburgo encontrou ali o porto romano mais bem conservado de Portugal.",
     "O tesouro desta costa era o atum. Na primavera, os cardumes passavam junto à costa a caminho do Mediterrâneo. Os pescadores cercavam-nos com redes perto da praia e puxavam-nos para terra, a mesma ideia das armações de atum que aqui continuaram durante séculos. Nos tanques, o peixe era salgado e transformado em molhos e pastas, como o famoso garum, o grande tempero dos romanos.",
     "Para viajar, o peixe precisava de ânforas. Eram feitas aqui perto, na Praia do Martinhal, em Sagres, o maior centro de olaria romana do Algarve, onde ainda se veem fornos nas arribas. Cheias de conservas, as ânforas seguiam por mar para Roma e para todo o Império.",
     "A Boca do Rio é, no fundo, um baú. Durante séculos, a areia das dunas guardou tudo. Foi o mar que o abriu: o grande temporal de 1715 e, sobretudo, o maremoto de 1 de novembro de 1755 arrancaram as dunas e puseram as ruínas à vista. Por isso este é hoje um dos melhores lugares da Europa para estudar a força de um tsunami. Conta a memória da terra que as gentes que viviam cá em baixo, junto ao mar, reconstruíram a sua aldeia lá em cima, longe das ondas: Almádena. A povoação era ali, na Boca do Rio.",
     "No alto da falésia ergue-se o Forte de São Luís de Almádena, construído em 1632. Uma das suas missões era proteger as armações de atum da Boca do Rio. Em 1774 voltou a montar-se ali uma armação, aproveitando as fundações romanas, e ainda restam as ruínas desses edifícios."
   ],
   dicas:[
     "Desça à praia da Boca do Rio na maré baixa: veem-se paredes romanas a sair do talude junto ao areal. Não suba nem pise as ruínas.",
     "Suba ao Forte de Almádena para a vista sobre a Boca do Rio, a Salema e a costa até Sagres. Cuidado com a beira da falésia.",
     "Os mosaicos e muitos objetos da Boca do Rio estão no Museu de Vila do Bispo – Celeiro da História.",
     "O Paul da Boca do Rio é uma zona húmida protegida: leve binóculos para as garças e, com sorte, uma lontra."
   ]},
  {id:"fortes", eyebrow:"Costa · Fortes e baterias", titulo:"Os fortes da nossa costa: sentinelas da primeira terra do Reino",
   fotos:[["https://commons.wikimedia.org/wiki/Special:FilePath/ForteAlmadena2.jpg?width=1200","Forte de São Luís de Almádena, 1632."],["https://commons.wikimedia.org/wiki/Special:FilePath/Fortaleza_de_Sagres_01.JPG?width=1200","A Fortaleza de Sagres, a cabeça desta rede de defesa."]],
   resumo:"Almádena, Zavial, Vera Cruz da Figueira, Burgau: ao longo das nossas falésias há uma fila de fortes. Guardavam as aldeias, as armações de atum e as naus que chegavam de longe.",
   texto:[
     "Para quem vinha do mar alto, do Atlântico, das Índias, do Brasil ou de África, o Cabo de São Vicente era a primeira terra do Reino de Portugal. Depois de meses de viagem, era aqui que as naus avistavam terra, dobravam o cabo e procuravam abrigo nas baías de Sagres e na costa até Lagos, à espera de bom vento ou para descansar e abastecer. Navios carregados de riquezas, perto de terra, eram um alvo apetecível.",
     "Por isso, sobretudo no século XVII, depois da Restauração de 1640, a costa foi coberta por uma rede de fortes e baterias ligada à praça de Lagos: Meia Praia, Ponta da Bandeira, Pinhão, Ponta da Piedade, Porto de Mós, Burgau, Almádena, Figueira, Zavial e, mais adiante, Sagres, Beliche e Baleeira. Os inimigos eram os corsários do Norte de África, piratas de várias bandeiras e as armadas de Espanha, Inglaterra ou Holanda.",
     "O Forte de São Luís de Almádena, também chamado Forte da Boca do Rio, foi construído em 1632, no alto da falésia, com fosso, baluartes, quartéis, uma ermida e baterias alta e baixa. Ficou danificado com o terramoto de 1755 e foi abandonado no século XIX.",
     "O Forte de Vera Cruz da Figueira, entre a Salema e a Praia da Figueira, é de cerca de 1640. Mostrou para que servia: em maio de 1670, corsários norte-africanos desembarcaram ali de noite para atacar a aldeia da Figueira e foram repelidos. Conta o padre da Figueira que o terramoto de 1755 atirou os seus canhões ao mar, e dois deles foram mais tarde encontrados debaixo de água, junto ao forte.",
     "A Bateria do Zavial, sobre a praia com o mesmo nome, completava a vigia deste troço da costa. Destes fortes restam hoje sobretudo ruínas, mas continuam no sítio que escolheram: os melhores miradouros da costa."
   ],
   dicas:[
     "Da Salema pode ir a pé pela falésia até ao Forte de Vera Cruz da Figueira: leve água e calçado próprio.",
     "Os fortes estão em ruínas e à beira de falésias altas: não suba aos muros e não se aproxime da beira.",
     "Ao pôr do sol, o Forte de Almádena e o Zavial são miradouros perfeitos.",
     "Para ver um forte inteiro, visite a Fortaleza de Sagres e a Fortaleza do Beliche, a caminho do Cabo de São Vicente."
   ]},
  {id:"museu", eyebrow:"Visitar · Vila do Bispo", titulo:"Museu de Vila do Bispo: a história toda num celeiro",
   fotos:[["regiao-museu.jpg","O Museu de Vila do Bispo – Celeiro da História, nos antigos celeiros do trigo, com a escultura «O Abraço» à entrada."]],
   resumo:"Tudo o que lê nesta secção, dos dinossauros aos menires, de Vale Boi aos naufrágios, está reunido num só lugar: o Celeiro da História, a 10 minutos do parque.",
   texto:[
     "Nos anos 50, Vila do Bispo era chamada «o celeiro do Algarve». O trigo de toda a região era guardado nos grandes celeiros da Federação Nacional dos Produtores de Trigo, mais tarde EPAC. Quando o trigo deixou de vir, o edifício ficou abandonado. A Câmara recuperou-o e, a 20 de janeiro de 2024, abriu ali o Museu de Vila do Bispo – Celeiro da História. O nome conta a história do próprio edifício: onde antes se guardava o trigo, guarda-se agora a memória da terra.",
     "O percurso começa há centenas de milhões de anos, com a geologia da Ponta do Telheiro e as pegadas de dinossauro da Salema. Segue pela pré-história: os caçadores de Vale Boi, os concheiros do Castelejo, os menires e as estelas de guerreiros da Idade do Bronze. Passa pelos romanos da Boca do Rio, uma das maiores fábricas de salga de peixe do Império, e pelo tempo do Al-Andalus, quando árabes, cristãos e judeus viviam lado a lado.",
     "Depois vem o mar: o Infante D. Henrique e os Descobrimentos, e os naufrágios desta costa. Em 1759, na Batalha de Lagos, o navio-almirante francês «Océan» encalhou e ardeu mesmo em frente à Salema, e os seus canhões fazem parte desta história. O percurso termina nas gentes do cabo: a pesca, os percebes, a agricultura e a máquina que escolhia o trigo nos celeiros.",
     "É um museu feito para a comunidade e com ela. Em 2025 recebeu o prémio nacional da Associação Portuguesa de Museologia para projetos de mediação educativa e cultural. Tem loja, cafetaria com esplanada, auditório e centro de documentação, e à entrada recebe-nos a escultura «O Abraço», de Teresa Paulino."
   ],
   dicas:[
     "Fica no Sítio das Eiras, em Vila do Bispo, a cerca de 10 minutos de carro do parque.",
     "A entrada tem sido gratuita. Confirme os horários em museuviladobispo.pt antes de ir.",
     "Combine a visita com a Igreja Matriz de Vila do Bispo, toda forrada de azulejos, mesmo ali ao lado.",
     "Ótimo programa para um dia de chuva ou de vento, e muito bom para crianças."
   ]},
  {id:"nomes-arabes", eyebrow:"História · Salema e Budens", titulo:"Salema e Budens: nomes com sotaque árabe",
   fotos:[["regiao-salema.jpg","A Salema vista da falésia: a aldeia branca, a praia e a enseada abrigada."]],
   resumo:"Durante mais de 500 anos, esta costa fez parte do Al-Andalus. Os nomes das nossas aldeias ainda guardam esse passado: Salema, a paz; Budens, uma família de outros tempos.",
   texto:[
     "Entre o ano 711 e meados do século XIII, o Algarve foi terra muçulmana, parte do Al-Andalus. O próprio nome Algarve vem do árabe «al-Gharb», o Ocidente. Durante mais de cinco séculos, árabes e berberes viveram aqui ao lado de cristãos e judeus: trouxeram a nora e a açoteia, as amêndoas, os figos e os citrinos, e deixaram centenas de palavras e de nomes de lugares.",
     "Salema é um deles. O nome vem do árabe «salam»: paz, segurança. E faz todo o sentido: a enseada abrigada da Salema foi, desde sempre, um porto seguro para os barcos de pesca, protegida entre as falésias e o mar aberto. Um lugar de paz, como o nome diz.",
     "Budens, a aldeia da nossa freguesia, também terá origem árabe. Segundo a tradição local, o nome lembra uma família ou tribo árabe, os Abudani, que se teria instalado nestes vales férteis, com água e boas terras para cultivar. Os documentos antigos são poucos, e os linguistas ainda discutem estas origens, mas a memória ficou no nome.",
     "Mais tarde, a Salema cresceu como aldeia de pescadores, e assim continua: os barcos ainda descansam no areal ao lado dos banhistas, e é por isso que jornais como o The Guardian a puseram entre as praias mais bonitas do mundo. A freguesia de Budens junta cinco aldeias, Budens, Salema, Burgau, Figueira e Vale de Boi, e a Rota das 5 Aldeias, com o Trilho dos Romanos e dos Piratas e o Trilho dos Dinossauros, liga-as a pé."
   ],
   dicas:[
     "Desça à Salema ao fim da tarde, quando os pescadores voltam com o peixe: ainda se veem os barcos puxados para a areia.",
     "Procure as chaminés rendilhadas e as açoteias nas casas antigas das aldeias: são heranças do tempo árabe.",
     "Faça um dos percursos da Rota das 5 Aldeias de Budens (PR7 e PR8). Pergunte na receção pelos mapas."
   ]},
  {id:"vale-boi", eyebrow:"Pré-história · Vale Boi, Budens", titulo:"Vale Boi: os primeiros vizinhos, há mais de 30 mil anos",
   fotos:[["regiao-vale-boi.jpg","O vale de Vale Boi, em Budens."]],
   resumo:"A três quilómetros do parque, num abrigo de rocha em Vale Boi, viveram caçadores-recolectores do Paleolítico. É o sítio com os vestígios mais antigos do Homo sapiens em todo o sul da Península Ibérica.",
   texto:[
     "Imagine o vale de Budens há 30 mil anos. Fazia mais frio, o mar estava muito mais longe, e por estes montes andavam auroques, cavalos, veados e até leões e rinocerontes. Num abrigo de rocha virado a sul, junto à ribeira de Vale Boi, um grupo de caçadores-recolectores fez a sua casa.",
     "O sítio foi descoberto em 1998 e é escavado há mais de vinte anos por arqueólogos da Universidade do Algarve. É hoje considerado o maior sítio do Paleolítico Superior em Portugal e guarda os vestígios mais antigos do homem moderno, o Homo sapiens, em todo o sul da Península: com cerca de 33 a 34 mil anos.",
     "Os arqueólogos encontraram milhares de pontas de seta e lâminas de sílex, utensílios de osso, conchas usadas como adorno e restos dos animais caçados e do marisco apanhado na costa. E encontraram arte: uma pequena placa de pedra com cerca de 24 mil anos, com figuras de animais gravadas, uma das primeiras provas de arte do Paleolítico no sul de Portugal.",
     "Durante milhares de anos, sucessivas gerações voltaram ao mesmo abrigo, até ao tempo dos primeiros agricultores. Antes deles, o concelho já tinha sido terra de Neandertais, com vestígios em sítios como a Lagoa Funda e a Lagoa do Bordoal, e de caçadores ainda mais antigos, do Paleolítico Inferior. A presença humana nesta ponta da Europa perde-se no tempo.",
     "Da próxima vez que passar por Budens, a caminho da praia, lembre-se: está a pisar um dos lugares onde os humanos vivem há mais tempo em Portugal."
   ],
   dicas:[
     "Vale Boi fica a cerca de 3 km do parque, em Budens. O sítio arqueológico não está aberto a visitas livres: há dias abertos durante as campanhas de escavação, normalmente no verão.",
     "Alguns achados, como a placa gravada, já foram mostrados em exposições em Vila do Bispo. Pergunte no posto de turismo ou na Câmara se há alguma em curso.",
     "Respeite os sítios arqueológicos: não escave, não recolha pedras nem objetos. Se encontrar algo que pareça antigo, deixe ficar e avise a Câmara Municipal."
   ]},
  {id:"menires", eyebrow:"Pré-história · Menires de Vila do Bispo", titulo:"Os menires de Vila do Bispo: pedras com 6 mil anos",
   fotos:[["regiao-menir-padrao.jpg","O Menir do Padrão, perto da Raposeira."],["https://commons.wikimedia.org/wiki/Special:FilePath/Monte_dos_Amantes_Vila_do_Bispo.jpg?width=800","Menires do Monte dos Amantes, em Vila do Bispo. (Foto: Wikimedia Commons)"]],
   resumo:"Muito antes de Stonehenge, os primeiros agricultores desta costa levantaram centenas de pedras sagradas. Vila do Bispo tem uma das maiores concentrações de menires do mundo.",
   texto:[
     "Há cerca de 6 mil anos, no Neolítico, os caçadores deram lugar aos primeiros agricultores e pastores. Foram eles que, nos cerros de Vila do Bispo e da Raposeira, arrancaram, talharam e levantaram grandes pedras de calcário: os menires.",
     "No concelho estão identificados cerca de 250 menires ou fragmentos, numa área de apenas 42 quilómetros quadrados. É uma das maiores concentrações conhecidas em todo o mundo. Há menires isolados, em pares e em grupos, como os do Padrão e do Milrei, perto da praia da Ingrina, os do Monte dos Amantes, o do Cerro do Camacho e o da Aspradantes, na Raposeira.",
     "Para que serviam? Ninguém sabe ao certo. Muitos estão no alto dos cerros, virados para o nascer do sol ou para o mar, e alguns têm gravuras: linhas, círculos, serpentes e cajados. Os arqueólogos pensam que marcavam territórios, caminhos e lugares de reunião, e que estavam ligados ao culto do sol, da lua, das estações e da fertilidade da terra, de que dependiam as sementeiras e as colheitas.",
     "Os menires do sudoeste estão entre os mais antigos da Europa. A hipótese dos investigadores é que o fenómeno megalítico se tenha desenvolvido de sul para norte, e um projeto internacional, «Megalithic Origins», tem escavado aqui para perceber como começou. Por isso há quem chame ao Menir do Padrão, a brincar, «a primeira pedra de Stonehenge»."
   ],
   dicas:[
     "Os menires do Padrão e do Milrei ficam a sul da Raposeira, a caminho da praia da Ingrina, a cerca de 10 minutos de carro do parque.",
     "Os do Monte dos Amantes e do Cerro do Camacho ficam junto a Vila do Bispo. Há placas a indicar alguns deles.",
     "Vá ao nascer ou ao pôr do sol: a luz rasante faz aparecer as gravuras.",
     "Não suba nem se encoste aos menires: são monumentos com milhares de anos."
   ]},
  {id:"sao-vicente", eyebrow:"História e lenda · Cabo de São Vicente", titulo:"O corpo de São Vicente e os corvos do Cabo",
   fotos:[["https://commons.wikimedia.org/wiki/Special:FilePath/LSB.png?width=360","O brasão de Lisboa: o barco com as relíquias de São Vicente e os dois corvos, um à proa e outro à popa. (Brasão: Sérgio Horta, Wikimedia Commons, CC BY-SA 3.0)","brasao"]],
   resumo:"Durante séculos, o corpo de um mártir esteve guardado no fim da Europa, vigiado por corvos. Em 1173, D. Afonso Henriques levou-o para Lisboa, e os corvos foram atrás.",
   texto:[
     "Vicente era um jovem diácono de Saragoça, martirizado em Valência no ano de 304, no tempo das perseguições romanas aos cristãos. Conta a lenda que o seu corpo foi lançado aos animais e depois ao mar, mas que os corvos o protegeram e as ondas o devolveram à costa. Depressa se tornou um dos santos mais venerados da Península Ibérica.",
     "Quando os muçulmanos chegaram à Península, no século VIII, os cristãos de Valência terão fugido com as relíquias do santo e navegado até ao ponto mais extremo que conheciam: o antigo Promontório Sagrado. Ali as esconderam e ergueram um pequeno santuário, sempre vigiado por corvos. O lugar passou a chamar-se Cabo de São Vicente.",
     "Não é só lenda. No século XII, o geógrafo árabe Al-Idrisi descreveu no cabo uma igreja guardada por corvos, a que chamou «Kanisat al-Ghurab», a Igreja do Corvo. Cristãos e muçulmanos conheciam o lugar e respeitavam-no. Os peregrinos continuaram a chegar, mesmo sob domínio muçulmano.",
     "Em 1173, D. Afonso Henriques, o primeiro rei de Portugal, mandou buscar o corpo do santo. O Algarve ainda era muçulmano, mas o rei queria as relíquias para Lisboa, conquistada aos mouros em 1147. Diz a tradição que o barco que as levou foi acompanhado por dois corvos durante toda a viagem, um à proa e outro à popa. As relíquias foram depositadas no altar-mor da Sé, e São Vicente tornou-se o padroeiro de Lisboa. Ainda hoje, o barco e os dois corvos estão no brasão da cidade.",
     "Na Idade Média, as relíquias de um santo eram um tesouro. Davam proteção divina e prestígio, atraíam peregrinos e riqueza e, sobretudo, davam legitimidade. Para um reino acabado de nascer, ter um santo tão famoso numa cidade acabada de conquistar era a prova de que Portugal tinha a bênção do Céu. Os historiadores veem nesta trasladação o símbolo da cristianização definitiva de Lisboa, e a cidade passou a festejar todos os anos a chegada das relíquias.",
     "O santo nunca deixou de ser da nossa costa: São Vicente é também o padroeiro do Algarve, festejado a 22 de janeiro. E em 2024, depois de 850 anos em Lisboa, um pequeno osso da sua mão voltou ao Algarve, para a Sé de Faro."
   ],
   dicas:[
     "O Cabo de São Vicente fica a cerca de 25 minutos de carro do parque, depois de Sagres.",
     "O farol foi construído sobre as ruínas do antigo convento franciscano do cabo, herdeiro da Igreja do Corvo.",
     "Repare nos corvos e nas gralhas que voam sobre as falésias: são os guardiões da lenda.",
     "Ao pôr do sol há muita gente: chegue mais cedo, leve um casaco e não passe as vedações das falésias.",
     "Em Lisboa, procure os corvos no brasão da cidade, nos candeeiros e nas calçadas."
   ]},
  {id:"sagres", eyebrow:"História · Fortaleza de Sagres", titulo:"Sagres: a ponta da Europa que abriu as portas do mundo",
   fotos:[["https://commons.wikimedia.org/wiki/Special:FilePath/Fortaleza_de_Sagres_01.JPG?width=1200","A Fortaleza de Sagres, na ponta do promontório. (Foto: Wikimedia Commons)"]],
   resumo:"Nesta ponta de rocha, o Infante D. Henrique olhou para o mar desconhecido. Com a herança dos Templários, lançou a aventura que ligou a Europa a África, à Ásia e às Américas.",
   texto:[
     "Durante séculos, o Cabo de São Vicente e a Ponta de Sagres foram o fim do mundo conhecido. Para lá ficava o «Mar Tenebroso», cheio de lendas e de monstros. No século XV, este promontório passou a ser o contrário: o ponto de partida para o desconhecido.",
     "A história começa com os Templários. Em 1307, o rei de França perseguiu a Ordem do Templo para se apoderar das suas riquezas, e em 1312 o papa extinguiu-a. Os bens deviam passar para outra ordem, mas o rei D. Dinis não deixou que se perdessem. Depois de sete anos de negociações com o papa, criou uma ordem portuguesa, a Ordem de Cristo, aprovada em 1319, que herdou os castelos, as terras e muitos dos cavaleiros do Templo. Mais do que fugir ao papa, foi uma jogada de mestre: em Portugal, os Templários mudaram de nome e continuaram, agora ao serviço do reino.",
     "Um século depois, o Infante D. Henrique, filho de D. João I e de D. Filipa de Lencastre, tornou-se administrador da Ordem de Cristo. Com a sua riqueza financiou as viagens pelo Atlântico, e a cruz vermelha da Ordem passou a ir pintada nas velas das caravelas. O Infante escolheu esta ponta do Algarve: mandou construir aqui a sua vila, junto ao Cabo de São Vicente, e foi em Sagres que morreu, em 1460.",
     "Daqui e do porto de Lagos, ali ao lado, os navegadores foram cada vez mais longe: a Madeira e os Açores, o Cabo Bojador, dobrado por Gil Eanes em 1434, e depois toda a costa de África. A caravela, leve e capaz de navegar contra o vento, e a arte de se orientar pelos astros abriram o caminho a Bartolomeu Dias, que dobrou o Cabo da Boa Esperança, e a Vasco da Gama, que chegou à Índia por mar em 1498. Pela primeira vez, os oceanos ligaram os continentes. Começava o mundo global, e Portugal e a Europa abriam as portas do mundo a partir desta ponta de rocha.",
     "Fala-se muito da «Escola de Sagres», onde sábios e navegadores teriam estudado com o Infante. Os historiadores dizem que nunca existiu como escola: o que houve foi uma rede de marinheiros, cartógrafos e astrónomos que o Infante reuniu e apoiou. A lenda nasceu séculos mais tarde, mas diz bem o que aqui se viveu.",
     "A fortaleza que hoje se visita foi reforçada no tempo de D. Sebastião, atacada pelo corsário inglês Francis Drake em 1587 e abalada pelo terramoto de 1755. Lá dentro há uma enorme rosa dos ventos feita de pedras no chão, com 43 metros de diâmetro, descoberta nos restauros do século XX e que poderá vir do tempo do Infante, e a pequena igreja de Nossa Senhora da Graça. Lá fora, a falésia a pique, o vento e o Atlântico: o mesmo horizonte que o Infante olhava."
   ],
   dicas:[
     "A Fortaleza de Sagres fica a cerca de 20 minutos de carro do parque. Confirme o horário de abertura antes de ir.",
     "Percorra o caminho à volta da ponta: as vistas sobre as falésias e o mar são das mais bonitas da costa.",
     "Ao fim da tarde, siga até ao Cabo de São Vicente para ver o pôr do sol no fim da Europa.",
     "Leve um casaco: na ponta de Sagres venta quase sempre.",
     "Não passe as vedações nem se aproxime da beira das falésias."
   ]},
  {id:"telheiro", eyebrow:"Geologia · Praia do Telheiro, Sagres", titulo:"Telheiro: a falésia onde se leem 70 milhões de anos em falta",
   fotos:[["regiao-telheiro.jpg","A Praia do Telheiro e a Ponta do Telheiro, com as rochas dobradas por baixo e as camadas vermelhas por cima"]],
   resumo:"Na Ponta do Telheiro, junto ao Cabo de São Vicente, a falésia mostra duas eras da Terra encostadas uma à outra. É um dos 100 sítios de património geológico mais importantes do mundo.",
   texto:[
     "Olhe para a falésia da Ponta do Telheiro e vai ver duas rochas muito diferentes. Em baixo, camadas escuras de xisto e grauvaque, dobradas e postas quase na vertical. Em cima, bancadas vermelhas de arenito, deitadas quase na horizontal. A linha que as separa chama-se discordância angular, e é uma das mais espetaculares do mundo.",
     "As rochas de baixo são do Carbónico Superior, com mais de 300 milhões de anos. Formaram-se no fundo de um antigo oceano, entre dois continentes que se aproximavam. Quando esses continentes chocaram e formaram o supercontinente Pangeia, as camadas foram esmagadas, dobradas e levantadas numa grande cadeia de montanhas, a cordilheira Varisca.",
     "Durante dezenas de milhões de anos, a chuva, o vento e os rios gastaram essas montanhas até ficarem planas. Só depois, no Triásico Superior, quando a Pangeia começou a partir-se, rios de um clima quente e seco espalharam por cima areias vermelhas: são os arenitos do Grés de Silves, o mesmo «Algarve vermelho» do castelo de Silves.",
     "Entre as duas rochas faltam cerca de 70 milhões de anos de história, como um livro a que arrancaram dezenas de páginas. Num só olhar vê-se um ciclo inteiro da Terra: um oceano que se forma, montanhas que nascem e se desfazem, e um continente que se começa a abrir. Por isso o Telheiro foi escolhido pela União Internacional das Ciências Geológicas (IUGS) como um dos primeiros 100 Sítios de Património Geológico do mundo, e é visitado por geólogos de todo o planeta."
   ],
   dicas:[
     "A Ponta do Telheiro fica na costa oeste, a norte do Cabo de São Vicente, no concelho de Vila do Bispo. Chega-se por caminhos de terra.",
     "A melhor vista da discordância é do alto da arriba e da própria praia. A descida para a praia é íngreme: use calçado próprio.",
     "Mantenha-se nos trilhos: a vegetação das arribas é única e frágil, e pisá-la acelera a erosão do geomonumento.",
     "Não se aproxime da beira da falésia nem da base das arribas: há risco de queda e de derrocadas.",
     "Leve água e proteção do sol: não há sombra nem serviços na praia."
   ]},
  {id:"dinossauros", eyebrow:"Geologia · Praia da Salema", titulo:"Pegadas de dinossauros na Praia da Salema",
   fotos:[["regiao-pegadas-salema.jpg","Pista de pegadas na laje de rocha, junto ao mar"],["regiao-pegada-dinossauro.jpg","Uma pegada de três dedos, vista de perto"]],
   resumo:"Há cerca de 120 milhões de anos, dinossauros caminharam pela lama onde hoje fica a Praia da Salema. Os seus passos ainda lá estão, gravados na rocha.",
   texto:[
     "No Cretácico Inferior, há cerca de 120 milhões de anos, a Salema não tinha praia nem falésias. Era uma planície costeira de lama e lagoas pouco fundas, à beira de um mar quente, e a Península Ibérica tinha outra forma. Por ali passaram dinossauros, e alguns dos seus passos ficaram marcados na lama, que com o tempo endureceu e se transformou em rocha calcária.",
     "Hoje essas pegadas estão à vista nas lajes de rocha junto às arribas, dos dois lados do areal. São pegadas de três dedos, deixadas sobretudo por iguanodontes: dinossauros herbívoros que andavam sobre duas patas e chegavam a ter vários metros de comprimento. Há também pistas de pequenos dinossauros carnívoros, os terópodes.",
     "As pegadas da Salema fazem parte de um conjunto de jazidas de dinossauros da costa de Vila do Bispo, como a da Praia Santa, e são um testemunho precioso da pré-história do Algarve: um geossítio que se visita de chinelos, a poucos passos do mar."
   ],
   dicas:[
     "Vá na maré baixa: com a maré cheia, as lajes ficam cobertas pelo mar. Veja a maré no separador Início, em «Tempo, mar e surf».",
     "Não se aproxime da base das arribas: há risco de queda de pedras.",
     "As rochas podem estar molhadas e escorregadias: use calçado que agarre.",
     "Ajude a proteger as pegadas: não as pise, não as risque nem retire pedras. Para as fotografar melhor, molhe-as com um pouco de água do mar.",
     "A Praia da Salema fica a cerca de 1 km do parque: vá a pé ou no shuttle grátis."
   ]}
];
