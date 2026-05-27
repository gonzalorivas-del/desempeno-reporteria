interface Props {
  competencias: { nombre: string; logrado: number; esperado: number }[];
}

export default function Sparkline({ competencias }: Props) {
  const gaps = competencias.map(c => Math.max(0, c.esperado - c.logrado));
  const maxGap = Math.max(...gaps, 1);
  const shown = gaps.slice(0, 8);

  return (
    <div className="sparkline" title={`Brechas: ${gaps.slice(0, 5).join(', ')} pts`}>
      {shown.map((gap, i) => (
        <div
          key={i}
          className="spark-bar"
          style={{
            height: `${Math.max(4, (gap / maxGap) * 22)}px`,
            background: gap > 10 ? '#333' : gap > 5 ? '#777' : '#bbb',
          }}
        />
      ))}
    </div>
  );
}
