import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getColaboradorById } from '../data/mockData';
import RadarChartComponent from '../components/Charts/RadarChartComponent';

interface Props { periodo: string; compare: boolean }

type TabId = 'resumen' | 'competencias' | 'objetivos' | 'cualitativas';
type AmbitoRadar = 'competencias' | 'objetivos';

export default function ColaboradorView({ periodo, compare }: Props) {
  const { id } = useParams<{ id: string }>();
  const colab = id ? getColaboradorById(id) : undefined;
  const [activeTab, setActiveTab] = useState<TabId>('resumen');
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const [ambitoRadar, setAmbitoRadar] = useState<AmbitoRadar>('competencias');

  if (!colab) {
    return (
      <div className="page">
        <div className="empty-state">Colaborador no encontrado.</div>
      </div>
    );
  }

  const toggleAccordion = (nombre: string) => {
    setOpenAccordions(prev => {
      const next = new Set(prev);
      next.has(nombre) ? next.delete(nombre) : next.add(nombre);
      return next;
    });
  };

  const initials = colab.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const logro = colab.calificacionFinal >= 85 ? 'Destacado' : colab.calificacionFinal >= 70 ? 'Cumple' : 'A Mejorar';

  // Convertir objetivos del colaborador a formato radar (% de cumplimiento vs 100%)
  const objetivosParaRadar = colab.objetivos.map(o => ({
    nombre: o.descripcion.length > 28 ? o.descripcion.slice(0, 26) + '…' : o.descripcion,
    logrado: Math.min(100, Math.round((o.logrado / o.meta) * 100)),
    esperado: 100,
  }));

  const radarDataColab = ambitoRadar === 'competencias' ? colab.competencias : objetivosParaRadar;
  const radarTitleColab =
    ambitoRadar === 'competencias' ? 'Top 5 Brechas de Competencias' : 'Logro de Objetivos';

  return (
    <div className="page">
      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info">
          <h2>{colab.nombre}</h2>
          <p>{colab.cargo}</p>
          <div className="profile-meta">
            <span>Fecha evaluación: 15/03/2025</span>
            <span>Proceso: {periodo}</span>
            <span>
              Estado: <strong>{logro}</strong>
            </span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--c-text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Obj.</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{colab.logroObjetivos}%</div>
            </div>
            <div style={{ width: 1, background: 'var(--c-border)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'var(--c-text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Comp.</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{colab.logroCompetencias}%</div>
            </div>
          </div>
        </div>
        <div className="profile-score">
          <div className="circular-score">
            <div className="circular-score-value">{colab.calificacionFinal}</div>
            <div style={{ fontSize: 9, color: 'var(--c-text-faint)' }}>/100</div>
          </div>
          <div className="circular-score-label">Calificación Final</div>
          {compare && (
            <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 4 }}>
              Ant: {Math.round(colab.calificacionFinal * 0.97)} ▲ {colab.calificacionFinal - Math.round(colab.calificacionFinal * 0.97)} pts
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {([
          ['resumen', 'Resumen'],
          ['competencias', 'Competencias'],
          ['objetivos', 'Objetivos'],
          ['cualitativas', 'Cualitativas / Feedback'],
        ] as [TabId, string][]).map(([id, label]) => (
          <button
            key={id}
            className={`tab ${activeTab === id ? 'active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Resumen */}
      {activeTab === 'resumen' && (
        <div>
          <div className="chart-row">
            <div className="chart-panel">
              <div className="chart-panel-label">Gráfico de Araña</div>

              {/* Selector de ámbito */}
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

              <div className="chart-panel-heading">{radarTitleColab}</div>
              <RadarChartComponent
                key={ambitoRadar}
                competencias={radarDataColab}
                showEditor={true}
                title={radarTitleColab}
                compareData={
                  compare
                    ? radarDataColab.map(c => ({ ...c, logrado: Math.round(c.logrado * 0.96) }))
                    : undefined
                }
                compareLabel="Periodo Anterior"
              />
            </div>
            <div>
              {/* Score breakdown */}
              <div className="chart-panel" style={{ marginBottom: 16 }}>
                <div className="chart-panel-label">Resumen de Evaluación</div>
                <div className="chart-panel-heading">Desglose por Ámbito</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Competencias', value: colab.logroCompetencias, peso: '60%' },
                    { label: 'Objetivos', value: colab.logroObjetivos, peso: '40%' },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>{item.label}</span>
                        <span style={{ color: 'var(--c-text-muted)' }}>Ponderación: {item.peso}</span>
                        <strong>{item.value}%</strong>
                      </div>
                      <div className="progress-bar" style={{ height: 12 }}>
                        <div className="progress-fill" style={{ width: `${item.value}%` }} />
                        <div className="progress-expected" style={{ left: '80%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Directions */}
              <div className="chart-panel">
                <div className="chart-panel-label">Direcciones de Evaluación</div>
                <div className="chart-panel-heading">Calificación por Fuente</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Descendente (Jefe)', value: Math.round(colab.competencias.reduce((s, c) => s + c.jefe, 0) / colab.competencias.length) },
                    { label: 'Autoevaluación', value: Math.round(colab.competencias.reduce((s, c) => s + c.autoevaluacion, 0) / colab.competencias.length) },
                    { label: 'Pares', value: Math.round(colab.competencias.reduce((s, c) => s + c.pares, 0) / colab.competencias.length) },
                  ].map(d => (
                    <div key={d.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                        <span>{d.label}</span>
                        <strong>{d.value}</strong>
                      </div>
                      <div className="progress-bar" style={{ height: 8 }}>
                        <div className="progress-fill" style={{ width: `${d.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top gaps table */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Principales Brechas Identificadas</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Competencia</th>
                  <th>Logrado</th>
                  <th>Esperado</th>
                  <th>Brecha</th>
                  <th>Progreso visual</th>
                </tr>
              </thead>
              <tbody>
                {[...colab.competencias]
                  .sort((a, b) => (b.esperado - b.logrado) - (a.esperado - a.logrado))
                  .slice(0, 5)
                  .map(c => {
                    const gap = c.esperado - c.logrado;
                    return (
                      <tr key={c.nombre}>
                        <td style={{ fontWeight: 600 }}>{c.nombre}</td>
                        <td><strong>{c.logrado}</strong></td>
                        <td style={{ color: 'var(--c-text-muted)' }}>{c.esperado}</td>
                        <td>
                          <span style={{ fontWeight: 700, color: gap > 10 ? '#333' : 'var(--c-text-muted)' }}>
                            {gap > 0 ? `-${gap}` : `+${Math.abs(gap)}`}
                          </span>
                        </td>
                        <td>
                          <div className="progress-bar" style={{ minWidth: 120 }}>
                            <div className="progress-fill" style={{ width: `${c.logrado}%` }} />
                            <div className="progress-expected" style={{ left: `${c.esperado}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Competencias */}
      {activeTab === 'competencias' && (
        <div>
          <div style={{ fontSize: 13, color: 'var(--c-text-muted)', marginBottom: 16 }}>
            {colab.competencias.length} competencias evaluadas — clic en cada una para ver el detalle por dirección
          </div>
          <div className="panel">
            <div className="panel-body" style={{ padding: 0 }}>
              {[...colab.competencias]
                .sort((a, b) => (b.esperado - b.logrado) - (a.esperado - a.logrado))
                .map(c => {
                  const gap = c.esperado - c.logrado;
                  const isOpen = openAccordions.has(c.nombre);
                  return (
                    <div key={c.nombre} className="accordion-item">
                      <div
                        className="accordion-header"
                        onClick={() => toggleAccordion(c.nombre)}
                        style={{ padding: '12px 16px' }}
                      >
                        <span className="accordion-toggle">{isOpen ? '▼' : '▶'}</span>
                        <span className="accordion-title-text">{c.nombre}</span>
                        <div style={{ flex: 1, marginLeft: 12, marginRight: 12 }}>
                          <div className="progress-wrap">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{ width: `${c.logrado}%` }} />
                              <div className="progress-expected" style={{ left: `${c.esperado}%` }} />
                            </div>
                            <span className="progress-label">
                              {c.logrado}/{c.esperado}
                              {gap > 0 ? (
                                <span style={{ color: 'var(--c-text-faint)', marginLeft: 4 }}>(-{gap})</span>
                              ) : (
                                <span style={{ color: '#333', marginLeft: 4 }}>(+{Math.abs(gap)})</span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="accordion-body">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
                            {[
                              { label: 'Descendente (Jefe)', value: c.jefe },
                              { label: 'Autoevaluación', value: c.autoevaluacion },
                              { label: 'Pares', value: c.pares },
                            ].map(d => (
                              <div key={d.label} style={{ border: '1px solid var(--c-border)', padding: '10px 12px' }}>
                                <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginBottom: 4 }}>{d.label}</div>
                                <div style={{ fontSize: 18, fontWeight: 700 }}>{d.value}</div>
                                <div className="progress-bar" style={{ height: 6, marginTop: 6 }}>
                                  <div className="progress-fill" style={{ width: `${d.value}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          {compare && (
                            <div style={{ fontSize: 12, color: 'var(--c-text-faint)', borderTop: '1px dashed var(--c-border)', paddingTop: 8 }}>
                              Periodo anterior: {Math.round(c.logrado * 0.96)} | Variación: ▲ {c.logrado - Math.round(c.logrado * 0.96)} pts
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Objetivos */}
      {activeTab === 'objetivos' && (
        <div>
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Objetivos Individuales — {periodo}</span>
              <span style={{ fontSize: 11, color: 'var(--c-text-faint)' }}>
                {colab.objetivos.filter(o => o.logrado >= o.meta).length} de {colab.objetivos.length} objetivos alcanzados
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Descripción del Objetivo</th>
                  <th>Meta</th>
                  <th>Logrado</th>
                  <th>Cumplimiento</th>
                  <th>Progreso</th>
                </tr>
              </thead>
              <tbody>
                {colab.objetivos.map((o, i) => {
                  const pct = Math.min(100, Math.round((o.logrado / o.meta) * 100));
                  const met = o.logrado >= o.meta;
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{o.descripcion}</td>
                      <td style={{ color: 'var(--c-text-muted)' }}>
                        {o.meta} {o.unidad}
                      </td>
                      <td>
                        <strong>{o.logrado}</strong> {o.unidad}
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: met ? '#222' : '#888' }}>
                          {pct}% {met ? '✓' : ''}
                        </span>
                      </td>
                      <td>
                        <div className="progress-bar" style={{ minWidth: 100 }}>
                          <div
                            className="progress-fill"
                            style={{ width: `${pct}%`, background: met ? '#222' : '#888' }}
                          />
                          <div className="progress-expected" style={{ left: '100%', display: 'none' }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {compare && (
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Comparación con Periodo Anterior</span>
              </div>
              <div className="panel-body">
                <div style={{ fontSize: 13, color: 'var(--c-text-muted)' }}>
                  Periodo 2024 — Logro Objetivos: <strong>{Math.round(colab.logroObjetivos * 0.97)}%</strong>
                  {' '}→ Periodo 2025: <strong>{colab.logroObjetivos}%</strong>
                  {' '}(▲ {colab.logroObjetivos - Math.round(colab.logroObjetivos * 0.97)} puntos)
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Cualitativas */}
      {activeTab === 'cualitativas' && (
        <div>
          <div className="feedback-grid">
            <div className="feedback-card">
              <div className="feedback-card-title">Logros del Periodo</div>
              <p>{colab.feedback.logros}</p>
            </div>
            <div className="feedback-card">
              <div className="feedback-card-title">Fortalezas Identificadas</div>
              <p>{colab.feedback.fortalezas}</p>
            </div>
            <div className="feedback-card">
              <div className="feedback-card-title">Oportunidades de Mejora</div>
              <p>{colab.feedback.oportunidades}</p>
            </div>
            <div className="feedback-card">
              <div className="feedback-card-title">Comentarios del Evaluador</div>
              <p>{colab.feedback.comentariosEvaluador}</p>
            </div>
          </div>

          <div style={{ marginTop: 16, border: '1px dashed var(--c-border)', padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--c-text-faint)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Nota de uso
            </div>
            <p style={{ fontSize: 13, color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
              Las respuestas cualitativas son completadas durante el proceso de evaluación por el evaluador.
              En el módulo de producción este contenido provendría directamente del proceso de evaluación configurado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
