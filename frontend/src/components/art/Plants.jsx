// Leaf pointing right from (0,0); rotate/position it with x, y, angle
export function Leaf({ x, y, len, w, angle, fill, rib }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0 0 Q${len * 0.45} ${-w} ${len} 0 Q${len * 0.45} ${w} 0 0Z`} fill={fill} />
      {rib && (
        <path d={`M4 0 Q${len * 0.45} ${-w * 0.12} ${len * 0.94} 0`} stroke={rib} strokeWidth="1.6" fill="none" />
      )}
    </g>
  )
}

// Several leaves fanning out from one point, swaying together
export function LeafFan({ x, y, angles, len, w, fill, rib, delay = 0, duration = 6 }) {
  return (
    <g className="sway" style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}>
      {angles.map((a, i) => (
        <Leaf key={i} x={x} y={y} len={len * (0.8 + ((i * 37) % 30) / 100)} w={w} angle={a} fill={fill} rib={rib} />
      ))}
    </g>
  )
}

// Fern frond curving up from (x, y)
export function Fern({ x, y, len, angle, color, delay = 0 }) {
  const leaflets = []
  for (let i = 1; i < 14; i++) {
    const t = i / 14
    const px = t * len
    const py = -t * t * len * 0.28
    const size = len * 0.11 * (1 - t * 0.65)
    leaflets.push(
      <ellipse
        key={`a${i}`}
        cx={px}
        cy={py - size * 0.7}
        rx={size}
        ry={size * 0.32}
        fill={color}
        transform={`rotate(-55 ${px} ${py})`}
      />,
      <ellipse
        key={`b${i}`}
        cx={px}
        cy={py + size * 0.7}
        rx={size}
        ry={size * 0.32}
        fill={color}
        transform={`rotate(40 ${px} ${py})`}
      />,
    )
  }
  return (
    <g className="sway" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x} ${y}) rotate(${angle})`}>
        <path
          d={`M0 0 Q${len * 0.5} ${-len * 0.05} ${len} ${-len * 0.28}`}
          stroke={color}
          strokeWidth="3"
          fill="none"
        />
        {leaflets}
      </g>
    </g>
  )
}

// Glowing flower (lily) with a soft halo
export function Lily({ x, y, s = 1, color, glow, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle className="glow" r="34" fill={glow} style={{ animationDelay: `${delay}s` }} />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-11" rx="6" ry="13" fill={color} transform={`rotate(${a})`} />
      ))}
      <circle r="4.5" fill="#fff8d6" />
    </g>
  )
}

// Small glowing mushroom
export function Mushroom({ x, y, s = 1, cap = '#8f7bff', glow, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle className="glow" cx="0" cy="-26" r="30" fill={glow} style={{ animationDelay: `${delay}s` }} />
      <path d="M-5 0 Q-7 -14 -4 -26 L4 -26 Q7 -14 5 0 Z" fill="#e9e4ff" />
      <path d="M-20 -24 Q-18 -44 0 -45 Q18 -44 20 -24 Q0 -20 -20 -24 Z" fill={cap} />
      <circle cx="-7" cy="-35" r="2.6" fill="#fff" opacity="0.8" />
      <circle cx="6" cy="-38" r="2" fill="#fff" opacity="0.7" />
    </g>
  )
}

// Tall lavender-like spike of small blossoms, swaying from its base
export function FlowerSpike({ x, y, h, color, stem = '#3b4f8f', delay = 0 }) {
  const buds = []
  for (let i = 0; i < 9; i++) {
    const t = i / 9
    const by = y - h * 0.35 - t * h * 0.65
    const r = 7 * (1 - t * 0.6)
    buds.push(
      <ellipse
        key={`l${i}`}
        cx={x - r * 0.6}
        cy={by}
        rx={r}
        ry={r * 0.6}
        fill={color}
        transform={`rotate(-30 ${x - r * 0.6} ${by})`}
      />,
      <ellipse
        key={`r${i}`}
        cx={x + r * 0.6}
        cy={by - 3}
        rx={r}
        ry={r * 0.6}
        fill={color}
        transform={`rotate(30 ${x + r * 0.6} ${by - 3})`}
      />,
    )
  }
  return (
    <g className="sway" style={{ animationDelay: `${delay}s`, animationDuration: '5s' }}>
      <path d={`M${x} ${y} Q${x - 4} ${y - h * 0.5} ${x} ${y - h}`} stroke={stem} strokeWidth="3" fill="none" />
      {buds}
    </g>
  )
}

// Cluster of tiny flowers
export function Flowers({ points, color, center = '#ffe6a8', r = 6 }) {
  return (
    <g>
      {points.map(([fx, fy], i) => (
        <g key={i} transform={`translate(${fx} ${fy})`}>
          {[0, 90, 180, 270].map((a) => (
            <circle key={a} cx={r * 0.8} cy="0" r={r * 0.62} fill={color} transform={`rotate(${a + i * 20})`} />
          ))}
          <circle r={r * 0.42} fill={center} />
        </g>
      ))}
    </g>
  )
}
