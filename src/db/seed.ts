import "dotenv/config";
import { db } from "../db";
import { users, categories, services, ratings, mediaPhotos } from "../db/schema";

const id = () => crypto.randomUUID();
const now = new Date();

// ─── Users ────────────────────────────────────────────────────────────────────
// 20 prestadores + 12 clientes = 32 usuários
// Cidades: Vitória da Conquista, Feira de Santana, Itabuna

const hash = (pwd: string) => Bun.password.hash(pwd);

// IDs fixos para referências
const W = {
  carlos:   "w-carlos-andrade",
  fernanda: "w-fernanda-souza",
  roberto:  "w-roberto-lima",
  juliana:  "w-juliana-matos",
  marcos:   "w-marcos-vieira",
  tatiane:  "w-tatiane-costa",
  diego:    "w-diego-santos",
  adriana:  "w-adriana-ferreira",
  bruno:    "w-bruno-oliveira",
  camila:   "w-camila-rocha",
  eduardo:  "w-eduardo-alves",
  priscila: "w-priscila-nunes",
  thiago:   "w-thiago-barbosa",
  vanessa:  "w-vanessa-cardoso",
  anderson: "w-anderson-carvalho",
  bianca:   "w-bianca-pinto",
  claudio:  "w-claudio-mendes",
  daniela:  "w-daniela-teixeira",
  felipe:   "w-felipe-nascimento",
  giovana:  "w-giovana-araujo",
};

const C = {
  lucas:    "c-lucas-pereira",
  mariana:  "c-mariana-silva",
  rafael:   "c-rafael-gomes",
  aline:    "c-aline-borges",
  paulo:    "c-paulo-moreira",
  sandra:   "c-sandra-reis",
  henrique: "c-henrique-lopes",
  natalia:  "c-natalia-cunha",
  gustavo:  "c-gustavo-sousa",
  isabela:  "c-isabela-freitas",
  rodrigo:  "c-rodrigo-azevedo",
  larissa:  "c-larissa-magalhaes",
};

