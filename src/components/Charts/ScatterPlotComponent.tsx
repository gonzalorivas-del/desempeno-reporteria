import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from 'recharts';
import type { Colaborador } from '../../data/mockData';

interface Props {
  colaboradores: Colaborador[];
  highlighted?: string[];
  onDotClick?: (id: string) => void;
}

const AVG_X = 80;
const AVG_Y = 80;

export default function ScatterPlotComponent({ colaboradores, highlighted, onDotClick }: Props) {
  const data = colaboradores.map(c => ({
    x: c.logroObjetivos,
    y: c.logroCompetencias,
    id: c.id,
    nombre: c.nombre,
    cargo: c.cargo,
    nota: c.calificacionFinal,
    isHighlighted: !highlighted || highlighted.includes(c.id),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]?.payload;
    if (!d) return null;
    return (
      <div style={{ border: '1px solid #999', background: '#fff', padding: '8px 12px', fontSize: 12 }}>
        <div style={{ fontWeight: 700 }}>{d.nombre}</div>
        <div style={{ color: 'var(--c-text-muted)', fontSize: 11, marginBottom: 4 }}>{d.cargo}</div>
        <div>Objetivos: <strong>{d.x}%</strong></div>
        <div>Competencias: <strong>{d.y}%</strong></div>
        <div>Nota Final: <strong>{d.nota}</strong></div>
      </div>
    );
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.isHighlighted) return null;
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill={payload.nota >= 85 ? '#222' : payload.nota >= 75 ? '#666' : '#bbb'}
          stroke="#333"
          strokeWidth={1}
          style={{ cursor: onDotClick ? 'pointer' : 'default' }}
          onClick={() => onDotClick?.(payload.id)}
        />
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fontSize={9}
          fill="#555"
        >
          {payload.nombre.split(' ')[0]}
        </text>
      </g>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 10 }}>
          <CartesianGrid stroke="#eee" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[50, 105]}
            tick={{ fontSize: 11, fill: '#555' }}
            name="Logro Objetivos"
          >
            <Label value="Logro de Objetivos (%)" position="bottom" offset={10} fontSize={11} fill="#888" />
          </XAxis>
          <YAxis
            type="number"
            dataKey="y"
            domain={[50, 105]}
            tick={{ fontSize: 11, fill: '#555' }}
            name="Logro Competencias"
            label={{ value: 'Logro de Competencias (%)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#888', offset: 10 }}
          />
          <ReferenceLine x={AVG_X} stroke="#ccc" strokeDasharray="4 4" label={{ value: 'Prom.', position: 'top', fontSize: 10, fill: '#aaa' }} />
          <ReferenceLine y={AVG_Y} stroke="#ccc" strokeDasharray="4 4" label={{ value: 'Prom.', position: 'right', fontSize: 10, fill: '#aaa' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', fontSize: 10, color: 'var(--c-text-faint)', textAlign: 'center', marginTop: -10 }}>
        <div>◀ Bajo en Objetivos / Alto en Competencias</div>
        <div>Alto en ambos ▶</div>
      </div>
    </div>
  );
}
