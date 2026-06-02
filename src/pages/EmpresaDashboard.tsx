import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadarChartComponent from '../components/Charts/RadarChartComponent';
import HistoricalBarChart from '../components/Charts/HistoricalBarChart';
import AmbitoBarChart from '../components/Charts/AmbitoBarChart';
import DireccionGroupedBar from '../components/Charts/DireccionGroupedBar';
import {
  COMPETENCIAS_EMPRESA,
  OBJETIVOS_EMPRESA,
  AMBITOS_EMPRESA,
  DIRECCIONES_EMPRESA,
  GERENCIAS,
  getEmpresaById,
} from '../data/mockData';

interface Props {
  periodo: string;
  compare: boolean;
  empresaId: string;
}

type AmbitoRadar = 'competencias' | 'objetivos';

function TrendBadge({ current, prev, unit = '' }: { current: number; prev: number; unit?: string }) {
  const diff = current - prev;
  const symbol = diff > 0 ? '▲' : diff < 0 ? '▼' : '—';
  const label =
    diff > 0
      ? `+${diff}${unit} vs. periodo anterior`
      : diff < 0
      ? `${diff}${unit} vs. periodo anterior`
      : 'Sin variación';
  return (
    <div className="kpi-trend" style={{ color: diff >= 0 ? '#333' : '#666' }}>
      {symbol} {label}
    </div>
  );
}

