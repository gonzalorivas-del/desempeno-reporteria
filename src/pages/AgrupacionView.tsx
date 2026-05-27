import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RadarChartComponent from '../components/Charts/RadarChartComponent';
import { getGerenciaById, GERENCIAS, COMPETENCIAS_EMPRESA } from '../data/mockData';

interface Props { periodo: string; compare: boolean }

export default function AgrupacionView({ periodo, compare }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const gerencia = id ? getGerenciaById(id) : undefined;

  const [selectedGerencias, setSelectedGerencias] = useState<string[]>(id ? [id] : [GERENCIAS[0].id]);

  if (!gerencia) {
    return (
      <div className="page">
        <div className="empty-state">Área no encontrada.</div>
      </div>
    );
  }

  const toggleGerencia = (gId: string) => {
    setSelectedGerencias(prev => {
      if (prev.includes(gId)) {
        if (prev.length === 1) return prev;
        return prev.filter(x => x !== gId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, gId];
    });
  };

  const companyAvg = Math.round(GERENCIAS.reduce((s, g) => s + g.promedio, 0) / GERENCIAS.length);
  const selectedData = GERENCIAS.filter(g => selectedGerencias.includes(g.id));

  const primaryGerencia = selectedData[0] ?? gerencia;

  return (
    <div className="page">
      <div className="page-title">{gerencia.nombre}</div>
      <div className="page-subtitle">Vista por Área / Gerencia — {periodo}</div>

      {/* Filter bar */}
      <div className="filter-bar">
        <label>Comparar áreas:</label>
        <div className="pill-group">
          {GERENCIAS.map(g => (
            <button
              key={g.id}
              className={`pill ${selectedGerencias.includes(g.id) ? 'active' : ''}`}
              onClick={() => toggleGerencia(g.id)}
              title={selectedGerencias.length >= 3 && !selectedGerencias.includes(g.id) ? 'Máximo 3 áreas' : ''}
            >
              {g.nombre}
            </button>
          ))}
        </div>
        {selectedGerencias.length >= 3 && (
          <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>Máx. 3 áreas seleccionadas</span>
        )}
      </div>

      {/* Horizontal bar chart */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Comparación de Puntaje Promedio por Área</span>
          <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>
            Promedio empresa: <strong>{companyAvg}</strong>
          </span>
        </div>
        <div className="panel-body">
          {selectedData.map(g => {
            const pct = (g.promedio / 100) * 100;
            const avgPct = (companyAvg / 100) * 100;
            const isAbove = g.promedio >= companyAvg;
            return (
              <div key={g.id} className="hbar-row">
                <div className="hbar-label">{g.nombre}</div>
                <div className="hbar-track" style={{ position: 'relative' }}>
                  <div
                    className={`hbar-fill ${isAbove ? 'hbar-fill-above' : 'hbar-fill-below'}`}
                    style={{ width: `${pct}%` }}
                  />
                  <div
                    className="hbar-avg-line"
                    style={{ left: `${avgPct}%` }}
                    title={`Promedio empresa: ${companyAvg}`}
                  />
                </div>
                <div className="hbar-value">
                  {g.promedio}
                  <span style={{ fontSize: 10, color: 'var(--c-text-faint)', marginLeft: 2 }}>
                    {isAbove ? '▲' : '▼'}
                  </span>
                </div>
                {compare && (
                  <div style={{ fontSize: 11, color: 'var(--c-text-faint)', minWidth: 60 }}>
                    Ant: {g.promedioPrevio}
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 8 }}>
            ─── línea = promedio empresa ({companyAvg} pts)
          </div>
        </div>
      </div>

      {/* Radar */}
      <div className="chart-row">
        <div className="chart-panel">
          <div className="chart-panel-label">Gráfico de Araña — {primaryGerencia.nombre}</div>
          <div className="chart-panel-heading">Perfil de Competencias vs. Esperado</div>
          <RadarChartComponent
            competencias={primaryGerencia.competencias}
            compareData={compare ? primaryGerencia.competencias.map(c => ({ ...c, logrado: Math.round(c.logrado * 0.97) })) : undefined}
            compareLabel="Periodo Anterior"
          />
        </div>
        <div className="chart-panel">
          <div className="chart-panel-label">Comparación Empresa</div>
          <div className="chart-panel-heading">Perfil {primaryGerencia.nombre} vs. Empresa</div>
          <RadarChartComponent
            competencias={primaryGerencia.competencias}
            compareData={COMPETENCIAS_EMPRESA}
            compareLabel="Promedio Empresa"
          />
        </div>
      </div>

      {/* Jefaturas table */}
      {selectedData.map(g => (
        <div key={g.id} className="panel">
          <div className="panel-header">
            <span className="panel-title">Jefaturas — {g.nombre}</span>
            <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>
              Clic en una fila para ver el equipo
            </span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Jefatura / Equipo</th>
                <th>Responsable</th>
                <th>N° Colaboradores</th>
                <th>Promedio Calificación</th>
                {compare && <th>Periodo Anterior</th>}
                <th>Estado de Avance</th>
              </tr>
            </thead>
            <tbody>
              {g.jefaturas.map(j => {
                const diff = compare ? (j.promedio - Math.round(j.promedio * 0.97)) : 0;
                return (
                  <tr
                    key={j.id}
                    className="tr-clickable"
                    onClick={() => navigate(`/resultados/equipo/${j.id}`)}
                  >
                    <td style={{ fontWeight: 600 }}>{j.nombre}</td>
                    <td>{j.jefe}</td>
                    <td>{j.nColaboradores}</td>
                    <td>
                      <div className="progress-wrap">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${j.promedio}%` }} />
                        </div>
                        <strong>{j.promedio}</strong>
                      </div>
                    </td>
                    {compare && (
                      <td style={{ color: diff >= 0 ? '#333' : '#888', fontSize: 12 }}>
                        {diff >= 0 ? '▲' : '▼'} {Math.abs(diff)} pts
                      </td>
                    )}
                    <td>
                      <span className={`status status-${j.estado === 'Completado' ? 'complete' : j.estado === 'En Progreso' ? 'progress' : 'pending'}`}>
                        {j.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
