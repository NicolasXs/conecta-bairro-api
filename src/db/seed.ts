import "dotenv/config";
import { db } from "../db";
import { users, categories, services, ratings, mediaPhotos } from "../db/schema";

const createId = () => crypto.randomUUID();

const now = new Date();

// ─── Users ────────────────────────────────────────────────────────────────────

const worker1Id = createId();
const worker2Id = createId();
const worker3Id = createId();
const client1Id = createId();
const client2Id = createId();

const seedUsers = [
  {
    id: worker1Id,
    name: "Carlos Eletricista",
    email: "carlos@example.com",
    role: "worker" as const,
    neighborhood: "Centro",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: worker2Id,
    name: "Ana Pintora",
    email: "ana@example.com",
    role: "worker" as const,
    neighborhood: "Jardim América",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: worker3Id,
    name: "João Encanador",
    email: "joao@example.com",
    role: "worker" as const,
    neighborhood: "Vila Nova",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: client1Id,
    name: "Maria Cliente",
    email: "maria@example.com",
    role: "client" as const,
    neighborhood: "Centro",
    passwordHash: await Bun.password.hash("senha123"),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: client2Id,
    name: "Pedro Cliente",
    email: "pedro@example.com",
    role: "client" as const,
    neighborhood: "Jardim América",
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
];

// ─── Services ─────────────────────────────────────────────────────────────────

const seedServices = [
  {
    id: createId(),
    workerId: worker1Id,
    category: "Eletricista",
    neighborhood: "Centro",
    title: "Instalação elétrica residencial",
    description:
      "Instalação e manutenção de circuitos elétricos residenciais com segurança e rapidez.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker1Id,
    category: "Eletricista",
    neighborhood: "Centro",
    title: "Troca de tomadas e interruptores",
    description: "Substituição de tomadas, interruptores e disjuntores com garantia de 90 dias.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker2Id,
    category: "Pintor",
    neighborhood: "Jardim América",
    title: "Pintura interna completa",
    description:
      "Pintura de ambientes internos com preparação de superfície, massa corrida e acabamento premium.",
    createdAt: now,
  },
  {
    id: createId(),
    workerId: worker3Id,
    category: "Encanador",
    neighborhood: "Vila Nova",
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

  console.log("  → Inserindo categorias...");
  await db.insert(categories).values(seedCategories).onConflictDoNothing();

  console.log("  → Inserindo usuários...");
  await db.insert(users).values(seedUsers).onConflictDoNothing();

  console.log("  → Inserindo serviços...");
  await db.insert(services).values(seedServices).onConflictDoNothing();

  console.log("  → Inserindo avaliações...");
  await db.insert(ratings).values(seedRatings).onConflictDoNothing();

  console.log("  → Inserindo fotos de portfólio...");
  await db.insert(mediaPhotos).values(seedMediaPhotos).onConflictDoNothing();

  console.log("✅ Seed concluído com sucesso!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro ao executar seed:", err);
  process.exit(1);
});
