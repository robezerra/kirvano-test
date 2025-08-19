
# Teste Kirvano — Micro Frontends + BFF (NestJS) para consulta de clima

Este monorepo demonstra uma arquitetura de **micro-frontends (React + Vite + Module Federation)** integrados a um **back-end NestJS** que oferece **autenticação (registro/login)** e um **BFF (Backend For Frontend)** para consulta de clima usando dados obtidos a partir do OpenWeatherMap.

> **Repositório:** `robezerra/kirvano-test`  
> **Projetos:** `host-app`, `items-mfe`, `auth-mfe` e `weather-service`

---

## Sumário
- [Visão geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Tecnologias](#tecnologias)
- [Como rodar localmente](#como-rodar-localmente)
  - [Pré‑requisitos](#pré-requisitos)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Instalação e execução](#instalação-e-execução)
- [Fluxos principais](#fluxos-principais)
  - [Autenticação (registro e login)](#autenticação-registro-e-login)
  - [Consulta de clima via BFF](#consulta-de-clima-via-bff)
- [APIs](#apis)
  - [Auth](#auth)
  - [Clima (BFF)](#clima-bff)
- [Build e deploy](#build-e-deploy)
- [Boas práticas e segurança](#boas-práticas-e-segurança)
- [Testes](#testes)
- [Troubleshooting](#troubleshooting)
- [Roadmap / Próximos passos](#roadmap--próximos-passos)
- [Licença](#licença)

---

## Visão geral

- **Objetivo**: permitir que usuários se registrem/entrem na aplicação e consultem o clima de uma **coordenada ou localidade**, com busca feita pelo **BFF NestJS**, que orquestra chamadas externas e entrega um payload já pronto para o front-end.
- **Micro-frontends**: cada MFE é um projeto **React + Vite** independente, publicado em **Module Federation** e “plugado” no **host-app**.
- **Autenticação**: baseada em **JWT** (token recebido após login/registro). O token é anexado nas chamadas ao BFF.
- **BFF (Weather)**: expõe endpoints simplificados para o front, encapsulando regras (ex.: parsing de provider externo e cache opcional).

> **Observação importante**: as instruções abaixo foram escritas a partir da **estrutura do repositório** e da **descrição do autor**. Ajuste nomes de scripts, portas e variáveis conforme o que estiver configurado nos arquivos `package.json`, `vite.config.ts` e `*.env` de cada projeto.

---

## Arquitetura

```
+-----------------------------+
|           host-app          |  -> Shell (React/Vite), roteamento e composição de MFEs
|    (Module Federation Host) |
+-----^-------------------^---+
      |                   |
      | remotes           | remotes
      |                   |
+-----+------+      +-----+------+
|  auth-mfe  |      | items-mfe  |  -> React/Vite remotos federados
+------------+      +------------+

                HTTP (com JWT)
                      |
                      v
              +-------------------+
              |  weather-service  |  -> NestJS (Auth + BFF Clima)
              |  (API/BFF)        |
              +---------+---------+
                        |
             Chamada(s) a provedor externo
                        |
                        v
      +-----------------------------------------+
      |  OpenWeatherMap API                     |
      +-----------------------------------------+
```

---

## Estrutura do repositório

```
kirvano-test/
├─ auth-mfe/        # Micro-frontend de autenticação (login/registro, UI e integração com API)
├─ items-mfe/       # Micro-frontend de itens (exemplo de feature isolada)
├─ host-app/        # Aplicação host que carrega os remotes via Module Federation
└─ weather-service/ # Backend NestJS (Auth + BFF de clima)
```

Cada pasta contém seu próprio `package.json` e configuração de build/dev. O **host-app** aponta para os **remotes** (`auth-mfe` e `items-mfe`) nas configurações de **Module Federation** (feitas no `vite.config.ts`, usando o plugin `@originjs/vite-plugin-federation`).

---

## Tecnologias

- **Banco de dados**: MongoDB (armazenamento de usuários, persistência de dados, provisionado via docker-compose).
- **Cache**: Redis (usado no back-end NestJS, provisionado via docker-compose).


- **Front-end**: React, Vite, Module Federation, TypeScript.
- **Back-end**: NestJS (TypeScript), JWT, validação com `class-validator`/`class-transformer`.
- **Integração externa**: OpenWeatherMap API; acessada por meio do BFF.
- **Infra local**: Node.js, NPM/PNPM/Yarn.
- **Qualidade** (opcional): ESLint/Prettier, Jest/Supertest no Nest.

---

## Como rodar localmente

### Pré‑requisitos

- **Node.js** LTS (>= 18.x recomendado)
- **NPM** (ou **PNPM/Yarn**, dependendo do que você preferir)
- (Opcional) **Docker**/**Docker Compose** caso você deseje containerizar os serviços

### Banco de dados e cache

O projeto utiliza **MongoDB** para persistência de usuários e **Redis** como cache/armazenamento auxiliar.
Esses serviços estão definidos no `docker-compose.yml` dentro da pasta `weather-service/`.

Exemplo de execução:

```bash
docker-compose up -d
```

Isso irá subir containers de **MongoDB** e **Redis**, além de permitir que o NestJS se conecte a eles conforme definido nas variáveis de ambiente.

### Variáveis de ambiente

Crie arquivos `.env` por projeto (exemplos abaixo). Ajuste conforme sua configuração real.

**`weather-service/.env`**

```
PORT=8080

# SECRETS
AUTH_SECRET=<secret do token JWT>

# DB
MONGO_URI=<connection string>
MONGODB_USERNAME=<usuário>
MONGODB_PASSWORD=<senha>

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=<senha>

# API Keys
OPENWEATHERMAP_API_KEY=<chave da API>
```

**`host-app/.env`**

```
# URL base da API/BFF
VITE_API_BASE_URL=http://localhost:3000
# URLs dos remotes federados (portas exemplificativas)
VITE_AUTH_MFE_URL=http://localhost:3001/assets/remoteEntry.js
VITE_ITEMS_MFE_URL=http://localhost:3002/assets/remoteEntry.js
```

> **Portas**: por padrão, Vite usa **5173**. Neste exemplo sugerimos `host-app:3000`, `auth-mfe:3001` e `items-mfe:3002`, pois é para essas portas que o script `start:mfe` aponta. Ajuste conforme seu `vite.config.ts`.

### Instalação e execução

Em **cada** pasta (`weather-service`, `host-app`, `auth-mfe`, `items-mfe`):

```bash
# Instalar dependências
npm install
# ou pnpm install / yarn

# Para rodar os MFEs em modo dev
npm run start:mfe

# Para rodar o weather-service em modo dev
npm run start:dev
```

Ordem sugerida para desenvolvimento local:

1. **Suba o back-end** `weather-service`.
2. **Suba os remotes** `auth-mfe` e `items-mfe`.
3. **Suba o host** `host-app`, que irá consumir os remotes federados e chamar o back-end.

---

## Fluxos principais

### Autenticação (registro e login)

1. Usuário acessa **`auth-mfe`** pelo **`host-app`**.
2. Ao registrar/logar, a UI envia os dados para o **`weather-service`** (`/auth/register` ou `/auth/login`).
3. O back-end responde com um **JWT**, que é armazenado no `localStorage` (ajuste futuro: utilizar **HTTP‑only cookie**).
4. As próximas chamadas ao BFF incluem o **token** (header `Authorization: Bearer <token>`).

### Consulta de clima via BFF

1. O usuário informa uma **cidade** ou **latitude/longitude**.
2. O front-end chama o endpoint do BFF (ex.: `GET /weather?query=<termo>` ou `GET /weather?lat=...&lon=...`).
3. O BFF repassa a consulta para a API do **OpenWeatherMap**.
4. O BFF retorna um **payload** (ainda não adaptado, melhoria futura) com temperatura, descrição, umidade, vento etc. atuais, além da previsão para os próximos dias.

---

## APIs

> Os caminhos abaixo são os endpoints que o front-end consome.

### Auth

`POST /auth/register`  
Body (JSON):
```json
{ "name": "Alice", "email": "alice@example.com", "password": "secret" }
```
Resposta (201):
```json
{ "id": "uuid", "name": "Alice", "email": "alice@example.com" }
```
> Pode retornar também o **token** diretamente ou em um endpoint separado.

`POST /auth/login`  
Body (JSON):
```json
{ "email": "alice@example.com", "password": "secret" }
```
Resposta (200):
```json
{ "access_token": "<jwt>" }
```

### Clima (BFF)

`GET /weather?latitude=-23.55&longitude=-46.63&units=metric`  
ou  
`GET /weather?query=Osasco&units=metric`

Resposta (200 exemplo):
```json
{
  "weather": <props>,
  "weatherForecast": <props>
}
```

---

## Build e deploy

### Front-ends (Vite)

```bash
npm run build
# gera /dist em cada MFE/host
```

- Publique o **`host-app`** e sirva os **remotes** (arquivos `remoteEntry.js`) em URLs acessíveis publicamente.
- Em produção, configure as **URLs de remotes** e a **API base** via variáveis de ambiente (`VITE_*`).

### Back-end (NestJS)

```bash
# produção (exemplo)
npm run build
npm run start:prod
```

## Testes

- **Back-end**: `npm run test` (unit), `npm run test:e2e` (e2e) — conforme configuração do Nest.
- **Front-end**: testes de componentes com Vitest.
- **Contrato**: considerar testes de contrato entre host e remotes (verificação de exposições do Module Federation).

---

## Troubleshooting

- **Erros de importação remota**: confirme as URLs de `remoteEntry.js` nas envs do `host-app`.
- **CORS/401**: verifique `CORS_ORIGIN` no back-end e o envio do `Authorization: Bearer <token>` no front-end.
- **Limite de provedores externos**: o provador OpenWeatherMap aplica rate limite nas consultas; mantenha um cache/backoff.

---

## Roadmap / Próximos passos

- [ ] Criar uma biblioteca de componentes para ter consistência de entre os micro-frontends.
- [ ] JWT: aplicar cookies HTTP‑only + SameSite/secure; renovar tokens com refresh tokens.
- [ ] Definir uma política de renovação de cache.
- [ ] Observabilidade (métricas e tracing distribuído).
- [ ] Pipeline CI/CD com build e lint por pacote.
- [ ] Testes e2e integrando host + remotes + BFF em ambiente de preview (Docker Compose).

---

## Licença

MIT License.