export default function EmpresaDashboard({ periodo, compare, empresaId }: Props) {
  const navigate = useNavigate();
  const empresa = getEmpresaById(empresaId);
  const kpis = empresa.kpis;
  const historial = empresa.historial;
  const isAll = empresaId === 'all';

  const [ambitoRadar, setAmbitoRadar] = useState<AmbitoRadar>('competencias');

  const radarData = ambitoRadar === 'competencias' ? COMPETENCIAS_EMPRESA : OBJETIVOS_EMPRESA;
  const radarTitle =
    ambitoRadar === 'competencias'
      ? 'Top 5 Brechas de Competencias Globales'
      : 'Top 5 Brechas de Objetivos Globales';

  const sortedByScore = [...GERENCIAS].sort((a, b) => b.promedio - a.promedio);
  const top3 = sortedByScore.slice(0, 3);
  const bottom2 = sortedByScore.slice(-2);

  return (
    <div className="page">
      <div className="page-title">Resultados de Evaluaciones</div>
      <div className="page-subtitle">
        {isAll ? 'Todas las Empresas' : empresa.nombre} — {periodo}
        {isAll && empresa.nEmpresas && (
          <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--c-text-faint)', fontWeight: 400 }}>
            ({empresa.nEmpresas} empresas)
          </span>
        )}
      </div>

      {!isAll && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 14px',
            border: '1px dashed var(--c-border-strong)',
            background: 'var(--c-bg-alt)',
            marginBottom: 20,
            fontSize: 12,
            color: 'var(--c-text-muted)',
          }}
        >
          <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 10 }}>
            Empresa seleccionada:
          </span>
          <span style={{ fontWeight: 600 }}>{empresa.nombre}</span>
          <span style={{ marginLeft: 'auto', color: 'var(--c-text-faint)' }}>
            Procesos disponibles: {empresa.periodos.join(', ')}
          </span>
        </div>
      )}

      {/* Row 1: KPIs */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Total Evaluados</div>
          <div className="kpi-value">
            {empresa.totalEvaluados}
            <span className="kpi-value-unit"> colab.</span>
          </div>
          <div className="kpi-trend" style={{ color: 'var(--c-text-faint)' }}>
            {isAll
              ? `${empresa.nEmpresas} empresas · ${GERENCIAS.length} gerencias`
              : `${GERENCIAS.length} gerencias · ${GERENCIAS.reduce((s, g) => s + g.jefaturas.length, 0)} jefaturas`}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Calificación Final Promedio</div>
          <div className="kpi-value">
            {kpis.calificacionFinal}
            <span className="kpi-value-unit">/100</span>
          </div>
          {compare && (
            <TrendBadge current={kpis.calificacionFinal} prev={kpis.calificacionFinalPrevio} />
          )}
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Promedio Cumplimiento Competencias</div>
          <div className="kpi-value">
            {kpis.cumplimientoCompetencias}
            <span className="kpi-value-unit">%</span>
          </div>
          {compare && (
            <TrendBadge
              current={kpis.cumplimientoCompetencias}
              prev={kpis.cumplimientoCompetenciasPrevio}
              unit="%"
            />
          )}
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Promedio Cumplimiento Objetivos</div>
          <div className="kpi-value">
            {kpis.cumplimientoObjetivos}
            <span className="kpi-value-unit">%</span>
          </div>
          {compare && (
            <TrendBadge
              current={kpis.cumplimientoObjetivos}
              prev={kpis.cumplimientoObjetivosPrevio}
              unit="%"
            />
          )}
        </div>
      </div>

      {/* Row 2: Radar + Historical */}
      <div className="chart-row">
        <div className="chart-panel">
          <div className="chart-panel-label">Gráfico de Araña</div>

          {/* Ámbito selector */}
          <div className="chip-group" style={{ marginBottom: 10 }}>
            {(['competencias', 'objetivos'] as AmbitoRadar[]).map(a => (
              <button
                key={a}
                className={`chip ${ambitoRadar === a ? 'active' : ''}`}
                onClick={() => setAmbitoRadar(a)}
                style={{ textTransform: 'capitalize' }}
              >
                {a === 'competencias' ? 'Competencias' : 'Objetivos'}
              </button>
            ))}
          </div>

          <div className="chart-panel-heading">{radarTitle}</div>
          <RadarChartComponent
            key={ambitoRadar}
            competencias={radarData}
            compareData={
              compare
                ? radarData.map(c => ({ ...c, logrado: Math.round(c.logrado * 0.97) }))
                : undefined
            }
            compareLabel="Periodo Anterior"
          />
        </div>
        <div className="chart-panel">
          <div className="chart-panel-label">Tendencia Histórica</div>
          <div className="chart-panel-heading">Evolución Calificación Histórica</div>
          <HistoricalBarChart compare={compare} historial={historial} />
          <div className="chart-legend" style={{ marginTop: 8 }}>
            <div className="chart-legend-item">
              <div style={{ width: 12, height: 12, background: '#333' }} />
              <span>Cal. Final</span>
            </div>
            {compare && (
              <>
                <div className="chart-legend-item">
                  <div style={{ width: 12, height: 12, background: '#777' }} />
                  <span>Competencias</span>
                </div>
                <div className="chart-legend-item">
                  <div style={{ width: 12, height: 12, background: '#bbb' }} />
                  <span>Objetivos</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Desglose por Ámbito + Comparación por Dirección */}
      <div className="chart-row">
        <div className="chart-panel">
          <div className="chart-panel-label">Ámbitos de Evaluación</div>
          <div className="chart-panel-heading">Desglose Calificación por Ámbito</div>
          <AmbitoBarChart ambitos={AMBITOS_EMPRESA} />
        </div>
        <div className="chart-panel">
          <div className="chart-panel-label">Direcciones de Evaluación</div>
          <div className="chart-panel-heading">Comparación por Fuente de Evaluación</div>
          <DireccionGroupedBar data={DIRECCIONES_EMPRESA} />
        </div>
      </div>

      {/* Row 4: Ranking (unchanged) */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">
            Ranking de Áreas — {isAll ? 'Todas las Empresas' : empresa.nombre} · {periodo}
          </span>
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
                      <span className="status status-complete">
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

      {/* Quick access */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Top 3 Mejor Desempeño</span>
          </div>
          <div>
            {top3.map((g, i) => (
              <div
                key={g.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  borderBottom: i < 2 ? '1px solid var(--c-border)' : 'none',
                  cursor: 'pointer',
                  gap: 12,
                }}
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  borderBottom: i < 1 ? '1px solid var(--c-border)' : 'none',
                  cursor: 'pointer',
                  gap: 12,
                }}
                onClick={() => navigate(`/resultados/agrupacion/${g.id}`)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{g.nombre}</div>
                  <div style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>
                    Prom: {g.promedio} | Prev: {g.promedioPrevio}
                  </div>
                </div>
                <span style={{ fontSize: 11, color: '#888' }}>▼ Requiere atención</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
