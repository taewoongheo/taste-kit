import { Platform, StyleSheet } from 'react-native';

// ─── Colors (Apple HIG) ───────────────────────────────────

export const Colors = {
  light: {
    /** Primary background */
    background: '#FFFFFF',
    /** Grouped/settings background */
    backgroundGrouped: '#F2F2F7',
    /** Card/elevated surface */
    backgroundElevated: '#FFFFFF',
    /** Primary text */
    text: '#000000',
    /** Secondary/supporting text */
    textSecondary: '#8E8E93',
    /** Tertiary/placeholder text */
    textTertiary: '#C7C7CC',
    /** Single accent color — iOS system blue */
    accent: '#007AFF',
    /** Destructive actions */
    destructive: '#FF3B30',
    /** Success state */
    success: '#34C759',
    /** Warning state */
    warning: '#FF9500',
    /** List separator */
    separator: '#E5E5EA',
    /** Primary fill (toggles, sliders) */
    fillPrimary: 'rgba(120,120,128,0.2)',
    /** Secondary fill */
    fillSecondary: 'rgba(120,120,128,0.16)',
    /** Icon default */
    icon: '#8E8E93',
  },
  dark: {
    background: '#000000',
    backgroundGrouped: '#1C1C1E',
    backgroundElevated: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    textTertiary: '#48484A',
    accent: '#0A84FF',
    destructive: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    separator: '#38383A',
    fillPrimary: 'rgba(120,120,128,0.36)',
    fillSecondary: 'rgba(120,120,128,0.32)',
    icon: '#9BA1A6',
  },
} as const;

export type ColorTokens = (typeof Colors)['light'] | (typeof Colors)['dark'];

// ─── Spacing (8pt grid) ──────────────────────────────────

export const Spacing = {
  /** 4pt — tight elements */
  xs: 4,
  /** 8pt — related elements */
  sm: 8,
  /** 16pt — standard padding/margin */
  md: 16,
  /** 24pt — section gaps */
  lg: 24,
  /** 32pt — major sections */
  xl: 32,
} as const;

// ─── Typography (Apple HIG scale) ────────────────────────

const fontFamily = Platform.select({
  ios: 'System',
  default: 'sans-serif',
});

export const Typography = {
  /** 34pt — screen titles (scrollable large title) */
  largeTitle: {
    fontFamily,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
  },
  /** 28pt — major section headers */
  title1: {
    fontFamily,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
  },
  /** 22pt — sub-section headers */
  title2: {
    fontFamily,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  /** 20pt — minor section headers */
  title3: {
    fontFamily,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
  },
  /** 17pt semibold — emphasized body */
  headline: {
    fontFamily,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
  /** 17pt — default text */
  body: {
    fontFamily,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  /** 16pt — secondary content */
  callout: {
    fontFamily,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
  },
  /** 15pt — supporting text */
  subheadline: {
    fontFamily,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  /** 13pt — timestamps, labels */
  footnote: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  /** 12pt — small labels */
  caption1: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  /** 11pt — fine print */
  caption2: {
    fontFamily,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
  },
} as const;

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
