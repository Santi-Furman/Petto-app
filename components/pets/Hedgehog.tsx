import Svg, {
  Ellipse, Path, Circle, Line
} from 'react-native-svg'

type Props = {
  mood?: 'idle' | 'happy' | 'sad'
  size?: number
}

export function Hedgehog({ mood = 'idle', size = 180 }: Props) {
  const happy = mood === 'happy'

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>

      {/* Espinas - capa trasera */}
      <Ellipse cx={72}  cy={88} rx={10} ry={22} fill="#5A4A30" rotation={-80} originX={72}  originY={88}  />
      <Ellipse cx={88}  cy={78} rx={10} ry={22} fill="#7A6A50" rotation={-60} originX={88}  originY={78}  />
      <Ellipse cx={100} cy={74} rx={10} ry={22} fill="#5A4A30" rotation={-45} originX={100} originY={74}  />
      <Ellipse cx={112} cy={78} rx={10} ry={22} fill="#7A6A50" rotation={-30} originX={112} originY={78}  />
      <Ellipse cx={128} cy={88} rx={10} ry={22} fill="#5A4A30" rotation={-10} originX={128} originY={88}  />
      <Ellipse cx={136} cy={100} rx={10} ry={22} fill="#7A6A50" rotation={10} originX={136} originY={100} />
      <Ellipse cx={64}  cy={100} rx={10} ry={22} fill="#7A6A50" rotation={-100} originX={64} originY={100} />

      {/* Cuerpo con espinas */}
      <Ellipse cx={100} cy={114} rx={52} ry={38} fill="#7A6A50" />
      <Ellipse cx={100} cy={118} rx={46} ry={32} fill="#6A5A40" />

      {/* Panza suave */}
      <Ellipse cx={100} cy={148} rx={38} ry={30} fill="#E8C89A" />
      <Ellipse cx={100} cy={152} rx={26} ry={20} fill="#F0D8B0" />

      {/* Patitas - 4 dedos */}
      <Ellipse cx={72}  cy={178} rx={9} ry={6} fill="#D4A870" />
      <Ellipse cx={88}  cy={180} rx={9} ry={6} fill="#D4A870" />
      <Ellipse cx={112} cy={180} rx={9} ry={6} fill="#D4A870" />
      <Ellipse cx={128} cy={178} rx={9} ry={6} fill="#D4A870" />

      {/* Dedos pata izquierda */}
      <Line x1={66} y1={176} x2={63} y2={183} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={70} y1={177} x2={68} y2={184} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={74} y1={177} x2={73} y2={184} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={78} y1={176} x2={78} y2={183} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />

      {/* Dedos pata derecha */}
      <Line x1={122} y1={176} x2={122} y2={183} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={126} y1={177} x2={127} y2={184} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={130} y1={177} x2={132} y2={184} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />
      <Line x1={134} y1={176} x2={137} y2={183} stroke="#B08050" strokeWidth={1.2} strokeLinecap="round" />

      {/* Cabeza */}
      <Ellipse cx={100} cy={104} rx={34} ry={30} fill="#E8C89A" />

      {/* Hocico puntiagudo */}
      <Ellipse cx={100} cy={118} rx={18} ry={12} fill="#D4A870" />
      <Ellipse cx={100} cy={124} rx={12} ry={8}  fill="#C49060" />

      {/* Nariz */}
      <Ellipse cx={100} cy={120} rx={6}  ry={4.5} fill="#1A1008" />
      <Ellipse cx={98}  cy={119} rx={2}  ry={1.5} fill="#3A3020" opacity={0.6} />

      {/* Orejas pequeñas */}
      <Ellipse cx={74}  cy={82} rx={12} ry={10} fill="#D4A870" />
      <Ellipse cx={74}  cy={82} rx={7}  ry={6}  fill="#C49080" />
      <Ellipse cx={126} cy={82} rx={12} ry={10} fill="#D4A870" />
      <Ellipse cx={126} cy={82} rx={7}  ry={6}  fill="#C49080" />

      {/* Ojos */}
      <Ellipse cx={88}  cy={102} rx={6} ry={happy ? 4.5 : 6} fill="#1A1008" />
      <Ellipse cx={112} cy={102} rx={6} ry={happy ? 4.5 : 6} fill="#1A1008" />
      <Circle  cx={86}  cy={100} r={2} fill="white" opacity={0.8} />
      <Circle  cx={110} cy={100} r={2} fill="white" opacity={0.8} />

      {/* Boca */}
      {happy
        ? <Path d="M93 126 Q100 133 107 126" stroke="#8A5020" strokeWidth={2}   fill="none" strokeLinecap="round" />
        : <Path d="M94 128 Q100 125 106 128" stroke="#8A5020" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      }

      {/* Cachetes */}
      <Ellipse cx={82}  cy={114} rx={8} ry={5} fill="#FF7A5C" opacity={0.28} />
      <Ellipse cx={118} cy={114} rx={8} ry={5} fill="#FF7A5C" opacity={0.28} />

      {/* Textura espinas en lomo */}
      <Line x1={68}  y1={92} x2={70}  y2={76} stroke="#4A3A20" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
      <Line x1={84}  y1={86} x2={86}  y2={70} stroke="#4A3A20" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
      <Line x1={100} y1={82} x2={100} y2={66} stroke="#4A3A20" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
      <Line x1={116} y1={86} x2={114} y2={70} stroke="#4A3A20" strokeWidth={2} strokeLinecap="round" opacity={0.4} />
      <Line x1={132} y1={92} x2={130} y2={76} stroke="#4A3A20" strokeWidth={2} strokeLinecap="round" opacity={0.4} />

      {/* Sombra */}
      <Ellipse cx={100} cy={196} rx={36} ry={5} fill="rgba(0,0,0,0.08)" />

    </Svg>
  )
}