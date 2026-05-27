import { useState, useCallback } from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getTop5Gaps } from '../../data/mockData';

interface CompEntry { nombre: string; logrado: number; esperado: number }

interface Props {
  competencias: CompEntry[];
  showEditor?: boolean;
  title?: string;
  compareData?: CompEntry[];
  compareLabel?: string;
}

const MAX_AXES = 8;

export default function RadarChartComponent({
  competencias,
  showEditor = false,
  title,
  compareData,
  compareLabel,
}: Props) {
  const defaultSelected = getTop5Gaps(competencias);
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [editorOpen, setEditorOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const isCustomized = JSON.stringify([...selected].sort()) !== JSON.stringify([...defaultSelected].sort());

  const chartData = competencias
    .filter(c => selected.includes(c.nombre))
    .map(c => ({
      subject: c.nombre.length > 14 ? c.nombre.slice(0, 13) + '…' : c.nombre,
      fullName: c.nombre,
      logrado: c.logrado,
      esperado: c.esperado,
      ...(compareData
        ? { logradoComp: compareData.find(d => d.nombre === c.nombre)?.logrado ?? 0 }
        : {}),
    }));

  const toggleComp = useCallback((nombre: string) => {
    setSelected(prev => {
      if (prev.includes(nombre)) {
        if (prev.length <= 2) return prev;
        return prev.filter(n => n !== nombre);
      } else {
        if (prev.length >= MAX_AXES) {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3000);
          return prev;
        }
        return [...prev, nombre];
      }
    });
  }, []);

  const reset = () => {
    setSelected(defaultSelected);
    setShowWarning(false);
  };

  const chartTitle = isCustomized ? 'Vista Personalizada' : (title ?? 'Top 5 Brechas de Competencias');

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]?.payload;
    return (
      <div style={{ border: '1px solid #999', background: '#fff', padding: '8px 12px', fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{d?.fullName}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--c-text-muted)' }}>{p.name}:</span>
            <span style={{ fontWeight: 700 }}>{p.value}</span>
          </div>
        ))}
        {d && (
          <div style={{ marginTop: 4, color: 'var(--c-text-faint)', fontSize: 11 }}>
            Brecha: {Math.max(0, d.esperado - d.logrado)} pts
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{chartTitle}</div>
        {showEditor && (
          <div style={{ display: 'flex', gap: 8 }}>
            {isCustomized && (
              <button className="btn btn-sm" onClick={reset}>Restablecer</button>
            )}
            <button className="btn btn-sm" onClick={() => setEditorOpen(o => !o)}>
              {editorOpen ? 'Cerrar' : 'Editar Vista'}
            </button>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#ddd" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: '#555' }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Valor Esperado"
            dataKey="esperado"
            stroke="#bbb"
            strokeDasharray="5 4"
            fill="#ddd"
            fillOpacity={0.15}
            dot={false}
          />
          <Radar
            name="Valor Logrado"
            dataKey="logrado"
            stroke="#222"
            fill="#444"
            fillOpacity={0.4}
            dot={{ r: 3, fill: '#222', stroke: '#222' }}
          />
          {compareData && (
            <Radar
              name={compareLabel ?? 'Comparación'}
              dataKey="logradoComp"
              stroke="#666"
              strokeDasharray="3 3"
              fill="#888"
              fillOpacity={0.15}
              dot={false}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="chart-legend">
        <div className="chart-legend-item">
          <div className="legend-dash" />
          <span>Valor Logrado</span>
        </div>
        <div className="chart-legend-item">
          <div className="legend-dashed" />
          <span>Valor Esperado</span>
        </div>
        {compareData && (
          <div className="chart-legend-item">
            <div style={{ width: 20, height: 0, borderTop: '2px dashed #888' }} />
            <span>{compareLabel}</span>
          </div>
        )}
      </div>

      {/* Chip selector */}
      {showEditor && (
        <div className="chip-group">
          {selected.map(n => (
            <span
              key={n}
              className="chip active"
              onClick={() => toggleComp(n)}
              title="Clic para quitar"
            >
              {n}
            </span>
          ))}
        </div>
      )}

      {/* Warning */}
      {showWarning && (
        <div className="warning-box">
          Para una mejor visualización, recomendamos seleccionar un máximo de {MAX_AXES} competencias simultáneas.
        </div>
      )}

      {/* Editor panel */}
      {editorOpen && showEditor && (
        <div className="radar-editor">
          <div className="radar-editor-label">Seleccionar competencias ({selected.length}/{MAX_AXES})</div>
          <div className="chip-group">
            {competencias.map(c => {
              const isSelected = selected.includes(c.nombre);
              const wouldExceed = !isSelected && selected.length >= MAX_AXES;
              return (
                <span
                  key={c.nombre}
                  className={`chip ${isSelected ? 'active' : ''} ${wouldExceed ? 'chip-disabled' : ''}`}
                  onClick={() => !wouldExceed || isSelected ? toggleComp(c.nombre) : undefined}
                  title={wouldExceed ? `Máximo ${MAX_AXES} competencias` : `Brecha: ${Math.max(0, c.esperado - c.logrado)} pts`}
                >
                  {c.nombre}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
