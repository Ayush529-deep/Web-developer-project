import { useEffect, useRef } from 'react'
import p142 from '../../assets/scenes/deer-142.webp'
import p144 from '../../assets/scenes/deer-144.webp'
import p146 from '../../assets/scenes/deer-146.webp'
import p148 from '../../assets/scenes/deer-148.webp'
import p150 from '../../assets/scenes/deer-150.webp'
import p152 from '../../assets/scenes/deer-152.webp'
import p154 from '../../assets/scenes/deer-154.webp'
import p999 from '../../assets/scenes/deer-999.webp'

// The deer from the reference, cut out of its frames pose by pose as it lifts its head from grazing to look
// straight at the viewer. It waits head-down; as soon as its scene comes into view it starts a loop: lift
// the head, hold the look, lower it back down, graze a while, and again. Once the scene is gone it stops
// and resets, so the next visit starts from grazing. Drawn as a square of side `size` at (x, y) in artwork
// units.
// Each step from one pose to the next: the new pose fades in over the old one during the first half, then
// whatever of the old pose still shows around it (the head where it was) fades out during the second half,
// so the body never turns see-through and nothing pops. Opacities are written straight to the images
// every frame, without re-rendering.
const POSES = [p142, p144, p146, p148, p150, p152, p154, p999]
const LAST = POSES.length - 1
const DELAY = 300 // ms after the scene arrives
// the loop, in ms: [lift, look at you, lower, graze]
const LIFT = 1800
const LOOK = 3000
const LOWER = 1800
const GRAZE = 2600
const CYCLE = LIFT + LOOK + LOWER + GRAZE

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Pose position (0 = grazing, LAST = looking at you) at `ms` into the loop
function poseAt(ms) {
  const c = ms % CYCLE
  if (c < LIFT) return ease(c / LIFT) * LAST
  if (c < LIFT + LOOK) return LAST
  if (c < LIFT + LOOK + LOWER) return (1 - ease((c - LIFT - LOOK) / LOWER)) * LAST
  return 0
}

function show(images, t) {
  const base = Math.min(LAST, Math.floor(t))
  const mix = t - base
  images.forEach((img, i) => {
    let o = 0
    if (i === base) o = 1 - Math.max(0, mix - 0.5) * 2
    else if (i === base + 1) o = Math.min(1, mix * 2)
    img.setAttribute('opacity', o.toFixed(3))
  })
}

export default function Deer({ x, y, size }) {
  const group = useRef(null)

  useEffect(() => {
    const images = [...group.current.querySelectorAll('image')]
    const scene = group.current.closest('[data-scene]')
    // with reduced motion it simply stands looking at you
    if (!scene || reducedMotion()) {
      show(images, LAST)
      return
    }
    show(images, 0)
    // decode every pose up front so none of them flashes in late the first time it shows
    const ready = Promise.all(
      POSES.map((src) => {
        const im = new Image()
        im.src = src
        return im.decode().catch(() => {})
      }),
    )
    let raf = 0
    let timer = 0
    let played = false
    const play = () => {
      const start = performance.now()
      let last = -1
      const step = (now) => {
        const t = poseAt(now - start)
        // skip the writes while it holds still (looking, grazing)
        if (t !== last) show(images, t)
        last = t
        raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && !played) {
          played = true
          timer = window.setTimeout(() => ready.then(() => played && play()), DELAY)
        } else if (entry.intersectionRatio < 0.1 && played) {
          played = false
          window.clearTimeout(timer)
          cancelAnimationFrame(raf)
          show(images, 0)
        }
      },
      { threshold: [0, 0.1, 0.5] },
    )
    io.observe(scene)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <g ref={group}>
      {POSES.map((href, i) => (
        <image key={i} href={href} x={x} y={y} width={size} height={size} opacity={i ? 0 : 1} />
      ))}
    </g>
  )
}
