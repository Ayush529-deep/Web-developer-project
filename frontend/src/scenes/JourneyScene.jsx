import Birds from '../components/art/Birds'
import Cloud from '../components/art/Cloud'
import Fireflies from '../components/art/Fireflies'
import { makeFlight } from '../components/art/flight'
import Grass from '../components/art/Grass'
import { LeafFan } from '../components/art/Plants'
import Plate, { PlateFalls } from '../components/art/Plate'
import Traveller from '../components/art/Traveller'
import Waterfall from '../components/art/Waterfall'
import Layer from '../components/Layer'
import Scene from '../components/Scene'
import tranquility from '../assets/scenes/tranquility.webp'
import tranquilityWater from '../assets/scenes/tranquility-water.png'
import { pageRect, plateRect } from './reference'

// One continuous painting, two screens tall: the hero valley on top (y 0-900) and the Tranquility grotto
// below it (y 900-1800). The lake spills over the cliff the traveller stands on and falls all the way
// down into the grotto, so scrolling pans the camera down along the waterfall. The grotto (falls, rays,
// the fisherman and his tortoise in the pool) is the reference painting itself, see ./reference.
// Everything attached to the cliff (lake, waterfall, grotto, traveller, grass) shares one scroll speed, so
// it never tears apart; only the sky, the mountain and loose things (birds, plants) move on their own.
// 0: the ground scrolls with the page, so the grotto painting is framed exactly as in the reference and its
// falls run straight on into the forest below
const GROUND_SPEED = 0

// Cranes fly in from the left corner and glide over the mountain toward the right, near the top
const CRANES = makeFlight({
  seed: 5,
  count: 11,
  from: [-220, 230, 60, 400],
  to: [1650, 90, 1900, 300],
  scale: [0.42, 0.78],
  duration: [24, 34],
})

// Doves rise out of the waterfall's spray (bottom left) and fly up past the text to the top right,
// passing above the fisherman's hat, like in the reference
const DOVES = makeFlight({
  seed: 11,
  count: 5,
  from: [300, 1420, 560, 1560],
  to: [1550, 820, 1850, 1000],
  scale: [0.55, 1.05],
  duration: [10, 15],
})

const STARS = [
  [120, 60],
  [260, 140],
  [420, 40],
  [560, 110],
  [700, 50],
  [880, 90],
  [1010, 30],
  [1180, 80],
  [1320, 40],
  [1460, 120],
  [1540, 50],
  [340, 200],
  [640, 180],
  [1250, 170],
]

// [cx, cy, rx, ry]
const LAKE_ROCKS = [
  [380, 770, 46, 22],
  [520, 752, 30, 14],
  [640, 786, 54, 24],
  [760, 762, 26, 12],
  [150, 748, 36, 16],
]

const SHIMMER = [
  [60, 724, 140],
  [300, 800, 90],
  [420, 726, 160],
  [560, 820, 110],
  [700, 732, 120],
  [820, 806, 150],
]

// the grotto painting: page rows 960-2000, with page row 1009 (top of its screen) at artwork y 900
const GROTTO = [1009, 900]
const GROTTO_PLATE = plateRect(960, 2000, ...GROTTO)
const GROTTO_FALLS = [pageRect(170, 1000, 455, 1880, ...GROTTO), pageRect(1095, 1960, 1290, 2000, ...GROTTO)]

const GRASS_COLORS = ['#26307a', '#2f3c92', '#3a4aa8', '#4658bc', '#2a2c6c']
const FIREFLY_AREA = [5, 55, 95, 98]
const TITLE = 'VISITE'

