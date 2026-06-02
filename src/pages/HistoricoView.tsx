import { useState, useEffect } from 'react';
import {
  ComposedChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  PROCESOS_HISTORICOS,
  GERENCIAS,
  EMPRESA_RESULTADOS_HISTORICOS,
  GERENCIA_RESULTADOS_HISTORICOS,
  JEFATURA_RESULTADOS_HISTORICOS,
  COLABORADOR_RESULTADOS_HISTORICOS,
} from '../data/mockData';
import type { ProcesoHistorico } from '../data/mockData';

interface Props {
  empresaId: string;
}

type NivelHistorico = 'empresa' | 'areas' | 'equipos' | 'colaboradores';

// ─── Helpers ──────────────────────────────────────────────────────────────

function Tendencia({ first, last }: { first: number; last: number }) {
  const delta = last - first;
  if (delta > 1) return <span style={{ fontWeight: 700, color: '#222' }}>▲ +{delta}</span>;
  if (delta < -1) return <span style={{ fontWeight: 700, color: '#888' }}>▼ {delta}</span>;
  return <span style={{ color: '#999' }}>= {delta >= 0 ? `+${delta}` : delta}</span>;
}

function PlantillaBadge({ plantilla }: { plantilla: ProcesoHistorico['plantilla'] }) {
  return (
    <span style={{
      fontSize: 10,
      padding: '1px 6px',
      border: '1px solid var(--c-border-strong)',
      background: 'var(--c-bg-alt)',
      color: 'var(--c-text-muted)',
      whiteSpace: 'nowrap',
    }}>
      {plantilla}
    </span>
  );
}

function EstadoBadge({ estado }: { estado: ProcesoHistorico['estado'] }) {
  const color = estado === 'Finalizada' ? 'var(--c-text)' : estado === 'Activa' ? '#555' : 'var(--c-text-faint)';
  const border = estado === 'Finalizada' ? 'solid' : estado === 'Activa' ? 'dashed' : 'dotted';
  return (
    <span style={{
      fontSize: 10, padding: '1px 6px',
      border: `1px ${border} ${color}`,
      color,
      whiteSpace: 'nowrap',
    }}>
      {estado}
    </span>
  );
}

// ─── Onboarding config ────────────────────────────────────────────────────

const ONB_STEPS: Record<1 | 2 | 3, { title: string; paragraphs: string[] }> = {
  1: {
    title: 'Selección de Procesos a Comparar',
    paragraphs: [
      'Selecciona entre 2 y 5 evaluaciones históricas para comparar. Haz clic en una tarjeta para activarla — las tarjetas seleccionadas se marcan con ✓.',
      'Cada tarjeta muestra el nombre del proceso, sus fechas, el tipo de plantilla (180°, 360° o Por objetivos), el estado y el total de evaluados.',
      'Al cambiar la selección, todos los gráficos y tablas se actualizan automáticamente.',
    ],
  },
  2: {
    title: 'Gráfico de Evolución de Resultados',
    paragraphs: [
      'Muestra la evolución de los indicadores entre los procesos seleccionados: Calificación Final (línea sólida), Competencias y Objetivos (líneas punteadas).',
      'Pasa el cursor sobre un punto para ver los valores exactos. Si un proceso no midió un ámbito, ese punto no aparece en la línea.',
      'Úsalo para identificar tendencias y tomar decisiones basadas en datos históricos.',
    ],
  },
  3: {
    title: 'Navegación por Niveles',
    paragraphs: [
      'Desde estas pestañas exploras los resultados en cuatro niveles: Empresa, Áreas / Gerencias, Equipos / Jefaturas y Colaboradores (con indicador de tendencia individual).',
      'Cada nivel tiene sus propios filtros. La selección de procesos se mantiene activa en todos los niveles.',
    ],
  },
};

