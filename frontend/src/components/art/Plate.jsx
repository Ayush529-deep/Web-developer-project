import Waterfall from './Waterfall'

// A backdrop painted from the reference page. Kept on a layer of its own with nothing animated beside it,
// so the browser draws it once and then only moves it.
export default function Plate({ href, rect }) {
  const [x, y, w, h] = rect
  return <image href={href} x={x} y={y} width={w} height={h} preserveAspectRatio="none" />
}

// The plate's waterfalls set in motion: falling streaks laid over each fall in `falls` ([x, y, w, h] rects),
// showing only where the water mask says the painting has water. Goes on its own layer above the plate.
export function PlateFalls({ id, water, rect, falls }) {
  const [x, y, w, h] = rect
  return (
    <g>
      <mask id={`${id}-water`} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
        <image href={water} x={x} y={y} width={w} height={h} preserveAspectRatio="none" />
      </mask>
      <g mask={`url(#${id}-water)`} opacity="0.6">
        {falls.map(([fx, fy, fw, fh], i) => (
          <Waterfall key={i} id={`${id}-fall${i}`} x={fx} y={fy} w={fw} h={fh} seed={i + 3} duration={1.3} bare />
        ))}
      </g>
    </g>
  )
}
