# CONTEXT.md - EduHelp

## Contexto do Projeto

O **EduHelp** é um projeto acadêmico desenvolvido no curso de Engenharia de Software da Universidade Federal do Ceará (UFC), Campus Quixadá. O projeto nasceu da necessidade de criar uma plataforma que facilite a colaboração entre estudantes universitários, permitindo que compartilhem conhecimento e ajudem uns aos outros em disciplinas acadêmicas.

---

## Origem do Projeto

### Problema Identificado

Estudantes universitários enfrentam dificuldades em diversas disciplinas, mas muitas vezes não encontram apoio adequado. Os métodos tradicionais de busca por ajuda (grupos de WhatsApp, forums online genéricos) apresentam limitações:

- Falta de organização por disciplina
- Dificuldade em encontrar respostas confiáveis
- Ausência de sistema de avaliação de qualidade
- Falta de comunidade acadêmica integrada

### Solução Proposta

O EduHelp propõe uma plataforma dedicada ao ambiente acadêmico que permite:

1. **Postagem de dúvidas** organizadas por disciplina
2. **Respostas colaborativas** de outros estudantes
3. **Sistema de avaliação** de confiabilidade
4. **Anonimato opcional** para perguntas sensíveis
5. **Busca eficiente** por conteúdo existente

---

## Metodologia de Desenvolvimento

### Técnicas de Elicitação de Requisitos

#### 1. Entrevistas

Foram realizadas entrevistas com possíveis usuários do sistema:

**Entrevista 1 - Aluno Novato (Engenharia de Software)**
- Dificuldades: Didática dos professores
- Busca de ajuda: ChatGPT, Google, livros, colegas
- Expectativa: Chat direto, categorias por matéria

**Entrevista 2 - Aluno Veterano (Engenharia de Software)**
- Dificuldades: Timidez para tirar dúvidas em aula
- Busca de ajuda: Amigos, videoaulas, ChatGPT
- Expectativa: Sistema prático, intuitivo, acessível

#### 2. Brainstorming

Sessão realizada em 08/06/2023 com toda a equipe:

| Ideia | Discussão |
|-------|-----------|
| Postagem de dúvidas em fórum | Essencial para interação entre alunos |
| Postagens anônimas | Importante para privacidade |
| Pesquisa de perguntas existentes | Evita duplicação |
| Avaliação de confiabilidade | Referência para qualidade |
| Filtro por disciplina | Facilita busca específica |
| Seção de dúvidas gerais | Suporte abrangente |

---

## Especificação do Sistema

### Entidades do Modelo de Dados

#### 1. Usuário
- **Atributos:** id, nome, sobrenome, telefone, senha, email, data_registro
- **Relacionamentos:** Cria tópicos, posta mensagens e comentários

#### 2. Tópicos
- **Atributos:** id, título, descrição, autor, data_criação, contador_mensagens
- **Relacionamentos:** Criado por um usuário, contém várias mensagens

#### 3. Mensagens
- **Atributos:** id, conteúdo, data_postagem, autor, tópico
- **Relacionamentos:** Postada por um usuário, associada a um tópico

#### 4. Comentários
- **Atributos:** id, conteúdo, data_postagem, autor, mensagem
- **Relacionamentos:** Adicionado a mensagens existentes

### Restrições de Cardinalidade

- Um usuário pode criar vários tópicos, mensagens e comentários
- Cada tópico é criado por um único usuário
- Cada mensagem é postada por um único usuário em um único tópico
- Comentários são feitos por um único usuário em uma única mensagem

---

## Stack Tecnológica (Implementação Final)

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - UI Library
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes UI acessíveis
- **Lucide Icons** - Ícones SVG

### Backend
- **Supabase** - Backend como serviço
  - **Auth** - Autenticação de usuários
  - **Database** - PostgreSQL gerenciado
  - **Storage** - Armazenamento de arquivos (PDFs)
  - **Realtime** - Atualizações em tempo real

### Bancos de Dados
- **PostgreSQL** - Banco relacional principal
- **RLS (Row Level Security)** - Segurança em nível de linha

---

## Estrutura de Dados (Supabase)

### Tabela: profiles
```sql
profiles (
  id UUID REFERENCES auth.users(id),
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  university TEXT,
  semester TEXT,
  course TEXT,
  created_at TIMESTAMP
)
```

