# Naveen Oruganti – Portfolio

## Project Structure

```
portfolio/
├── index.html              ← Open this in a browser (no build step needed)
├── src/
│   ├── styles.css          ← All CSS (theme, animations, layout, components)
│   ├── main.js             ← All JavaScript (dock, theme toggle, scroll animations)
│   └── components/         ← React/TSX versions (for Vite/Next.js migration)
│       ├── Header.tsx
│       ├── MagicDock.tsx
│       └── useScrollAnimation.ts
└── README.md
```

---

## Option 1 — Plain HTML (no build step)

Just open `index.html` directly in a browser or use VS Code Live Server:

```bash
# Install the "Live Server" VS Code extension, then right-click index.html → Open with Live Server
```

---

## Option 2 — React + Vite (recommended for production)

### 1. Create a Vite project

```bash
npm create vite@latest portfolio-react -- --template react-ts
cd portfolio-react
npm install
```

### 2. Copy files

- Copy `src/styles.css` → `src/index.css`
- Copy `src/components/*.tsx` and `src/components/*.ts` → `src/components/`
- Import the CSS in `src/main.tsx`:
  ```ts
  import './index.css'
  ```

### 3. Use the components

```tsx
// src/App.tsx
import Header from './components/Header'
import MagicDock from './components/MagicDock'
import { useScrollAnimation } from './components/useScrollAnimation'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  return (
    <>
      <Header onScrollTo={scrollTo} />
      {/* Add your sections here */}
    </>
  )
}
```

### 4. Run

```bash
npm run dev
```

---

## Profile Photo

Replace the placeholder emoji in `index.html`:

```html
<!-- Remove this -->
<div class="profile-placeholder">👨‍💻</div>

<!-- Add this (put mine.jpeg in the same folder as index.html) -->
<img class="profile-img" src="mine.jpeg" alt="Naveen Oruganti" />
```

---

## Update Social Links

In `index.html`, search for `https://github.com` / `https://linkedin.com` and replace with your actual profile URLs.

---

## Theme Toggle

The `AnimatedThemeToggler` moon/sun button is in the header. It:
- Switches between dark (default) and light mode
- Persists across page reloads via `localStorage`
- Animates with a 180° spin on toggle
