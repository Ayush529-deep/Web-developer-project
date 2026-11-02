// a lumpy cumulus with a flat base, tallest just right of center
const PUFFS = (
  <>
    <ellipse cx="0" cy="0" rx="140" ry="20" />
    <circle cx="-112" cy="-8" r="22" />
    <circle cx="-84" cy="-24" r="30" />
    <circle cx="-48" cy="-40" r="38" />
    <circle cx="-14" cy="-30" r="36" />
    <circle cx="12" cy="-60" r="46" />
    <circle cx="52" cy="-44" r="38" />
    <circle cx="70" cy="-70" r="28" />
    <circle cx="94" cy="-28" r="30" />
    <circle cx="124" cy="-8" r="20" />
  </>
)

// A puffy cloud: shadow, body and a sunlit highlight
export default function Cloud({ x, y, s = 1, fill = '#fff', shade = '#c9a6e6', light, opacity = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <g fill={shade} transform="translate(5 9)">
        {PUFFS}
      </g>
      <g fill={fill}>{PUFFS}</g>
      {light && (
        <g fill={light} transform="translate(-10 -10) scale(0.86)" opacity="0.7">
          {PUFFS}
        </g>
      )}
    </g>
  )
}
