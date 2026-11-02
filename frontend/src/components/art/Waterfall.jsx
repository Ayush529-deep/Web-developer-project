import { useMemo } from 'react'
import { seeded } from './random'

const PERIOD = 400 // must match the `fall` keyframes distance in index.css

// Animated waterfall: a bright column with streaks that scroll down forever.
// `bare` draws only the falling streaks, to set painted water in motion.
export default function Waterfall({ id, x, y, w, h, seed = 1, duration = 1.5, foamTop = false, bare = false }) {
  const streaks = useMemo(() => {
    const rand = seeded(seed)
    const list = []
    const count = Math.round(w / 5)
    const reps = Math.ceil(h / PERIOD) + 1
    for (let i = 0; i < count; i++) {
      const sx = x + rand() * w
      const sw = 1 + rand() * 3.5
      const len = 40 + rand() * 170
      const off = rand() * PERIOD
      const op = 0.2 + rand() * 0.65
      for (let r = 0; r <= reps; r++) {
        list.push({ x: sx, y: y - PERIOD + off + r * PERIOD, w: sw, h: len, op })
      }
    }
    return list
  }, [x, y, w, h, seed])

  return (
    <g>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7a7fe6" stopOpacity="0.85" />
          <stop offset="0.22" stopColor="#c6cbff" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="0.78" stopColor="#d9cbff" />
          <stop offset="1" stopColor="#8580e2" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`${id}-mist`}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#e6e0ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e6e0ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
      </defs>

      {!bare && <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-g)`} opacity="0.92" />}
      <g clipPath={`url(#${id}-clip)`}>
        <g className="fall" style={{ animationDuration: `${duration}s` }}>
          {streaks.map((s, i) => (
            <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.w / 2} fill="#ffffff" opacity={s.op} />
          ))}
        </g>
      </g>

      {foamTop && <ellipse cx={x + w / 2} cy={y + 4} rx={w * 0.62} ry={10} fill="#f4f1ff" opacity="0.9" />}
      {!bare && (
        <>
          <ellipse className="mist" cx={x + w / 2} cy={y + h} rx={w * 1.1} ry={w * 0.42} fill={`url(#${id}-mist)`} />
          <ellipse
            className="mist"
            style={{ animationDelay: '-2s' }}
            cx={x + w / 2}
            cy={y + h - w * 0.15}
            rx={w * 0.75}
            ry={w * 0.3}
            fill={`url(#${id}-mist)`}
          />
        </>
      )}
    </g>
  )
}
