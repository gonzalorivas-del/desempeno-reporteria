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

`App.tsx` owns global state: `empresaId` (selected company), `periodo` (selected evaluation cycle), and `compare` toggle (overlay previous period). All three are passed down to every page via `AppLayout`. When `empresaId` changes, `periodo` auto-resets to the last available period for that company.

`AppLayout` (sidebar + topbar) wraps all pages. The topbar renders, left to right: breadcrumbs, empresa selector, period selector, compare toggle, export dropdown.

### Empresa selector

The first control in the topbar. Options come from `EMPRESAS` in `mockData.ts`. Default selection is `'all'` (Todas las Empresas). Each empresa has its own `periodos` array; selecting a different empresa filters the period dropdown to that empresa's periods and auto-selects the last one.

### All mock data lives in `src/data/mockData.ts`

Key exports:
- `EMPRESAS` — array of `EmpresaMock` (id, nombre, periodos, kpis, historial). Index 0 is the 'all' aggregate.
- `getEmpresaById(id)` — returns the matching `EmpresaMock` (falls back to 'all').
- `GERENCIAS` — array of gerencias with nested jefaturas and colaboradores.
- `getGerenciaById`, `getJefaturaById`, `getColaboradorById`, `getTop5Gaps` — lookup helpers.
- `EMPRESA_KPIS`, `HISTORIAL_EMPRESA` — backwards-compat aliases pointing to the 'all' empresa entry.

**Charts** (`src/components/Charts/`):
- `RadarChartComponent` — spider/radar with smart-default top-5 gaps, chip selector, max-8 guardrail, editable view
- `HistoricalBarChart` — accepts optional `historial` prop (falls back to global 'all' data); 3-period bar chart
- `ScatterPlotComponent` — team scatter (objectives vs competencies)
- `Sparkline` — inline mini bar gaps for the team table

**Radar chart rules** (hard-coded): max 8 axes, 2 polygons standard (Logrado = solid dark fill 40%, Esperado = dashed gray), numeric labels hidden until hover tooltip.

## Context

Wireframe prototype for the Rex+ Desempeño "Resultados de Evaluaciones" reporting module. Goal is to validate UX navigation and content before production implementation. All data is mocked.
