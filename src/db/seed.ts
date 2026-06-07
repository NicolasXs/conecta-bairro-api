import "dotenv/config";
import { inArray, or } from "drizzle-orm";
import { db } from "../db";
import { users, categories, services, ratings, mediaPhotos } from "../db/schema";

const createId = () => crypto.randomUUID();

const now = new Date();

// ─── Users ────────────────────────────────────────────────────────────────────

const worker1Id = "seed-user-worker-1";
const worker2Id = "seed-user-worker-2";
const worker3Id = "seed-user-worker-3";
const client1Id = "seed-user-client-1";
const client2Id = "seed-user-client-2";

const seedUsers = [
  {
    id: worker1Id,
    name: "Carlos Eletricista",
    email: "carlos@example.com",
    bairro: "Centro",
    cep: "01310100",
    cidade: "São Paulo",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: worker2Id,
    name: "Ana Pintora",
    email: "ana@example.com",
    bairro: "Jardim América",
    cep: "01310100",
    cidade: "São Paulo",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: worker3Id,
    name: "João Encanador",
    email: "joao@example.com",
    bairro: "Vila Nova",
    cep: "01310100",
    cidade: "São Paulo",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: client1Id,
    name: "Maria Cliente",
    email: "maria@example.com",
    bairro: "Centro",
    cep: "01310100",
    cidade: "São Paulo",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: client2Id,
    name: "Pedro Cliente",
    email: "pedro@example.com",
    bairro: "Jardim América",
    cep: "01310100",
    cidade: "São Paulo",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

const seedCategories = [
  { id: "cat-cleaning", name: "Limpeza" },
  { id: "cat-electrician", name: "Eletricista" },
  { id: "cat-plumber", name: "Encanador" },
  { id: "cat-painter", name: "Pintor" },
  { id: "cat-carpenter", name: "Carpinteiro" },
  { id: "cat-mason", name: "Pedreiro" },
  { id: "cat-gardener", name: "Jardineiro" },
  { id: "cat-joiner", name: "Marceneiro" },
  { id: "cat-locksmith", name: "Chaveiro" },
  { id: "cat-it-tech", name: "Técnico de Informática" },
  { id: "cat-ac-tech", name: "Ar Condicionado" },
  { id: "cat-housekeeper", name: "Diarista" },
  { id: "cat-cook", name: "Cozinheiro" },
  { id: "cat-babysitter", name: "Babá" },
  { id: "cat-elder-care", name: "Cuidador de Idosos" },
  { id: "cat-personal-trainer", name: "Personal Trainer" },
  { id: "cat-tutor", name: "Aulas Particulares" },
  { id: "cat-photographer", name: "Fotógrafo" },
  { id: "cat-designer", name: "Designer Gráfico" },
  { id: "cat-mechanic", name: "Mecânico" },
  { id: "cat-welder", name: "Serralheiro" },
  { id: "cat-pool-tech", name: "Piscineiro" },
  { id: "cat-pest-control", name: "Dedetizador" },
  { id: "cat-renovation", name: "Reformas" },
  { id: "cat-moving", name: "Mudanças e Fretes" },
  { id: "cat-driver", name: "Motorista" },
  { id: "cat-pet-grooming", name: "Banho e Tosa" },
  { id: "cat-seamstress", name: "Costureira" },
  { id: "cat-furniture", name: "Montador de Móveis" },
  { id: "cat-solar", name: "Energia Solar" },
];

// ─── Services ─────────────────────────────────────────────────────────────────

const seedServices = [
  {
    id: createId(),
    workerId: worker1Id,
    category: "Eletricista",
    bairro: "Centro",
    title: "Instalação elétrica residencial",
    description:
      "Instalação e manutenção de circuitos elétricos residenciais com segurança e rapidez.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker1Id,
    category: "Eletricista",
    bairro: "Centro",
    title: "Troca de tomadas e interruptores",
    description: "Substituição de tomadas, interruptores e disjuntores com garantia de 90 dias.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker2Id,
    category: "Pintor",
    bairro: "Jardim América",
    title: "Pintura interna completa",
    description:
      "Pintura de ambientes internos com preparação de superfície, massa corrida e acabamento premium.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker3Id,
    category: "Encanador",
    bairro: "Vila Nova",
    title: "Desentupimento e manutenção hidráulica",
    description:
      "Desentupimento de pias, ralos e tubulações. Reparo de vazamentos e troca de registros.",
    createdAt: now,
  },
];

// ─── Ratings ──────────────────────────────────────────────────────────────────

const seedRatings = [
  {
    id: createId(),
    workerId: worker1Id,
    clientId: client1Id,
    score: 5,
    comment: "Excelente serviço! Muito pontual e profissional.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker1Id,
    clientId: client2Id,
    score: 4,
    comment: "Bom trabalho, resolveu o problema rapidamente.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker2Id,
    clientId: client1Id,
    score: 5,
    comment: "Acabamento perfeito, super recomendo!",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker3Id,
    clientId: client2Id,
    score: 4,
    comment: "Resolveu o vazamento no mesmo dia. Ótimo atendimento.",
    createdAt: now,
  },
];

// ─── Media Photos ─────────────────────────────────────────────────────────────

const seedMediaPhotos = [
  {
    id: createId(),
    workerId: worker1Id,
    url: "https://example.com/portfolio/carlos-eletrica-1.jpg",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker1Id,
    url: "https://example.com/portfolio/carlos-eletrica-2.jpg",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker2Id,
    url: "https://example.com/portfolio/ana-pintura-1.jpg",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker3Id,
    url: "https://example.com/portfolio/joao-encanador-1.jpg",
    createdAt: now,
  },
];

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Iniciando seed...");

  console.log("  → Limpando dados anteriores do seed...");

  const seedEmails = [
    "carlos@example.com",
    "ana@example.com",
    "joao@example.com",
    "maria@example.com",
    "pedro@example.com",
  ];

  // Busca todos os IDs dos usuários de seed (por ID fixo ou por email de execuções antigas)
  const seedUserIds = [worker1Id, worker2Id, worker3Id, client1Id, client2Id];

  const existingUsers = await db
    .select({ id: users.id })
    .from(users)
    .where(or(inArray(users.email, seedEmails), inArray(users.id, seedUserIds)));

  const existingIds = existingUsers.map((u) => u.id);

  if (existingIds.length > 0) {
    await db.delete(mediaPhotos).where(inArray(mediaPhotos.workerId, existingIds));
    await db
      .delete(ratings)
      .where(or(inArray(ratings.workerId, existingIds), inArray(ratings.clientId, existingIds)));
    await db.delete(services).where(inArray(services.workerId, existingIds));
    await db.delete(users).where(inArray(users.id, existingIds));
  }

  console.log("  → Inserindo categorias...");
  await db.insert(categories).values(seedCategories).onConflictDoNothing();

  console.log("  → Inserindo usuários...");
  await db.insert(users).values(seedUsers);

  console.log("  → Inserindo serviços...");
  await db.insert(services).values(seedServices);

  console.log("  → Inserindo avaliações...");
  await db.insert(ratings).values(seedRatings);

  console.log("  → Inserindo fotos de portfólio...");
  await db.insert(mediaPhotos).values(seedMediaPhotos);

  console.log("✅ Seed concluído com sucesso!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro ao executar seed:", err);
  process.exit(1);
});