const seedUsers = [
  // ── Vitória da Conquista – Prestadores ──────────────────────────────────────
  {
    id: W.carlos,
    name: "Carlos Andrade",
    email: "carlos.andrade@email.com",
    bairro: "Centro",
    cep: "45000000",
    cidade: "Vitória da Conquista",
    description: "Eletricista com 12 anos de experiência em instalações residenciais e comerciais. Atendo toda a região de Vitória da Conquista com pontualidade e qualidade.",
    contactLinks: [{ label: "WhatsApp", value: "77999110001" }],
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.fernanda,
    name: "Fernanda Souza",
    email: "fernanda.souza@email.com",
    bairro: "Candeias",
    cep: "45025000",
    cidade: "Vitória da Conquista",
    description: "Pintora profissional especializada em pintura interna, textura e grafiato. Trabalho com tintas de primeira linha e garantia de serviço.",
    contactLinks: [{ label: "WhatsApp", value: "77999220002" }],
    avatarUrl: "https://i.pravatar.cc/150?img=25",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.roberto,
    name: "Roberto Lima",
    email: "roberto.lima@email.com",
    bairro: "Recreio",
    cep: "45030000",
    cidade: "Vitória da Conquista",
    description: "Encanador hidráulico com 8 anos de experiência. Especialista em desentupimento, instalação de chuveiro e reparo de vazamentos.",
    contactLinks: [{ label: "WhatsApp", value: "77999330003" }],
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.juliana,
    name: "Juliana Matos",
    email: "juliana.matos@email.com",
    bairro: "Brasília",
    cep: "45040000",
    cidade: "Vitória da Conquista",
    description: "Diarista e faxineira com produtos de qualidade. Atendo residências e escritórios. Referências disponíveis.",
    contactLinks: [{ label: "WhatsApp", value: "77999440004" }],
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.marcos,
    name: "Marcos Vieira",
    email: "marcos.vieira@email.com",
    bairro: "Ibirapuera",
    cep: "45050000",
    cidade: "Vitória da Conquista",
    description: "Pedreiro e azulejista com 15 anos de experiência. Reformas completas, construções e reparos estruturais.",
    contactLinks: [{ label: "WhatsApp", value: "77999550005" }],
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.tatiane,
    name: "Tatiane Costa",
    email: "tatiane.costa@email.com",
    bairro: "Centro",
    cep: "45000100",
    cidade: "Vitória da Conquista",
    description: "Cozinheira para eventos, festas e marmitas semanais. Cardápio variado com culinária baiana e mineira.",
    contactLinks: [{ label: "WhatsApp", value: "77999660006" }],
    avatarUrl: "https://i.pravatar.cc/150?img=56",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.diego,
    name: "Diego Santos",
    email: "diego.santos@email.com",
    bairro: "Universidade",
    cep: "45055000",
    cidade: "Vitória da Conquista",
    description: "Técnico de informática, manutenção de computadores e notebooks, instalação de sistemas e redes. Atendo domicílio.",
    contactLinks: [{ label: "WhatsApp", value: "77999770007" }],
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },

  // ── Feira de Santana – Prestadores ──────────────────────────────────────────
  {
    id: W.adriana,
    name: "Adriana Ferreira",
    email: "adriana.ferreira@email.com",
    bairro: "Centro",
    cep: "44001000",
    cidade: "Feira de Santana",
    description: "Marceneira com ateliê próprio. Fabricação e restauração de móveis sob medida em madeira maciça e MDF.",
    contactLinks: [{ label: "WhatsApp", value: "75999110008" }],
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.bruno,
    name: "Bruno Oliveira",
    email: "bruno.oliveira@email.com",
    bairro: "Tomba",
    cep: "44054000",
    cidade: "Feira de Santana",
    description: "Jardineiro e paisagista com certificação técnica. Podas, plantio, gramado e manutenção de jardins residenciais.",
    contactLinks: [{ label: "WhatsApp", value: "75999220009" }],
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.camila,
    name: "Camila Rocha",
    email: "camila.rocha@email.com",
    bairro: "Campo Limpo",
    cep: "44040000",
    cidade: "Feira de Santana",
    description: "Babá com experiência em crianças de 0 a 10 anos. Curso de primeiros socorros infantil. Referências comprovadas.",
    contactLinks: [{ label: "WhatsApp", value: "75999330010" }],
    avatarUrl: "https://i.pravatar.cc/150?img=64",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.eduardo,
    name: "Eduardo Alves",
    email: "eduardo.alves@email.com",
    bairro: "Mangabeira",
    cep: "44070000",
    cidade: "Feira de Santana",
    description: "Mecânico automotivo com oficina própria. Revisão geral, freios, suspensão, injeção eletrônica e elétrica veicular.",
    contactLinks: [{ label: "WhatsApp", value: "75999440011" }],
    avatarUrl: "https://i.pravatar.cc/150?img=18",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.priscila,
    name: "Priscila Nunes",
    email: "priscila.nunes@email.com",
    bairro: "Brasília",
    cep: "44030000",
    cidade: "Feira de Santana",
    description: "Personal trainer formada em Educação Física. Treinos personalizados presenciais ou a domicílio. Emagrecimento e condicionamento.",
    contactLinks: [{ label: "WhatsApp", value: "75999550012" }],
    avatarUrl: "https://i.pravatar.cc/150?img=49",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.thiago,
    name: "Thiago Barbosa",
    email: "thiago.barbosa@email.com",
    bairro: "Feira X",
    cep: "44080000",
    cidade: "Feira de Santana",
    description: "Fotógrafo profissional para eventos, ensaios externos, casamentos e aniversários. Entrega em 5 dias úteis.",
    contactLinks: [{ label: "WhatsApp", value: "75999660013" }],
    avatarUrl: "https://i.pravatar.cc/150?img=22",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.vanessa,
    name: "Vanessa Cardoso",
    email: "vanessa.cardoso@email.com",
    bairro: "Gabriela",
    cep: "44090000",
    cidade: "Feira de Santana",
    description: "Costureira e alfaiate especializada em ajustes, consertos e confecção de roupas sob medida para festas e eventos.",
    contactLinks: [{ label: "WhatsApp", value: "75999770014" }],
    avatarUrl: "https://i.pravatar.cc/150?img=58",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },

  // ── Itabuna – Prestadores ────────────────────────────────────────────────────
  {
    id: W.anderson,
    name: "Anderson Carvalho",
    email: "anderson.carvalho@email.com",
    bairro: "Centro",
    cep: "45600000",
    cidade: "Itabuna",
    description: "Serralheiro com 10 anos de experiência. Grades, portões, escadas e estruturas metálicas sob medida.",
    contactLinks: [{ label: "WhatsApp", value: "73999110015" }],
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.bianca,
    name: "Bianca Pinto",
    email: "bianca.pinto@email.com",
    bairro: "Urbis I",
    cep: "45613000",
    cidade: "Itabuna",
    description: "Cuidadora de idosos com curso técnico em enfermagem. Disponível para diária, plantão e permanência.",
    contactLinks: [{ label: "WhatsApp", value: "73999220016" }],
    avatarUrl: "https://i.pravatar.cc/150?img=53",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.claudio,
    name: "Cláudio Mendes",
    email: "claudio.mendes@email.com",
    bairro: "Califórnia",
    cep: "45620000",
    cidade: "Itabuna",
    description: "Piscineiro com atendimento semanal, quinzenal ou mensal. Tratamento da água, limpeza e manutenção de equipamentos.",
    contactLinks: [{ label: "WhatsApp", value: "73999330017" }],
    avatarUrl: "https://i.pravatar.cc/150?img=14",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.daniela,
    name: "Daniela Teixeira",
    email: "daniela.teixeira@email.com",
    bairro: "Banco da Vitória",
    cep: "45630000",
    cidade: "Itabuna",
    description: "Designer gráfica freelancer. Criação de logos, identidade visual, banners digitais e materiais para redes sociais.",
    contactLinks: [{ label: "WhatsApp", value: "73999440018" }],
    avatarUrl: "https://i.pravatar.cc/150?img=41",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.felipe,
    name: "Felipe Nascimento",
    email: "felipe.nascimento@email.com",
    bairro: "Fátima",
    cep: "45640000",
    cidade: "Itabuna",
    description: "Montador de móveis planejados e de linha. Atendo residências e comércios. Serviço rápido e cuidadoso.",
    contactLinks: [{ label: "WhatsApp", value: "73999550019" }],
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: W.giovana,
    name: "Giovana Araújo",
    email: "giovana.araujo@email.com",
    bairro: "Góes Calmon",
    cep: "45653000",
    cidade: "Itabuna",
    description: "Especialista em energia solar fotovoltaica. Instalação, dimensionamento e manutenção de sistemas on-grid e off-grid.",
    contactLinks: [{ label: "WhatsApp", value: "73999660020" }],
    avatarUrl: "https://i.pravatar.cc/150?img=36",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },

  // ── Clientes – Vitória da Conquista ─────────────────────────────────────────
  {
    id: C.lucas,
    name: "Lucas Pereira",
    email: "lucas.pereira@email.com",
    bairro: "Zabelê",
    cep: "45060000",
    cidade: "Vitória da Conquista",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.mariana,
    name: "Mariana Silva",
    email: "mariana.silva@email.com",
    bairro: "São Sebastião",
    cep: "45065000",
    cidade: "Vitória da Conquista",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.rafael,
    name: "Rafael Gomes",
    email: "rafael.gomes@email.com",
    bairro: "Lagoa das Flores",
    cep: "45070000",
    cidade: "Vitória da Conquista",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.aline,
    name: "Aline Borges",
    email: "aline.borges@email.com",
    bairro: "Centro",
    cep: "45000200",
    cidade: "Vitória da Conquista",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },

  // ── Clientes – Feira de Santana ──────────────────────────────────────────────
  {
    id: C.paulo,
    name: "Paulo Moreira",
    email: "paulo.moreira@email.com",
    bairro: "Queimadinha",
    cep: "44095000",
    cidade: "Feira de Santana",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.sandra,
    name: "Sandra Reis",
    email: "sandra.reis@email.com",
    bairro: "Conceição",
    cep: "44020000",
    cidade: "Feira de Santana",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.henrique,
    name: "Henrique Lopes",
    email: "henrique.lopes@email.com",
    bairro: "Parque Getúlio Vargas",
    cep: "44060000",
    cidade: "Feira de Santana",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.natalia,
    name: "Natália Cunha",
    email: "natalia.cunha@email.com",
    bairro: "Tomba",
    cep: "44054100",
    cidade: "Feira de Santana",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },

  // ── Clientes – Itabuna ───────────────────────────────────────────────────────
  {
    id: C.gustavo,
    name: "Gustavo Sousa",
    email: "gustavo.sousa@email.com",
    bairro: "São Caetano",
    cep: "45650000",
    cidade: "Itabuna",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.isabela,
    name: "Isabela Freitas",
    email: "isabela.freitas@email.com",
    bairro: "Urbis II",
    cep: "45615000",
    cidade: "Itabuna",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.rodrigo,
    name: "Rodrigo Azevedo",
    email: "rodrigo.azevedo@email.com",
    bairro: "Califórnia",
    cep: "45620100",
    cidade: "Itabuna",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
  {
    id: C.larissa,
    name: "Larissa Magalhães",
    email: "larissa.magalhaes@email.com",
    bairro: "Centro",
    cep: "45600100",
    cidade: "Itabuna",
    passwordHash: await hash("senha123"),
    createdAt: now, updatedAt: now,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

const seedCategories = [
  { id: "cat-cleaning",        name: "Limpeza" },
  { id: "cat-electrician",     name: "Eletricista" },
  { id: "cat-plumber",         name: "Encanador" },
  { id: "cat-painter",         name: "Pintor" },
  { id: "cat-carpenter",       name: "Carpinteiro" },
  { id: "cat-mason",           name: "Pedreiro" },
  { id: "cat-gardener",        name: "Jardineiro" },
  { id: "cat-joiner",          name: "Marceneiro" },
  { id: "cat-locksmith",       name: "Chaveiro" },
  { id: "cat-it-tech",         name: "Técnico de Informática" },
  { id: "cat-ac-tech",         name: "Ar Condicionado" },
  { id: "cat-housekeeper",     name: "Diarista" },
  { id: "cat-cook",            name: "Cozinheiro" },
  { id: "cat-babysitter",      name: "Babá" },
  { id: "cat-elder-care",      name: "Cuidador de Idosos" },
  { id: "cat-personal-trainer",name: "Personal Trainer" },
  { id: "cat-tutor",           name: "Aulas Particulares" },
  { id: "cat-photographer",    name: "Fotógrafo" },
  { id: "cat-designer",        name: "Designer Gráfico" },
  { id: "cat-mechanic",        name: "Mecânico" },
  { id: "cat-welder",          name: "Serralheiro" },
  { id: "cat-pool-tech",       name: "Piscineiro" },
  { id: "cat-pest-control",    name: "Dedetizador" },
  { id: "cat-renovation",      name: "Reformas" },
  { id: "cat-moving",          name: "Mudanças e Fretes" },
  { id: "cat-driver",          name: "Motorista" },
  { id: "cat-pet-grooming",    name: "Banho e Tosa" },
  { id: "cat-seamstress",      name: "Costureira" },
  { id: "cat-furniture",       name: "Montador de Móveis" },
  { id: "cat-solar",           name: "Energia Solar" },
];

// ─── Services ─────────────────────────────────────────────────────────────────

const seedServices = [
  // Carlos Andrade – Eletricista (VdC)
  {
    id: id(), workerId: W.carlos, category: "Eletricista", bairro: "Centro",
    title: "Instalação elétrica residencial completa",
    description: "Instalação e revisão de circuitos elétricos residenciais, quadro de distribuição e aterramento. Laudo técnico incluso.",
    price: "280.00",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-acdc194d3b5a?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.carlos, category: "Eletricista", bairro: "Centro",
    title: "Troca de tomadas, interruptores e disjuntores",
    description: "Substituição de tomadas, interruptores e disjuntores com garantia de 90 dias. Atendo Centro e bairros próximos.",
    price: "80.00",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.carlos, category: "Eletricista", bairro: "Candeias",
    title: "Instalação de ventiladores e luminárias",
    description: "Instalação segura de ventiladores de teto, luminárias e spots. Sem furos desnecessários.",
    price: "120.00",
    imageUrl: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Fernanda Souza – Pintora (VdC)
  {
    id: id(), workerId: W.fernanda, category: "Pintor", bairro: "Candeias",
    title: "Pintura interna com massa corrida",
    description: "Preparação de superfície, massa corrida e duas demãos de tinta acrílica premium. Ambientes de até 30 m².",
    price: "450.00",
    imageUrl: "https://images.unsplash.com/photo-1562259949-c2ba9cd0be9e?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.fernanda, category: "Pintor", bairro: "Recreio",
    title: "Textura grafiato e cimento queimado",
    description: "Aplicação de textura grafiato ou efeito cimento queimado em paredes internas e externas.",
    price: "320.00",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Roberto Lima – Encanador (VdC)
  {
    id: id(), workerId: W.roberto, category: "Encanador", bairro: "Recreio",
    title: "Desentupimento de pias, ralos e vasos",
    description: "Desentupimento em geral com equipamento de alta pressão. Atendimento em até 2 horas.",
    price: "150.00",
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.roberto, category: "Encanador", bairro: "Centro",
    title: "Instalação e reparo de chuveiro elétrico",
    description: "Instalação, troca ou reparo de chuveiro elétrico com segurança. Inclui verificação do circuito.",
    price: "110.00",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Juliana Matos – Diarista (VdC)
  {
    id: id(), workerId: W.juliana, category: "Diarista", bairro: "Brasília",
    title: "Faxina residencial completa",
    description: "Limpeza completa de residência incluindo banheiros, cozinha, quartos e áreas externas. Produtos próprios.",
    price: "180.00",
    imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.juliana, category: "Diarista", bairro: "Centro",
    title: "Limpeza pós-obra",
    description: "Limpeza especializada após reforma ou obra, removendo pó de gesso, tinta e entulho leve.",
    price: "250.00",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Marcos Vieira – Pedreiro (VdC)
  {
    id: id(), workerId: W.marcos, category: "Pedreiro", bairro: "Ibirapuera",
    title: "Assentamento de cerâmica e porcelanato",
    description: "Assentamento de pisos e revestimentos cerâmicos com nivelamento e rejuntamento. Preço por m².",
    price: "45.00",
    imageUrl: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.marcos, category: "Reformas", bairro: "Brasília",
    title: "Reforma de banheiro completa",
    description: "Reforma completa de banheiro: revestimento, louças, metais e impermeabilização. Orçamento sem compromisso.",
    price: "1800.00",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Tatiane Costa – Cozinheira (VdC)
  {
    id: id(), workerId: W.tatiane, category: "Cozinheiro", bairro: "Centro",
    title: "Marmitas semanais – 5 dias",
    description: "Pacote semanal com 5 marmitas quentinhas entregues na segunda-feira. Cardápio variado e regional.",
    price: "120.00",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.tatiane, category: "Cozinheiro", bairro: "Centro",
    title: "Buffet para festas e eventos",
    description: "Serviço de buffet para até 50 pessoas. Cardápio personalizado com culinária baiana e contemporânea.",
    price: "1200.00",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Diego Santos – Técnico TI (VdC)
  {
    id: id(), workerId: W.diego, category: "Técnico de Informática", bairro: "Universidade",
    title: "Formatação e manutenção de computadores",
    description: "Formatação, instalação de programas, limpeza de vírus e atualização de drivers. Atendimento em domicílio.",
    price: "120.00",
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.diego, category: "Técnico de Informática", bairro: "Centro",
    title: "Instalação de rede Wi-Fi e cabeamento",
    description: "Configuração de roteadores, extensores e cabeamento estruturado para residências e escritórios.",
    price: "200.00",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Adriana Ferreira – Marceneira (FSA)
  {
    id: id(), workerId: W.adriana, category: "Marceneiro", bairro: "Centro",
    title: "Móveis planejados sob medida",
    description: "Fabricação de armários, closets e estantes em MDF ou madeira maciça. Visita técnica gratuita.",
    price: "2500.00",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.adriana, category: "Marceneiro", bairro: "Tomba",
    title: "Restauração e reforma de móveis antigos",
    description: "Lixamento, aplicação de verniz ou tinta, troca de ferragens e recuperação de estrutura.",
    price: "350.00",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Bruno Oliveira – Jardineiro (FSA)
  {
    id: id(), workerId: W.bruno, category: "Jardineiro", bairro: "Tomba",
    title: "Manutenção mensal de jardim",
    description: "Corte de grama, poda de arbustos, adubação e limpeza do jardim. Contrato mensal ou avulso.",
    price: "150.00",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca4cec?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.bruno, category: "Jardineiro", bairro: "Campo Limpo",
    title: "Paisagismo e implantação de jardim",
    description: "Projeto e execução de jardins residenciais. Escolha de plantas, irrigação e decoração.",
    price: "800.00",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Camila Rocha – Babá (FSA)
  {
    id: id(), workerId: W.camila, category: "Babá", bairro: "Campo Limpo",
    title: "Babá para crianças de 0 a 5 anos",
    description: "Cuidados completos com recém-nascidos e crianças pequenas. Diária ou mensalista. CPF e antecedentes ok.",
    price: "130.00",
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Eduardo Alves – Mecânico (FSA)
  {
    id: id(), workerId: W.eduardo, category: "Mecânico", bairro: "Mangabeira",
    title: "Revisão completa de automóvel",
    description: "Revisão de 10.000 km: troca de óleo, filtros, verificação de freios, correia e fluidos.",
    price: "320.00",
    imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.eduardo, category: "Mecânico", bairro: "Mangabeira",
    title: "Alinhamento, balanceamento e suspensão",
    description: "Diagnóstico e reparo de suspensão, alinhamento computadorizado e balanceamento de rodas.",
    price: "180.00",
    imageUrl: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Priscila Nunes – Personal (FSA)
  {
    id: id(), workerId: W.priscila, category: "Personal Trainer", bairro: "Brasília",
    title: "Personal trainer – pacote mensal 12 treinos",
    description: "12 sessões de treino personalizado por mês. Avaliação física e planilha de treino inclusa.",
    price: "480.00",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Thiago Barbosa – Fotógrafo (FSA)
  {
    id: id(), workerId: W.thiago, category: "Fotógrafo", bairro: "Feira X",
    title: "Ensaio fotográfico externo",
    description: "Ensaio com 2h de duração, 50 fotos editadas em alta resolução, entregues em galeria online.",
    price: "500.00",
    imageUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.thiago, category: "Fotógrafo", bairro: "Centro",
    title: "Fotografia de eventos e aniversários",
    description: "Cobertura completa de eventos até 4h, com 100 fotos editadas e álbum digital.",
    price: "900.00",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Vanessa Cardoso – Costureira (FSA)
  {
    id: id(), workerId: W.vanessa, category: "Costureira", bairro: "Gabriela",
    title: "Ajuste e conserto de roupas",
    description: "Bainhas, zíperes, botões, tomadas e consertos em geral. Entrega em até 3 dias úteis.",
    price: "30.00",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Anderson Carvalho – Serralheiro (Itabuna)
  {
    id: id(), workerId: W.anderson, category: "Serralheiro", bairro: "Centro",
    title: "Instalação de grades e portões",
    description: "Fabricação e instalação de grades de proteção, portões e janelas de ferro sob medida.",
    price: "600.00",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.anderson, category: "Serralheiro", bairro: "Califórnia",
    title: "Manutenção e pintura de estruturas metálicas",
    description: "Lixamento, tratamento anticorrosivo e pintura de portões, grades e estruturas metálicas.",
    price: "200.00",
    imageUrl: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Bianca Pinto – Cuidadora (Itabuna)
  {
    id: id(), workerId: W.bianca, category: "Cuidador de Idosos", bairro: "Urbis I",
    title: "Cuidadora de idosos – diária",
    description: "Acompanhamento diurno ou noturno para idosos. Auxílio em medicamentos, higiene e mobilidade.",
    price: "170.00",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f910?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Cláudio Mendes – Piscineiro (Itabuna)
  {
    id: id(), workerId: W.claudio, category: "Piscineiro", bairro: "Califórnia",
    title: "Limpeza e tratamento de piscina",
    description: "Limpeza completa, análise e correção da água, tratamento de algas e manutenção de bomba.",
    price: "180.00",
    imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Daniela Teixeira – Designer (Itabuna)
  {
    id: id(), workerId: W.daniela, category: "Designer Gráfico", bairro: "Banco da Vitória",
    title: "Criação de logotipo e identidade visual",
    description: "Logo profissional com 3 opções de conceito, manual de marca e arquivos em todos os formatos.",
    price: "650.00",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.daniela, category: "Designer Gráfico", bairro: "Centro",
    title: "Posts e artes para redes sociais",
    description: "Pacote mensal com 12 posts editáveis para Instagram e Facebook. Entrega em Canva ou PSD.",
    price: "280.00",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Felipe Nascimento – Montador (Itabuna)
  {
    id: id(), workerId: W.felipe, category: "Montador de Móveis", bairro: "Fátima",
    title: "Montagem de móveis de caixa e planejados",
    description: "Montagem de armários, estantes, guarda-roupas e camas box. Qualquer marca.",
    price: "90.00",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop",
    createdAt: now,
  },

  // Giovana Araújo – Energia Solar (Itabuna)
  {
    id: id(), workerId: W.giovana, category: "Energia Solar", bairro: "Góes Calmon",
    title: "Instalação de sistema solar fotovoltaico",
    description: "Dimensionamento, fornecimento e instalação de sistema solar. Retorno médio em 4 anos.",
    price: "12000.00",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
    createdAt: now,
  },
  {
    id: id(), workerId: W.giovana, category: "Energia Solar", bairro: "Centro",
    title: "Limpeza e manutenção de painéis solares",
    description: "Limpeza técnica dos painéis, verificação de inversor e análise de geração. Visita semestral.",
    price: "250.00",
    imageUrl: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=800&auto=format&fit=crop",
    createdAt: now,
  },
];

// ─── Ratings ──────────────────────────────────────────────────────────────────

const seedRatings = [
  { id: id(), workerId: W.carlos,   clientId: C.lucas,    score: 5, comment: "Carlos foi super pontual e deixou tudo impecável. Recomendo muito!", createdAt: now },
  { id: id(), workerId: W.carlos,   clientId: C.mariana,  score: 5, comment: "Profissional excelente, explicou tudo e resolveu rápido.", createdAt: now },
  { id: id(), workerId: W.carlos,   clientId: C.rafael,   score: 4, comment: "Bom serviço, apenas demorou um pouco mais que o esperado.", createdAt: now },
  { id: id(), workerId: W.fernanda, clientId: C.aline,    score: 5, comment: "Acabamento perfeito! A textura ficou linda, superou minhas expectativas.", createdAt: now },
  { id: id(), workerId: W.fernanda, clientId: C.lucas,    score: 5, comment: "Trabalho de altíssima qualidade, muito cuidadosa e organizada.", createdAt: now },
  { id: id(), workerId: W.roberto,  clientId: C.mariana,  score: 4, comment: "Resolveu o entupimento rápido. Preço justo.", createdAt: now },
  { id: id(), workerId: W.roberto,  clientId: C.rafael,   score: 5, comment: "Atendimento emergencial em menos de 1 hora. Salvou minha tarde!", createdAt: now },
  { id: id(), workerId: W.juliana,  clientId: C.aline,    score: 5, comment: "A casa ficou brilhando! Juliana é muito caprichosa.", createdAt: now },
  { id: id(), workerId: W.juliana,  clientId: C.lucas,    score: 4, comment: "Ótima limpeza, voltarei a contratar com certeza.", createdAt: now },
  { id: id(), workerId: W.marcos,   clientId: C.mariana,  score: 5, comment: "Porcelanato ficou perfeito, sem bolhas nem rejunte feio. Parabéns!", createdAt: now },
  { id: id(), workerId: W.marcos,   clientId: C.rafael,   score: 4, comment: "Bom profissional, só demorou mais que o combinado.", createdAt: now },
  { id: id(), workerId: W.tatiane,  clientId: C.aline,    score: 5, comment: "As marmitas são deliciosas e muito bem temperadas. Indico a todos!", createdAt: now },
  { id: id(), workerId: W.diego,    clientId: C.lucas,    score: 5, comment: "Formatou o computador rapidinho e ainda instalou um antivírus gratuito.", createdAt: now },
  { id: id(), workerId: W.adriana,  clientId: C.paulo,    score: 5, comment: "Móveis sob medida com qualidade incrível. Prazo respeitado!", createdAt: now },
  { id: id(), workerId: W.adriana,  clientId: C.sandra,   score: 5, comment: "Restauração do guarda-roupa ficou como novo. Recomendo!", createdAt: now },
  { id: id(), workerId: W.bruno,    clientId: C.henrique, score: 4, comment: "Jardim sempre bonito e bem cuidado. Ótimo custo-benefício.", createdAt: now },
  { id: id(), workerId: W.bruno,    clientId: C.natalia,  score: 5, comment: "O paisagismo ficou lindo! Bruno tem muito gosto e capricho.", createdAt: now },
  { id: id(), workerId: W.camila,   clientId: C.paulo,    score: 5, comment: "Minha filha adorou a Camila. Muito responsável e carinhosa.", createdAt: now },
  { id: id(), workerId: W.eduardo,  clientId: C.sandra,   score: 4, comment: "Revisão completa bem feita. Carro voltou rodando muito melhor.", createdAt: now },
  { id: id(), workerId: W.eduardo,  clientId: C.henrique, score: 5, comment: "Identificou um problema que outra oficina não viu. Muito honesto.", createdAt: now },
  { id: id(), workerId: W.priscila, clientId: C.natalia,  score: 5, comment: "Emagreci 6 kg em 2 meses com os treinos da Priscila. Excelente!", createdAt: now },
  { id: id(), workerId: W.thiago,   clientId: C.paulo,    score: 5, comment: "Fotos lindas do aniversário da minha filha. Muito talentoso!", createdAt: now },
  { id: id(), workerId: W.thiago,   clientId: C.sandra,   score: 4, comment: "Ensaio lindo, entregou antes do prazo.", createdAt: now },
  { id: id(), workerId: W.vanessa,  clientId: C.henrique, score: 5, comment: "Ajustou meu terno com perfeição. Costura impecável.", createdAt: now },
  { id: id(), workerId: W.anderson, clientId: C.gustavo,  score: 5, comment: "Grade linda e bem instalada. Trabalho de qualidade, muito seguro.", createdAt: now },
  { id: id(), workerId: W.anderson, clientId: C.isabela,  score: 4, comment: "Portão ficou ótimo. Recomendo o Anderson.", createdAt: now },
  { id: id(), workerId: W.bianca,   clientId: C.rodrigo,  score: 5, comment: "Cuidou muito bem da minha avó. Paciente e atenciosa.", createdAt: now },
  { id: id(), workerId: W.bianca,   clientId: C.larissa,  score: 5, comment: "Profissional excelente, minha mãe se sentiu muito bem tratada.", createdAt: now },
  { id: id(), workerId: W.claudio,  clientId: C.gustavo,  score: 4, comment: "Piscina sempre limpa e tratada. Serviço pontual.", createdAt: now },
  { id: id(), workerId: W.daniela,  clientId: C.isabela,  score: 5, comment: "Logo incrível! A identidade visual ficou exatamente como eu queria.", createdAt: now },
  { id: id(), workerId: W.daniela,  clientId: C.rodrigo,  score: 5, comment: "Posts do meu negócio ficaram lindos. Super profissional.", createdAt: now },
  { id: id(), workerId: W.felipe,   clientId: C.larissa,  score: 4, comment: "Montagem rápida e cuidadosa. Recomendo!", createdAt: now },
  { id: id(), workerId: W.giovana,  clientId: C.gustavo,  score: 5, comment: "Sistema solar instalado perfeitamente. Já estou economizando na conta.", createdAt: now },
];

// ─── Media Photos ─────────────────────────────────────────────────────────────

const UNSPLASH = "https://images.unsplash.com/photo";

const seedMediaPhotos = [
  { id: id(), workerId: W.carlos,   url: `${UNSPLASH}-1621905251918-acdc194d3b5a?w=800`, createdAt: now },
  { id: id(), workerId: W.carlos,   url: `${UNSPLASH}-1558618666-fcd25c85cd64?w=800`, createdAt: now },
  { id: id(), workerId: W.fernanda, url: `${UNSPLASH}-1562259949-c2ba9cd0be9e?w=800`, createdAt: now },
  { id: id(), workerId: W.fernanda, url: `${UNSPLASH}-1586023492125-27b2c045efd7?w=800`, createdAt: now },
  { id: id(), workerId: W.roberto,  url: `${UNSPLASH}-1504328345606-18bbc8c9d7d1?w=800`, createdAt: now },
  { id: id(), workerId: W.juliana,  url: `${UNSPLASH}-1563453392212-326f5e854473?w=800`, createdAt: now },
  { id: id(), workerId: W.marcos,   url: `${UNSPLASH}-1523413651479-597eb2da0ad6?w=800`, createdAt: now },
  { id: id(), workerId: W.marcos,   url: `${UNSPLASH}-1584622650111-993a426fbf0a?w=800`, createdAt: now },
  { id: id(), workerId: W.tatiane,  url: `${UNSPLASH}-1490645935967-10de6ba17061?w=800`, createdAt: now },
  { id: id(), workerId: W.diego,    url: `${UNSPLASH}-1587825140708-dfaf72ae4b04?w=800`, createdAt: now },
  { id: id(), workerId: W.adriana,  url: `${UNSPLASH}-1555041469-a586c61ea9bc?w=800`, createdAt: now },
  { id: id(), workerId: W.adriana,  url: `${UNSPLASH}-1506439773649-6e0eb8cfb237?w=800`, createdAt: now },
  { id: id(), workerId: W.bruno,    url: `${UNSPLASH}-1558618047-3c8c76ca4cec?w=800`, createdAt: now },
  { id: id(), workerId: W.camila,   url: `${UNSPLASH}-1555252333-9f8e92e65df9?w=800`, createdAt: now },
  { id: id(), workerId: W.eduardo,  url: `${UNSPLASH}-1486262715619-67b85e0b08d3?w=800`, createdAt: now },
  { id: id(), workerId: W.priscila, url: `${UNSPLASH}-1571019613454-1cb2f99b2d8b?w=800`, createdAt: now },
  { id: id(), workerId: W.thiago,   url: `${UNSPLASH}-1502982720700-bfff97f2ecac?w=800`, createdAt: now },
  { id: id(), workerId: W.thiago,   url: `${UNSPLASH}-1519741497674-611481863552?w=800`, createdAt: now },
  { id: id(), workerId: W.vanessa,  url: `${UNSPLASH}-1558769132-cb1aea458c5e?w=800`, createdAt: now },
  { id: id(), workerId: W.anderson, url: `${UNSPLASH}-1504307651254-35680f356dfd?w=800`, createdAt: now },
  { id: id(), workerId: W.bianca,   url: `${UNSPLASH}-1576765608535-5f04d1e3f910?w=800`, createdAt: now },
  { id: id(), workerId: W.claudio,  url: `${UNSPLASH}-1575429198097-0414ec08e8cd?w=800`, createdAt: now },
  { id: id(), workerId: W.daniela,  url: `${UNSPLASH}-1561070791-2526d30994b5?w=800`, createdAt: now },
  { id: id(), workerId: W.daniela,  url: `${UNSPLASH}-1558655146-d09347e92766?w=800`, createdAt: now },
  { id: id(), workerId: W.felipe,   url: `${UNSPLASH}-1555041469-a586c61ea9bc?w=800`, createdAt: now },
  { id: id(), workerId: W.giovana,  url: `${UNSPLASH}-1509391366360-2e959784a276?w=800`, createdAt: now },
  { id: id(), workerId: W.giovana,  url: `${UNSPLASH}-1595437193398-f24279553f4f?w=800`, createdAt: now },
];

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Iniciando seed completo...\n");

  console.log("  → Limpando banco de dados...");
  await db.delete(mediaPhotos);
  await db.delete(ratings);
  await db.delete(services);
  await db.delete(users);
  await db.delete(categories);
  console.log("  ✓ Banco limpo\n");

  console.log("  → Inserindo categorias...");
  await db.insert(categories).values(seedCategories);
  console.log(`  ✓ ${seedCategories.length} categorias inseridas`);

  console.log("  → Inserindo usuários...");
  await db.insert(users).values(seedUsers);
  console.log(`  ✓ ${seedUsers.length} usuários inseridos (${Object.keys(W).length} prestadores + ${Object.keys(C).length} clientes)`);

  console.log("  → Inserindo serviços...");
  await db.insert(services).values(seedServices);
  console.log(`  ✓ ${seedServices.length} serviços inseridos`);

  console.log("  → Inserindo avaliações...");
  await db.insert(ratings).values(seedRatings);
  console.log(`  ✓ ${seedRatings.length} avaliações inseridas`);

  console.log("  → Inserindo fotos de portfólio...");
  await db.insert(mediaPhotos).values(seedMediaPhotos);
  console.log(`  ✓ ${seedMediaPhotos.length} fotos inseridas`);

  console.log("\n✅ Seed concluído com sucesso!");
  console.log("   Cidades: Vitória da Conquista · Feira de Santana · Itabuna");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro ao executar seed:", err);
  process.exit(1);
});
