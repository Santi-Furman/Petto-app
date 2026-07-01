import Svg, {
  Ellipse, Path, Circle, Line, Polygon
} from 'react-native-svg'

type Accessory = 'none' | 'hat' | 'glasses' | 'crown' | 'scarf'

type Props = {
  mood?:      'idle' | 'happy' | 'sad'
  size?:      number
  accessory?: Accessory
}

export function Leopard({ mood = 'idle', size = 180, accessory = 'none' }: Props) {
  const happy = mood === 'happy'

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>
      <Path d="M148 165 Q172 150 168 130 Q164 110 178 100" stroke="#D4A040" strokeWidth={12} fill="none" strokeLinecap="round" />
      <Path d="M148 165 Q172 150 168 130 Q164 110 178 100" stroke="#F0C060" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4} />
      <Ellipse cx={168} cy={138} rx={5} ry={3.5} fill="#3A2808" opacity={0.5} rotation={-20} originX={168} originY={138} />
      <Ellipse cx={174} cy={116} rx={4} ry={3}   fill="#3A2808" opacity={0.5} rotation={-40} originX={174} originY={116} />
      <Ellipse cx={178} cy={98}  rx={7} ry={5}   fill="#2A1808" rotation={-30} originX={178} originY={98} />
      <Ellipse cx={100} cy={150} rx={46} ry={38} fill="#D4A040" />
      <Ellipse cx={100} cy={158} rx={28} ry={26} fill="#F0D890" />
      <Ellipse cx={80}  cy={140} rx={8} ry={6} fill="#2A1808" opacity={0.55} />
      <Ellipse cx={80}  cy={140} rx={5} ry={4} fill="#D4A040" opacity={0.8} />
      <Ellipse cx={118} cy={136} rx={7} ry={5} fill="#2A1808" opacity={0.55} />
      <Ellipse cx={118} cy={136} rx={4} ry={3} fill="#D4A040" opacity={0.8} />
      <Ellipse cx={96}  cy={162} rx={6} ry={5} fill="#2A1808" opacity={0.55} />
      <Ellipse cx={96}  cy={162} rx={3} ry={3} fill="#D4A040" opacity={0.8} />
      <Ellipse cx={70}  cy={158} rx={7} ry={5} fill="#2A1808" opacity={0.55} />
      <Ellipse cx={70}  cy={158} rx={4} ry={3} fill="#D4A040" opacity={0.8} />
      <Ellipse cx={128} cy={158} rx={7} ry={5} fill="#2A1808" opacity={0.55} />
      <Ellipse cx={128} cy={158} rx={4} ry={3} fill="#D4A040" opacity={0.8} />
      <Ellipse cx={76}  cy={180} rx={14} ry={10} fill="#C09030" />
      <Ellipse cx={124} cy={180} rx={14} ry={10} fill="#C09030" />
      <Ellipse cx={76}  cy={188} rx={12} ry={7}  fill="#B08020" />
      <Ellipse cx={124} cy={188} rx={12} ry={7}  fill="#B08020" />
      <Line x1={70} y1={186} x2={69} y2={193} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={76} y1={187} x2={76} y2={194} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={82} y1={186} x2={83} y2={193} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={118} y1={186} x2={117} y2={193} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={124} y1={187} x2={124} y2={194} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={130} y1={186} x2={131} y2={193} stroke="#806010" strokeWidth={1.5} strokeLinecap="round" />
      <Ellipse cx={60}  cy={152} rx={12} ry={9} fill="#C09030" rotation={18}  originX={60}  originY={152} />
      <Ellipse cx={140} cy={152} rx={12} ry={9} fill="#C09030" rotation={-18} originX={140} originY={152} />
      <Ellipse cx={100} cy={98} rx={38} ry={36} fill="#D4A040" />
      <Ellipse cx={70}  cy={70} rx={14} ry={14} fill="#D4A040" />
      <Ellipse cx={70}  cy={70} rx={9}  ry={9}  fill="#2A1808" />
      <Ellipse cx={70}  cy={70} rx={5}  ry={5}  fill="#C09030" />
      <Ellipse cx={130} cy={70} rx={14} ry={14} fill="#D4A040" />
      <Ellipse cx={130} cy={70} rx={9}  ry={9}  fill="#2A1808" />
      <Ellipse cx={130} cy={70} rx={5}  ry={5}  fill="#C09030" />
      <Ellipse cx={100} cy={110} rx={20} ry={16} fill="#F0D890" />
      <Ellipse cx={100} cy={106} rx={5.5} ry={4}   fill="#D06050" />
      <Ellipse cx={99}  cy={105} rx={2}   ry={1.5} fill="#E08070" opacity={0.5} />
      <Circle cx={84}  cy={112} r={1.5} fill="#8A6020" opacity={0.5} />
      <Circle cx={90}  cy={114} r={1.5} fill="#8A6020" opacity={0.5} />
      <Circle cx={96}  cy={115} r={1.5} fill="#8A6020" opacity={0.5} />
      <Circle cx={104} cy={115} r={1.5} fill="#8A6020" opacity={0.5} />
      <Circle cx={110} cy={114} r={1.5} fill="#8A6020" opacity={0.5} />
      <Circle cx={116} cy={112} r={1.5} fill="#8A6020" opacity={0.5} />
      <Ellipse cx={100} cy={82} rx={4}  ry={3} fill="#2A1808" opacity={0.4} />
      <Ellipse cx={82}  cy={96} rx={5}  ry={4} fill="#2A1808" opacity={0.35} />
      <Ellipse cx={118} cy={96} rx={5}  ry={4} fill="#2A1808" opacity={0.35} />
      <Ellipse cx={86}  cy={96} rx={7} ry={happy ? 5 : 7} fill="#2A4A08" />
      <Ellipse cx={114} cy={96} rx={7} ry={happy ? 5 : 7} fill="#2A4A08" />
      <Ellipse cx={86}  cy={96} rx={5} ry={happy ? 3.5 : 5} fill="#4A8A18" />
      <Ellipse cx={114} cy={96} rx={5} ry={happy ? 3.5 : 5} fill="#4A8A18" />
      <Ellipse cx={86}  cy={96} rx={2} ry={happy ? 3 : 5} fill="#0A0A08" />
      <Ellipse cx={114} cy={96} rx={2} ry={happy ? 3 : 5} fill="#0A0A08" />
      <Circle  cx={84}  cy={94} r={1.8} fill="white" opacity={0.75} />
      <Circle  cx={112} cy={94} r={1.8} fill="white" opacity={0.75} />
      {happy
        ? <Path d="M92 116 Q100 124 108 116" stroke="#A04030" strokeWidth={2.5} fill="none" strokeLinecap="round" />
        : <Path d="M93 118 Q100 115 107 118" stroke="#A04030" strokeWidth={2}   fill="none" strokeLinecap="round" />
      }
      <Ellipse cx={80}  cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.28} />
      <Ellipse cx={120} cy={110} rx={9} ry={6} fill="#FF7A5C" opacity={0.28} />
      <Ellipse cx={100} cy={196} rx={40} ry={5} fill="rgba(0,0,0,0.08)" />
    </Svg>
  )
}