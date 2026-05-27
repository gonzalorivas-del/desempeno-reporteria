import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PERIODOS, GERENCIAS } from '../../data/mockData';

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; path?: string }[];
  compareEnabled: boolean;
  onCompareToggle: (v: boolean) => void;
  periodo: string;
  onPeriodoChange: (p: string) => void;
}

export default function AppLayout({
  children,
  breadcrumbs = [],
  compareEnabled,
  onCompareToggle,
  periodo,
  onPeriodoChange,
}: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [exportOpen, setExportOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          Rex+ <span>Desempeño</span>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Módulo</div>
          <button
            className={`sidebar-nav-item ${isActive('/resultados') ? 'active' : ''}`}
            onClick={() => navigate('/resultados/empresa')}
          >
            Resultados de Evaluaciones
          </button>

          <div className="sidebar-section-label" style={{ marginTop: 16 }}>Niveles</div>
          <button
            className={`sidebar-nav-item ${location.pathname === '/resultados/empresa' ? 'active' : ''}`}
            onClick={() => navigate('/resultados/empresa')}
          >
            Vista Empresa
          </button>

          <div className="sidebar-section-label" style={{ marginTop: 8 }}>Áreas / Gerencias</div>
          {GERENCIAS.map(g => (
            <button
              key={g.id}
              className={`sidebar-nav-item ${location.pathname === `/resultados/agrupacion/${g.id}` ? 'active' : ''}`}
              onClick={() => navigate(`/resultados/agrupacion/${g.id}`)}
            >
              {g.nombre}
            </button>
          ))}
        </nav>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--c-border)', fontSize: 11, color: 'var(--c-text-faint)' }}>
          Prototipo Wireframe v0.1
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        {/* Top bar */}
        <div className="topbar">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <button onClick={() => navigate('/resultados/empresa')}>Empresa</button>
            {breadcrumbs.map((b, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="sep">›</span>
                {b.path ? (
                  <button onClick={() => navigate(b.path!)}>{b.label}</button>
                ) : (
                  <span className="current">{b.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Controls */}
          <div className="topbar-controls">
            {/* Period selector */}
            <select value={periodo} onChange={e => onPeriodoChange(e.target.value)}>
              {PERIODOS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Compare toggle */}
            <label className="toggle-label">
              <input
                type="checkbox"
                style={{ accentColor: '#111' }}
                checked={compareEnabled}
                onChange={e => onCompareToggle(e.target.checked)}
              />
              Comparar periodo anterior
            </label>

            {/* Export */}
            <div style={{ position: 'relative' }}>
              <button className="btn btn-sm" onClick={() => setExportOpen(o => !o)}>
                Exportar ▾
              </button>
              {exportOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: 2,
                    border: '1px solid var(--c-border-strong)',
                    background: 'var(--c-bg)',
                    zIndex: 100,
                    minWidth: 180,
                  }}
                  onMouseLeave={() => setExportOpen(false)}
                >
                  <button
                    style={{ display: 'block', width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: 13, border: 'none', background: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-bg-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    onClick={() => { alert('Exportar Vista Actual (PDF) — [Mock]'); setExportOpen(false); }}
                  >
                    Exportar Vista Actual (PDF)
                  </button>
                  <button
                    style={{ display: 'block', width: '100%', padding: '8px 14px', textAlign: 'left', fontSize: 13, border: 'none', background: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-bg-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    onClick={() => { alert('Exportar Datos (Excel) — [Mock]'); setExportOpen(false); }}
                  >
                    Exportar Datos (Excel)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        {children}
      </div>
    </div>
  );
}