function computeModalTop(
  spot: { top: number; height: number } | null,
  modalH = 268,
  pad = 20,
): number {
  const vh = window.innerHeight;
  if (!spot) return Math.max(pad, (vh - modalH) / 2);
  const clampedH = Math.min(spot.height, vh - spot.top);
  const spotBottom = spot.top + clampedH;
  if (spotBottom + pad + modalH <= vh - pad) return spotBottom + pad;
  if (spot.top - modalH - pad >= pad) return spot.top - modalH - pad;
  return Math.max(pad, Math.min((vh - modalH) / 2, vh - modalH - pad));
}

// ─── Componente principal ──────────────────────────────────────────────────

export default function HistoricoView({ empresaId }: Props) {
  const [selectedProcesos, setSelectedProcesos] = useState<string[]>([
    'proc-2023', 'proc-2024', 'proc-2025',
  ]);
  const [nivel, setNivel] = useState<NivelHistorico>('empresa');
  const [areaFiltro, setAreaFiltro] = useState<string>('all');
  const [jefaturaFiltro, setJefaturaFiltro] = useState<string>('all');
  const [expandedColabs, setExpandedColabs] = useState<Set<string>>(new Set());

  function toggleExpandColab(id: string) {
    setExpandedColabs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ─── Onboarding guiado ────────────────────────────────────────────────────
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3 | null>(1);
  const [spotlightRect, setSpotlightRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = onboardingStep !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [onboardingStep]);

  useEffect(() => {
    if (onboardingStep === null) { setSpotlightRect(null); return; }
    const TARGET_IDS: Record<1 | 2 | 3, string> = {
      1: 'onb-proc-selector',
      2: 'onb-evolution-chart',
      3: 'onb-tabs',
    };
    function measure() {
      if (onboardingStep === null) return;
      const el = document.getElementById(TARGET_IDS[onboardingStep]);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSpotlightRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [onboardingStep, nivel]);

  function handleOnboardingNext() {
    if (onboardingStep === 1) { setNivel('empresa'); setOnboardingStep(2); }
    else if (onboardingStep === 2) { setOnboardingStep(3); }
    else { setOnboardingStep(null); }
  }

  function handleOnboardingPrev() {
    if (onboardingStep === 2) setOnboardingStep(1);
    else if (onboardingStep === 3) setOnboardingStep(2);
  }

  const procesos = [...PROCESOS_HISTORICOS].sort((a, b) => a.orden - b.orden);
  const procesosSeleccionados = procesos.filter(p => selectedProcesos.includes(p.id));

  const toggleProceso = (id: string) => {
    setSelectedProcesos(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 2) return prev;
        return prev.filter(p => p !== id);
      }
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  // ─── Panel Empresa ─────────────────────────────────────────────────────

  function renderEmpresaPanel() {
    const trendData = procesosSeleccionados.map(p => {
      const r = EMPRESA_RESULTADOS_HISTORICOS[p.id];
      return {
        name: p.label,
        'Cal. Final': r?.calificacion ?? null,
        'Competencias': r?.competencias ?? null,
        'Objetivos': r?.objetivos ?? null,
      };
    });

    const primero = EMPRESA_RESULTADOS_HISTORICOS[procesosSeleccionados[0]?.id];
    const ultimo = EMPRESA_RESULTADOS_HISTORICOS[procesosSeleccionados[procesosSeleccionados.length - 1]?.id];

    return (
      <>
        {/* KPI trend cards */}
        <div className="kpi-row">
          {[
            { label: 'Calificación Final', val: ultimo?.calificacion, prev: primero?.calificacion, unit: '/100' },
            { label: 'Competencias', val: ultimo?.competencias, prev: primero?.competencias, unit: '%' },
            { label: 'Objetivos', val: ultimo?.objetivos, prev: primero?.objetivos, unit: '%' },
            { label: 'Total Evaluados', val: ultimo?.nEvaluados, prev: primero?.nEvaluados, unit: ' colab.' },
          ].map(kpi => (
            <div className="kpi-card" key={kpi.label}>
              <div className="kpi-label">{kpi.label} — último proceso</div>
              <div className="kpi-value">
                {kpi.val != null ? kpi.val : '—'}
                <span className="kpi-value-unit">{kpi.unit}</span>
              </div>
              {kpi.val != null && kpi.prev != null && (
                <div className="kpi-trend">
                  <Tendencia first={kpi.prev} last={kpi.val} />
                  <span style={{ color: 'var(--c-text-faint)', marginLeft: 4 }}>
                    vs. {procesosSeleccionados[0]?.label}
                  </span>
                </div>
              )}
              {kpi.val == null && (
                <div className="kpi-trend" style={{ color: 'var(--c-text-faint)' }}>
                  No aplica en este proceso
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trend chart */}
        <div id="onb-evolution-chart" className="panel">
          <div className="panel-header">
            <span className="panel-title">Evolución de Resultados — Empresa</span>
            <span className="text-faint font-sm">
              {procesosSeleccionados.length} procesos seleccionados
            </span>
          </div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={270}>
              <ComposedChart data={trendData} margin={{ top: 10, right: 30, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#555' }} />
                <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: '#555' }} />
                <Tooltip
                  contentStyle={{ border: '1px solid #999', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="Competencias" fill="#444" maxBarSize={40} />
                <Bar dataKey="Objetivos"    fill="#aaa" maxBarSize={40} />
                <Line
                  type="monotone"
                  dataKey="Cal. Final"
                  name="Cal. Final"
                  stroke="#111"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 4, fill: '#111', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 8 }}>
              — Los puntos sin valor corresponden a procesos donde ese ámbito no fue evaluado (ej. "Por objetivos" no tiene dato de Competencias).
            </div>
          </div>
        </div>

        {/* Comparative table */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Tabla Comparativa por Proceso</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Proceso</th>
                <th>Plantilla</th>
                <th>Cal. Final</th>
                <th>Competencias</th>
                <th>Objetivos</th>
                <th>N° Evaluados</th>
                <th>Var. Cal. Final</th>
              </tr>
            </thead>
            <tbody>
              {procesosSeleccionados.map((p, i) => {
                const r = EMPRESA_RESULTADOS_HISTORICOS[p.id];
                const prev = i > 0 ? EMPRESA_RESULTADOS_HISTORICOS[procesosSeleccionados[i - 1].id] : null;
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.nombre}</div>
                      <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>
                        {p.fechaInicio} → {p.fechaTermino}
                      </div>
                    </td>
                    <td><PlantillaBadge plantilla={p.plantilla} /></td>
                    <td><strong>{r?.calificacion ?? '—'}</strong></td>
                    <td>{r?.competencias ?? <span style={{ color: 'var(--c-text-faint)' }}>N/A</span>}</td>
                    <td>{r?.objetivos ?? '—'}</td>
                    <td>{r?.nEvaluados ?? '—'}</td>
                    <td>
                      {prev && r
                        ? <Tendencia first={prev.calificacion} last={r.calificacion} />
                        : <span style={{ color: 'var(--c-text-faint)' }}>—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // ─── Panel Áreas ───────────────────────────────────────────────────────

  function renderAreasPanel() {
    const AREA_COLORS = ['#222', '#555', '#777', '#999', '#bbb'];
    const filtradas = areaFiltro === 'all' ? GERENCIAS : GERENCIAS.filter(g => g.id === areaFiltro);

    const trendData = procesosSeleccionados.map(p => {
      const entry: Record<string, string | number | null> = { name: p.label };
      filtradas.forEach(g => {
        entry[g.nombre] = GERENCIA_RESULTADOS_HISTORICOS[g.id]?.[p.id]?.calificacion ?? null;
      });
      entry['Promedio empresa'] = EMPRESA_RESULTADOS_HISTORICOS[p.id]?.calificacion ?? null;
      return entry;
    });

    return (
      <>
        <div className="filter-bar">
          <label>Filtrar área:</label>
          <div className="pill-group">
            <button className={`pill ${areaFiltro === 'all' ? 'active' : ''}`} onClick={() => setAreaFiltro('all')}>
              Todas
            </button>
            {GERENCIAS.map(g => (
              <button
                key={g.id}
                className={`pill ${areaFiltro === g.id ? 'active' : ''}`}
                onClick={() => setAreaFiltro(g.id)}
              >
                {g.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Evolución de Calificación Final por Área</span>
          </div>
          <div className="panel-body">
            <ResponsiveContainer width="100%" height={290}>
              <ComposedChart data={trendData} margin={{ top: 10, right: 30, bottom: 0, left: -10 }}>
                <CartesianGrid vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#555' }} />
                <YAxis domain={[55, 100]} tick={{ fontSize: 11, fill: '#555' }} />
                <Tooltip contentStyle={{ border: '1px solid #999', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                {filtradas.map((g, i) => (
                  <Bar key={g.id} dataKey={g.nombre} fill={AREA_COLORS[i] ?? '#ddd'} maxBarSize={32} />
                ))}
                <Line
                  type="monotone"
                  dataKey="Promedio empresa"
                  stroke="#111"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 4, fill: '#111', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                  connectNulls={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Comparación por Área y Proceso — Cal. Final</span>
            <span className="text-faint font-sm">Tendencia calculada entre primer y último proceso seleccionado</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Área / Gerencia</th>
                {procesosSeleccionados.map(p => <th key={p.id}>{p.label}</th>)}
                <th>Tendencia</th>
                <th>Δ Total</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(g => {
                const datos = procesosSeleccionados.map(
                  p => GERENCIA_RESULTADOS_HISTORICOS[g.id]?.[p.id]?.calificacion ?? null
                );
                const vals = datos.filter((d): d is number => d != null);
                const first = vals[0];
                const last = vals[vals.length - 1];
                const delta = first != null && last != null ? last - first : null;
                return (
                  <tr key={g.id}>
                    <td style={{ fontWeight: 600 }}>{g.nombre}</td>
                    {datos.map((val, i) => {
                      const prev = datos.slice(0, i).reverse().find((d): d is number => d != null);
                      const diff = val != null && prev != null ? val - prev : null;
                      return (
                        <td key={i}>
                          {val != null ? (
                            <div>
                              <div className="progress-wrap">
                                <div className="progress-bar" style={{ minWidth: 60 }}>
                                  <div className="progress-fill" style={{ width: `${val}%` }} />
                                </div>
                                <strong>{val}</strong>
                              </div>
                              {diff != null && (
                                <div style={{ fontSize: 10, color: diff >= 0 ? '#444' : '#888', marginTop: 2 }}>
                                  {diff >= 0 ? `▲+${diff}` : `▼${diff}`}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--c-text-faint)' }}>—</span>
                          )}
                        </td>
                      );
                    })}
                    <td>
                      {first != null && last != null
                        ? <Tendencia first={first} last={last} />
                        : <span style={{ color: 'var(--c-text-faint)' }}>—</span>}
                    </td>
                    <td style={{ fontWeight: 700, color: delta != null && delta > 0 ? '#222' : delta != null && delta < 0 ? '#888' : '#999' }}>
                      {delta != null ? (delta >= 0 ? `+${delta}` : `${delta}`) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // ─── Panel Equipos ─────────────────────────────────────────────────────

  function renderEquiposPanel() {
    const todasJefaturas = GERENCIAS.flatMap(g =>
      g.jefaturas.map(j => ({ ...j, gerenciaNombre: g.nombre, gerenciaId: g.id }))
    );
    const filtradas = areaFiltro === 'all'
      ? todasJefaturas
      : todasJefaturas.filter(j => j.gerenciaId === areaFiltro);

    return (
      <>
        <div className="filter-bar">
          <label>Filtrar gerencia:</label>
          <div className="pill-group">
            <button className={`pill ${areaFiltro === 'all' ? 'active' : ''}`} onClick={() => setAreaFiltro('all')}>
              Todas
            </button>
            {GERENCIAS.map(g => (
              <button
                key={g.id}
                className={`pill ${areaFiltro === g.id ? 'active' : ''}`}
                onClick={() => setAreaFiltro(g.id)}
              >
                {g.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Evolución por Equipo — Cal. Final</span>
            <span className="text-faint font-sm">
              Los equipos sin datos en el prototipo muestran —
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Equipo / Jefatura</th>
                <th>Responsable</th>
                <th>Gerencia</th>
                {procesosSeleccionados.map(p => <th key={p.id}>{p.label}</th>)}
                <th>Tendencia</th>
                <th>Δ Total</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map(j => {
                const datos = procesosSeleccionados.map(
                  p => JEFATURA_RESULTADOS_HISTORICOS[j.id]?.[p.id]?.calificacion ?? null
                );
                const vals = datos.filter((d): d is number => d != null);
                const first = vals[0];
                const last = vals[vals.length - 1];
                const delta = first != null && last != null ? last - first : null;
                return (
                  <tr key={j.id}>
                    <td style={{ fontWeight: 600 }}>{j.nombre}</td>
                    <td style={{ color: 'var(--c-text-muted)', fontSize: 12 }}>{j.jefe}</td>
                    <td>
                      <span className="badge">{j.gerenciaNombre}</span>
                    </td>
                    {datos.map((val, i) => {
                      const prev = datos.slice(0, i).reverse().find((d): d is number => d != null);
                      const diff = val != null && prev != null ? val - prev : null;
                      return (
                        <td key={i}>
                          {val != null ? (
                            <div>
                              <strong style={{ fontSize: 14 }}>{val}</strong>
                              {diff != null && (
                                <div style={{ fontSize: 10, color: diff >= 0 ? '#444' : '#888' }}>
                                  {diff >= 0 ? `▲+${diff}` : `▼${diff}`}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--c-text-faint)' }}>—</span>
                          )}
                        </td>
                      );
                    })}
                    <td>
                      {first != null && last != null
                        ? <Tendencia first={first} last={last} />
                        : <span style={{ color: 'var(--c-text-faint)' }}>Sin datos</span>}
                    </td>
                    <td style={{ fontWeight: 700, color: delta != null && delta > 0 ? '#222' : delta != null && delta < 0 ? '#888' : '#999' }}>
                      {delta != null ? (delta >= 0 ? `+${delta}` : `${delta}`) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // ─── Panel Colaboradores ───────────────────────────────────────────────

  function renderColaboradoresPanel() {
    const todosColabs = GERENCIAS.flatMap(g =>
      g.jefaturas.flatMap(j =>
        j.colaboradores.map(c => ({
          ...c,
          jefaturaNombre: j.nombre,
          jefaturaId: j.id,
          gerenciaNombre: g.nombre,
          gerenciaId: g.id,
        }))
      )
    );

    const jefaturasFiltradas = areaFiltro === 'all'
      ? GERENCIAS.flatMap(g => g.jefaturas)
      : (GERENCIAS.find(g => g.id === areaFiltro)?.jefaturas ?? []);

    const colabsFiltrados = todosColabs.filter(c => {
      if (areaFiltro !== 'all' && c.gerenciaId !== areaFiltro) return false;
      if (jefaturaFiltro !== 'all' && c.jefaturaId !== jefaturaFiltro) return false;
      return true;
    });

    return (
      <>
        <div className="filter-bar">
          <label>Gerencia:</label>
          <select
            value={areaFiltro}
            onChange={e => { setAreaFiltro(e.target.value); setJefaturaFiltro('all'); }}
          >
            <option value="all">Todas</option>
            {GERENCIAS.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
          </select>
          <label>Equipo:</label>
          <select value={jefaturaFiltro} onChange={e => setJefaturaFiltro(e.target.value)}>
            <option value="all">Todos</option>
            {jefaturasFiltradas.map(j => <option key={j.id} value={j.id}>{j.nombre}</option>)}
          </select>
          <span style={{ fontSize: 12, color: 'var(--c-text-faint)', marginLeft: 8 }}>
            {colabsFiltrados.length} colaborador{colabsFiltrados.length !== 1 ? 'es' : ''}
          </span>
        </div>

        {colabsFiltrados.length === 0 && (
          <div className="empty-state">
            No hay colaboradores con datos disponibles para esta selección.<br />
            Los equipos con datos completos son: <strong>Redes e Infraestructura</strong>, <strong>Data & Analytics</strong> y <strong>Ventas Zona Norte</strong>.
          </div>
        )}

        {colabsFiltrados.length > 0 && (
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Calificación Final por Colaborador</span>
              <span className="text-faint font-sm">
                Tendencia y Δ entre primer y último proceso seleccionado
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                  {procesosSeleccionados.map(p => <th key={p.id}>{p.label}</th>)}
                  <th>Tendencia</th>
                  <th>Δ Total</th>
                </tr>
              </thead>
              <tbody>
                {colabsFiltrados.map(c => {
                  const hist = COLABORADOR_RESULTADOS_HISTORICOS[c.id] ?? [];
                  const datos = procesosSeleccionados.map(p => {
                    const h = hist.find(h => h.procesoId === p.id);
                    return h?.calificacion ?? null;
                  });
                  const vals = datos.filter((d): d is number => d != null);
                  const first = vals[0];
                  const last = vals[vals.length - 1];
                  const delta = first != null && last != null ? last - first : null;
                  const initials = c.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                  const isExpanded = expandedColabs.has(c.id);

                  // Datos de sub-filas
                  const datosComp = procesosSeleccionados.map(p => hist.find(h => h.procesoId === p.id)?.logroComp ?? null);
                  const datosObj  = procesosSeleccionados.map(p => hist.find(h => h.procesoId === p.id)?.logroObj  ?? null);

                  function renderSubRow(label: string, subDatos: (number | null)[]) {
                    const subVals = subDatos.filter((d): d is number => d != null);
                    const sf = subVals[0];
                    const sl = subVals[subVals.length - 1];
                    const sd = sf != null && sl != null ? sl - sf : null;
                    return (
                      <tr style={{ background: 'var(--c-bg-alt)', borderTop: 'none' }}>
                        <td colSpan={2} style={{ paddingLeft: 52, fontSize: 12, color: 'var(--c-text-muted)', fontStyle: 'italic' }}>
                          └ {label}
                        </td>
                        {subDatos.map((val, i) => {
                          const prev = subDatos.slice(0, i).reverse().find((d): d is number => d != null);
                          const diff = val != null && prev != null ? val - prev : null;
                          return (
                            <td key={i} style={{ verticalAlign: 'middle' }}>
                              {val != null ? (
                                <div>
                                  <span style={{ fontSize: 13 }}>{val}</span>
                                  {diff != null && (
                                    <div style={{ fontSize: 10, color: diff > 0 ? '#333' : diff < 0 ? '#888' : '#aaa', marginTop: 1 }}>
                                      {diff > 0 ? `▲+${diff}` : diff < 0 ? `▼${diff}` : '='}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: 'var(--c-text-faint)' }}>—</span>
                              )}
                            </td>
                          );
                        })}
                        <td>{sf != null && sl != null ? <Tendencia first={sf} last={sl} /> : <span style={{ color: 'var(--c-text-faint)' }}>—</span>}</td>
                        <td style={{ fontWeight: 600, fontSize: 12, color: sd != null && sd > 0 ? '#222' : sd != null && sd < 0 ? '#888' : '#999' }}>
                          {sd != null ? (sd >= 0 ? `+${sd}` : `${sd}`) : '—'}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <>
                      <tr
                        key={c.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpandColab(c.id)}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              width: 30, height: 30, flexShrink: 0,
                              border: '1px solid var(--c-border-strong)',
                              background: 'var(--c-bg-alt)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 11, fontWeight: 700, color: 'var(--c-text-muted)',
                            }}>
                              {initials}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.nombre}</span>
                                <span style={{ fontSize: 10, color: 'var(--c-text-faint)' }}>{isExpanded ? '▲' : '▼'}</span>
                              </div>
                              <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>{c.jefaturaNombre}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: 'var(--c-text-muted)', fontSize: 12 }}>{c.cargo}</td>
                        {datos.map((val, i) => {
                          const prev = datos.slice(0, i).reverse().find((d): d is number => d != null);
                          const diff = val != null && prev != null ? val - prev : null;
                          return (
                            <td key={i} style={{ verticalAlign: 'middle' }}>
                              {val != null ? (
                                <div>
                                  <strong style={{ fontSize: 15 }}>{val}</strong>
                                  {diff != null && (
                                    <div style={{ fontSize: 10, color: diff > 0 ? '#333' : diff < 0 ? '#888' : '#aaa', marginTop: 1 }}>
                                      {diff > 0 ? `▲+${diff}` : diff < 0 ? `▼${diff}` : '='}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span style={{ color: 'var(--c-text-faint)' }}>—</span>
                              )}
                            </td>
                          );
                        })}
                        <td>
                          {first != null && last != null
                            ? <Tendencia first={first} last={last} />
                            : <span style={{ color: 'var(--c-text-faint)' }}>—</span>}
                        </td>
                        <td style={{
                          fontWeight: 700,
                          color: delta != null && delta > 0 ? '#222' : delta != null && delta < 0 ? '#888' : '#999',
                        }}>
                          {delta != null ? (delta >= 0 ? `+${delta}` : `${delta}`) : '—'}
                        </td>
                      </tr>
                      {isExpanded && renderSubRow('Competencias', datosComp)}
                      {isExpanded && renderSubRow('Objetivos', datosObj)}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }

  // ─── Render principal ──────────────────────────────────────────────────

  return (
    <div className="page">
      <div className="page-title">Resultados Históricos</div>
      <div className="page-subtitle">
        Comparación de evaluaciones entre procesos — vista administrador
      </div>

      {empresaId !== 'all' && (
        <div style={{
          padding: '8px 14px', border: '1px dashed var(--c-border-strong)',
          background: 'var(--c-bg-alt)', marginBottom: 20, fontSize: 12, color: 'var(--c-text-muted)',
        }}>
          Los datos históricos del prototipo corresponden al consolidado de todas las empresas.
        </div>
      )}

      {/* ── Selector de procesos ── */}
      <div id="onb-proc-selector" className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-header">
          <span className="panel-title">Seleccionar Procesos a Comparar</span>
          <span className="text-faint font-sm">
            Mín. 2 · Máx. 5 · Seleccionados: {selectedProcesos.length}
          </span>
        </div>
        <div className="panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10 }}>
            {procesos.map(p => {
              const isSelected = selectedProcesos.includes(p.id);
              const isDisabled = !isSelected && selectedProcesos.length >= 5;
              const isMinBlocked = isSelected && selectedProcesos.length <= 2;
              return (
                <div
                  key={p.id}
                  onClick={() => !isDisabled && !isMinBlocked && toggleProceso(p.id)}
                  style={{
                    border: isSelected
                      ? '2px solid var(--c-text)'
                      : '1px dashed var(--c-border-strong)',
                    padding: '12px 14px',
                    background: isSelected ? 'var(--c-bg-alt)' : 'var(--c-bg)',
                    cursor: isDisabled || isMinBlocked ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.45 : 1,
                    position: 'relative',
                  }}
                >
                  {isSelected && (
                    <div style={{
                      position: 'absolute', top: 8, right: 10,
                      fontSize: 11, fontWeight: 700,
                    }}>✓</div>
                  )}
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, paddingRight: 20 }}>
                    {p.nombre}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginBottom: 6 }}>
                    {p.fechaInicio} → {p.fechaTermino}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <PlantillaBadge plantilla={p.plantilla} />
                    <EstadoBadge estado={p.estado} />
                    {p.nEvaluados > 0 && (
                      <span style={{ fontSize: 10, color: 'var(--c-text-faint)' }}>
                        {p.nEvaluados} eval.
                      </span>
                    )}
                  </div>
                  {isMinBlocked && (
                    <div style={{ fontSize: 10, color: 'var(--c-text-faint)', marginTop: 4 }}>
                      Mínimo 2 procesos requeridos
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {selectedProcesos.length >= 5 && (
            <div className="warning-box" style={{ marginTop: 10 }}>
              Máximo 5 procesos simultáneos para una visualización clara.
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs de nivel ── */}
      <div id="onb-tabs" className="tabs">
        {([
          ['empresa',       'Empresa'],
          ['areas',         'Áreas / Gerencias'],
          ['equipos',       'Equipos / Jefaturas'],
          ['colaboradores', 'Colaboradores'],
        ] as [NivelHistorico, string][]).map(([id, label]) => (
          <button
            key={id}
            className={`tab ${nivel === id ? 'active' : ''}`}
            onClick={() => { setNivel(id); setAreaFiltro('all'); setJefaturaFiltro('all'); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Contenido por nivel ── */}
      {nivel === 'empresa'       && renderEmpresaPanel()}
      {nivel === 'areas'         && renderAreasPanel()}
      {nivel === 'equipos'       && renderEquiposPanel()}
      {nivel === 'colaboradores' && renderColaboradoresPanel()}

      {/* ── Onboarding guiado ── */}
      {onboardingStep !== null && (() => {
        const cfg = ONB_STEPS[onboardingStep];
        const PAD = 10;
        const sx = spotlightRect ? spotlightRect.left - PAD : 0;
        const sy = spotlightRect ? spotlightRect.top - PAD : 0;
        const sw = spotlightRect ? spotlightRect.width + PAD * 2 : 0;
        const sh = spotlightRect
          ? Math.min(spotlightRect.height + PAD * 2, window.innerHeight - sy)
          : 0;
        const modalTop = computeModalTop(spotlightRect);

        return (
          <>
            {/* SVG overlay con spotlight cutout */}
            <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1000 }}>
              <defs>
                <mask id="onb-mask">
                  <rect x="-1" y="-1" width="9999" height="9999" fill="white" />
                  {spotlightRect && (
                    <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="black" />
                  )}
                </mask>
              </defs>
              <rect x="-1" y="-1" width="9999" height="9999" fill="rgba(0,0,0,0.62)" mask="url(#onb-mask)" />
              {spotlightRect && (
                <rect x={sx} y={sy} width={sw} height={sh} rx="2" fill="none" stroke="#111" strokeWidth="2.5" />
              )}
            </svg>

            {/* Modal — posicionada dinámicamente dentro del viewport */}
            <div style={{
              position: 'fixed',
              top: modalTop,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 500,
              background: 'var(--c-bg)',
              border: '2px solid var(--c-text)',
              padding: '20px 24px 18px',
              zIndex: 1001,
              boxShadow: '0 10px 48px rgba(0,0,0,0.28)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-faint)' }}>
                  Guía de uso · Paso {onboardingStep} de 3
                </span>
                <button
                  onClick={() => setOnboardingStep(null)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--c-text-faint)', lineHeight: 1 }}
                  title="Saltar guía"
                >
                  ✕
                </button>
              </div>

              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{cfg.title}</div>

              {cfg.paragraphs.map((p, i) => (
                <p key={i} style={{
                  fontSize: 13, color: 'var(--c-text-muted)', lineHeight: 1.6,
                  margin: 0, marginBottom: i < cfg.paragraphs.length - 1 ? 9 : 0,
                }}>
                  {p}
                </p>
              ))}

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 20, borderTop: '1px solid var(--c-border)', paddingTop: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {([1, 2, 3] as const).map(s => (
                    <div key={s} style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: s === onboardingStep ? 'var(--c-text)' : 'var(--c-border-strong)',
                    }} />
                  ))}
                  <span style={{ fontSize: 11, color: 'var(--c-text-faint)', marginLeft: 4 }}>
                    {onboardingStep} / 3
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {onboardingStep > 1 && (
                    <button className="btn btn-sm" onClick={handleOnboardingPrev}>← Anterior</button>
                  )}
                  <button
                    className="btn btn-sm"
                    style={{ background: 'var(--c-text)', color: 'var(--c-bg)', border: '1px solid var(--c-text)', fontWeight: 600 }}
                    onClick={handleOnboardingNext}
                  >
                    {onboardingStep < 3 ? 'Siguiente →' : 'Ok, entendido'}
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}
