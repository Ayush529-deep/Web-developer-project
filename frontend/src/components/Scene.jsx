import useMediaQuery from '../hooks/useMediaQuery'
import { SceneContext } from './scene-context'

// Section holding parallax layers. Artwork is 1600 wide and `artHeight` tall (900 per screen of scroll).
// `focus` = [x0, x1] part of the 1600-wide artwork to keep centered on phones.
export default function Scene({ id, className = '', focus, artHeight = 900, children }) {
  const narrow = useMediaQuery('(max-width: 760px)')
  const viewBox = narrow && focus ? `${focus[0]} 0 ${focus[1] - focus[0]} ${artHeight}` : `0 0 1600 ${artHeight}`

  return (
    <SceneContext.Provider value={viewBox}>
      <section id={id} className={`scene ${className}`} data-scene>
        {children}
      </section>
    </SceneContext.Provider>
  )
}
