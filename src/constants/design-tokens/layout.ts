import { StyleSheet } from 'react-native';

// ─── Layout ──────────────────────────────────────────────

export const Layout = {
  /** Standard horizontal margin */
  margin: 16,
  /** Minimum touch target */
  touchTarget: 44,
  /** Card/sheet corner radius */
  radiusLg: 12,
  /** Button corner radius */
  radiusMd: 10,
  /** Input corner radius */
  radiusSm: 8,
  /** Hairline separator */
  separator: StyleSheet.hairlineWidth,
} as const;
