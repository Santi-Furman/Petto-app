import Svg, {
  Ellipse, Path, Circle, Line, Polygon
} from 'react-native-svg'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

export function RedPanda({ mood = 'idle', size = 180 }: Props) {
  const happy = mood === 'happy'

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>

      {/* Cola */}
      <Path d="M148 165 Q172 150 168 130 Q164 110 178 100"
        stroke="#C0450A" strokeWidth={12} fill="none" strokeLinecap="round" />
      <Path d="M148 165 Q172 150 168 130 Q164 110 178 100"
        stroke="#F5C5A0" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4} />
      <Ellipse cx={168} cy={138} rx={5} ry={3.5} fill="#3A2808" opacity={0.5} />
      <Ellipse cx={178} cy={98} rx={7} ry={5} fill="#2A1808" />

      {/* Cuerpo */}
      <Ellipse cx={100} cy={152} rx={46} ry={38} fill="#C85A1A" />
      <Ellipse cx={100} cy={160} rx={28} ry={26} fill="#F7D9B8" />

      {/* Patas */}
      <Ellipse cx={76}  cy={180} rx={14} ry={10} fill="#8B3A08" />
      <Ellipse cx={126} cy={180} rx={14} ry={10} fill="#8B3A08" />
      <Ellipse cx={76}  cy={186} rx={10} ry={6}  fill="#6B2A04" />
      <Ellipse cx={126} cy={186} rx={10} ry={6}  fill="#6B2A04" />

      {/* Brazos */}
      <Ellipse cx={60}  cy={152} rx={12} ry={8} fill="#8B3A08" rotation={20} originX={60} originY={152} />
      <Ellipse cx={140} cy={152} rx={12} ry={8} fill="#8B3A08" rotation={-20} originX={140} originY={152} />

      {/* Cabeza */}
      <Ellipse cx={100} cy={100} rx={38} ry={36} fill="#C85A1A" />

      {/* Orejas */}
      <Ellipse cx={68}  cy={72} rx={13} ry={16} fill="#C85A1A" />
      <Ellipse cx={68}  cy={72} rx={7}  ry={9}  fill="#F7D9B8" />
      <Ellipse cx={132} cy={72} rx={13} ry={16} fill="#C85A1A" />
      <Ellipse cx={132} cy={72} rx={7}  ry={9}  fill="#F7D9B8" />

      {/* Manchas oculares */}
      <Ellipse cx={84}  cy={100} rx={16} ry={14} fill="#F7EBD8" />
      <Ellipse cx={116} cy={100} rx={16} ry={14} fill="#F7EBD8" />
      <Ellipse cx={84}  cy={108} rx={7}  ry={9}  fill="#5A2A10" opacity={0.25} />
      <Ellipse cx={116} cy={108} rx={7}  ry={9}  fill="#5A2A10" opacity={0.25} />

      {/* Hocico */}
      <Ellipse cx={100} cy={114} rx={14} ry={10} fill="#F7D9B8" />
      <Ellipse cx={100} cy={110} rx={5}  ry={3.5} fill="#3A1A08" />

      {/* Ojos */}
      <Ellipse cx={84}  cy={97} rx={6} ry={happy ? 4 : 6} fill="#2A1A08" />
      <Ellipse cx={116} cy={97} rx={6} ry={happy ? 4 : 6} fill="#2A1A08" />
      <Circle  cx={82}  cy={95} r={2} fill="white" opacity={0.7} />
      <Circle  cx={114} cy={95} r={2} fill="white" opacity={0.7} />

      {/* Boca */}
      {happy
        ? <Path d="M93 120 Q100 128 107 120" stroke="#3A1A08" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        : <Path d="M94 122 Q100 119 106 122" stroke="#3A1A08" strokeWidth={2}   fill="none" strokeLinecap="round" />
      }

      {/* Cachetes */}
      <Ellipse cx={76}  cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.3} />
      <Ellipse cx={124} cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.3} />

      {/* Sombra */}
      <Ellipse cx={100} cy={196} rx={38} ry={5} fill="rgba(0,0,0,0.08)" />

    </Svg>
  )
}