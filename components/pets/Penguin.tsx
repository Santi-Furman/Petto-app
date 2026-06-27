import Svg, {
  Ellipse, Path, Circle, Line, Polygon
} from 'react-native-svg'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

export function Penguin({ mood = 'idle', size = 180 }: Props) {
  const happy = mood === 'happy'

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>

      {/* Cuerpo */}
      <Ellipse cx={100} cy={148} rx={40} ry={44} fill="#2A2E3A" />
      <Ellipse cx={100} cy={154} rx={26} ry={34} fill="#F0EEE8" />

      {/* Aletas */}
      <Ellipse cx={62}  cy={148} rx={10} ry={26} fill="#1E222C" rotation={12} originX={62} originY={148} />
      <Ellipse cx={138} cy={148} rx={10} ry={26} fill="#1E222C" rotation={-12} originX={138} originY={148} />

      {/* Pies */}
      <Ellipse cx={84}  cy={188} rx={16} ry={8} fill="#FFA500" rotation={-10} originX={84} originY={188} />
      <Ellipse cx={116} cy={188} rx={16} ry={8} fill="#FFA500" rotation={10}  originX={116} originY={188} />

      {/* Dedos pie izquierdo */}
      <Line x1={72} y1={184} x2={66} y2={193} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={78} y1={185} x2={74} y2={194} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={84} y1={185} x2={82} y2={194} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />

      {/* Dedos pie derecho */}
      <Line x1={116} y1={185} x2={118} y2={194} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={122} y1={185} x2={126} y2={194} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={128} y1={184} x2={134} y2={193} stroke="#E07800" strokeWidth={1.5} strokeLinecap="round" />

      {/* Cabeza */}
      <Ellipse cx={100} cy={96} rx={34} ry={32} fill="#2A2E3A" />

      {/* Parche facial blanco */}
      <Ellipse cx={100} cy={104} rx={22} ry={20} fill="#F0EEE8" />

      {/* Pico */}
      <Polygon points="100,112 92,122 108,122" fill="#FFA500" />
      <Line x1={92} y1={117} x2={108} y2={117} stroke="#E07800" strokeWidth={1.5} />

      {/* Ojos */}
      <Ellipse cx={87}  cy={96} rx={7} ry={happy ? 5 : 7} fill="#1A1E2A" />
      <Ellipse cx={113} cy={96} rx={7} ry={happy ? 5 : 7} fill="#1A1E2A" />
      <Ellipse cx={87}  cy={96} rx={5} ry={happy ? 3.5 : 5} fill="#3A6ACA" />
      <Ellipse cx={113} cy={96} rx={5} ry={happy ? 3.5 : 5} fill="#3A6ACA" />
      <Circle  cx={85}  cy={94} r={2} fill="white" opacity={0.85} />
      <Circle  cx={111} cy={94} r={2} fill="white" opacity={0.85} />

      {/* Boca */}
      {happy
        ? <Path d="M94 122 Q100 128 106 122" stroke="#E07800" strokeWidth={2} fill="none" strokeLinecap="round" />
        : null
      }

      {/* Cachetes */}
      <Ellipse cx={80}  cy={108} rx={8} ry={5} fill="#FF7A5C" opacity={0.3} />
      <Ellipse cx={120} cy={108} rx={8} ry={5} fill="#FF7A5C" opacity={0.3} />

      {/* Detalle tuxedo */}
      <Path d="M96 128 L100 138 L104 128" fill="#2A2E3A" />

      {/* Sombra */}
      <Ellipse cx={100} cy={196} rx={36} ry={5} fill="rgba(0,0,0,0.08)" />

    </Svg>
  )
}