# Guia de Arquitetura - EduHelp

## Visão Geral da Arquitetura

O EduHelp utiliza uma arquitetura moderna baseada em Next.js com App Router, conectada ao Supabase como backend即服务.

```
┌─────────────────────────────────────────────────────────────┐
│                      Cliente (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Next.js App                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │   │
│  │  │   Pages     │  │ Components  │  │   Hooks    │ │   │
│  │  └─────────────┘  └─────────────┘  └────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Supabase Client                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Cloud                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌────────────────────┐ │
│  │    Auth     │  │  Database   │  │      Storage       │ │
│  │  (JWT)      │  │ (PostgreSQL)│  │    (PDF Files)     │ │
│  └─────────────┘  └─────────────┘  └────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
eduhelp/
├── public/                    # Arquivos estáticos
│   ├── icons/                 # Ícones do app
│   │   └── logo.png
│   └── manifest.json          # Configuração PWA
│
├── src/
│   ├── app/                   # App Router (Next.js 14+)
│   │   ├── (auth)/            # Grupo de rotas de autenticação
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   ├── verify-email/
│   │   │   │   └── page.tsx
│   │   │   └── verify-phone/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (main)/            # Grupo de rotas principais
│   │   │   ├── layout.tsx     # Layout com BottomNav
│   │   │   ├── page.tsx       # Home (feed de perguntas)
│   │   │   ├── notifications/
│   │   │   │   └── page.tsx
│   │   │   ├── cadeiras/
│   │   │   │   └── page.tsx
│   │   │   ├── chat/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   ├── page.tsx
│   │   │   │   └── settings/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── edit-profile/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── change-password/
│   │   │   │           └── page.tsx
│   │   │   └── questions/
│   │   │       ├── create/
│   │   │       │   └── page.tsx
│   │   │       └── [id]/
│   │   │           ├── page.tsx
│   │   │           └── answer/
│   │   │               └── page.tsx
│   │   │
│   │   ├── layout.tsx         # Layout raiz
│   │   ├── page.tsx           # Página raiz (redirect)
│   │   └── globals.css        # Estilos globais
│   │
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes shadcn/ui
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── textarea.tsx
│   │   │
│   │   ├── BottomNav.tsx      # Navegação inferior
│   │   ├── QuestionCard.tsx   # Card de pergunta
│   │   └── AnswerCard.tsx     # Card de resposta
│   │
│   ├── lib/                   # Utilitários
│   │   ├── supabase/
│   │   │   ├── client.ts      # Supabase browser client
│   │   │   └── server.ts      # Supabase server client
│   │   └── utils.ts           # Funções utilitárias
│   │
│   └── types/
│       └── index.ts           # Definições TypeScript
│
├── supabase/
│   └── schema.sql             # Schema do banco de dados
│
├── relatorio/                 # Documentos acadêmicos
│   ├── relatorio_rds.pdf
│   └── EduHelp_Fundamentos_Banco_Dados.pdf
│
└── docs/                      # Documentação
    ├── README.md
    ├── CONTEXT.md
    └── arquitetura.md
```

---

## Fluxo de Dados

### 1. Fluxo de Autenticação

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Login  │────>│ Supabase│────>│  Auth   │────>│  Home   │
│  Page   │     │ Client  │     │ Service │     │  Page   │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
                      │
                      │ JWT Token
                      ▼
                ┌─────────────┐
                │   Cookies   │
                │  (httpOnly) │
                └─────────────┘
```

### 2. Fluxo de Pergunta

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Criar   │────>│ Supabase│────>│Database │────>│  Feed   │
│ Pergunta│     │ Insert  │     │  Table  │     │ Update  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
      │
      │ Dados do formulário
      ▼
┌─────────────┐
│  Validação  │
│  (Client)   │
└─────────────┘
```

### 3. Fluxo de Resposta

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Responder│────>│ Upload  │────>│Supabase │────>│ Notificação│
│ Pergunta │     │  PDF    │     │ Insert  │     │  Trigger │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

---

## Segurança

### Row Level Security (RLS)

Todas as tabelas possuem RLS habilitado:

```sql
-- Exemplo: Políticas de perguntas
CREATE POLICY "Perguntas públicas são visíveis para todos"
  ON questions FOR SELECT
  USING (privacy = 'public' OR user_id = auth.uid());

CREATE POLICY "Usuários podem criar perguntas"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Autenticação

- **JWT Tokens** gerenciados pelo Supabase Auth
- **Cookies httpOnly** para armazenamento seguro
- **Refresh tokens** para manter sessão ativa

### Validação

- **Client-side:** Formulários com validação React
- **Server-side:** RLS policies no banco de dados

---

## Performance

### Otimizações Implementadas

1. **Static Generation (SSG)** para páginas estáticas
2. **Server-Side Rendering (SSR)** para páginas dinâmicas
3. **Lazy Loading** de componentes
4. **Image Optimization** com Next.js Image
5. **Font Optimization** com next/font

### Índices do Banco

```sql
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_discipline_id ON questions(discipline_id);
CREATE INDEX idx_answers_question_id ON answers(question_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

---

## Deploy

### Vercel (Recomendado)

1. Conectar repositório GitHub ao Vercel
2. Configurar variáveis de ambiente
3. Deploy automático a cada push

### Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

---

## Fluxo de Desenvolvimento

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Local  │────>│   Git   │────>│ GitHub  │────>│ Vercel  │
│  Dev    │     │ Commit  │     │  Push   │     │ Deploy  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
      │
      │ npm run dev
      ▼
┌─────────────┐
│ localhost   │
│    :3000    │
└─────────────┘
```
