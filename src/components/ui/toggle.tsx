import { Colors } from '@/constants';
import { Springs } from '@/constants/animations';
import { Haptic } from '@/lib';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  testID?: string;
}

const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 27;
const THUMB_OFFSET = 2;

export function Toggle({ value, onValueChange, disabled = false, testID }: ToggleProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handlePress = () => {
    if (disabled) return;
    Haptic.selection();
    onValueChange(!value);
  };

  const trackStyle = useAnimatedStyle(() => {
    const toValue = value ? 1 : 0;
    const backgroundColor = interpolateColor(
      withSpring(toValue, Springs.snappy),
      [0, 1],
      [colors.fillPrimary, colors.accent],
    );
    return { backgroundColor };
  });

  const thumbStyle = useAnimatedStyle(() => {
    const translateX = withSpring(
      value ? TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET : THUMB_OFFSET,
      Springs.snappy,
    );
    return { transform: [{ translateX }] };
  });

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      style={[disabled && styles.disabled]}
    >
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});
