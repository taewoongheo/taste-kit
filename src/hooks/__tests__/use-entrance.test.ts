import { renderHook } from '@testing-library/react-native';
import { useEntrance } from '../use-entrance';

describe('useEntrance', () => {
  it('returns animatedStyle, enter, reset, and isVisible', () => {
    const { result } = renderHook(() => useEntrance());

    expect(result.current.animatedStyle).toBeDefined();
    expect(typeof result.current.enter).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(result.current.isVisible).toBeDefined();
  });

  it('auto-plays on mount by default', () => {
    const { result } = renderHook(() => useEntrance({ fade: true }));

    // isVisible should be true after mount (autoPlay = true)
    expect(result.current.isVisible.value).toBe(true);
  });

  it('does not auto-play when autoPlay is false', () => {
    const { result } = renderHook(() => useEntrance({ fade: true, autoPlay: false }));

    expect(result.current.isVisible.value).toBe(false);
  });

  it('accepts fade + slideY combination', () => {
    const { result } = renderHook(() => useEntrance({ fade: true, slideY: 20 }));

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.isVisible.value).toBe(true);
  });

  it('accepts scale entrance option', () => {
    const { result } = renderHook(() => useEntrance({ scale: 0.8, fade: true }));

    expect(result.current.animatedStyle).toBeDefined();
  });

  it('accepts delay option', () => {
    const { result } = renderHook(() => useEntrance({ fade: true, slideY: 10, delay: 200 }));

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.isVisible.value).toBe(true);
  });

  it('reset() sets isVisible to false', () => {
    const { result } = renderHook(() => useEntrance({ fade: true }));

    expect(result.current.isVisible.value).toBe(true);
    result.current.reset();
    expect(result.current.isVisible.value).toBe(false);
  });

  it('enter() can re-trigger after reset', () => {
    const { result } = renderHook(() => useEntrance({ fade: true, autoPlay: false }));

    expect(result.current.isVisible.value).toBe(false);
    result.current.enter();
    expect(result.current.isVisible.value).toBe(true);
    result.current.reset();
    expect(result.current.isVisible.value).toBe(false);
    result.current.enter();
    expect(result.current.isVisible.value).toBe(true);
  });
});
