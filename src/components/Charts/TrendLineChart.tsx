import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export interface TrendSerie {
  key: string;
  label: string;
  color: string;
  dashed?: boolean;
}

interface Props {
  data: Record<string, string | number | null>[];
  xKey: string;
  series: TrendSerie[];
  height?: number;
  domain?: [number, number];
  referenceValue?: number;
  referenceLabel?: string;
}

export default function TrendLineChart({
  data,
  xKey,
  series,
  height = 240,
  domain = [50, 100],
  referenceValue,
  referenceLabel,
}: Props) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ border: '1px solid #999', background: '#fff', padding: '8px 12px', fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
        {payload
          .filter((p: any) => p.value != null)
          .map((p: any) => (
            <div key={p.dataKey} style={{ display: 'flex', gap: 8, justifyContent: 'space-between', minWidth: 150 }}>
              <span style={{ color: 'var(--c-text-muted)' }}>{p.name}:</span>
              <span style={{ fontWeight: 700 }}>{p.value}</span>
            </div>
          ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, bottom: 0, left: -10 }}>
        <CartesianGrid vertical={false} stroke="#eee" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#555' }} />
        <YAxis domain={domain} tick={{ fontSize: 11, fill: '#555' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        {referenceValue != null && (
          <ReferenceLine
            y={referenceValue}
            stroke="#ccc"
            strokeDasharray="4 4"
            label={{ value: referenceLabel ?? '', position: 'insideTopRight', fontSize: 10, fill: '#aaa' }}
          />
        )}
        {series.map(s => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.dashed ? '5 4' : undefined}
            dot={{ r: 4, fill: s.color, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
