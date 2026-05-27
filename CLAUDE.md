# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with HMR (Vite)
npm run build      # Type-check + production build (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

No test runner is configured.

## Stack

- **React 19** + **TypeScript** + **Vite 8** + **React Router v6** + **Recharts**
- ESLint with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Plain CSS (`src/index.css`) — no Tailwind; wireframe style = black/white/gray only

## Architecture

The module has 4 drill-down levels with client-side routing:

| Level | Route | Component |
|-------|-------|-----------|
| 1 — Empresa | `/resultados/empresa` | `EmpresaDashboard` |
| 2 — Gerencia/Área | `/resultados/agrupacion/:id` | `AgrupacionView` |
| 3 — Equipo/Jefatura | `/resultados/equipo/:id` | `EquipoView` |
| 4 — Colaborador | `/resultados/colaborador/:id` | `ColaboradorView` |

`App.tsx` owns global state: `periodo` (selected evaluation cycle) and `compare` toggle (overlay previous period). Both props are passed down to every page.

`AppLayout` (sidebar + topbar) wraps all pages. It renders breadcrumbs, period selector, compare toggle, and export dropdown.

All mock data lives in `src/data/mockData.ts`. Helper functions `getGerenciaById`, `getJefaturaById`, `getColaboradorById`, and `getTop5Gaps` are the main lookup utilities.

**Charts** (`src/components/Charts/`):
- `RadarChartComponent` — spider/radar with smart-default top-5 gaps, chip selector, max-8 guardrail, editable view
- `HistoricalBarChart` — 3-period bar chart
- `ScatterPlotComponent` — team scatter (objectives vs competencies)
- `Sparkline` — inline mini bar gaps for the team table

**Radar chart rules** (hard-coded): max 8 axes, 2 polygons standard (Logrado = solid dark fill 40%, Esperado = dashed gray), numeric labels hidden until hover tooltip.

## Context

Wireframe prototype for the Rex+ Desempeño "Resultados de Evaluaciones" reporting module. Goal is to validate UX navigation and content before production implementation. All data is mocked.
