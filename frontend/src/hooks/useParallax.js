import { useEffect } from 'react'

// Where a box sits relative to the viewport center, in screen heights (0 = centered), clamped to ±lim
function progress(rect, vh, lim) {
  const raw = (rect.top + rect.height / 2 - vh / 2) / vh
  return Math.max(-lim, Math.min(lim, raw))
}

// Drives the 3D parallax. Every [data-layer] inside a [data-scene] moves by:
//  - scroll:  data-speed  (positive = lags behind, feels far away; negative = rushes past, feels close)
//  - pointer: data-depth  (0 = still, 1 = moves the most with the mouse)
//  - camera:  data-depth also sets how far a layer drifts in the slow idle sway, so near layers always
//             move more than far ones
// [data-fade] elements (text blocks) follow their own parent block instead of the whole scene, so a tall
// scene can hold several of them: they fade out as their block leaves the screen and expose how far it has
// left as the CSS variable --leave (0 = centered, 1 = one screen gone).
export default function useParallax() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scenes = [...document.querySelectorAll('[data-scene]')].map((el) => ({
      el,
      off: false,
      layers: [...el.querySelectorAll('[data-layer]')].map((layer) => ({
        el: layer,
        speed: Number(layer.dataset.speed) || 0,
        depth: Number(layer.dataset.depth) || 0,
        scale: Number(layer.dataset.scale) || 1,
        anchor: layer.dataset.fade !== undefined ? layer.parentElement : null,
      })),
    }))

    let raf = 0
    let mx = 0
    let my = 0
    let targetX = 0
    let targetY = 0

    const onPointer = (e) => {
      if (e.pointerType !== 'mouse') return
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const tick = (now) => {
      const still = reduce.matches
      const t = now / 1000
      // idle camera sway, so the scene keeps breathing without mouse input
      const swayX = Math.sin(t * 0.35) * 0.5 + Math.sin(t * 0.13) * 0.5
      const swayY = Math.cos(t * 0.27)
      mx += (targetX - mx) * 0.06
      my += (targetY - my) * 0.06
      const vh = window.innerHeight

      for (const scene of scenes) {
        const r = scene.el.getBoundingClientRect()
        const off = r.bottom < -vh * 0.25 || r.top > vh * 1.25

        // Pause CSS animations of scenes that are off screen
        if (off !== scene.off) {
          scene.off = off
          scene.el.classList.toggle('is-off', off)
        }
        if (off) continue

        // scene layers rest at their drawn position when the scene's top meets the viewport's top
        // (p = 0) and keep moving for the scene's whole height, however many screens tall it is
        const scenePos = Math.max(-r.height / vh - 0.25, Math.min(1.25, r.top / vh))
        // layers are enlarged a little around the middle of the screen, wherever the camera is inside a tall
        // scene, so every scene's layers line up across the seam between them
        const origin = `50% ${(vh / 2 - r.top).toFixed(1)}px`
        for (const l of scene.layers) {
          if (!l.anchor) l.el.style.transformOrigin = origin
          const p = l.anchor ? progress(l.anchor.getBoundingClientRect(), vh, 1.2) : scenePos
          const x = still ? 0 : -mx * l.depth * 40 + swayX * l.depth * 14
          const y = still ? 0 : -p * l.speed * vh - my * l.depth * 24 + swayY * l.depth * 6
          // the scale never changes while scrolling: the browser then only moves each layer's finished
          // picture around instead of redrawing it at a new size every frame (which showed as blurry patches)
          l.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${l.scale})`
          if (l.anchor) {
            // fully visible while its block is near the middle of the screen
            const v = still ? 1 : Math.max(0, Math.min(1, 1 - (Math.abs(p) - 0.25) * 1.6))
            l.el.style.opacity = v.toFixed(3)
            l.el.style.setProperty('--leave', still ? '0' : Math.max(0, -p).toFixed(3))
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])
}
