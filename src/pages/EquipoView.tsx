import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJefaturaById, JEFATURA_OBJETIVOS_RADAR, JEFATURA_OBJETIVOS_EQUIPO } from '../data/mockData';
import RadarChartComponent from '../components/Charts/RadarChartComponent';
import ScatterPlotComponent from '../components/Charts/ScatterPlotComponent';

interface Props { periodo: string; compare: boolean }

type FilterMode = 'todos' | 'top20' | 'brechas';
type AmbitoRadar = 'competencias' | 'objetivos';

export default function EquipoView({ periodo, compare }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const result = id ? getJefaturaById(id) : undefined;
  const [filterMode, setFilterMode] = useState<FilterMode>('todos');
  const [ambitoRadar, setAmbitoRadar] = useState<AmbitoRadar>('competencias');

  if (!result || !result.jefatura) {
    return (
      <div className="page">
        <div className="empty-state">Equipo no encontrado.</div>
      </div>
    );
  }

  const { jefatura, gerencia } = result;
  const colabs = jefatura.colaboradores;

  if (colabs.length === 0) {
    return (
      <div className="page">
        <div className="page-title">{jefatura.nombre}</div>
        <div className="page-subtitle">{gerencia.nombre} — {periodo}</div>
        <div className="empty-state">
          Este equipo no tiene datos detallados de colaboradores en el prototipo.<br />
          Usa los equipos de <strong>Tecnología</strong> para ver la vista completa.
        </div>
      </div>
    );
  }

  const sortedByScore = [...colabs].sort((a, b) => b.calificacionFinal - a.calificacionFinal);
  const top20Threshold = sortedByScore[Math.floor(sortedByScore.length * 0.2)]?.calificacionFinal ?? 90;
  const gapThreshold = 15;

  const filtered = colabs.filter(c => {
    if (filterMode === 'todos') return true;
    if (filterMode === 'top20') return c.calificacionFinal >= top20Threshold;
    if (filterMode === 'brechas') {
      const maxGap = Math.max(...c.competencias.map(comp => comp.esperado - comp.logrado));
      return maxGap >= gapThreshold;
    }
    return true;
  });

  const avgNota = Math.round(colabs.reduce((s, c) => s + c.calificacionFinal, 0) / colabs.length);
  const avgObj = Math.round(colabs.reduce((s, c) => s + c.logroObjetivos, 0) / colabs.length);
  const avgComp = Math.round(colabs.reduce((s, c) => s + c.logroCompetencias, 0) / colabs.length);

  // Radar: competencias = promedio del equipo | objetivos = lookup por jefatura
  const teamCompetenciasRadar = colabs[0].competencias.map(comp => ({
    nombre: comp.nombre,
    logrado: Math.round(colabs.reduce((s, c) => s + (c.competencias.find(x => x.nombre === comp.nombre)?.logrado ?? 0), 0) / colabs.length),
    esperado: comp.esperado,
  }));

  const objetivosRadar = JEFATURA_OBJETIVOS_RADAR[jefatura.id] ?? [];
  const radarData = ambitoRadar === 'competencias' ? teamCompetenciasRadar : objetivosRadar;
  const radarTitle =
    ambitoRadar === 'competencias'
      ? 'Perfil de Competencias del Equipo'
      : 'Logro de Objetivos del Equipo';

  // Objetivos equipo para panel Logrado vs Meta
  const objetivosEquipo = JEFATURA_OBJETIVOS_EQUIPO[jefatura.id] ?? [];

  return (
    <div className="page">
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--c-border)', paddingBottom: 16, marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--c-text-faint)', marginBottom: 4 }}>
          {gerencia.nombre}
        </div>
        <div className="page-title">{jefatura.nombre}</div>
        <div style={{ fontSize: 13, color: 'var(--c-text-muted)', marginBottom: 16 }}>
          Responsable: <strong>{jefatura.jefe}</strong> — {periodo}
        </div>

        {/* Team KPIs */}
        <div className="kpi-row" style={{ marginBottom: 0 }}>
          <div className="kpi-card">
            <div className="kpi-label">Cal. Final Promedio</div>
            <div className="kpi-value">{avgNota}<span className="kpi-value-unit">/100</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Logro Objetivos Promedio</div>
            <div className="kpi-value">{avgObj}<span className="kpi-value-unit">%</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Logro Competencias Promedio</div>
            <div className="kpi-value">{avgComp}<span className="kpi-value-unit">%</span></div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">N° Colaboradores</div>
            <div className="kpi-value">{colabs.length}</div>
          </div>
        </div>
      </div>

      {/* Radar del equipo con selector de ámbito */}
      <div className="chart-row" style={{ marginBottom: 24 }}>
        <div className="chart-panel">
          <div className="chart-panel-label">Gráfico de Araña — Equipo</div>

          <div className="chip-group" style={{ marginBottom: 10 }}>
            {(['competencias', 'objetivos'] as AmbitoRadar[]).map(a => (
              <button
                key={a}
                className={`chip ${ambitoRadar === a ? 'active' : ''}`}
                onClick={() => setAmbitoRadar(a)}
              >
                {a === 'competencias' ? 'Competencias' : 'Objetivos'}
              </button>
            ))}
          </div>

          <div className="chart-panel-heading">{radarTitle}</div>
          {(ambitoRadar === 'objetivos' && objetivosRadar.length === 0) ? (
            <div className="empty-state" style={{ fontSize: 12 }}>
              No hay datos de objetivos para este equipo en el prototipo.
            </div>
          ) : (
            <RadarChartComponent
              key={ambitoRadar}
              competencias={radarData}
              compareData={
                compare ? radarData.map(c => ({ ...c, logrado: Math.round(c.logrado * 0.96) })) : undefined
              }
              compareLabel="Periodo Anterior"
            />
          )}
        </div>

        {/* Objetivos Logrado vs. Meta */}
        <div className="chart-panel">
          <div className="chart-panel-label">Objetivos del Equipo</div>
          <div className="chart-panel-heading">Logrado vs. Meta — {periodo}</div>
          {objetivosEquipo.length === 0 ? (
            <div className="empty-state" style={{ fontSize: 12 }}>
              No hay datos de objetivos para este equipo en el prototipo.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {objetivosEquipo.map((o, i) => {
                const cumplimiento = Math.min(120, Math.round((o.logrado / o.meta) * 100));
                const met = o.logrado >= o.meta;
                const barWidth = Math.min(100, cumplimiento);
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4, gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, flex: 1 }}>{o.nombre}</span>
                      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                        <span style={{ color: 'var(--c-text-muted)' }}>
                          Meta: {o.meta} {o.unidad}
                        </span>
                        <span>
                          Logrado: <strong>{o.logrado} {o.unidad}</strong>
                        </span>
                        <span style={{ fontWeight: 700, color: met ? '#222' : '#888', minWidth: 38 }}>
                          {cumplimiento}% {met ? '✓' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="hbar-row" style={{ marginBottom: 0 }}>
                      <div className="hbar-track" style={{ height: 14 }}>
                        <div
                          className={`hbar-fill ${met ? 'hbar-fill-above' : 'hbar-fill-below'}`}
                          style={{ width: `${barWidth}%` }}
                        />
                        {/* Meta line at 100% */}
                        <div className="hbar-avg-line" style={{ left: '100%' }} title="Meta (100%)" />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 2 }}>
                ─── línea = meta (100% cumplimiento)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: 'var(--c-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>
          Filtrar colaboradores
        </div>
        <div className="pill-group">
          <button
            className={`pill ${filterMode === 'todos' ? 'active' : ''}`}
            onClick={() => setFilterMode('todos')}
          >
            Ver Todos ({colabs.length})
          </button>
          <button
            className={`pill ${filterMode === 'top20' ? 'active' : ''}`}
            onClick={() => setFilterMode('top20')}
          >
            Top 20%
          </button>
          <button
            className={`pill ${filterMode === 'brechas' ? 'active' : ''}`}
            onClick={() => setFilterMode('brechas')}
          >
            Con Brechas Críticas (≥{gapThreshold} pts)
          </button>
        </div>
      </div>

      {/* Scatter plot */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Mapa del Equipo — Objetivos vs. Competencias</span>
          <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>Clic en un punto para ver el detalle</span>
        </div>
        <div className="panel-body">
          <ScatterPlotComponent
            colaboradores={colabs}
            highlighted={filterMode === 'todos' ? undefined : filtered.map(c => c.id)}
            onDotClick={id => navigate(`/resultados/colaborador/${id}`)}
          />
        </div>
      </div>

      {/* Collaborators table */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">
            Colaboradores {filterMode !== 'todos' && `— ${filterMode === 'top20' ? 'Top 20%' : 'Con Brechas Críticas'}`}
            <span style={{ fontWeight: 400, color: 'var(--c-text-faint)', marginLeft: 8 }}>
              ({filtered.length} de {colabs.length})
            </span>
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Cargo</th>
              <th>Nota Final</th>
              <th>Logro Obj.</th>
              <th>Logro Comp.</th>
              {compare && <th>Var. vs. Ant.</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              return (
                <tr key={c.id} className="tr-clickable" onClick={() => navigate(`/resultados/colaborador/${c.id}`)}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 32, height: 32,
                          border: '1px solid var(--c-border-strong)',
                          background: 'var(--c-bg-alt)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 12, fontWeight: 700, color: 'var(--c-text-muted)',
                          flexShrink: 0,
                        }}
                      >
                        {c.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <strong>{c.nombre}</strong>
                    </div>
                  </td>
                  <td style={{ color: 'var(--c-text-muted)' }}>{c.cargo}</td>
                  <td>
                    <strong style={{ fontSize: 14 }}>{c.calificacionFinal}</strong>
                    <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>/100</span>
                  </td>
                  <td>{c.logroObjetivos}%</td>
                  <td>{c.logroCompetencias}%</td>
                  {compare && (
                    <td style={{ fontSize: 12, color: 'var(--c-text-faint)' }}>
                      ▲ +{Math.round(Math.random() * 5)} pts
                    </td>
                  )}
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={e => { e.stopPropagation(); navigate(`/resultados/colaborador/${c.id}`); }}
                    >
                      Ver Detalle →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="empty-state">No hay colaboradores que coincidan con el filtro.</div>
        )}
      </div>
    </div>
  );
}
