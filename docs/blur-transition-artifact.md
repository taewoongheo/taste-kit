# Blur Transition Artifact (Semi-transparent Blur Blending)

## Problem

Backdrop blur layer fades in with opacity animation. During the transition, text behind the blur appears with a hazy halo around its edges — a blending artifact that looks unnatural.

## Why It Happens

When a BlurView sits at partial opacity (0.3–0.7), two layers are simultaneously visible:

1. **Original content** (sharp text) — visible through the semi-transparent blur layer
2. **Blurred content** — rendered by the BlurView at partial opacity

These two layers blend together. The sharp text edges and the blurred version overlap, creating a visible "echo" or halo around text boundaries. The effect is most noticeable on high-contrast elements like dark text on a light background.

```
opacity = 0.0  →  Original only (sharp)         ✅ clean
opacity = 0.5  →  Sharp + Blurred overlapping    ❌ artifact visible
opacity = 1.0  →  Blurred only                   ✅ clean
```

The longer the animation spends in the 0.3–0.7 opacity range, the more noticeable the artifact becomes.

## How to Reproduce

In `src/components/ui/dialog/index.tsx`, find the backdrop animated style inside `DialogContent`:

```tsx
// Current (artifact minimized)
const backdropAnimatedStyle = useAnimatedStyle(() => ({
  opacity: interpolate(animationProgress.value, [0, 0.35, 1], [0, 1, 1], Extrapolation.CLAMP),
}));
```

Change to linear mapping to reproduce the artifact:

```tsx
// Artifact visible — linear opacity transition
const backdropAnimatedStyle = useAnimatedStyle(() => ({
  opacity: interpolate(animationProgress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
}));
```

For maximum visibility, also increase the animation duration:

```tsx
// In the opening useEffect
animationProgress.value = withTiming(1, {
  duration: 800,  // slow down to see the artifact clearly
});
```

Open the Dialog demo and observe text behind the blur during the transition.

## Solution

Shape the interpolation curve so the blur layer reaches full opacity early, minimizing time in the partial-opacity range.

```tsx
// Before: linear — spends ~200ms in the 0.3–0.7 range (300ms total)
[0, 1] → [0, 1]

// After: fast ramp — reaches opacity 1.0 at 35% of progress (~100ms)
[0, 0.35, 1] → [0, 1, 1]
```

This is **not** an easing change. Easing controls the speed curve of the animation value (`animationProgress`) itself. The fix changes how that value **maps to opacity** — a different concept:

- **Easing**: how fast `animationProgress` goes from 0 to 1 over time
- **Interpolation mapping**: how `animationProgress` values translate to `opacity` values

By making opacity reach 1.0 when progress is only at 0.35, the blur layer becomes fully opaque within ~100ms, and the blending artifact is imperceptible.

## Performance Note

This approach uses a **static BlurView** (fixed `intensity`) with animated parent `opacity`. This is critical for performance:

| Approach | Cost |
|----------|------|
| Animate `intensity` prop | Native blur recalculated every frame (expensive) |
| Animate parent `opacity` | GPU compositing only (cheap) |

The BlurView renders its blur effect once. The opacity animation is handled entirely by the GPU compositor without touching the native blur pipeline.

## Key Takeaway

When fading in any post-processing effect (blur, shadow, color overlay) over content, the transition between "no effect" and "full effect" creates a blending zone where both versions are visible. The fix is to minimize time in that zone by shaping the interpolation curve, not by changing the animation speed.
