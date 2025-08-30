# React + TypeScript + Vite

# 🧩 React Projects Hub

A **collection of mini React projects** bundled into a single application.  
Built with **React**, **React Router DOM**, **Tailwind CSS**, and **Lucide React Icons**.

## ✨ Features

- 📂 **Multiple Projects in One App** – Access all projects via a sidebar navigation.
- 🎨 **Beautiful UI** – Styled with Tailwind CSS and smooth transitions.
- 📱 **Responsive Layout** – Works seamlessly on mobile and desktop.
- 🖼️ **Lucide React Icons** – All sidebar icons are powered by [lucide-react](https://lucide.dev).
- 🗂️ **Dynamic Routing** – Each project has its own route.
- ⚡ **Reusable Components** – Clean and scalable code architecture.

---
---

## 🛠️ Tech Stack

- **React 18**
- **React Router DOM v6**
- **Tailwind CSS**
- **Lucide React Icons**

---



      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
