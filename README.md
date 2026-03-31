# Projeto Ecommerce Hamburgueria

Aplicacao full stack de e-commerce para hamburgueria, com catalogo publico, autenticacao de usuarios, carrinho, checkout com Stripe e painel administrativo para gestao de produtos, categorias, pedidos e taxa de entrega.

## Destaques do projeto

- Cadastro e login de usuarios com senha criptografada
- Controle de acesso por token JWT
- Catalogo de produtos e categorias com imagens
- Carrinho persistido no `localStorage`
- Checkout com Stripe Payment Element
- Criacao e acompanhamento de pedidos
- Painel admin para produtos, categorias, pedidos e taxa de entrega
- Upload de imagens com armazenamento local em `uploads/`

## Stack identificada

### Backend

- JavaScript (Node.js)
- Express
- Sequelize
- Sequelize CLI
- PostgreSQL
- Mongoose
- MongoDB
- JWT (`jsonwebtoken`)
- Bcrypt
- Multer
- Stripe
- Yup
- CORS
- Dotenv
- UUID
- Biome

### Frontend

- JavaScript + React 19
- Vite
- React Router DOM
- Axios
- React Hook Form
- Yup
- Stripe Elements (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- Styled Components
- Material UI
- Emotion
- React Toastify
- React Select
- React Multi Carousel
- Phosphor Icons
- ESLint
- Prettier

## Bibliotecas encontradas no codigo

### Backend

- `express`
- `cors`
- `dotenv`
- `bcrypt`
- `jsonwebtoken`
- `mongoose`
- `multer`
- `pg`
- `pg-hstore`
- `sequelize`
- `sequelize-cli`
- `stripe`
- `uuid`
- `yup`
- `@biomejs/biome`

### Frontend

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-hook-form`
- `@hookform/resolvers`
- `yup`
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`
- `styled-components`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`
- `react-toastify`
- `react-select`
- `react-multi-carousel`
- `@phosphor-icons/react`
- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-import-helpers`
- `eslint-plugin-prettier`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `prettier`

## Arquitetura e recursos identificados

### Backend

- API REST em `src/`
- ORM relacional com Sequelize para `users`, `products`, `categories` e `delivery_fees`
- ODM com Mongoose para pedidos em MongoDB
- Autenticacao por JWT com middleware de rota protegida
- Hash de senha com Bcrypt
- Upload de arquivos com Multer e entrega estatica por Express
- Pagamentos com Stripe via criacao de `PaymentIntent`

### Frontend

- SPA React em `Interface-React/`
- Roteamento com areas publica, autenticada e administrativa
- Context API para usuario e carrinho
- Formularios com validacao usando React Hook Form + Yup
- Integracao HTTP com Axios
- Checkout com Stripe Elements

## Estrutura do projeto

```text
.
|-- src/                    # Backend Node.js/Express
|   |-- app/
|   |   |-- controllers/
|   |   |-- middlewares/
|   |   |-- models/
|   |   `-- schemas/
|   |-- config/
|   |-- database/
|   `-- server.js
|-- uploads/                # Imagens servidas pelo backend
|-- Interface-React/        # Frontend React + Vite
|   |-- src/
|   |-- public/
|   `-- vite.config.js
|-- package.json            # Dependencias do backend
`-- README.md
```

## Banco de dados

- PostgreSQL para usuarios, produtos, categorias e taxa de entrega
- MongoDB para pedidos

## Funcionalidades mapeadas no codigo

- Registro de usuario
- Login e persistencia de sessao
- Listagem de categorias e produtos
- Filtro de produtos por categoria
- Cadastro, edicao e exclusao de produtos
- Cadastro, edicao e exclusao de categorias
- Criacao e atualizacao de pedidos
- Configuracao de taxa de entrega no painel admin
- Checkout e confirmacao de pagamento com Stripe

## Como rodar localmente

### Requisitos

- Node.js instalado
- PostgreSQL rodando em `localhost:5432`
- MongoDB rodando em `mongodb://localhost:27017/devburguer`

### Backend

1. Instale as dependencias na raiz:

```bash
pnpm install
```

2. Crie o arquivo `.env` na raiz com base em `.env.example`:

```bash
STRIPE_SECRET_KEY=sua_chave_secreta_stripe
```

3. Confira a configuracao do PostgreSQL em `src/config/database.cjs`.

4. Rode as migrations:

```bash
pnpm sequelize db:migrate
```

5. Inicie o servidor:

```bash
pnpm dev
```

O backend sobe em `http://localhost:3001`.

### Frontend

1. Entre na pasta do frontend:

```bash
cd Interface-React
```

2. Instale as dependencias:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm run dev
```

O frontend usa a API em `http://localhost:3001/` definida em `src/services/api.js`.

## Observacoes:

- O repositorio esta organizado como um monorepo simples, com backend na raiz e frontend em `Interface-React/`.
- O projeto utiliza dois bancos: PostgreSQL e MongoDB.
- O checkout foi integrado com Stripe, e o painel administrativo cobre operacoes essenciais do catalogo e dos pedidos.

## Cartoes de teste Stripe

Para facilitar a avaliacao do fluxo completo de pagamento em ambiente de desenvolvimento, o recrutador pode usar os cartoes de teste abaixo no checkout:

| Bandeira | Numero | CVC | Validade |
| --- | --- | --- | --- |
| Visa | `4242 4242 4242 4242` | Quaisquer 3 digitos | Qualquer data futura |
| Visa Debito | `4000 0566 5566 5556` | Quaisquer 3 digitos | Qualquer data futura |
| Mastercard | `5555 5555 5555 4444` | Quaisquer 3 digitos | Qualquer data futura |

Observacao: esses dados sao proprios para testes com Stripe e permitem validar a integracao da API sem usar um cartao real.

## IMAGENS:

<img width="1917" height="944" alt="home" src="https://github.com/user-attachments/assets/f4c1097c-d540-449b-8e38-86e8f7f93a0c" />
<img width="1917" height="946" alt="home 2" src="https://github.com/user-attachments/assets/00762446-1342-451d-8beb-499180597319" />
<img width="1919" height="947" alt="menu" src="https://github.com/user-attachments/assets/f4f20a32-5c85-498d-b1af-702ce12ab7ab" />
<img width="1917" height="943" alt="menu 2" src="https://github.com/user-attachments/assets/8e5c797f-9ee2-4544-9b96-0164391bcf09" />
<img width="1914" height="948" alt="Checkout" src="https://github.com/user-attachments/assets/411d1e71-2f7b-404d-a324-89a9fe8ddc08" />
<img width="1917" height="945" alt="cadastro" src="https://github.com/user-attachments/assets/11719ebf-3754-4655-b07f-bbfad80e9ca3" />
<img width="1917" height="946" alt="login" src="https://github.com/user-attachments/assets/851d1754-485a-4366-baaf-9c5b446a2892" />
<img width="1916" height="949" alt="painel admin - pedidos " src="https://github.com/user-attachments/assets/8371df0b-5faa-4038-afd1-0fca9de043ec" />
<img width="1919" height="949" alt="painel admin-produtos" src="https://github.com/user-attachments/assets/572ee00a-ebf7-4939-90a7-9d77a0c03a9c" />
<img width="1916" height="948" alt="painel admin - adicionar produto" src="https://github.com/user-attachments/assets/9fc60820-9757-47eb-bc17-1476e3f898e4" />
<img width="1918" height="953" alt="painel admin - adicionar categoria" src="https://github.com/user-attachments/assets/04883664-3044-4ef7-af15-3f92b15fbe3e" />
<img width="1917" height="950" alt="painel admin - alterar taxa delivery" src="https://github.com/user-attachments/assets/1762984e-4dda-4e64-b9c5-9cff106b1137" />
