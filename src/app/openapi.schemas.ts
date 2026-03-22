import { z } from "zod";

export const userRoleSchema = z
  .enum(["worker", "client"])
  .describe("Perfil do usuário na plataforma.");

export const safeUserSchema = z
  .object({
    id: z.string().describe("Identificador único do usuário."),
    name: z.string().min(2).max(100).describe("Nome exibido no perfil."),
    email: z.email().describe("E-mail usado para autenticação e contato."),
    role: userRoleSchema,
    neighborhood: z
      .string()
      .min(2)
      .max(120)
      .optional()
      .describe("Bairro principal de atuação ou residência do usuário."),
    createdAt: z.date().describe("Data de criação do usuário."),
    updatedAt: z.date().describe("Data da última atualização do usuário."),
  })
  .describe("Dados públicos do usuário retornados pela API.");

export const categorySchema = z
  .object({
    id: z.string().describe("Identificador único da categoria."),
    name: z.string().describe("Nome legível da categoria de serviço."),
  })
  .describe("Categoria disponível para classificação de serviços.");

export const serviceSchema = z
  .object({
    id: z.string().describe("Identificador único do serviço."),
    workerId: z.string().describe("Identificador do worker responsável pelo serviço."),
    workerName: z
      .string()
      .min(2)
      .max(100)
      .describe("Nome do trabalhador responsável pelo serviço."),
    category: z.string().min(2).max(80).describe("Categoria principal do serviço."),
    neighborhood: z.string().min(2).max(120).describe("Bairro atendido pelo worker."),
    title: z.string().min(2).max(120).describe("Título curto usado na listagem."),
    description: z.string().min(2).max(500).describe("Descrição detalhada do serviço oferecido."),
    createdAt: z.date().describe("Data de publicação do serviço."),
  })
  .describe("Anúncio de serviço publicado por um worker.");

export const ratingSchema = z
  .object({
    id: z.string().describe("Identificador único da avaliação."),
    workerId: z.string().describe("Worker avaliado."),
    clientId: z.string().describe("Cliente autor da avaliação."),
    score: z.number().int().min(1).max(5).describe("Nota de 1 a 5."),
    comment: z
      .string()
      .max(500)
      .optional()
      .describe("Comentário opcional sobre a experiência com o serviço."),
    createdAt: z.date().describe("Data em que a avaliação foi criada."),
  })
  .describe("Avaliação feita por um cliente para um worker.");

export const mediaPhotoSchema = z
  .object({
    id: z.string().describe("Identificador único da foto."),
    workerId: z.string().describe("Worker dono da foto do portfólio."),
    url: z.url().describe("URL pública da imagem armazenada."),
    createdAt: z.date().describe("Data de inclusão da foto no portfólio."),
  })
  .describe("Foto de portfólio publicada por um worker.");

export const registerBodySchema = z
  .object({
    name: z.string().min(2).max(100).describe("Nome completo ou nome profissional do usuário."),
    email: z.email().describe("E-mail único para cadastro e login."),
    password: z.string().min(6).max(128).describe("Senha com no mínimo 6 caracteres."),
    role: userRoleSchema.describe("Tipo de conta que será criada."),
    neighborhood: z
      .string()
      .min(2)
      .max(120)
      .optional()
      .describe("Bairro principal do usuário, útil para busca e perfil."),
  })
  .describe("Payload necessário para registrar um novo usuário.");

export const loginBodySchema = z
  .object({
    email: z.email().describe("E-mail cadastrado do usuário."),
    password: z.string().min(6).max(128).describe("Senha cadastrada do usuário."),
  })
  .describe("Credenciais usadas para autenticar um usuário existente.");

export const authResponseSchema = z
  .object({
    token: z.string().describe("JWT de autenticação a ser enviado no header Authorization."),
    user: safeUserSchema,
  })
  .describe("Resposta de autenticação com token JWT e dados públicos do usuário.");

export const updateUserBodySchema = z
  .object({
    name: z.string().min(2).max(100).optional().describe("Novo nome do usuário."),
    neighborhood: z
      .string()
      .min(2)
      .max(120)
      .optional()
      .describe("Novo bairro associado ao perfil."),
    password: z
      .string()
      .min(6)
      .max(128)
      .optional()
      .describe("Nova senha. Quando enviada, a senha atual será substituída."),
  })
  .describe("Campos permitidos para atualização do próprio perfil.");

