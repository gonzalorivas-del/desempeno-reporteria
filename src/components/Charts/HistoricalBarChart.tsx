import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HISTORIAL_EMPRESA } from '../../data/mockData';
import type { HistorialPeriodo } from '../../data/mockData';

interface Props {
  compare?: boolean;
  historial?: HistorialPeriodo[];
}

export default function HistoricalBarChart({ compare, historial }: Props) {
  const source = historial ?? HISTORIAL_EMPRESA;
  const data = source.map(h => ({
    periodo: h.periodo,
    'Cal. Final': h.calificacion,
    ...(compare
      ? { Competencias: h.competencias, Objetivos: h.objetivos }
      : {}),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ border: '1px solid #999', background: '#fff', padding: '8px 12px', fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--c-text-muted)' }}>{p.dataKey}:</span>
            <span style={{ fontWeight: 700 }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#eee" />
        <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: '#555' }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#555' }} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={82} stroke="#bbb" strokeDasharray="4 4" label={{ value: 'Actual', position: 'right', fontSize: 10, fill: '#aaa' }} />
        <Bar dataKey="Cal. Final" fill="#333" radius={0} barSize={compare ? 16 : 36} />
        {compare && <Bar dataKey="Competencias" fill="#777" radius={0} barSize={16} />}
        {compare && <Bar dataKey="Objetivos" fill="#bbb" radius={0} barSize={16} />}
      </BarChart>
    </ResponsiveContainer>
  );
}
