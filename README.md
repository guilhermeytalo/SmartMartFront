# SmartMartSolution
Link para o site em produção [clique aqui](https://smart-mart-front.vercel.app/dashboard)

# Configuração do Projeto
Este é um projeto desenvolvido com [Next.js](https://nextjs.org), que serve como um painel de controle para a solução **SmartMart Solutions**. Abaixo estão as instruções para configurar o ambiente de desenvolvimento em uma nova máquina.

## Pré-requisitos

Certifique-se de que sua máquina tenha os seguintes softwares instalados:

- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou outro gerenciador de pacotes como Yarn, PNPM ou Bun
- [Git](https://git-scm.com/)

## Passos para Configuração

1. **Clone o repositório:**
  ```
  git clone https://github.com/guilhermeytalo/SmartMartFront.git
  cd SmartMartFront
  ```

2. **Instale o projeto:**
  ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
  ```

3. **Configure as variáveis de ambiente:**
Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo config/env.ts como referência para as variáveis globais.

4. **Inicie o servidor de desenvolvimento:**
Para iniciar o servidor local, execute:
  ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    # ou
    bun dev
  ```
  O servidor estará disponível em http://localhost:3000.
  Acesse o painel:
  Abra o navegador e acesse http://localhost:3000 para visualizar o painel.

# Funcionalidades do Projeto

O dashboard **SmartMart Solutions** foi projetado para gerenciar produtos e visualizar dados de vendas e lucros. Abaixo estão as principais funcionalidades:

## Camada de Apresentação (app/)
- Dashboard: Página inicial com gráficos de vendas e lucros.
- Produtos: Página para listar, criar e importar produtos.
  - Tabela de Produtos: Exibe os produtos cadastrados com paginação.
  - Modal de Produto: Permite criar produtos.
  - Importação de CSV: Importa produtos em massa via arquivo CSV.

## Componentes Reutilizáveis (components/)
- Gráficos:
  - ProfitDonutChart.tsx: Gráfico para exibir lucros.
  - SalesBarChart.tsx: Gráfico de barras para exibir vendas.
- Dialogs/Modais:
  - ProductDialog.tsx: Modal para criar.
  - UploadDialog.tsx: Modal para importar arquivos CSV.
- Tabela:
  - PaginationControls.tsx: Controle de paginação para tabelas.
- UI:
  - Componentes como botões, inputs, formulários e outros elementos de interface.

## Camada de Domínio (domain/)
  - Entities:
    - Product.ts: Representação de um produto.
    - Category.ts: Representação de uma categoria.
  - Services:
    - ProductService.ts: Funções para buscar e manipular dados de produtos.
    - ImportCSVProductsService.ts: Serviço para importar produtos via CSV.

## Infraestrutura (infra/)
- Repositórios HTTP:
  - CategoryRepository.ts: Implementação para gerenciar categorias.
  - ProductRepository.ts: Implementação para gerenciar produtos.

## API:
  - api.ts: Funções genéricas para chamadas HTTP.

## Dados Simulados (mock/)
Arquivos JSON para simular dados de categorias e produtos durante o desenvolvimento.

# Arquitetura do projeto

```
app/                        ← Camada de Apresentação (Presentation Layer)
  layout.tsx
  page.tsx
  dashboard/
    page.tsx
  products/
    page.tsx               ← Lista de produtos
    columns.tsx            ← Colunas da tabela de produtos
    data-table.tsx         ← Componente de tabela de produtos

components/                 ← Componentes reutilizáveis
  charts/
    ProfitDonutChart.tsx
    SalesBarChart.tsx
  dialogs/
    ProductDialog.tsx
    UploadDialog.tsx
  forms/
    ProductForm.tsx
    UploadForm.tsx
  sidebar/
    app-sidebar.tsx
  table/
    PaginationControls.tsx
  ui/                       ← Componentes de UI (shadcn/ui wrappers e customizações)
    button.tsx
    card.tsx
    chart.tsx
    dialog.tsx
    form.tsx
    input.tsx
    label.tsx
    radio-group.tsx
    select.tsx
    separator.tsx
    sheet.tsx
    sidebar.tsx
    skeleton.tsx
    sonner.tsx
    table.tsx
    tooltip.tsx

application/                ← Casos de uso (Application Business Rules)
  use-cases/
    useCreateProduct.ts
    useImportProducts.ts

config/
  env.ts                    ← Configurações globais (e.g. variáveis de ambiente)

domain/                     ← Camada de Domínio (Enterprise Business Rules)
  entities/
    ApiProduct.ts
    Category.ts
    Charts.ts
    Product.ts
  mappers/
    ProductMapper.ts
  repositories/
    ICategoryRepository.ts
    IProductRepository.ts
  services/
    CreateProductService.ts
    DownloadCSVProductsService.ts
    ImportCSVProductsService.ts
    ProductService.ts

hooks/
  use-mobile.ts             ← Hook customizado

infra/                      ← Implementações concretas da infraestrutura
  http/
    repositories/
      CategoryRepository.ts
      ProductRepository.ts
    api.ts                  ← Funções HTTP genéricas

lib/                        ← Bibliotecas/utilitários leves
  utils.ts                  ← Funções auxiliares

mock/                       ← Dados simulados (para testes/dev)
  categories.json
  products.json

utils/
  parse-csv.ts
  process-sales-data.ts
```