export default function JourneyScene() {
  return (
    <Scene id="top" className="scene-journey" artHeight={1800} focus={[560, 1500]}>
      {/* Sky + sun glow */}
      <Layer speed={0.6} depth={0.05}>
        <defs>
          <linearGradient id="j-sky" x1="0" y1="-100" x2="0" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1b1757" />
            <stop offset="0.32" stopColor="#3f2d8a" />
            <stop offset="0.55" stopColor="#7b4aa8" />
            <stop offset="0.72" stopColor="#c76ea6" />
            <stop offset="0.84" stopColor="#f19a96" />
            <stop offset="1" stopColor="#ffc68a" />
          </linearGradient>
          <radialGradient id="j-sun">
            <stop offset="0" stopColor="#fff4cf" stopOpacity="0.95" />
            <stop offset="0.25" stopColor="#ffd08a" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#ff9f8f" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ff8fa0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-400" y="-400" width="2400" height="1500" fill="url(#j-sky)" />
        <circle cx="1080" cy="300" r="560" fill="url(#j-sun)" />
        {STARS.map(([x, y], i) => (
          <circle
            key={i}
            className="twinkle"
            cx={x}
            cy={y}
            r={i % 3 ? 1.4 : 2}
            fill="#fff"
            style={{ animationDelay: `${-i * 0.6}s` }}
          />
        ))}
      </Layer>

      {/* Far wispy clouds and the distant blue range on the left */}
      <Layer speed={0.55} depth={0.1}>
        <g className="drift drift-slow">
          <Cloud x={420} y={560} s={1.1} fill="#f2bfd6" shade="#b689c6" opacity={0.5} />
          <Cloud x={680} y={150} s={0.7} fill="#e6b5df" shade="#9e7cc4" opacity={0.4} />
          <ellipse cx="560" cy="520" rx="260" ry="6" fill="#ffd2dc" opacity="0.35" />
          <ellipse cx="1300" cy="380" rx="220" ry="5" fill="#ffd2dc" opacity="0.3" />
        </g>
        <path
          d="M-200 640 L60 560 L170 590 L320 520 L460 575 L600 540 L760 610 L760 900 L-200 900 Z"
          fill="#6f63bf"
          opacity="0.75"
        />
        <path d="M60 560 L170 590 L120 600 Z M320 520 L460 575 L380 570 Z" fill="#a99ae6" opacity="0.6" />
      </Layer>

      {/* The mountain: craggy, sunlit from the left */}
      <Layer speed={0.45} depth={0.2}>
        <defs>
          <linearGradient id="j-mtn" x1="0" y1="150" x2="0" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8a5fc0" />
            <stop offset="1" stopColor="#3f2f88" />
          </linearGradient>
          <linearGradient id="j-lit" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#fff1b8" />
            <stop offset="0.4" stopColor="#fbbf6a" />
            <stop offset="1" stopColor="#e07a86" />
          </linearGradient>
          <linearGradient id="j-lit-low" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6a663" />
            <stop offset="1" stopColor="#b35c8e" />
          </linearGradient>
          <radialGradient id="j-haze">
            <stop offset="0" stopColor="#ffc2cf" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffc2cf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M600 780 L760 620 L860 540 L930 480 L1000 410 L1050 340 L1110 270 L1170 210 L1230 150 L1280 190 L1330 228 L1380 248 L1440 300 L1520 334 L1600 380 L1700 420 L1800 460 L1800 900 L600 900 Z"
          fill="url(#j-mtn)"
        />
        {/* sunlit faces, broken into ledges */}
        <path
          d="M1230 150 L1170 210 L1110 270 L1050 340 L1000 410 L930 480 L1012 488 L1058 436 L1102 446 L1140 384 L1182 376 L1200 304 L1246 262 Z"
          fill="url(#j-lit)"
        />
        <path d="M930 480 L860 540 L760 620 L860 628 L918 572 L978 582 L1012 488 Z" fill="url(#j-lit-low)" />
        <path d="M1230 150 L1246 262 L1270 236 L1280 190 Z" fill="#ffe2a6" opacity="0.85" />
        <path d="M1330 228 L1380 248 L1362 300 L1306 318 L1290 266 Z" fill="#f8b77a" opacity="0.75" />
        <path d="M1440 300 L1520 334 L1490 372 L1430 360 Z" fill="#e98f84" opacity="0.6" />
        {/* shadowed strata on the right flank */}
        <g stroke="#2f2470" strokeOpacity="0.55" strokeWidth="5" fill="none">
          <path d="M1280 330 Q1360 350 1440 400" />
          <path d="M1240 420 Q1350 440 1480 500" />
          <path d="M1200 520 Q1340 540 1560 600" />
        </g>
        <path
          d="M1230 150 L1212 260 L1180 330 M1280 190 L1296 270 L1336 330 M1012 488 L990 560 M1102 446 L1120 520"
          stroke="#ffe2b0"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          fill="none"
        />
        <ellipse cx="1050" cy="660" rx="600" ry="90" fill="url(#j-haze)" />
      </Layer>

      {/* Clouds wrapping the mountain: dark storm clouds on its flank, pink and white puffs around it */}
      <Layer speed={0.4} depth={0.28}>
        <g className="drift">
          <Cloud x={1500} y={330} s={0.9} fill="#fde8ef" shade="#d39bc6" light="#fff8f2" />
          <Cloud x={1660} y={170} s={0.8} fill="#f3c5da" shade="#b585c6" opacity={0.75} />
          <Cloud x={980} y={420} s={0.85} fill="#f9d6e4" shade="#c28bc3" light="#fff3f0" opacity={0.92} />
          <Cloud x={1130} y={230} s={0.45} fill="#ffd9e2" shade="#d29ac2" opacity={0.85} />
        </g>
        <g className="drift drift-storm">
          <Cloud x={860} y={230} s={0.85} fill="#7a6a96" shade="#3b2f66" light="#a796bf" opacity={0.94} />
          <Cloud x={990} y={160} s={0.6} fill="#8a79a6" shade="#463a74" light="#b8a7cc" opacity={0.88} />
          <Cloud x={790} y={330} s={0.55} fill="#6a5b8a" shade="#33285e" light="#9a8ab5" opacity={0.82} />
        </g>
      </Layer>

      {/* Cranes */}
      <Layer speed={0.38} depth={0.32}>
        <Birds flight={CRANES} variant="crane" fill="#fbf4ff" tip="#231c3f" />
      </Layer>

      {/* Rolling hills behind the lake */}
      <Layer speed={0.25} depth={0.4}>
        <path
          d="M-200 650 Q60 580 240 610 Q420 640 560 590 Q720 530 900 630 Q1100 700 1500 680 L1500 900 L-200 900 Z"
          fill="#6a58b8"
        />
        <path
          d="M-200 690 Q120 630 330 670 Q520 705 720 660 Q860 632 1040 700 Q1250 745 1500 718 L1500 900 L-200 900 Z"
          fill="#4a3f9e"
        />
      </Layer>

      {/* The ground: lake, the cliff it spills over, the waterfall and the grotto below. One piece. */}
      <Layer speed={GROUND_SPEED} depth={0.5}>
        <defs>
          <linearGradient id="j-lake" x1="0" y1="700" x2="0" y2="880" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6aab9" />
            <stop offset="0.45" stopColor="#a675c8" />
            <stop offset="1" stopColor="#4b3c9c" />
          </linearGradient>
          <linearGradient id="j-cliff" x1="0" y1="700" x2="0" y2="1800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2c2470" />
            <stop offset="0.25" stopColor="#17123f" />
            <stop offset="0.7" stopColor="#0e0b2c" />
            <stop offset="1" stopColor="#1b1652" />
          </linearGradient>
        </defs>

        {/* lake */}
        <path d="M-200 700 Q400 684 1000 702 L1000 960 L-200 960 Z" fill="url(#j-lake)" />
        {SHIMMER.map(([x, y, w], i) => (
          <rect
            key={i}
            className="shimmer"
            x={x}
            y={y}
            width={w}
            height="2.5"
            rx="1.25"
            fill="#ffe6e6"
            style={{ animationDelay: `${-i * 0.7}s` }}
          />
        ))}
        {LAKE_ROCKS.map(([cx, cy, rx, ry], i) => (
          <g key={i}>
            <ellipse
              className="ripple"
              cx={cx}
              cy={cy + ry * 0.4}
              rx={rx * 1.3}
              ry={ry * 0.5}
              fill="none"
              stroke="#ffd9e6"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              style={{ animationDelay: `${-i * 0.8}s` }}
            />
            <path
              d={`M${cx - rx} ${cy + ry * 0.4} Q${cx - rx} ${cy - ry} ${cx} ${cy - ry} Q${cx + rx} ${cy - ry} ${cx + rx} ${cy + ry * 0.4} Z`}
              fill="#2b2470"
            />
            <path
              d={`M${cx - rx * 0.8} ${cy} Q${cx - rx * 0.7} ${cy - ry * 0.85} ${cx} ${cy - ry * 0.9} Q${cx - rx * 0.3} ${cy - ry * 0.5} ${cx - rx * 0.8} ${cy} Z`}
              fill="#9a86e0"
              opacity="0.85"
            />
          </g>
        ))}

        {/* the waterfall leaving the lake's lip; the painted grotto below carries it on down */}
        <rect x="300" y="850" width="324" height="190" fill="#2c2a74" />
        <Waterfall id="j-wf" x={300} y={846} w={324} h={190} seed={3} duration={1.6} foamTop />

        <path d="M-160 832 Q40 792 274 800 Q370 806 400 846 Q410 900 374 934 Q160 950 -160 930 Z" fill="#221b58" />
        <path
          d="M-160 832 Q40 792 274 800 Q370 806 400 846"
          stroke="#a892ea"
          strokeOpacity="0.7"
          strokeWidth="4"
          fill="none"
        />
        <path d="M274 800 Q370 806 400 846 Q404 880 386 905 Q374 860 274 812 Z" fill="#8f7bd8" opacity="0.45" />

        {/* right: the cliff the traveller stands on */}
        <path
          d="M634 870 Q640 770 714 748 Q960 722 1200 716 Q1450 708 1800 694 L1800 1800 L640 1800 Q664 1600 648 1400 Q632 1120 646 900 Z"
          fill="url(#j-cliff)"
        />
        <path
          d="M634 870 Q640 770 714 748 Q960 722 1200 716 Q1450 708 1800 694"
          stroke="#8a78d8"
          strokeOpacity="0.55"
          strokeWidth="4"
          fill="none"
        />

      </Layer>

      {/* The grotto, painted, fading in under the lake's lip; its moving water on a layer of its own, so the
          painting is drawn once and only the streaks redraw */}
      <Layer speed={GROUND_SPEED} depth={0.5}>
        <Plate href={tranquility} rect={GROTTO_PLATE} />
      </Layer>
      <Layer speed={GROUND_SPEED} depth={0.5}>
        <PlateFalls id="j-grotto" water={tranquilityWater} rect={GROTTO_PLATE} falls={GROTTO_FALLS} />
      </Layer>

      {/* Leaves hanging over the cliff edge */}
      <Layer speed={0.05} depth={0.5}>
        <LeafFan
          x={1180}
          y={880}
          angles={[40, 70, 100, 130]}
          len={150}
          w={26}
          fill="#1d3a62"
          rib="#355f8a"
          delay={-1}
        />
        <LeafFan
          x={1420}
          y={870}
          angles={[30, 60, 95, 125, 150]}
          len={170}
          w={28}
          fill="#22406a"
          rib="#3d6892"
          delay={-2.5}
        />
        <LeafFan
          x={1640}
          y={865}
          angles={[50, 85, 115, 145]}
          len={160}
          w={26}
          fill="#1b3560"
          rib="#335a86"
          delay={-0.6}
        />
      </Layer>

      {/* The traveller, standing in the grass on the cliff top (same scroll speed as the cliff so he stays planted) */}
      <Layer speed={GROUND_SPEED} depth={0.62}>
        {/* standing waist-deep in the grass, far enough from the right edge that his cape fits on screen */}
        <g transform="translate(1029 425) scale(0.9)">
          <Traveller />
        </g>
      </Layer>

      <Layer html speed={0.1} depth={0.5}>
        <Fireflies seed={7} count={30} area={FIREFLY_AREA} />
      </Layer>

      {/* Tall grass on the cliff top: the traveller stands waist-deep in it, golden seed heads catching the sun */}
      {/* (same scroll speed as the cliff, so the field never slides off it onto the grotto below) */}
      <Layer speed={GROUND_SPEED} depth={0.75}>
        <Grass
          id="j-grass"
          seed={4}
          from={640}
          to={1800}
          base={904}
          count={260}
          minH={110}
          maxH={210}
          colors={GRASS_COLORS}
          tip="#f0b860"
          headColor="#f4c46a"
          wind={0.22}
          heads={0.3}
          groups={8}
        />
        {/* the cliff's edge the field grows from, seen from below once the camera pans into the grotto */}
        <path
          d="M652 900 Q760 886 900 892 Q1100 884 1300 894 Q1550 884 1800 890 L1800 922 Q1550 930 1300 920 Q1100 932 900 922 Q760 928 648 916 Z"
          fill="#1a1546"
        />
        <path
          d="M648 916 Q760 928 900 922 Q1100 932 1300 920 Q1550 930 1800 922"
          stroke="#8a78d8"
          strokeOpacity="0.5"
          strokeWidth="3"
          fill="none"
        />
      </Layer>

      {/* White doves, in front of the text like in the reference */}
      <Layer speed={0.05} depth={0.45} className="layer-front">
        <Birds flight={DOVES} fill="#f7f4ff" shade="#cfc6f2" />
      </Layer>

      <div className="scene-content part-top">
        <div className="copy hero-copy" data-layer data-speed="-0.35" data-depth="0.15" data-fade>
          <p className="eyebrow intro" style={{ '--delay': '0.1s' }}>
            <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
              <rect x="0" y="4" width="3" height="12" fill="currentColor" />
              <rect x="7" y="0" width="3" height="16" fill="currentColor" />
              <rect x="14" y="6" width="3" height="10" fill="currentColor" />
            </svg>
            Journey to new frontiers, Journey to Noto Nature Park
          </p>
          <h1 className="hero-title" aria-label={TITLE}>
            {TITLE.split('').map((c, i) => (
              <span key={i} aria-hidden="true" style={{ animationDelay: `${0.25 + i * 0.08}s` }}>
                {c}
              </span>
            ))}
          </h1>
          <p className="lead intro" style={{ '--delay': '0.8s' }}>
            Away from the manic energy of Japan's famous metropolises lies the ancient hamlet of Noto. Surprising and
            captivating in equal measure, Noto is a region like no other. Soaring peaks, lakes and endless waterfalls.
          </p>
          <a href="#tranquility" className="btn-light intro" style={{ '--delay': '1s' }}>
            Start the journey
            <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden="true">
              <path d="M0 0 L8 5 L0 10 Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      <div id="tranquility" className="scene-content part-bottom content-right">
        <div className="copy" data-layer data-speed="0.2" data-depth="0.15" data-fade>
          <p className="label">02 — Experience</p>
          <h2 className="section-title">Tranquility</h2>
          <div className="rule" />
          <p className="lead">
            Away from the manic energy of Japan's famous metropolises lies the ancient hamlet of Noto. Surprising and
            captivating in equal measure, Noto is a region like no other. Soaring peaks, lakes and endless waterfalls
            combine to form a habitat for a bewildering range of species.
          </p>
          <a href="#biodiversity" className="learn-more">
            Learn more
          </a>
        </div>
      </div>
    </Scene>
  )
}
