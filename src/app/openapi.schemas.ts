import { z } from "zod";

export const safeUserSchema = z
  .object({
    id: z.string().describe("Identificador único do usuário."),
    name: z.string().min(2).max(100).describe("Nome exibido no perfil."),
    email: z.email().describe("E-mail usado para autenticação e contato."),
    avatarUrl: z.url().optional().describe("URL da imagem de avatar do usuário."),
    coverUrl: z.url().optional().describe("URL da imagem de capa do perfil do usuário."),
    bairro: z
      .string()
      .min(2)
      .max(120)
      .optional()
      .describe("Bairro principal de atuação ou residência do usuário."),
    cep: z.string().optional().describe("CEP do usuário."),
    cidade: z.string().optional().describe("Cidade do usuário."),
    description: z.string().max(600).optional().describe("Descrição/bio do perfil do usuário."),
    contactLinks: z
      .array(
        z.object({
          label: z.string().min(1).max(50).describe("Nome da rede ou canal (ex: WhatsApp, X, Bluesky)."),
          value: z.string().min(1).max(300).describe("URL, handle ou número de contato."),
        }),
      )
      .optional()
      .describe("Lista de links de contato do usuário."),
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

export const createCategoryBodySchema = z
  .object({
    name: z.string().min(2).max(80).describe("Nome da nova categoria de serviço."),
  })
  .describe("Payload para criar uma nova categoria.");

export const categoryIdParamsSchema = z.object({
  id: z.string().min(1).describe("Identificador da categoria."),
});

export const deleteCategoryResponseSchema = z
  .object({
    success: z.literal(true).describe("Indica que a categoria foi removida com sucesso."),
  })
  .describe("Resposta padrão para remoção bem-sucedida de uma categoria.");

export const serviceSchema = z
  .object({
    id: z.string().describe("Identificador único do serviço."),
    workerId: z.string().describe("Identificador do prestador responsável pelo serviço."),
    workerName: z
      .string()
      .min(2)
      .max(100)
      .describe("Nome do trabalhador responsável pelo serviço."),
    category: z.string().min(2).max(80).describe("Categoria principal do serviço."),
    bairro: z.string().min(2).max(120).describe("Bairro atendido pelo prestador."),
    title: z.string().min(2).max(120).describe("Título curto usado na listagem."),
    description: z.string().min(2).max(500).describe("Descrição detalhada do serviço oferecido."),
    price: z.number().positive().optional().describe("Valor cobrado pelo serviço (opcional)."),
    createdAt: z.date().describe("Data de publicação do serviço."),
  })
  .describe("Anúncio de serviço publicado por um prestador.");

export const ratingSchema = z
  .object({
    id: z.string().describe("Identificador único da avaliação."),
    workerId: z.string().describe("Prestador avaliado."),
    clientId: z.string().describe("Cliente autor da avaliação."),
    clientName: z.string().describe("Nome do cliente autor da avaliação."),
    clientAvatarUrl: z.url().optional().describe("URL do avatar do cliente autor da avaliação."),
    score: z.number().int().min(1).max(5).describe("Nota de 1 a 5."),
    comment: z
      .string()
      .max(500)
      .optional()
      .describe("Comentário opcional sobre a experiência com o serviço."),
    createdAt: z.date().describe("Data em que a avaliação foi criada."),
  })
  .describe("Avaliação feita por um cliente para um prestador.");

export const mediaPhotoSchema = z
  .object({
    id: z.string().describe("Identificador único da foto."),
    workerId: z.string().describe("Prestador dono da foto do portfólio."),
    url: z.url().describe("URL pública da imagem armazenada."),
    createdAt: z.date().describe("Data de inclusão da foto no portfólio."),
  })
  .describe("Foto de portfólio publicada por um prestador.");

export const registerBodySchema = z
  .object({
    name: z.string().min(2).max(100).describe("Nome completo ou nome profissional do usuário."),
    email: z.email().describe("E-mail único para cadastro e login."),
    password: z.string().min(6).max(128).describe("Senha com no mínimo 6 caracteres."),
    bairro: z.string().min(2).max(120).optional().describe("Bairro do usuário."),
    cep: z.string().optional().describe("CEP do usuário."),
    cidade: z.string().optional().describe("Cidade do usuário."),
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
    avatarUrl: z.url().optional().nullable().describe("Nova URL do avatar. Envie null para remover."),
    coverUrl: z.url().optional().nullable().describe("Nova URL da capa. Envie null para remover."),
    bairro: z.string().min(2).max(120).optional().describe("Novo bairro associado ao perfil."),
    cep: z.string().optional().describe("Novo CEP do usuário."),
    cidade: z.string().optional().describe("Nova cidade do usuário."),
    description: z.string().max(600).optional().describe("Descrição/bio do perfil."),
    contactLinks: z
      .array(
        z.object({
          label: z.string().min(1).max(50),
          value: z.string().min(1).max(300),
        }),
      )
      .max(10)
      .optional()
      .describe("Lista de links de contato. Substitui completamente a lista existente quando enviada."),
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
    bairro: z.string().min(2).max(120).describe("Bairro principal atendido pelo serviço."),
    title: z.string().min(2).max(120).describe("Título de destaque do anúncio."),
    description: z
      .string()
      .min(2)
      .max(500)
      .describe("Descrição detalhada com escopo, diferenciais e informações úteis."),
    price: z.number().positive().nullish().describe("Valor cobrado pelo serviço (opcional)."),
  })
  .describe("Dados necessários para publicar um novo serviço.");

export const serviceListQuerySchema = z
  .object({
    category: z.string().min(2).max(80).optional().describe("Filtra por categoria de serviço."),
    bairro: z.string().min(2).max(120).optional().describe("Filtra por bairro."),
    cidade: z.string().min(2).max(120).optional().describe("Filtra pela cidade do prestador."),
    cep: z.string().optional().describe("Filtra pelo CEP do prestador."),
    q: z
      .string()
      .min(1)
      .max(200)
      .optional()
      .describe("Busca por texto no título ou descrição do serviço."),
    minPrice: z.coerce.number().positive().optional().describe("Preço mínimo do serviço."),
    maxPrice: z.coerce.number().positive().optional().describe("Preço máximo do serviço."),
  })
  .describe("Filtros opcionais usados para refinar a listagem de serviços.");

export const createRatingBodySchema = z
  .object({
    workerId: z.string().uuid().describe("Identificador UUID do prestador avaliado."),
    score: z.number().int().min(1).max(5).describe("Nota inteira entre 1 e 5."),
    comment: z
      .string()
      .max(500)
      .optional()
      .describe("Comentário opcional com detalhes da avaliação."),
  })
  .describe("Payload para criar uma nova avaliação de prestador.");

export const uploadMediaBodySchema = z
  .object({
    url: z.url().describe("URL pública da imagem que será associada ao portfólio."),
  })
  .describe("Payload usado para registrar uma foto de portfólio.");

export const popularServiceSchema = serviceSchema
  .extend({
    avgScore: z.number().describe("Média das avaliações do prestador (0 se sem avaliações)."),
    ratingCount: z.number().int().describe("Total de avaliações recebidas pelo prestador."),
  })
  .describe("Serviço popular com métricas de avaliação do prestador.");

export const professionalSchema = safeUserSchema
  .extend({
    avgScore: z
      .number()
      .nullable()
      .describe("Média das avaliações recebidas. Null se ainda não avaliado."),
    ratingCount: z.number().int().describe("Total de avaliações recebidas."),
    serviceCount: z.number().int().describe("Total de serviços publicados."),
  })
  .describe("Prestador de serviços com estatísticas de avaliação e publicações.");

export const homeQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Math.min(Math.max(parseInt(v, 10) || 10, 1), 50) : 10))
    .describe("Quantidade máxima de resultados (padrão 10, máximo 50)."),
});

