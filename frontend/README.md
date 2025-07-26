# TrustBuilder Wargames AI API Documentation

Modern, interactive API documentation for the TrustBuilder Wargames AI server.

## 🚀 Quick Start

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production to dist/ |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run linting |
| `pnpm run format` | Format code |

## Appearance

<details>
  <summary>Cyberphnk Theme</summary>
  <img src="assets/images/fe_cyberphnk_theme.PNG" alt="Customer Journey" title="Customer Journey" width="60%" />
</details>
<details>
  <summary>Light Theme</summary>
  <img src="assets/images/fe_light_theme.PNG" alt="Customer Journey" title="Customer Journey" width="60%" />
</details>
<details>
  <summary>Dark Theme</summary>
  <img src="assets/images/fe_dark_theme.PNG" alt="Customer Journey" title="Customer Journey" width="60%" />
</details>

## 🔧 Configuration

### 📋 Prerequisites

- Node.js 18+

### Environment Variables

Create `.env` file for API configuration:

```env
VITE_API_BASE_URL=https://wargames-ai.trb.ai
```

### Vite Config

Customize build settings in `vite.config.js`:

```js
export default {
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}
```

## 📚 API Endpoints

- `GET /llm` - Get LLM metadata
- `POST /llm` - Submit prompt to LLM
- `GET /eval-results` - Get evaluation results
- `POST /join-game` - Join game session
- `GET /game-status` - Get game status

## 🎨 Tech Stack

- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Flowbite** - UI components
- **Lucide Icons** - Icon library

## 🏗️ Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   └── themes/          # Themes
├── index.html           # HTML entry point
├── package.json         # Dependencies & scripts
└── README.md            # 
```
