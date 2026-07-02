# Code Conventions

## Nomenclatura de arquivos e pastas

| Tipo               | Convenção  | Exemplo                                    |
| ------------------ | ---------- | ------------------------------------------ |
| Componentes `.jsx` | PascalCase | `QuestionCard.jsx`                         |
| Páginas `.jsx`     | PascalCase | `ChecklistPage.jsx`                        |
| Utilitários `.js`  | camelCase  | `checklist.js`                             |
| Dados `.js`        | camelCase  | `questions.js`                             |
| Pastas             | lowercase  | `components/`, `pages/`, `utils/`, `data/` |

## Componentes

Use **function declaration** com props desestruturadas no parâmetro:

```jsx
function ComponentName({ prop1, prop2, onHandler }) {
  return <div>...</div>;
}

export default ComponentName;
```

- Prefira tags semânticas: `<header>`, `<main>`, `<article>`, `<section>`
- Um único elemento raiz por componente
- Renderização condicional com ternário

## Ordem de imports

```js
// 1. React (hooks, etc.)
import { useState, useMemo } from "react";

// 2. Bibliotecas externas
import { useNavigate } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

// 3. Páginas e componentes locais
import ChecklistPage from "./pages/ChecklistPage";
import Header from "./components/Header";

// 4. Dados
import { questions } from "./data/questions";

// 5. Utilitários
import { getFilteredQuestions } from "./utils/checklist";
```

## Nomenclatura de variáveis e funções

| Padrão                | Prefixo  | Exemplo                                         |
| --------------------- | -------- | ----------------------------------------------- |
| Estado                | —        | `selectedProfile`, `currentDimension`           |
| Booleanos             | `is`     | `isSelected`, `isLastDimension`                 |
| Event handlers        | `handle` | `handleNextDimension`, `handleAnswerQuestion`   |
| Getters / utilitários | `get`    | `getFilteredQuestions`, `getProgressPercentage` |
| Callbacks via props   | `on`     | `onAnswer`, `onNext`, `onToggleDimension`       |

---

## Commits

Siga o padrão **Conventional Commits**: `tipo: descrição`

```
feat: nova funcionalidade
fix: correção de bug
style: mudanças visuais sem lógica
refactor: refatoração sem mudança de comportamento
doc: documentação
chore: configurações, dependências
```

### Regras

- Tudo em **letras minúsculas**
- Descrição em **português**
- Sem ponto final
- Seja específico — evite mensagens genéricas como "update" ou "changes"

### Exemplos

```
feat: adicionada página de resultados com gráficos
fix: corrigida validação de perguntas obrigatórias
style: ajustado espaçamento do header em mobile
doc: adicionadas convenções de código
refactor: extraída lógica de pontuação para utils
```
