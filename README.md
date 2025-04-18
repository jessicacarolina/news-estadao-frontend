# **News Frontend - Sistema de Consumo de Notícias com Next.js**

Este é o frontend de um sistema para consumo de notícias, desenvolvido com **Next.js** e **React 19**. A aplicação foi projetada para ser **escalável** e **de fácil manutenção** , com suporte a **SSR** (Server-side Rendering) e **SSG** (Static Site Generation).

---

## Documentação Técnica

As decisões sobre arquitetura, organização do projeto e tecnologias utilizadas estão descritas em uma [ADR (Architecture Decision Record)](./docs/ADR/001-ADR-arquitetura.md) disponível no repositório.

---

## Funcionalidades

- Roteamento automático baseado em arquivos com Next.js
- Integração com API de notícias via chamadas HTTP
- Estrutura modular e escalável
- Ambiente de desenvolvimento padronizado com **Docker**

---

## Como rodar localmente

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nodejs](https://nodejs.org/en)

---

### Passo a passo

#### 1. **Clone o repositório**

- via SSH
```bash 
git@github.com:jessicacarolina/news-estadao-frontend.git
cd news-estadao-frontend
```
- Ou via HTTPS
```bash 
https://github.com/jessicacarolina/news-estadao-frontend.git
cd news-estadao-frontend
```

#### 2. **Configure as variáveis de ambiente**

Renomeie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

#### 3. **Suba os containers**

```bash
docker-compose up --build
```

> Isso iniciará:
> - o frontend Next.js (porta `3001`)

Aguarde alguns segundos até o ambiente estar pronto.

---

#### 3. **Acesse a aplicação**

Abra o navegador e acesse:

- [Frontend público](http://localhost:3001)

---

## Testes

A aplicação já está configurada com testes utilizando o framework de testes do Next.js.

### Executar os testes

```bash
npm run test
```

Os testes cobrem os principais fluxos da aplicação. Abaixo está a cobertura de código:

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |    92.1 |     90.9 |   72.72 |   91.89 |                   
 app             |     100 |      100 |     100 |     100 |                   
  page.tsx       |     100 |      100 |     100 |     100 |                   
 components      |      50 |       50 |      50 |      50 | 13,21-35          
 services        |     100 |      100 |     100 |     100 |                   
  index.ts       |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```

---

## Estrutura do Projeto

```bash
src/
├── components/            # Componentes reutilizáveis
├── app/                   # Rotas do Next.js
│   ├── admin/
│       ├── news/
│           ├── create/
│           ├── update/
│   ├── slug/
│   ├── page.tsx            
│   └── layout.tsx            
├── services/              # Configuração de queries e chamadas de API
├── types/                 # Tipos reutilizáveis
```

---

## *Principais Tecnologias e Bibliotecas Utilizadas*

### Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Bibliotecas Utilizadas

### **TailwindCSS**
- **Objetivo**: Estilização da aplicação de forma rápida e responsiva.
- **Por que usar**: TailwindCSS oferece uma abordagem utilitária, onde você pode construir designs diretamente no HTML, proporcionando flexibilidade e velocidade no desenvolvimento. Além disso, sua integração com o Next.js facilita a personalização e otimização do código CSS para produção.

### **Axios**
- **Objetivo**: Realizar chamadas HTTP para a API de notícias.
- **Por que usar**: Axios é uma biblioteca de cliente HTTP baseada em Promises, simples de usar e que permite uma fácil manipulação de requisições assíncronas, cabeçalhos HTTP e interceptação de respostas.

### **Tiptap**
- **Objetivo**: Editor de texto enriquecido para personalizar conteúdos.
- **Por que usar**: Tiptap é um editor de texto moderno e altamente extensível baseado no ProseMirror. Ele permite a criação e personalização de textos ricos que podem ser salvos como HTML, sendo ideal para gerenciar conteúdos como notícias e posts.

---

#### Feito com ❤️ por [Jéssica Santos](https://github.com/jessicacarolina)
