// @ts-nocheck
import type React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { Path, type PathProps, Svg } from 'react-native-svg';

// ─── Types ───────────────────────────────────────────────────────────────────

type CheckboxSize = 'sm' | 'md';

interface StrokePathProps extends PathProps {
  animValue: SharedValue<number>;
}

interface CheckboxProps {
  checkmarkColor: string;
  readonly checked?: boolean;
  readonly stroke?: number;
  readonly size?: CheckboxSize;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const PADDING = 10;
const VIEWPORT_SIZE = 64 + PADDING;
const TICK_PATH = 'M16 34L26 44L48 20';

const SIZE_MAP: Record<CheckboxSize, number> = {
  sm: 24,
  md: 32,
};

// ─── Internal ────────────────────────────────────────────────────────────────

const AnimatedSvgPath = Animated.createAnimatedComponent(Path);

const StrokePath: React.FC<StrokePathProps> = ({ animValue, ...pathProps }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef(null);

  const animatedStrokeProps = useAnimatedProps<Pick<PathProps, 'strokeDashoffset' | 'opacity'>>(
    () => {
      if (pathLength === 0) {
        return {
          strokeDashoffset: 1,
          opacity: 0,
        };
      }

      const easedProgress = Easing.bezierFn(0.37, 0, 0.63, 1)(animValue.value);
      const offset = pathLength - pathLength * easedProgress;

      return {
        strokeDashoffset: Math.max(0, offset),
        opacity: animValue.value < 0.01 ? 0 : 1,
      };
    },
  );

  const handleLayout = () => {
    if (pathRef.current) {
      const totalLength = pathRef.current?.getTotalLength();
      setPathLength(totalLength);
    }
  };

  return (
    <AnimatedSvgPath
      ref={pathRef}
      onLayout={handleLayout}
      strokeDasharray={pathLength}
      animatedProps={animatedStrokeProps}
      {...pathProps}
    />
  );
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Checkbox: React.FC<CheckboxProps> = memo(
  ({ checked = false, checkmarkColor, stroke = 6, size = 'md' }: CheckboxProps) => {
    const resolvedSize = SIZE_MAP[size];
    const animValue = useSharedValue(checked ? 1 : 0);
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        animValue.value = checked ? 1 : 0;
        return;
      }

      animValue.value = withTiming(checked ? 1 : 0, {
        duration: checked ? 300 : 250,
        easing: checked ? Easing.bezier(0.4, 0, 0.2, 1) : Easing.bezier(0.4, 0, 0.6, 1),
      });
    }, [checked, animValue]);

    const viewBox = [-PADDING, -PADDING, VIEWPORT_SIZE + PADDING, VIEWPORT_SIZE + PADDING].join(
      ' ',
    );

    return (
      <Svg width={resolvedSize} height={resolvedSize} viewBox={viewBox}>
        <StrokePath
          d={TICK_PATH}
          stroke={checkmarkColor}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animValue={animValue}
        />
      </Svg>
    );
  },
);

export type { CheckboxProps, CheckboxSize };
