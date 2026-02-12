import { renderHook } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { useScalePress } from '../useScalePress';

describe('useScalePress', () => {
  it('returns gesture, animatedStyle, and pressed', () => {
    const { result } = renderHook(() => useScalePress());

    expect(result.current.gesture).toBeDefined();
    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.pressed).toBeDefined();
    expect(result.current.pressed.value).toBe(false);
  });

  it('accepts custom options without crashing', () => {
    const { result } = renderHook(() =>
      useScalePress({
        scale: 0.9,
        opacity: 0.5,
        haptic: Haptics.ImpactFeedbackStyle.Heavy,
        onPress: jest.fn(),
        disabled: false,
      }),
    );

    expect(result.current.gesture).toBeDefined();
    expect(result.current.pressed.value).toBe(false);
  });

  it('accepts haptic: null to disable haptic feedback', () => {
    const { result } = renderHook(() => useScalePress({ haptic: null }));

    expect(result.current.gesture).toBeDefined();
  });

  it('works with disabled state', () => {
    const { result } = renderHook(() => useScalePress({ disabled: true }));

    expect(result.current.gesture).toBeDefined();
    expect(result.current.pressed.value).toBe(false);
  });
});
