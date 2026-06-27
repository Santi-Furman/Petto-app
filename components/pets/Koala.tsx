import Svg, {
  Ellipse, Path, Circle, Line
} from 'react-native-svg'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

export function Koala({ mood = 'idle', size = 180 }: Props) {
  const happy = mood === 'happy'

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>

      {/* Cuerpo */}
      <Ellipse cx={100} cy={152} rx={44} ry={38} fill="#B0A8A0" />
      <Ellipse cx={100} cy={160} rx={26} ry={24} fill="#D8D0C8" />

      {/* Brazos */}
      <Ellipse cx={60}  cy={148} rx={14} ry={10} fill="#9A9290" rotation={15} originX={60} originY={148} />
      <Ellipse cx={140} cy={148} rx={14} ry={10} fill="#9A9290" rotation={-15} originX={140} originY={148} />

      {/* Garras brazo izquierdo */}
      <Line x1={46} y1={158} x2={44} y2={165} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={50} y1={159} x2={48} y2={166} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={54} y1={159} x2={52} y2={166} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />

      {/* Garras brazo derecho */}
      <Line x1={146} y1={158} x2={148} y2={165} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={150} y1={159} x2={152} y2={166} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={154} y1={159} x2={156} y2={166} stroke="#6A6460" strokeWidth={1.5} strokeLinecap="round" />

      {/* Piernas */}
      <Ellipse cx={80}  cy={182} rx={16} ry={10} fill="#9A9290" />
      <Ellipse cx={120} cy={182} rx={16} ry={10} fill="#9A9290" />

      {/* Cabeza */}
      <Ellipse cx={100} cy={98} rx={42} ry={40} fill="#B0A8A0" />

      {/* Orejas grandes */}
      <Ellipse cx={62}  cy={66} rx={22} ry={24} fill="#9A9290" />
      <Ellipse cx={62}  cy={66} rx={14} ry={16} fill="#D8D0C8" />
      <Ellipse cx={62}  cy={66} rx={8}  ry={10} fill="#C8C0B8" />
      <Ellipse cx={138} cy={66} rx={22} ry={24} fill="#9A9290" />
      <Ellipse cx={138} cy={66} rx={14} ry={16} fill="#D8D0C8" />
      <Ellipse cx={138} cy={66} rx={8}  ry={10} fill="#C8C0B8" />

      {/* Nariz grande */}
      <Ellipse cx={100} cy={108} rx={14} ry={10} fill="#4A4240" />
      <Ellipse cx={97}  cy={106} rx={4}  ry={3}  fill="#6A6260" opacity={0.5} />

      {/* Hocico */}
      <Ellipse cx={100} cy={116} rx={18} ry={10} fill="#C8C0B8" />

      {/* Ojos */}
      <Ellipse cx={85}  cy={95} rx={7} ry={happy ? 5 : 7} fill="#3A3230" />
      <Ellipse cx={115} cy={95} rx={7} ry={happy ? 5 : 7} fill="#3A3230" />
      <Circle  cx={83}  cy={93} r={2.5} fill="white" opacity={0.7} />
      <Circle  cx={113} cy={93} r={2.5} fill="white" opacity={0.7} />

      {/* Boca */}
      {happy
        ? <Path d="M91 122 Q100 130 109 122" stroke="#3A3230" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        : <Path d="M92 124 Q100 121 108 124" stroke="#3A3230" strokeWidth={2}   fill="none" strokeLinecap="round" />
      }

      {/* Cachetes */}
      <Ellipse cx={80}  cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.25} />
      <Ellipse cx={120} cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.25} />

      {/* Sombra */}
      <Ellipse cx={100} cy={196} rx={38} ry={5} fill="rgba(0,0,0,0.08)" />

    </Svg>
  )
}