### Tabela: disciplines
```sql
disciplines (
  id UUID DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP
)
```

### Tabela: questions
```sql
questions (
  id UUID DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  discipline_id UUID REFERENCES disciplines(id),
  content TEXT NOT NULL,
  privacy TEXT CHECK (privacy IN ('public', 'private')),
  created_at TIMESTAMP
)
```

### Tabela: answers
```sql
answers (
  id UUID DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id),
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  pdf_url TEXT,
  is_best BOOLEAN DEFAULT FALSE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP
)
```

---

## Funcionalidades Implementadas (MVP)

### 1. Autenticação
- Login com email/senha
- Cadastro de novos usuários
- Verificação de email
- Recuperação de senha
- Login com Google (planejado)

### 2. Feed de Perguntas
- Lista de todas as perguntas
- Abas: Todos, Estudando, Salvos
- Cards com informação do autor e disciplina
- Botões para Ver e Responder

### 3. Criar Pergunta
- Formulário com textarea
- Seleção de disciplina
- Configuração de privacidade (pública/privada)

### 4. Detalhe da Pergunta
- Visualização da pergunta completa
- Lista de respostas
- Opção de responder

### 5. Responder Pergunta
- Formulário de resposta
- Upload de PDF (opcional)
- Publicação da resposta

### 6. Perfil do Usuário
- Visualização do perfil
- Abas: Minhas Perguntas, Amigos, Minhas Respostas
- Configurações

### 7. Configurações
- Editar perfil (nome, email, telefone)
- Alterar senha
- Privacidade (anonimato)
- Verificação em duas etapas

---

## Diagramas

### Diagrama de Use Case

```
┌─────────────────────────────────────────────────────────────┐
│                      EduHelp                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐          │
│  │     Aluno       │         │     Monitor     │          │
│  └────────┬────────┘         └────────┬────────┘          │
│           │                           │                     │
│           ▼                           ▼                     │
│  ┌─────────────────────────────────────────────────┐      │
│  │              <<include>>                         │      │
│  │  ┌─────────────┐  ┌─────────────┐              │      │
│  │  │  Cadastrar   │  │    Login    │              │      │
│  │  └─────────────┘  └─────────────┘              │      │
│  └─────────────────────────────────────────────────┘      │
│           │                                                 │
│           ▼                                                 │
│  ┌─────────────────────────────────────────────────┐      │
│  │           Sistema Principal                      │      │
│  ├─────────────────────────────────────────────────┤      │
│  │  • Postar Perguntas        • Responder          │      │
│  │  • Pesquisar               • Avaliar            │      │
│  │  • Gerenciar Perfil        • Notificações       │      │
│  └─────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Classes

```
┌──────────────────┐       ┌──────────────────┐
│      User        │       │    Discipline    │
├──────────────────┤       ├──────────────────┤
│ - id: UUID       │       │ - id: UUID       │
│ - name: String   │       │ - name: String   │
│ - email: String  │       │ - description:   │
│ - phone: String  │       │ - image_url:     │
│ - avatar_url:    │       └──────────────────┘
│ - university:    │                │
│ - semester:      │                │
│ - course:        │                │
└──────────────────┘                │
         │                          │
         │ 1:N                      │ 1:N
         ▼                          ▼
┌──────────────────┐       ┌──────────────────┐
│    Question      │       │     Answer       │
├──────────────────┤       ├──────────────────┤
│ - id: UUID       │◄──────│ - id: UUID       │
│ - user_id: UUID  │       │ - question_id:   │
│ - discipline_id: │       │ - user_id: UUID  │
│ - content: Text  │       │ - content: Text  │
│ - privacy: Enum  │       │ - pdf_url:       │
│ - created_at:    │       │ - is_best: Bool  │
└──────────────────┘       │ - likes_count:   │
                           │ - created_at:    │
                           └──────────────────┘
```

---

## Conclusão

O EduHelp representa uma solução completa para o problema de colaboração acadêmica entre estudantes. Com uma abordagem centrada no usuário, baseada em entrevistas e brainstorming, o sistema atende às necessidades reais dos alunos, proporcionando uma plataforma intuitiva, segura e eficaz para o compartilhamento de conhecimento.

---

## Contato

- **GitHub:** [josiasdev](https://github.com/josiasdev)
- **Repositório:** [EduHelp](https://github.com/josiasdev/EduHelp)
