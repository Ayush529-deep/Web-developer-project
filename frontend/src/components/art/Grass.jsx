import { useMemo } from 'react'
import { seeded } from './random'

// Field of tall grass blades, split into groups that sway independently
export default function Grass({
  id,
  seed = 1,
  from,
  to,
  base = 930,
  count = 60,
  minH = 120,
  maxH = 320,
  colors,
  tip = '#c9a0dc',
  headColor = '#f3d6e8',
  heads = 0.15,
  groups = 6,
  // 0.5 = blades lean either way evenly, lower = most of them blown to the right
  wind = 0.45,
}) {
  const clusters = useMemo(() => {
    const rand = seeded(seed)
    const out = Array.from({ length: groups }, () => [])
    for (let i = 0; i < count; i++) {
      const x = from + rand() * (to - from)
      const h = minH + rand() * (maxH - minH)
      const blade = {
        x,
        h,
        lean: (rand() - wind) * h * 0.4,
        w: 6 + rand() * 10,
        c: Math.floor(rand() * colors.length),
        head: rand() < heads,
      }
      const g = Math.min(groups - 1, Math.floor(((x - from) / (to - from)) * groups))
      out[g].push(blade)
    }
    return out
  }, [seed, from, to, count, minH, maxH, colors.length, heads, groups, wind])

  return (
    <g>
      <defs>
        {colors.map((c, i) => (
          <linearGradient
            key={c}
            id={`${id}-${i}`}
            x1="0"
            y1={base - maxH}
            x2="0"
            y2={base}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={tip} />
            <stop offset="0.4" stopColor={c} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
        ))}
      </defs>
      {clusters.map((blades, gi) => (
        <g
          key={gi}
          className="sway"
          style={{ animationDelay: `${-gi * 0.9}s`, animationDuration: `${4.5 + (gi % 3) * 1.2}s` }}
        >
          {blades.map((b, i) => {
            const tx = b.x + b.lean
            const ty = base - b.h
            const d = `M${b.x - b.w / 2} ${base} Q${b.x + b.lean * 0.2} ${base - b.h * 0.55} ${tx} ${ty} Q${
              b.x + b.lean * 0.25 + b.w * 0.15
            } ${base - b.h * 0.5} ${b.x + b.w / 2} ${base} Z`
            const deg = (Math.atan2(b.lean, b.h) * 180) / Math.PI
            return (
              <g key={i}>
                <path d={d} fill={`url(#${id}-${b.c})`} />
                {b.head && (
                  <ellipse
                    cx={tx}
                    cy={ty + 16}
                    rx="3.5"
                    ry="16"
                    fill={headColor}
                    opacity="0.55"
                    transform={`rotate(${deg} ${tx} ${ty + 16})`}
                  />
                )}
              </g>
            )
          })}
        </g>
      ))}
    </g>
  )
}