export const recommendationsQuerySchema = z.object({
  bairro: z.string().min(2).max(120).optional().describe("Filtra por bairro."),
  cidade: z.string().min(2).max(120).optional().describe("Filtra pela cidade do prestador."),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Math.min(Math.max(parseInt(v, 10) || 10, 1), 50) : 10))
    .describe("Quantidade máxima de resultados (padrão 10, máximo 50)."),
});

export const serviceUpdateBodySchema = z
  .object({
    category: z.string().min(2).max(80).optional().describe("Nova categoria do serviço."),
    bairro: z.string().min(2).max(120).optional().describe("Novo bairro atendido."),
    title: z.string().min(2).max(120).optional().describe("Novo título do anúncio."),
    description: z.string().min(2).max(500).optional().describe("Nova descrição do serviço."),
    price: z.number().positive().nullish().describe("Novo valor cobrado pelo serviço."),
  })
  .describe("Campos permitidos para atualizar um serviço publicado.");

export const serviceIdParamsSchema = z.object({
  id: z.string().min(1).describe("Identificador do serviço."),
});

export const deleteServiceResponseSchema = z
  .object({
    success: z.literal(true).describe("Indica que o serviço foi removido com sucesso."),
  })
  .describe("Resposta padrão para remoção bem-sucedida de um serviço.");

export const userIdParamsSchema = z.object({
  id: z.string().min(1).describe("Identificador do usuário."),
});

export const workerIdParamsSchema = z.object({
  worker_id: z
    .string()
    .min(1)
    .describe("Identificador do prestador cujas avaliações serão listadas."),
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
    title: "API Conecta Bairro",
    version: "1.0.50",
    description:
      "API RESTful para cadastro de usuários, publicação de serviços, avaliações e portfólio de prestadores. Todos os endpoints seguem o prefixo /api/v1 e usam JSON como formato padrão.",
  },
  tags: [
    {
      name: "Home",
      description: "Dados agregados para a tela inicial: populares, recomendações e profissionais.",
    },
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
      description: "Listagem pública e publicação de serviços por prestadores.",
    },
    {
      name: "Ratings",
      description: "Criação e consulta de avaliações de prestadores.",
    },
    {
      name: "Media",
      description: "Gerenciamento de fotos de portfólio dos prestadores.",
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
