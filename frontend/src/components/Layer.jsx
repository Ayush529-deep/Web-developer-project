import { useContext } from 'react'
import { SceneContext } from './scene-context'

// One depth plane of a scene. SVG children are drawn in the shared 1600x900 artwork space.
export default function Layer({ speed = 0, depth = 0, className = '', html = false, children }) {
  const viewBox = useContext(SceneContext)

  return (
    <div
      className={`layer ${className}`}
      data-layer
      data-speed={speed}
      data-depth={depth}
      data-scale="1.08"
      aria-hidden="true"
    >
      {html ? (
        children
      ) : (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice">
          {children}
        </svg>
      )}
    </div>
  )
}
