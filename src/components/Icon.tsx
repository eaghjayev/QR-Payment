import React from 'react';
import Svg, { Path, Line, Rect, Circle, Polyline, Polygon } from 'react-native-svg';

type IconName =
  | 'home' | 'card' | 'chart' | 'user' | 'qr' | 'back' | 'close'
  | 'check' | 'flash' | 'copy' | 'share' | 'chevDown' | 'send'
  | 'wifi' | 'toggle' | 'toggleOff' | 'plus' | 'info';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 22, color = 'currentColor' }) => {
  const renderPaths = () => {
    switch (name) {
      case 'home':
        return <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H14v-5h-4v5H4a1 1 0 01-1-1V9.5z" strokeWidth={1.8} fill="none" stroke={color} />;
      case 'card':
        return <>
          <Rect x={2} y={5} width={20} height={14} rx={2.5} strokeWidth={1.8} fill="none" stroke={color} />
          <Line x1={2} y1={10} x2={22} y2={10} strokeWidth={1.8} stroke={color} />
          <Line x1={6} y1={15} x2={10} y2={15} strokeWidth={1.8} stroke={color} />
        </>;
      case 'chart':
        return <Polyline points="3,18 9,12 13,16 21,7" strokeWidth={1.8} fill="none" stroke={color} />;
      case 'user':
        return <>
          <Circle cx={12} cy={8} r={4} strokeWidth={1.8} fill="none" stroke={color} />
          <Path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeWidth={1.8} fill="none" stroke={color} />
        </>;
      case 'qr':
        return <>
          <Rect x={3} y={3} width={7} height={7} rx={1} strokeWidth={1.8} fill="none" stroke={color} />
          <Rect x={14} y={3} width={7} height={7} rx={1} strokeWidth={1.8} fill="none" stroke={color} />
          <Rect x={3} y={14} width={7} height={7} rx={1} strokeWidth={1.8} fill="none" stroke={color} />
          <Rect x={5} y={5} width={3} height={3} fill={color} />
          <Rect x={16} y={5} width={3} height={3} fill={color} />
          <Rect x={5} y={16} width={3} height={3} fill={color} />
          <Path d="M14 14h2v2h-2zM18 14h3v2h-3zM16 18h2v3h-2zM20 16v5M14 18v3" strokeWidth={1.3} stroke={color} />
        </>;
      case 'back':
        return <Polyline points="15,18 9,12 15,6" strokeWidth={2} fill="none" stroke={color} />;
      case 'close':
        return <>
          <Line x1={18} y1={6} x2={6} y2={18} strokeWidth={2} stroke={color} />
          <Line x1={6} y1={6} x2={18} y2={18} strokeWidth={2} stroke={color} />
        </>;
      case 'check':
        return <Path d="M20 6L9 17l-5-5" strokeWidth={2.5} fill="none" stroke={color} strokeLinecap="round" />;
      case 'flash':
        return <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth={1.8} fill="none" stroke={color} />;
      case 'copy':
        return <>
          <Rect x={9} y={9} width={13} height={13} rx={2} strokeWidth={1.8} fill="none" stroke={color} />
          <Path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={1.8} fill="none" stroke={color} />
        </>;
      case 'share':
        return <>
          <Path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13" strokeWidth={1.8} fill="none" stroke={color} />
        </>;
      case 'chevDown':
        return <Polyline points="6,9 12,15 18,9" strokeWidth={2} fill="none" stroke={color} />;
      case 'send':
        return <>
          <Line x1={22} y1={2} x2={11} y2={13} strokeWidth={1.8} stroke={color} />
          <Polygon points="22,2 15,22 11,13 2,9" strokeWidth={1.8} fill="none" stroke={color} />
        </>;
      case 'wifi':
        return <>
          <Path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" strokeWidth={1.8} fill="none" stroke={color} />
          <Circle cx={12} cy={20} r={1} fill={color} />
        </>;
      case 'toggle':
        return <>
          <Rect x={1} y={5} width={22} height={14} rx={7} strokeWidth={1.8} fill="none" stroke={color} />
          <Circle cx={16} cy={12} r={5} fill={color} />
        </>;
      case 'toggleOff':
        return <>
          <Rect x={1} y={5} width={22} height={14} rx={7} strokeWidth={1.8} fill="none" stroke={color} />
          <Circle cx={8} cy={12} r={5} fill={color} />
        </>;
      case 'plus':
        return <>
          <Line x1={12} y1={5} x2={12} y2={19} strokeWidth={2} stroke={color} />
          <Line x1={5} y1={12} x2={19} y2={12} strokeWidth={2} stroke={color} />
        </>;
      case 'info':
        return <>
          <Circle cx={12} cy={12} r={10} strokeWidth={1.8} fill="none" stroke={color} />
          <Line x1={12} y1={16} x2={12} y2={12} strokeWidth={2} stroke={color} />
          <Circle cx={12} cy={8} r={1} fill={color} />
        </>;
      default:
        return null;
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderPaths()}
    </Svg>
  );
};
