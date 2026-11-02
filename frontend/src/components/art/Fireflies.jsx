import { useMemo } from 'react'
import { seeded } from './random'

// Floating glowing particles (HTML, not SVG, so they stay round at any aspect ratio)
export default function Fireflies({ count = 24, seed = 1, area = [0, 0, 100, 100] }) {
  const flies = useMemo(() => {
    const rand = seeded(seed)
    const [x0, y0, x1, y1] = area
    return Array.from({ length: count }, () => ({
      left: x0 + rand() * (x1 - x0),
      top: y0 + rand() * (y1 - y0),
      size: 3 + rand() * 4,
      dx: (rand() - 0.5) * 120,
      dy: (rand() - 0.5) * 90,
      dur: 6 + rand() * 8,
      delay: -rand() * 12,
    }))
  }, [count, seed, area])

  return (
    <div className="fireflies">
      {flies.map((f, i) => (
        <span
          key={i}
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
            '--fx': `${f.dx}px`,
            '--fy': `${f.dy}px`,
          }}
        />
      ))}
    </div>
  )
}
