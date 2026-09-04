# EduHelp

Plataforma de ajuda acadêmica entre estudantes desenvolvida com Next.js, React, TypeScript, Tailwind CSS, shadcn/ui e Supabase.

## Sobre o Projeto

O **EduHelp** é um aplicativo mobile-first que conecta estudantes universitários, permitindo que façam perguntas acadêmicas e recebam respostas de colegas. A plataforma facilita a colaboração entre alunos de diferentes disciplinas, promovendo o aprendizado em equipe.

### Funcionalidades

- **Autenticação**: Login e cadastro com email/senha, verificação de email
- **Feed de Perguntas**: Lista de perguntas com abas (Todos, Estudando, Salvos)
- **Criar Pergunta**: Formulário com seleção de disciplina e privacidade
- **Responder Perguntas**: Enviar respostas com opção de anexar PDF
- **Sistema de Curtidas**: Curtir e marcar melhores respostas
- **Perfil do Usuário**: Editar perfil, configurar privacidade
- **Sistema de Amigos**: Adicionar e gerenciar amigos
- **Chat**: Mensagens privadas entre usuários
- **Notificações**: Alertas para respostas, amizades e mensagens
- **Configurações**: Alterar senha, privacidade, verificação em duas etapas

## Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 14+ | Framework React com App Router |
| **React** | 18 | UI Library |
| **TypeScript** | 5 | Tipagem estática |
| **Tailwind CSS** | 4 | Estilização utility-first |
| **shadcn/ui** | Latest | Componentes UI acessíveis |
| **Lucide Icons** | Latest | Ícones SVG |
| **Supabase** | Latest | Backend (Auth, Database, Storage, Realtime) |

## Estrutura do Projeto

```
eduhelp/
├── public/
│   ├── icons/
│   │   └── logo.png          # Logo do app
│   └── manifest.json         # Configuração PWA
├── src/
│   ├── app/
│   │   ├── (auth)/           # Telas de autenticação
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   ├── verify-email/
│   │   │   └── verify-phone/
│   │   ├── (main)/           # Telas principais
│   │   │   ├── layout.tsx    # Layout com BottomNav
│   │   │   ├── page.tsx      # Home (feed de perguntas)
│   │   │   ├── notifications/
│   │   │   ├── cadeiras/
│   │   │   ├── chat/
│   │   │   ├── profile/
│   │   │   │   ├── settings/
│   │   │   │   │   ├── edit-profile/
│   │   │   │   │   └── change-password/
│   │   │   │   └── page.tsx
│   │   │   └── questions/
│   │   │       ├── create/
│   │   │       └── [id]/
│   │   │           ├── page.tsx
│   │   │           └── answer/
│   │   └── layout.tsx        # Layout raiz
│   ├── components/
│   │   ├── ui/               # Componentes shadcn/ui
│   │   ├── BottomNav.tsx     # Navegação inferior
│   │   ├── QuestionCard.tsx  # Card de pergunta
│   │   └── AnswerCard.tsx    # Card de resposta
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts     # Supabase browser
│   │   │   └── server.ts     # Supabase server
│   │   └── utils.ts
│   └── types/
│       └── index.ts          # Definições TypeScript
├── supabase/
│   └── schema.sql            # Schema do banco de dados
├── .env.local                # Variáveis de ambiente
└── package.json
```

## Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com)

### Passos

1. **Clone o repositório**
   ```bash
   git clone git@github.com:josiasdev/EduHelp.git
   cd EduHelp
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edite `.env.local` com suas credenciais do Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
   ```

4. **Execute as migrations do banco**
   - Acesse o Supabase Dashboard
   - Vá em **SQL Editor**
   - Execute o conteúdo de `supabase/schema.sql`

5. **Configure o Storage**
   - No Supabase Dashboard, vá em **Storage**
   - Crie um bucket chamado `answers`
   - Configure para aceitar arquivos PDF (máximo 10MB)

6. **Configure a Autenticação**
   - No Supabase Dashboard, vá em **Authentication** > **Providers** > **Email**
   - Para desenvolvimento, desmarque **"Confirm email"**

7. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

8. **Acesse o aplicativo**
   - Abra http://localhost:3000

## Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Lint
npm run lint
```

## Banco de Dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfis dos usuários (estende auth.users) |
| `disciplinas` | Disciplinas disponíveis |
| `questions` | Perguntas dos usuários |
| `answers` | Respostas às perguntas |
| `friends` | Relacionamentos de amizade |
| `messages` | Mensagens privadas |
| `notifications` | Notificações do sistema |

### Diagrama

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   profiles   │────<│  questions   │>────│ disciplines │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌─────────────┐     ┌──────────────┐
│   friends    │     │   answers    │
└─────────────┘     └──────────────┘
       │
       ▼
┌─────────────┐     ┌──────────────────┐
│  messages    │     │  notifications   │
└─────────────┘     └──────────────────┘
```

## Cores do Tema

| Cor | Código | Uso |
|-----|--------|-----|
| **Primary (Verde)** | `#2E9E5A` | Cor principal, botões, headers |
| **Accent (Turquesa)** | `#7EC8C8` | Botões de ação, links |
| **Brown** | `#8B6B5D` | Tabs, destaques |
| **Background** | `#F5F5F5` | Fundo das telas |

## deploy

### Vercel (Recomendado)

1. Conecte o repositório ao [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch `main`

### Outros

O projeto pode ser deployado em qualquer hospedagem que suporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Licença

MIT

## Contato

- **GitHub**: [josiasdev](https://github.com/josiasdev)
- **Repositório**: [EduHelp](https://github.com/josiasdev/EduHelp)
