import Traced from './Traced'
import art from './traced/traveller'

// The wanderer from the reference, seen from behind, walking toward the mountain through the tall grass.
// Hat, pack, jacket, cape and scarf are traced from the reference frame; the legs below the coat are drawn
// here so they can stride. Local space: crop pixels (355 x 430), feet at about (90, 430).
//  - walk: the body rises and settles twice per stride, the legs swing in turn
//  - the red cape and the orange scarf stream out to the right in the wind
const INK = '#2a1610'

function Leg({ x, className }) {
  return (
    <g className={className}>
      <path d={`M${x - 16} 318 L${x + 16} 318 L${x + 14} 404 L${x - 12} 404 Z`} fill="#3a2a1e" stroke={INK} strokeWidth="2.2" />
      <path d={`M${x - 12} 330 L${x - 6} 330 L${x - 6} 400 L${x - 10} 400 Z`} fill="#d8a034" />
      <path
        d={`M${x - 15} 398 L${x + 15} 398 Q${x + 26} 414 ${x + 22} 428 L${x - 15} 428 Z`}
        fill="#24160e"
        stroke={INK}
        strokeWidth="2.2"
      />
    </g>
  )
}

export default function Traveller() {
  return (
    <g className="walk">
      {/* legs behind the coat, swinging in turn */}
      <Leg x={128} className="stride stride-b" />
      <Leg x={62} className="stride" />

      <g className="billow">
        <Traced layers={art.parts.cape} />
      </g>
      <g className="scarf">
        <Traced layers={art.parts.scarf} />
      </g>
      <Traced layers={art.parts.body} />
    </g>
  )
}