export const serviceCreateBodySchema = z
  .object({
    category: z.string().min(2).max(80).describe("Categoria em que o serviço será listado."),
    neighborhood: z.string().min(2).max(120).describe("Bairro principal atendido pelo serviço."),
    title: z.string().min(2).max(120).describe("Título de destaque do anúncio."),
    description: z
      .string()
      .min(2)
      .max(500)
      .describe("Descrição detalhada com escopo, diferenciais e informações úteis."),
  })
  .describe("Dados necessários para publicar um novo serviço.");

export const serviceListQuerySchema = z
  .object({
    category: z.string().min(2).max(80).optional().describe("Filtra por categoria de serviço."),
    neighborhood: z.string().min(2).max(120).optional().describe("Filtra por bairro atendido."),
  })
  .describe("Filtros opcionais usados para refinar a listagem de serviços.");

export const createRatingBodySchema = z
  .object({
    workerId: z.string().uuid().describe("Identificador UUID do worker avaliado."),
    score: z.number().int().min(1).max(5).describe("Nota inteira entre 1 e 5."),
    comment: z
      .string()
      .max(500)
      .optional()
      .describe("Comentário opcional com detalhes da avaliação."),
  })
  .describe("Payload para criar uma nova avaliação de worker.");

export const uploadMediaBodySchema = z
  .object({
    url: z.url().describe("URL pública da imagem que será associada ao portfólio."),
  })
  .describe("Payload usado para registrar uma foto de portfólio.");

export const userIdParamsSchema = z.object({
  id: z.string().min(1).describe("Identificador do usuário."),
});

export const workerIdParamsSchema = z.object({
  worker_id: z.string().min(1).describe("Identificador do worker cujas avaliações serão listadas."),
});

export const photoIdParamsSchema = z.object({
  photo_id: z.string().min(1).describe("Identificador da foto de portfólio."),
});

export const errorResponseSchema = z
  .object({
    code: z.string().describe("Código estável para tratamento de erro no cliente."),
    message: z.string().describe("Mensagem legível descrevendo o problema."),
    details: z.unknown().optional().describe("Detalhes adicionais do erro quando disponíveis."),
  })
  .describe("Formato padrão de erro retornado pela API.");

export const validationErrorResponseSchema = z
  .object({
    code: z.literal("VALIDATION_ERROR"),
    message: z.literal("Erro de validação nos dados enviados."),
    details: z.unknown().describe("Estrutura de erros de validação produzida pelo Zod."),
  })
  .describe("Erro de validação retornado quando body, params ou query são inválidos.");

export const deleteMediaResponseSchema = z
  .object({
    success: z.literal(true).describe("Indica que a remoção foi concluída com sucesso."),
  })
  .describe("Resposta padrão para remoção bem-sucedida de uma foto.");

export const openApiDocumentation = {
  info: {
    title: "API de Marketplace de Serviços",
    version: "1.0.50",
    description:
      "API RESTful para cadastro de usuários, publicação de serviços, avaliações e portfólio de workers. Todos os endpoints seguem o prefixo /api/v1 e usam JSON como formato padrão.",
  },
  tags: [
    {
      name: "Auth",
      description: "Cadastro e autenticação de usuários com retorno de JWT.",
    },
    {
      name: "Users",
      description: "Consulta e atualização de perfis de usuário.",
    },
    {
      name: "Categories",
      description: "Catálogo de categorias disponíveis para classificação de serviços.",
    },
    {
      name: "Services",
      description: "Listagem pública e publicação de serviços por workers.",
    },
    {
      name: "Ratings",
      description: "Criação e consulta de avaliações de workers.",
    },
    {
      name: "Media",
      description: "Gerenciamento de fotos de portfólio dos workers.",
    },
  ],
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local de desenvolvimento.",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http" as const,
        scheme: "bearer" as const,
        bearerFormat: "JWT",
        description: "Envie o token no formato: Bearer <jwt>.",
      },
    },
  },
};

export const protectedRouteDetail = {
  security: [{ bearerAuth: [] }],
};
