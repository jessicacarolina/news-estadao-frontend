# **ADR 001: Arquitetura Frontend**

## *Contexto*  
Construir um frontend moderno e escalável para consumo de uma API de notícias, com foco em:
- Facilidade de manutenção e extensibilidade
- Ambiente de desenvolvimento padronizado e sem atrito com docker
- Compatibilidade com SSR (Server-side Rendering) e SSG (Static Site Generation)

---

## *Decisão pelo Framework Next.js com React*

### Por que Next.js?
- Suporte nativo a **SSR** e **SSG**, ideal para performance e SEO em páginas públicas
- Roteamento automático baseado em arquivos, com estrutura organizada
- Suporte a APIs internas caso necessário (via `pages/api`)
- Suporte total ao **React 19** e seus recursos modernos
- Facilidade de deploy em ambientes como Vercel ou Docker
- Altamente recomendado pela própia comnidade do React

### Por que React?
- Amplo ecossistema e comunidade ativa
- Componentização e reutilização facilitada
- Alto nível de flexibilidade para integrar bibliotecas modernas

---

## *Arquitetura de Pastas*

Organização modular para favorecer escalabilidade e clareza de responsabilidades:

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

## *Ambiente Contêinerizado com Docker*

### Justificativa:
- Padronização do ambiente de desenvolvimento com Node.js, sem necessidade de instalar dependências localmente
- Setup rápido e unificado via `docker-compose`

### Estrutura Inicial:
```bash
docker/
├── Dockerfile                 
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
