# Instruções do Copilot para este repositório

Estas instruções devem ser seguidas em toda sugestão, refatoração e geração de código neste projeto.

## Contexto do projeto

- Stack principal: **Bun + Elysia + TypeScript**.
- Plugins e libs já usadas: `@elysiajs/openapi`, `zod`, `better-auth`, `drizzle-orm`, `pg`.

## Fontes obrigatórias de referência

Antes de propor arquitetura, padrões de rota, validação ou plugins, siga prioritariamente:

- https://elysiajs.com/essential/best-practice.html
- https://elysiajs.com/
- https://orm.drizzle.team/docs/overview
- https://www.better-auth.com/docs
- https://zod.dev/
- https://www.typescriptlang.org/docs/

Se houver conflito entre preferência pessoal e documentação oficial, **a documentação oficial vence**.

## Regras de implementação

1. **Seguir best practices do Elysia**
   - Preferir composição por plugins (`.use(...)`) para organizar funcionalidades.
   - Evitar concentrar tudo em um único arquivo quando o escopo crescer.
   - Manter handlers pequenos e objetivos.

2. **Tipagem e validação**
   - Usar TypeScript de forma estrita (evitar `any`).
   - Validar entrada/saída de rotas com schema (preferência por `zod` quando aplicável).
   - Não aceitar dados de request sem validação explícita.

3. **Organização de código**
   - Separar responsabilidades: rotas, autenticação, acesso a dados e configuração.
   - Reutilizar utilitários existentes antes de criar novos.
   - Evitar duplicação de lógica.

4. **API e contratos**
   - Preservar compatibilidade de contratos públicos ao refatorar.
   - Se quebrar contrato for necessário, destacar claramente no código e no PR.
   - Manter integração com OpenAPI quando houver endpoints novos.

5. **Segurança e configuração**
   - Nunca hardcode de segredos/chaves.
   - Ler variáveis sensíveis por ambiente (`process.env`/Bun env).
   - Tratar erros de forma explícita e segura (sem vazar detalhes internos).

6. **Estilo de mudança**
   - Fazer mudanças mínimas e focadas na solicitação.
   - Não introduzir dependências novas sem necessidade clara.
   - Não alterar nomes/estruturas públicas sem justificativa.

## Tema do projeto (contrato obrigatório da API)

Você está trabalhando em um projeto de API RESTful.

Siga **estritamente** a estrutura abaixo ao gerar código, rotas, controllers ou services.

### Base path da API

- `/api/v1`

### AUTH / USERS

- `POST /api/v1/auth/register` → registrar usuário (worker ou client)
- `POST /api/v1/auth/login` → login e retorno de token
- `GET /api/v1/users/:id` → obter perfil do usuário
- `PUT /api/v1/users/:id` → atualizar perfil (requer autenticação)

### CATEGORIES / SERVICES

- `GET /api/v1/categories` → listar categorias
- `GET /api/v1/services` → listar workers/serviços
- `GET /api/v1/services?category=X&neighborhood=Y` → filtrar por categoria e bairro
- `POST /api/v1/services` → worker adiciona serviço

### RATINGS

- `POST /api/v1/ratings` → criar avaliação
- `GET /api/v1/ratings/:worker_id` → obter avaliações do worker

### MEDIA / PORTFOLIO

- `POST /api/v1/media/upload` → upload de foto de portfólio
- `DELETE /api/v1/media/:photo_id` → remover foto

### Regras obrigatórias

- Sempre usar padrão RESTful.
- Sempre usar prefixo `/api/v1`.
- Usar padrão `controllers + services + repository`.
- Não criar rotas fora desta estrutura.
- Exigir autenticação nas rotas protegidas.
- Usar autenticação JWT.
- Seguir Clean Architecture.

## Checklist para qualquer alteração

- A solução segue a documentação oficial do Elysia?
- O código está tipado e com validação adequada?
- A mudança é mínima, legível e sem duplicação?
- Mantém (ou atualiza corretamente) o contrato da API/OpenAPI?
- Evita hardcode de segredos e mantém tratamento de erro adequado?
- As rotas respeitam estritamente a estrutura obrigatória do tema do projeto (`/api/v1`)?
