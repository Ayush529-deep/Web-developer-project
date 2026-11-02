import forest from '../assets/scenes/forest.webp'
import forestWater from '../assets/scenes/forest-water.png'
import Deer from '../components/art/Deer'
import Fireflies from '../components/art/Fireflies'
import Plate, { PlateFalls } from '../components/art/Plate'
import Layer from '../components/Layer'
import Scene from '../components/Scene'
import { PX, pageRect, pageX, plateRect } from './reference'

// The forest is the reference painting (see ./reference): the grotto pool's water falls through the dark rock
// at the top right, down past the rocks and on as the wide cascade behind the deer. Page row 1996 (top of
// its screen) sits at artwork y 0. The plate scrolls with the page, so the falls line up with the grotto's
// spill just above.
const FOREST = [1996, 0]
const PLATE = plateRect(1990, 2956, ...FOREST)
const FALLS = [pageRect(1095, 1990, 1290, 2900, ...FOREST), pageRect(925, 2420, 1110, 2830, ...FOREST)]

// the deer cut-outs are 500px squares of the page with their corner at (590, 2396)
const DEER = { x: pageX(590), y: (2396 - FOREST[0]) * PX + FOREST[1], size: 500 * PX }

const FIREFLY_AREA = [40, 20, 98, 90]

export default function BiodiversityScene() {
  return (
    <Scene id="biodiversity" className="scene-biodiversity" focus={[560, 1500]}>
      {/* painting, moving water and deer on separate layers (same speed and depth, so they stay together):
          the big painting is then drawn once, and only the small animated parts redraw */}
      <Layer speed={0} depth={0.5}>
        <Plate href={forest} rect={PLATE} />
      </Layer>
      <Layer speed={0} depth={0.5}>
        <PlateFalls id="b-forest" water={forestWater} rect={PLATE} falls={FALLS} />
      </Layer>
      <Layer speed={0} depth={0.5}>
        <Deer {...DEER} />
      </Layer>

      <Layer html speed={0.15} depth={0.5}>
        <Fireflies seed={13} count={24} area={FIREFLY_AREA} />
      </Layer>

      <div className="scene-content">
        <div className="copy" data-layer data-speed="0.35" data-depth="0.15" data-fade>
          <p className="label">03 — Habitat</p>
          <h2 className="section-title">Biodiversity</h2>
          <div className="rule" />
          <p className="lead">
            Away from the manic energy of Japan's famous metropolises lies the ancient hamlet of Noto. Surprising and
            captivating in equal measure, Noto is a region like no other. Soaring peaks, lakes and endless waterfalls
            combine to form a habitat for a bewildering range of species.
          </p>
          <a href="#contact" className="learn-more">
            Learn more
          </a>
        </div>
      </div>
    </Scene>
  )
}
