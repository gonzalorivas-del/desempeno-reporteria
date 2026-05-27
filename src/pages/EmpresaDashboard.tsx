import { useNavigate } from 'react-router-dom';
import RadarChartComponent from '../components/Charts/RadarChartComponent';
import HistoricalBarChart from '../components/Charts/HistoricalBarChart';
import {
  EMPRESA_KPIS,
  COMPETENCIAS_EMPRESA,
  GERENCIAS,
} from '../data/mockData';

interface Props {
  periodo: string;
  compare: boolean;
}

function TrendBadge({ current, prev, unit = '' }: { current: number; prev: number; unit?: string }) {
  const diff = current - prev;
  const symbol = diff > 0 ? '▲' : diff < 0 ? '▼' : '—';
  const label = diff > 0 ? `+${diff}${unit} vs. periodo anterior` : diff < 0 ? `${diff}${unit} vs. periodo anterior` : 'Sin variación';
  return (
    <div className="kpi-trend" style={{ color: diff >= 0 ? '#333' : '#666' }}>
      {symbol} {label}
    </div>
  );
}

export default function EmpresaDashboard({ periodo, compare }: Props) {
  const navigate = useNavigate();

  const sortedByScore = [...GERENCIAS].sort((a, b) => b.promedio - a.promedio);
  const top3 = sortedByScore.slice(0, 3);
  const bottom2 = sortedByScore.slice(-2);

  return (
    <div className="page">
      <div className="page-title">Resultados de Evaluaciones</div>
      <div className="page-subtitle">Vista Empresa — {periodo}</div>

      {/* Row 1: KPIs */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Calificación Final Promedio</div>
          <div className="kpi-value">
            {EMPRESA_KPIS.calificacionFinal}
            <span className="kpi-value-unit">/100</span>
          </div>
          {compare && (
            <TrendBadge current={EMPRESA_KPIS.calificacionFinal} prev={EMPRESA_KPIS.calificacionFinalPrevio} />
          )}
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Promedio Cumplimiento Competencias</div>
          <div className="kpi-value">
            {EMPRESA_KPIS.cumplimientoCompetencias}
            <span className="kpi-value-unit">%</span>
          </div>
          {compare && (
            <TrendBadge current={EMPRESA_KPIS.cumplimientoCompetencias} prev={EMPRESA_KPIS.cumplimientoCompetenciasPrevio} unit="%" />
          )}
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Promedio Cumplimiento Objetivos</div>
          <div className="kpi-value">
            {EMPRESA_KPIS.cumplimientoObjetivos}
            <span className="kpi-value-unit">%</span>
          </div>
          {compare && (
            <TrendBadge current={EMPRESA_KPIS.cumplimientoObjetivos} prev={EMPRESA_KPIS.cumplimientoObjetivosPrevio} unit="%" />
          )}
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Gerencias Evaluadas</div>
          <div className="kpi-value">
            {GERENCIAS.length}
            <span className="kpi-value-unit"> áreas</span>
          </div>
          <div className="kpi-trend" style={{ color: 'var(--c-text-faint)' }}>
            {GERENCIAS.reduce((s, g) => s + g.jefaturas.length, 0)} jefaturas en total
          </div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="chart-row">
        <div className="chart-panel">
          <div className="chart-panel-label">Gráfico de Araña</div>
          <div className="chart-panel-heading">Top 5 Brechas de Competencias Globales</div>
          <RadarChartComponent
            competencias={COMPETENCIAS_EMPRESA}
            compareData={compare ? COMPETENCIAS_EMPRESA.map(c => ({ ...c, logrado: Math.round(c.logrado * 0.97) })) : undefined}
            compareLabel="Periodo Anterior"
          />
        </div>
        <div className="chart-panel">
          <div className="chart-panel-label">Tendencia Histórica</div>
          <div className="chart-panel-heading">Evolución Calificación Histórica</div>
          <HistoricalBarChart compare={compare} />
          <div className="chart-legend" style={{ marginTop: 8 }}>
            <div className="chart-legend-item">
              <div style={{ width: 12, height: 12, background: '#333' }} />
              <span>Cal. Final</span>
            </div>
            {compare && <>
              <div className="chart-legend-item">
                <div style={{ width: 12, height: 12, background: '#777' }} />
                <span>Competencias</span>
              </div>
              <div className="chart-legend-item">
                <div style={{ width: 12, height: 12, background: '#bbb' }} />
                <span>Objetivos</span>
              </div>
            </>}
          </div>
        </div>
      </div>

      {/* Row 3: Ranking */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Ranking de Áreas — {periodo}</span>
          <span className="text-faint font-sm">Clic en una fila para ir al detalle del área</span>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Área / Gerencia</th>
                <th>Promedio</th>
                <th>N° Jefaturas</th>
                {compare && <th>Periodo Anterior</th>}
                {compare && <th>Variación</th>}
                <th>Estado General</th>
              </tr>
            </thead>
            <tbody>
              {sortedByScore.map((g, i) => {
                const diff = g.promedio - g.promedioPrevio;
                const isTop = i < 3;
                return (
                  <tr
                    key={g.id}
                    className="tr-clickable"
                    onClick={() => navigate(`/resultados/agrupacion/${g.id}`)}
                  >
                    <td>
                      <span style={{ fontWeight: 700, color: isTop ? '#111' : 'var(--c-text-muted)' }}>
                        {i + 1}
                        {i === 0 && ' ★'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{g.nombre}</td>
                    <td>
                      <div className="progress-wrap">
                        <div className="progress-bar" style={{ minWidth: 80 }}>
                          <div className="progress-fill" style={{ width: `${g.promedio}%` }} />
                        </div>
                        <strong>{g.promedio}</strong>
                      </div>
                    </td>
                    <td>{g.jefaturas.length}</td>
                    {compare && <td>{g.promedioPrevio}</td>}
                    {compare && (
                      <td style={{ color: diff >= 0 ? '#333' : '#888' }}>
                        {diff >= 0 ? '▲' : '▼'} {Math.abs(diff)} pts
                      </td>
                    )}
                    <td>
                      <span className={`status status-complete`}>
                        {g.jefaturas.every(j => j.estado === 'Completado') ? 'Completado' : 'En Progreso'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick access cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Top 3 Mejor Desempeño</span>
          </div>
          <div>
            {top3.map((g, i) => (
              <div
                key={g.id}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < 2 ? '1px solid var(--c-border)' : 'none', cursor: 'pointer', gap: 12 }}
                onClick={() => navigate(`/resultados/agrupacion/${g.id}`)}
              >
                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 20 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{g.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>{g.jefaturas.length} jefaturas</div>
                </div>
                <strong>{g.promedio}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Áreas con Mayor Brecha</span>
          </div>
          <div>
            {bottom2.map((g, i) => (
              <div
                key={g.id}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: i < 1 ? '1px solid var(--c-border)' : 'none', cursor: 'pointer', gap: 12 }}
                onClick={() => navigate(`/resultados/agrupacion/${g.id}`)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{g.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>Prom: {g.promedio} | Prev: {g.promedioPrevio}</div>
                </div>
                <span style={{ fontSize: 11, color: '#888' }}>
                  ▼ Requiere atención
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
