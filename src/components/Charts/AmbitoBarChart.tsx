import type { AmbitoData } from '../../data/mockData';

interface Props {
  ambitos: AmbitoData[];
}

export default function AmbitoBarChart({ ambitos }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {ambitos.map(a => {
        const gap = a.esperado - a.logrado;
        const isAbove = a.logrado >= a.esperado;
        return (
          <div key={a.label}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, marginBottom: 6, gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700 }}>{a.label}</span>
                <span style={{ fontSize: 10, color: 'var(--c-text-faint)', border: '1px solid var(--c-border)', padding: '1px 6px', whiteSpace: 'nowrap' }}>
                  Pond. {a.peso}%
                </span>
              </div>
              <div style={{ display: 'flex', gap: 12, color: 'var(--c-text-muted)', flexShrink: 0 }}>
                <span>Logrado: <strong style={{ color: 'var(--c-text)' }}>{a.logrado}</strong></span>
                <span>Esp: {a.esperado}</span>
                <span style={{ fontWeight: 700, color: isAbove ? '#222' : '#888', minWidth: 32, textAlign: 'right' }}>
                  {isAbove ? `+${Math.abs(gap)}` : `-${Math.abs(gap)}`}
                </span>
              </div>
            </div>
            <div className="hbar-row" style={{ marginBottom: 0 }}>
              <div className="hbar-track" style={{ height: 18 }}>
                <div
                  className={`hbar-fill ${isAbove ? 'hbar-fill-above' : 'hbar-fill-below'}`}
                  style={{ width: `${a.logrado}%` }}
                />
                <div
                  className="hbar-avg-line"
                  style={{ left: `${a.esperado}%` }}
                  title={`Esperado: ${a.esperado}`}
                />
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ fontSize: 11, color: 'var(--c-text-faint)', marginTop: 2 }}>
        ─── línea = valor esperado por ámbito
      </div>
    </div>
  );
}
