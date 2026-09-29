import { Svg, Path, Line, Circle, Rect } from '@react-pdf/renderer';

interface IconProps {
  size?: number;
  color?: string;
}

// Path/shape data lifted from the corresponding lucide-react icons (24x24 viewBox,
// stroke-based), redrawn with @react-pdf/renderer's SVG primitives.
const strokeProps = (color: string) => ({
  fill: 'none' as const,
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function MailIcon({ size = 10, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" {...strokeProps(color)} />
      <Rect x={2} y={4} width={20} height={16} rx={2} {...strokeProps(color)} />
    </Svg>
  );
}

export function PhoneIcon({ size = 10, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
        {...strokeProps(color)}
      />
    </Svg>
  );
}

export function PinIcon({ size = 10, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
        {...strokeProps(color)}
      />
      <Circle cx={12} cy={10} r={3} {...strokeProps(color)} />
    </Svg>
  );
}

export function LinkIcon({ size = 10, color = '#ffffff' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        {...strokeProps(color)}
      />
      <Path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        {...strokeProps(color)}
      />
    </Svg>
  );
}

export function BrainCircuitIcon({ size = 9, color = '#4b5563' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
        {...strokeProps(color)}
      />
      <Path d="M9 13a4.5 4.5 0 0 0 3-4" {...strokeProps(color)} />
      <Path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" {...strokeProps(color)} />
      <Path d="M3.477 10.896a4 4 0 0 1 .585-.396" {...strokeProps(color)} />
      <Path d="M6 18a4 4 0 0 1-1.967-.516" {...strokeProps(color)} />
      <Path d="M12 13h4" {...strokeProps(color)} />
      <Path d="M12 18h6a2 2 0 0 1 2 2v1" {...strokeProps(color)} />
      <Path d="M12 8h8" {...strokeProps(color)} />
      <Path d="M16 8V5a2 2 0 0 1 2-2" {...strokeProps(color)} />
      <Circle cx={16} cy={13} r={0.5} {...strokeProps(color)} />
      <Circle cx={18} cy={3} r={0.5} {...strokeProps(color)} />
      <Circle cx={20} cy={21} r={0.5} {...strokeProps(color)} />
      <Circle cx={20} cy={8} r={0.5} {...strokeProps(color)} />
    </Svg>
  );
}

export function Gamepad2Icon({ size = 9, color = '#4b5563' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={6} x2={10} y1={11} y2={11} {...strokeProps(color)} />
      <Line x1={8} x2={8} y1={9} y2={13} {...strokeProps(color)} />
      <Line x1={15} x2={15.01} y1={12} y2={12} {...strokeProps(color)} />
      <Line x1={18} x2={18.01} y1={10} y2={10} {...strokeProps(color)} />
      <Path
        d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
        {...strokeProps(color)}
      />
    </Svg>
  );
}

export function DumbbellIcon({ size = 9, color = '#4b5563' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"
        {...strokeProps(color)}
      />
      <Path d="m2.5 21.5 1.4-1.4" {...strokeProps(color)} />
      <Path d="m20.1 3.9 1.4-1.4" {...strokeProps(color)} />
      <Path
        d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"
        {...strokeProps(color)}
      />
      <Path d="m9.6 14.4 4.8-4.8" {...strokeProps(color)} />
    </Svg>
  );
}

export function ChessKnightIcon({ size = 9, color = '#4b5563' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
        {...strokeProps(color)}
      />
      <Path
        d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456"
        {...strokeProps(color)}
      />
      <Path d="m15 5 1.425-1.425" {...strokeProps(color)} />
      <Path d="m17 8 1.53-1.53" {...strokeProps(color)} />
      <Path d="M9.713 12.185 7 18" {...strokeProps(color)} />
    </Svg>
  );
}

export function StarIcon({ size = 9, color = '#4b5563' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        {...strokeProps(color)}
      />
    </Svg>
  );
}
