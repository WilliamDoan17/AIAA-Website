# AIAA at USF — Frontend

The official website for the **American Institute of Aeronautics and Astronautics at USF**, built with React and Vite.

## Tech Stack

- **React** — component-based UI
- **Vite** — fast dev server and bundler with HMR
- **React Router** — client-side routing
- **CSS Modules** — scoped, component-level styling

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed top navigation
│   ├── Navbar.module.css
│   ├── Footer.jsx          # Site footer
│   └── Footer.module.css
├── pages/
│   ├── Landing.jsx         # Home page
│   └── Landing.module.css
└── hooks/
    ├── useProjects.js      # Fetches project data
    ├── useEvents.js        # Fetches upcoming events
    └── useMembers.js       # Fetches team member data
```

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## ESLint

The project includes ESLint for code quality. For a production app, consider migrating to TypeScript and enabling type-aware lint rules — see the [TS + ESLint setup guide](https://typescript-eslint.io).

## Vite Plugin

This project uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (Babel) for Fast Refresh. Swap for [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) if you want faster builds via SWC.

## React Compiler

The React Compiler is not enabled by default due to its effect on dev/build performance. To opt in, see the [React Compiler installation docs](https://react.dev/learn/react-compiler/installation).
