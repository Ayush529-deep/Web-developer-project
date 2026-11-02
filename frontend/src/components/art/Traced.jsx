// Draws one part of a traced character (see ./traced): the silhouette fill first, then the colour
// regions, then the ink outline on top. Regions get a hairline stroke in their own colour to close seams.
export default function Traced({ layers, ink = 2.2 }) {
  const fills = layers.filter((l) => l[2] !== 'line')
  const lines = layers.filter((l) => l[2] === 'line')
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {fills.map(([c, d], i) => (
        <path key={i} d={d} fill={c} stroke={c} strokeWidth="0.6" fillRule="evenodd" />
      ))}
      {lines.map(([c, d], i) => (
        <path key={`l${i}`} d={d} fill="none" stroke={c} strokeWidth={ink} />
      ))}
    </g>
  )
}
