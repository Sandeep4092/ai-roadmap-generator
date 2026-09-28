# 🗺️ Pathforge — Forge Your Project's Path

A smart, browser-based project roadmap generator that creates professional visual timelines and markdown exports — **no API costs, no server, runs entirely in your browser.**

![Pathforge Screenshot](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-orange)

## ✨ Features

- **8 Project Templates** — Web App, Mobile, Data Pipeline, ML, E-Commerce, API, DevOps, Marketing
- **Smart Scheduling Engine** — Topological sort, critical path analysis, team capacity scaling
- **Interactive Gantt Chart** — Custom SVG timeline with zoom (day/week/month), tooltips, dependency arrows
- **Multi-Step Wizard** — Beautiful dark-mode UI with animated transitions
- **Dual Export** — Markdown document + PNG chart image
- **Zero Cost** — No API calls, no backend, no data leaves your browser
- **Offline-Ready** — Works without internet once loaded

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/pathforge.git
cd pathforge

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

## 🏗️ How It Works

1. **Choose a template** — Pick from 8 project types (Web App, Mobile, ML, etc.)
2. **Configure** — Set project name, scope (S/M/L), team size, and timeline
3. **Generate** — The engine decomposes your project into phases, tasks, and milestones
4. **Visualize** — See your roadmap as an interactive Gantt chart
5. **Export** — Download as Markdown or PNG

## 📁 Project Structure

```
pathforge/
├── index.html              # Entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.js              # App controller
    ├── styles/
    │   └── index.css        # Premium dark-mode design system
    ├── engine/
    │   ├── templates.js     # 8 project templates (150+ tasks)
    │   ├── scheduler.js     # Scheduling algorithm + critical path
    │   └── generator.js     # Orchestrator
    └── components/
        ├── wizard.js        # 4-step input wizard
        ├── gantt.js         # SVG Gantt chart renderer
        └── export.js        # Markdown + PNG export
```

## 🧠 The Engine

The rule-based engine uses a curated knowledge base of real-world project patterns:

| Template | Phases | Tasks |
|----------|--------|-------|
| Web Application | Discovery → Design → Frontend → Backend → Testing → Deploy | 25+ |
| Mobile App | Research → UI/UX → Core Dev → Platform → QA → Store | 25+ |
| Data Pipeline | Requirements → Modeling → ETL → Validation → Monitoring | 20+ |
| Machine Learning | Data → Preprocessing → Training → Evaluation → Deploy | 22+ |
| E-Commerce | Catalog → Payments → UX → Fulfillment → Launch | 24+ |
| API / Microservice | Architecture → Implementation → Testing → Docs → Deploy | 22+ |
| DevOps | Assessment → Planning → Implementation → Migration → Ops | 22+ |
| Marketing Campaign | Strategy → Content → Design → Distribution → Analytics | 20+ |

### Scheduling Algorithm
- **Topological sort** (Kahn's algorithm) for dependency resolution
- **Critical path analysis** to identify bottleneck tasks
- **Team capacity scaling** with diminishing returns: `duration / (1 + 0.3 × log₂(teamSize))`
- **Deadline compression** to fit within target dates

## 🛠️ Tech Stack

- **Vanilla JS** — Zero framework dependencies
- **Vite** — Lightning-fast dev server and build tool
- **Custom SVG** — Hand-built Gantt chart renderer
- **CSS Custom Properties** — Themeable dark-mode design system

## 📄 License

MIT © 2026
