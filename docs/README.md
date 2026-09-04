# Documentação do EduHelp

## Visão Geral

O **EduHelp** é uma plataforma de monitoria online desenvolvida para auxiliar alunos com dificuldades em disciplinas acadêmicas. O sistema funciona como um fórum de discussão onde estudantes podem postar dúvidas, receber respostas e colaborar mutuamente.

## Equipe

| Nome | Matrícula | Função |
|------|-----------|--------|
| Francisco Josias Da Silva Batista | 542167 | Desenvolvedor Full Stack |
| Manuela Dias Do Nascimento | 542164 | Analista de Requisitos |
| Matheus Maciel Cardozo | 470755 | Desenvolvedor |
| Luiz Eduardo Paiva Ribeiro | 516384 | Designer UI/UX |
| Guilherme Pinheiro Lessa Souza | 542150 | Analista de Dados |

**Docente:** Carla Ilane Moreira Bezerra  
**Disciplina:** Requisitos de Software  
**Período:** Julho de 2023

---

## Domínio do Sistema

Trata-se de um sistema de monitoria para ajudar alunos com dificuldades nas disciplinas, onde os mesmos podem entrar em contato com outros alunos para buscar ajuda, permitindo a postagem das dúvidas em uma espécie de "chat" ou "fórum", onde aqueles que se interessarem ou souberem poderão responder e dar auxílio.

### Características Principais

- Cadastro com nome e email institucional
- Opção de informar disciplinas cursadas
- Postagens abertas e anônimas
- Pesquisa por perguntas já feitas
- Avaliação do nível de confiabilidade das respostas

---

## Personas

### 1. Lucas Oliveira (Monitor)

| Campo | Descrição |
|-------|-----------|
| **Idade** | 22 anos |
| **Curso** | Engenharia de Software (8º semestre) |
| **Perfil** | Estudante proativo, colaborativo e comunicativo |
| **Objetivos** | Ajudar outros alunos, fortalecer compreensão通过 ensino |
| **Motivações** | Sentir-se útil, estabelecer conexões com estudantes |
| **Frustrações** | Falta de engajamento dos alunos, perguntas não claras |

### 2. Camila Ferreira (Aluna)

| Campo | Descrição |
|-------|-----------|
| **Idade** | 21 anos |
| **Curso** | Ciências da Computação (2º semestre) |
| **Perfil** | Curiosa, persistente, explora diferentes abordagens |
| **Objetivos** | Obter respostas claras em disciplinas técnicas |
| **Motivações** | Superar dificuldades, tornar-se competente na área |
| **Frustrações** | Respostas inadequadas, falta de tempo |

### 3. Felipe Santos (Veterano)

| Campo | Descrição |
|-------|-----------|
| **Idade** | 23 anos |
| **Curso** | Sistemas da Informação (4º semestre) |
| **Perfil** | Apaixonado por tecnologia, pró-ativo |
| **Objetivos** | Compartilhar experiência, aprender com desafios alheios |
| **Motivações** | Contribuir para formação de outros, desenvolver liderança |
| **Frustrações** | Resistência dos alunos, falta de recursos atualizados |

---

## Funcionalidades do Sistema

### 1. Registro de Alunos
- Cadastro com nome e email institucional
- Opção de informar disciplinas cursando
- Detalhes adicionais na descrição

### 2. Postagem de Dúvidas
- Criação de perguntas em fórum/chat
- Opção de postagem anônima
- Categorização por disciplina

### 3. Respostas e Interações
- Responder perguntas de outros alunos
- Comentários e discussões
- Avaliação de confiabilidade

### 4. Sistema de Busca
- Pesquisa por perguntas existentes
- Filtro por disciplina
- Evita duplicação de dúvidas

### 5. Perfil do Usuário
- Visualização e edição de perfil
- Informações pessoais e disciplinas
- Histórico de atividades

### 6. Notificações
- Alertas para novas respostas
- Atualizações em perguntas seguindo
- Interações com o usuário

---

## Requisitos Funcionais

| ID | Funcionalidade | Descrição |
|----|----------------|-----------|
| RF01 | Registro de Alunos | Cadastro com nome, email e informações adicionais |
| RF02 | Login de Alunos | Autenticação com credenciais |
| RF03 | Postar Perguntas | Criar dúvidas em chat ou fórum |
| RF04 | Responder Perguntas | Fornecer auxílio a outros alunos |
| RF05 | Pesquisar Perguntas | Buscar dúvidas existentes |
| RF06 | Avaliar Respostas | Avaliar utilidade e precisão |
| RF07 | Visualizar Perfil | Ver informações pessoais |
| RF08 | Editar Perfil | Atualizar dados cadastrais |
| RF09 | Notificações | Alertas de interações |
| RF10 | Sair do Sistema | Encerrar sessão |

---

## Requisitos Não Funcionais

| Requisito | Descrição |
|-----------|-----------|
| **Escalabilidade** | Suportar grande número de alunos simultâneos |
| **Usabilidade** | Interface intuitiva e fácil utilização |
| **Disponibilidade** | Acesso 24/7 com manutenção mínima |
| **Performance** | Respostas rápidas e tempo de carregamento mínimo |
| **Confiabilidade** | Consistência e integridade das informações |

---

## Histórias de Usuário

### Cadastro
> **Como** aluno iniciante, **desejo** me cadastrar no sistema **para** obter ajuda em disciplinas específicas.

### Postagem Anônima
> **Como** aluno, **desejo** postar perguntas anônimas **para** não ser identificado.

### Respostas
> **Como** aluno veterano, **desejo** responder perguntas **para** compartilhar conhecimento.

### Busca
> **Como** aluno, **desejo** pesquisar perguntas existentes **para** encontrar respostas relevantes.

### Avaliação
> **Como** aluno, **desejo** avaliar respostas **para** identificar as mais confiáveis.

### Perfil
> **Como** aluno, **desejo** editar meu perfil **para** atualizar informações pessoais.

### Notificações
> **Como** aluno, **desejo** receber notificações **para** acompanhar interações.

### Logout
> **Como** aluno, **desejo** sair do sistema **para** encerrar minha sessão.

### Filtros
> **Como** aluno, **desejo** filtrar perguntas por disciplina **para** otimizar minha busca.

### Seguir Perguntas
> **Como** aluno, **desejo** seguir perguntas **para** receber atualizações.

---

## Protótipo

O protótipo foi desenvolvido no Figma:

- **Design:** [Link do Figma](https://www.figma.com/file/XNewO1zTuRhrJHYQCVTNpP/EduHelp)
- **Proto:** [Link para Teste](https://www.figma.com/proto/XNewO1zTuRhrJHYQCVTNpP/EduHelp)

---

## Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                      EduHelp                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │   Cadastrar   │      │    Login     │                    │
│  └──────┬───────┘      └──────┬───────┘                    │
│         │                     │                             │
│         ▼                     ▼                             │
│  ┌──────────────────────────────────────┐                  │
│  │         Sistema Principal            │                  │
│  ├──────────────────────────────────────┤                  │
│  │  • Postar Perguntas                  │                  │
│  │  • Responder Perguntas               │                  │
│  │  • Pesquisar                         │                  │
│  │  • Avaliar Respostas                 │                  │
│  │  • Gerenciar Perfil                  │                  │
│  │  • Notificações                      │                  │
│  └──────────────────────────────────────┘                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Referências

- Documento de Requisitos de Software - Entrega 3
- Fundamentos de Banco de Dados - Relatório Acadêmico
- Protótipo Figma do EduHelp
