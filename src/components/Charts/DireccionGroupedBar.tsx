import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { DireccionData } from '../../data/mockData';

interface Props {
  data: DireccionData[];
}

export default function DireccionGroupedBar({ data }: Props) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ border: '1px solid #999', background: '#fff', padding: '8px 12px', fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--c-text-muted)', textTransform: 'capitalize' }}>{p.name}:</span>
            <span style={{ fontWeight: 700 }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} barGap={4}>
        <CartesianGrid vertical={false} stroke="#eee" />
        <XAxis dataKey="direccion" tick={{ fontSize: 11, fill: '#555' }} />
        <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#555' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        <Bar dataKey="competencias" name="Competencias" fill="#333" barSize={22} />
        <Bar dataKey="objetivos" name="Objetivos" fill="#999" barSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}
