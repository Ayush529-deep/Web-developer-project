import { useMemo } from 'react'

// Birds are drawn facing +x around (0,0); wings are rooted at their bottom edge so they flap from the body.
function Dove({ fill, shade }) {
  return (
    <>
      <path className="wing wing-far" d="M6 -2 C-2 -22 -16 -40 -32 -50 C-22 -30 -12 -14 -4 2 Z" fill={shade} />
      <path
        d="M-34 6 C-24 0 -10 -4 8 -4 C18 -4 24 -10 32 -10 C38 -10 40 -6 44 -4 C40 -2 36 0 34 2 C28 10 14 14 -2 12 C-14 12 -24 14 -40 20 C-36 14 -36 10 -34 6 Z"
        fill={fill}
      />
      <circle cx="35" cy="-7" r="1.6" fill="#2a2450" />
      <path className="wing" d="M8 0 C2 -30 -10 -56 -30 -74 C-2 -62 18 -36 22 -2 Z" fill={fill} />
    </>
  )
}

function Crane({ fill, tip }) {
  return (
    <>
      <path className="wing wing-far" d="M4 -2 C-2 -20 -12 -34 -24 -44 C-14 -30 -6 -16 -2 2 Z" fill={tip} />
      <line x1="-18" y1="2" x2="-50" y2="7" stroke="#2a2340" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="22" ry="7" fill={fill} />
      <path d="M-22 0 L-32 -3 L-30 4 Z" fill={tip} />
      <path d="M16 -2 Q32 -8 46 -6" stroke={tip} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="-6" r="4" fill={fill} />
      <circle cx="49" cy="-8.5" r="1.8" fill="#e8344a" />
      <path d="M51 -6 L62 -4 L51 -3.5 Z" fill="#e8cf8a" />
      <path className="wing" d="M10 -2 C4 -26 -10 -46 -28 -60 C-6 -46 12 -26 18 -2 Z" fill={`url(#crane-wing)`} />
    </>
  )
}

// Birds crossing the scene, flapping as they go. Each bird: { from: [x,y], to: [x,y], s, dur, delay }
export default function Birds({ flight, variant = 'dove', fill = '#fff', shade = '#d9d3f5', tip = '#1d1838' }) {
  const birds = useMemo(
    () =>
      flight.map((b) => {
        const dx = b.to[0] - b.from[0]
        const dy = b.to[1] - b.from[1]
        // nose follows the climb, but only half way so it reads as gliding rather than diving
        const climb = (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI
        return { ...b, flip: dx < 0, tilt: climb * 0.5 }
      }),
    [flight],
  )

  return (
    <g>
      {variant === 'crane' && (
        <defs>
          <linearGradient id="crane-wing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tip} />
            <stop offset="0.3" stopColor={tip} />
            <stop offset="0.36" stopColor={fill} />
          </linearGradient>
        </defs>
      )}
      {birds.map((b, i) => (
        <g
          key={i}
          className="fly"
          style={{
            '--x0': `${b.from[0]}px`,
            '--y0': `${b.from[1]}px`,
            '--x1': `${b.to[0]}px`,
            '--y1': `${b.to[1]}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <g transform={`scale(${b.flip ? -b.s : b.s} ${b.s}) rotate(${b.tilt})`}>
            <g className="glide" style={{ animationDelay: `${-i * 0.7}s` }}>
              <g style={{ '--flap': `${0.55 + (i % 4) * 0.12}s` }}>
                {variant === 'crane' ? <Crane fill={fill} tip={tip} /> : <Dove fill={fill} shade={shade} />}
              </g>
            </g>
          </g>
        </g>
      ))}
    </g>
  )
}
