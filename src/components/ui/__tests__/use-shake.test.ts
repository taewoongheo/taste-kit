import { renderHook, act } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { useShake } from '../use-shake';

describe('useShake', () => {
  it('returns animatedStyle and shake', () => {
    const { result } = renderHook(() => useShake());

    expect(result.current.animatedStyle).toBeDefined();
    expect(typeof result.current.shake).toBe('function');
  });

  it('shake() can be called without crashing', () => {
    const { result } = renderHook(() => useShake());

    expect(() => {
      act(() => {
        result.current.shake();
      });
    }).not.toThrow();
  });

  it('accepts custom options', () => {
    const { result } = renderHook(() =>
      useShake({
        distance: 12,
        oscillations: 6,
        duration: 80,
        haptic: Haptics.NotificationFeedbackType.Warning,
      }),
    );

    expect(result.current.animatedStyle).toBeDefined();
  });

  it('accepts haptic: null to disable haptic', () => {
    const { result } = renderHook(() => useShake({ haptic: null }));

    expect(typeof result.current.shake).toBe('function');
  });
});
