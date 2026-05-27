import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJefaturaById } from '../data/mockData';
import ScatterPlotComponent from '../components/Charts/ScatterPlotComponent';
import Sparkline from '../components/Charts/Sparkline';

interface Props { periodo: string; compare: boolean }

type FilterMode = 'todos' | 'top20' | 'brechas';

export default function EquipoView({ periodo, compare }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const result = id ? getJefaturaById(id) : undefined;
  const [filterMode, setFilterMode] = useState<FilterMode>('todos');

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
              <th>Brechas</th>
              {compare && <th>Var. vs. Ant.</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const maxGap = Math.max(...c.competencias.map(comp => comp.esperado - comp.logrado));
              const isCritical = maxGap >= gapThreshold;
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
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sparkline competencias={c.competencias} />
                      {isCritical && (
                        <span style={{ fontSize: 10, color: '#666', border: '1px solid #ccc', padding: '1px 4px' }}>
                          !{maxGap}pts
                        </span>
                      )}
                    </div>
                  </td>
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
