import { Easing, type WithSpringConfig, type WithTimingConfig } from 'react-native-reanimated';

// ─── Spring Configs ──────────────────────────────────────

export const Springs = {
  /** Slow, smooth — page transitions, large elements */
  gentle: { damping: 29, stiffness: 220 } satisfies WithSpringConfig,
  /** Quick, responsive — buttons, toggles */
  snappy: { damping: 42, stiffness: 480 } satisfies WithSpringConfig,
  /** Playful, subtle overshoot — celebrations, attention */
  bouncy: { damping: 34, stiffness: 340 } satisfies WithSpringConfig,
  /** Instant, no overshoot — corrections, resets */
  stiff: { damping: 60, stiffness: 750 } satisfies WithSpringConfig,
} as const;

// ─── Timing Configs ──────────────────────────────────────

export const Timings = {
  /** Fast micro-interaction — 150ms */
  fast: {
    duration: 150,
    easing: Easing.out(Easing.cubic),
  } satisfies WithTimingConfig,
  /** Standard transition — 250ms */
  normal: {
    duration: 250,
    easing: Easing.out(Easing.cubic),
  } satisfies WithTimingConfig,
  /** Slow, deliberate — 400ms */
  slow: {
    duration: 400,
    easing: Easing.out(Easing.cubic),
  } satisfies WithTimingConfig,
} as const;

// ─── Tap Feedback Defaults ───────────────────────────────

export const TapFeedback = {
  /** Scale down on press */
  scale: 0.97,
  /** Opacity on press */
  opacity: 0.8,
} as const;
