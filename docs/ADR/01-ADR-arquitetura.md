# **ADR 001: Arquitetura Frontend**

## *Contexto*  
Construir um frontend moderno e escalável para consumo de uma API de notícias, com foco em:
- Facilidade de manutenção e extensibilidade
- Otimização de performance e SEO
- Boas práticas de gerenciamento de estado e cache
- Ambiente de desenvolvimento padronizado e sem atrito
- Compatibilidade com SSR (Server-side Rendering) e SSG (Static Site Generation)

---

## *Decisão pelo Framework Next.js com React*

### Por que Next.js?
- Suporte nativo a **SSR** e **SSG**, ideal para performance e SEO em páginas públicas
- Roteamento automático baseado em arquivos, com estrutura organizada
- Suporte a APIs internas caso necessário (via `pages/api`)
- Suporte total ao **React 18** e seus recursos modernos
- Facilidade de deploy em ambientes como Vercel ou Docker

### Por que React?
- Amplo ecossistema e comunidade ativa
- Componentização e reutilização facilitada
- Alto nível de flexibilidade para integrar bibliotecas modernas (como TanStack Query)

---

## *Gerenciamento de Estado com TanStack Query + Context API*

### Por que TanStack Query (React Query)?
- Cache automático de chamadas HTTP
- Refetching automático e controle de stale data
- Fácil integração com SSR do Next.js
- Elimina necessidade de estados locais para dados externos (como chamadas de API)

### Por que Context API?
- Ideal para **estados globais estáticos**, como tema, idioma ou autenticação
- Simples e sem dependência externa, ótimo para testes e protótipos
- Pode ser combinado com React Query sem conflitos

---

## *Arquitetura de Pastas*

Organização modular para favorecer escalabilidade e clareza de responsabilidades:

```bash
src/
├── components/            # Componentes reutilizáveis
├── contexts/              # Providers de estado com Context API
├── hooks/                 # Custom Hooks
├── pages/                 # Rotas do Next.js
│   ├── admin/
│   └── public/            
├── services/              # Configuração de queries e chamadas de API
├── styles/                # Estilização global e modular
└── utils/                 # Funções auxiliares
```

---

## *Ambiente Contêinerizado com Docker*

### Justificativa:
- Padronização do ambiente de desenvolvimento com Node.js, sem necessidade de instalar dependências localmente
- Setup rápido e unificado via `docker-compose`

### Estrutura Inicial:
```bash
docker/
├── Dockerfile.dev              # Container para ambiente de desenvolvimento com hot reload
├── Dockerfile                  # (opcional) Para build de produção
├── .dockerignore
├── docker-compose.yml
```

### Serviços padrão:
- **dev**: Container rodando o frontend Next.js com suporte a hot reload e porta 3001 exposta

---

### Exemplo de uso:
```bash
# Subir ambiente de desenvolvimento
docker-compose up --build

# Acessar aplicação no navegador
http://localhost:3001

# Instalar nova dependência (dentro do container)
docker exec -it nextjs-dev npm install nome-pacote
```

---
