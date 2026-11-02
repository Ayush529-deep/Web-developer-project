import { seeded } from './random'

// Generates birds that fly from somewhere in `from` [x0,y0,x1,y1] to somewhere in `to`, staggered so the sky is never empty.
export function makeFlight({ seed = 1, count, from, to, scale = [0.6, 1], duration = [10, 16] }) {
  const rand = seeded(seed)
  const pick = ([a, b]) => a + rand() * (b - a)
  return Array.from({ length: count }, (_, i) => {
    const dur = pick(duration)
    return {
      from: [pick([from[0], from[2]]), pick([from[1], from[3]])],
      to: [pick([to[0], to[2]]), pick([to[1], to[3]])],
      s: pick(scale),
      dur,
      // spread start times evenly over one cycle so birds arrive one after another
      delay: -((i / count) * dur + rand() * 1.5),
    }
  })
}
