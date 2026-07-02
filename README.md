# Pet-10 Checklist de Sustentabilidade

Ferramenta web para avaliação da sustentabilidade de soluções de software, desenvolvida em parceria entre a **Prefeitura de Porto Alegre** e a **UFCSPA**.

## Sobre o projeto

O checklist guia o usuário por um questionário estruturado em 5 dimensões de sustentabilidade, adaptado a dois perfis distintos: **Desenvolvedor** (perspectiva técnica) e **Avaliador** (perspectiva do usuário final). Ao final, gera um relatório visual com pontuações por dimensão e uma pontuação global.

### Dimensões avaliadas

| Dimensão | Descrição |
|---|---|
| Individual | Bem-estar, desenvolvimento pessoal e significado |
| Social | Colaboração, ética, confiança e impacto social |
| Econômica | Custo-benefício, viabilidade financeira e valor gerado |
| Técnica | Qualidade, segurança, desempenho e manutenibilidade |
| Ambiental | Eficiência de recursos, energia e ciclo de vida |

### Fluxo da aplicação

1. **Intro** — apresentação do projeto
2. **Configuração** — escolha de perfil e dimensões a avaliar
3. **Checklist** — 42 perguntas em escala Likert (1–5)
4. **Resultados** — pontuações por dimensão, gráfico de floresta e gráfico de barras comparativo

## Tech stack

- **React 19** + **Vite 8**
- **React Router DOM 7** — navegação client-side
- **Tailwind CSS 4** — estilização
- **Chart.js 4** (CDN) — gráficos na página de resultados
- **Tabler Icons React** — ícones SVG

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já vem instalado com o Node.js)
- [Git](https://git-scm.com/)

Para verificar se já tem o Node e npm instalados:

```bash
node -v
npm -v
```

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/camillyjulia/pet-10-checklist.git
```

**2. Acesse a pasta do projeto**

```bash
cd pet-10-checklist/checklist-sustentabilidade
```

**3. Instale as dependências**

```bash
npm install
```

**4. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Outros comandos

```bash
npm run build    # build de produção
npm run preview  # preview do build
npm run lint     # análise estática com ESLint
```

## Estrutura de pastas

```
checklist-sustentabilidade/
├── src/
│   ├── pages/          # IntroPage, SetupPage, ChecklistPage, ResultsPage
│   ├── components/     # Componentes reutilizáveis (Header, QuestionCard, etc.)
│   ├── data/           # Perguntas, dimensões e opções de resposta
│   └── utils/          # Funções de filtragem e cálculo de pontuação
├── public/
└── vite.config.js
```
