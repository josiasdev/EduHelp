# EduHelp

Plataforma de ajuda acadêmica entre estudantes desenvolvida com Next.js, React, TypeScript, Tailwind CSS, shadcn/ui e Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E)](https://supabase.com/)

## Sobre o Projeto

O **EduHelp** é um aplicativo mobile-first que conecta estudantes universitários, permitindo que façam perguntas acadêmicas e recebam respostas de colegas. A plataforma facilita a colaboração entre alunos de diferentes disciplinas, promovendo o aprendizado em equipe.

### Funcionalidades

- **Autenticação**: Login/cadastro com email/senha, verificação de email
- **Feed de Perguntas**: Lista de perguntas com abas (Todos, Estudando, Salvos)
- **Criar Pergunta**: Formulário com seleção de disciplina e privacidade
- **Responder Perguntas**: Enviar respostas com opção de anexar PDF
- **Sistema de Curtidas**: Curtir e marcar melhores respostas
- **Perfil do Usuário**: Editar perfil, configurar privacidade
- **Sistema de Amigos**: Adicionar e gerenciar amigos
- **Chat**: Mensagens privadas entre usuários
- **Notificações**: Alertas para respostas, amizades e mensagens
- **Configurações**: Alterar senha, privacidade, verificação em duas etapas

## Equipe

| Nome | Matrícula | GitHub |
|------|-----------|--------|
| Francisco Josias Da Silva Batista | 542167 | [@josiasdev](https://github.com/josiasdev) |
| Manuela Dias Do Nascimento | 542164 | - |
| Matheus Maciel Cardozo | 470755 | - |
| Luiz Eduardo Paiva Ribeiro | 516384 | - |
| Guilherme Pinheiro Lessa Souza | 542150 | - |

**Docente:** Carla Ilane Moreira Bezerra  
**Disciplina:** Requisitos de Software  
**Instituição:** UFC - Campus Quixadá

## Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 14+ | Framework React com App Router |
| **React** | 18 | UI Library |
| **TypeScript** | 5 | Tipagem estática |
| **Tailwind CSS** | 4 | Estilização utility-first |
| **shadcn/ui** | Latest | Componentes UI acessíveis |
| **Lucide Icons** | Latest | Ícones SVG |
| **Supabase** | Latest | Backend (Auth, Database, Storage) |

## Estrutura do Projeto

```
eduhelp/
├── public/                    # Arquivos estáticos
│   ├── icons/
│   └── manifest.json
├── src/
│   ├── app/                   # App Router
│   │   ├── (auth)/           # Telas de autenticação
│   │   ├── (main)/           # Telas principais
│   │   └── layout.tsx
│   ├── components/            # Componentes React
│   │   ├── ui/               # shadcn/ui
│   │   └── *.tsx             # Componentes customizados
│   ├── lib/                   # Utilitários
│   │   └── supabase/
│   └── types/
├── supabase/
│   └── schema.sql            # Schema do banco
├── docs/                      # Documentação
└── relatorio/                 # Documentos acadêmicos
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
   
   Edite `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
   ```

4. **Execute as migrations do banco**
   - Acesse o Supabase Dashboard → SQL Editor
   - Execute o conteúdo de `supabase/schema.sql`

5. **Configure o Storage**
   - No Supabase Dashboard → Storage
   - Crie um bucket chamado `answers`
   - Configure para aceitar PDFs (máximo 10MB)

6. **Configure a Autenticação**
   - Authentication → Providers → Email
   - Para dev, desmarque "Confirm email"

7. **Inicie o servidor**
   ```bash
   npm run dev
   ```

8. **Acesse o aplicativo**
   - http://localhost:3000

## Comandos

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm start            # Servidor de produção
npm run lint         # Verificar código
```

## Banco de Dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfis dos usuários |
| `disciplines` | Disciplinas disponíveis |
| `questions` | Perguntas dos usuários |
| `answers` | Respostas às perguntas |
| `friends` | Relacionamentos de amizade |
| `messages` | Mensagens privadas |
| `notifications` | Notificações do sistema |

### Schema

O schema completo está em `supabase/schema.sql`.

## Cores do Tema

| Cor | Código | Uso |
|-----|--------|-----|
| **Primary** | `#2E9E5A` | Cor principal (verde) |
| **Accent** | `#7EC8C8` | Botões de ação (turquesa) |
| **Brown** | `#8B6B5D` | Tabs e destaques |
| **Background** | `#F5F5F5` | Fundo das telas |

## Documentação

- [Documentação Completa](docs/README.md)
- [Contexto do Projeto](docs/CONTEXT.md)
- [Arquitetura](docs/arquitetura.md)

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch `main`

## Protótipo

O protótipo foi desenvolvido no Figma:

- [Design no Figma](https://www.figma.com/file/XNewO1zTuRhrJHYQCVTNpP/EduHelp)
- [Proto para Teste](https://www.figma.com/proto/XNewO1zTuRhrJHYQCVTNpP/EduHelp)

## Licença

MIT

## Contato

- **GitHub:** [josiasdev](https://github.com/josiasdev)
- **Repositório:** [EduHelp](https://github.com/josiasdev/EduHelp)
