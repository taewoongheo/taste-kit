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

// ─── Spacing ────────────────────────────────────────────

export const Spacing = {
  /** 8pt — related elements, icon-text gaps */
  xs: 8,
  /** 12pt — compact spacing */
  sm: 12,
  /** 16pt — standard padding/margin */
  md: 16,
  /** 24pt — section gaps */
  lg: 24,
  /** 32pt — major sections */
  xl: 32,
  /** 48pt — screen-level separation */
  '2xl': 48,
} as const;

// ─── Typography (Semantic scale) ─────────────────────────

const fontFamily = Platform.select({
  ios: 'System',
  default: 'sans-serif',
});

export const Typography = {
  /** 34pt Bold — 온보딩, 빈 화면 헤더 */
  hero: {
    fontFamily,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
  },
  /** 22pt Bold — 화면/섹션 제목 */
  title: {
    fontFamily,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  /** 17pt SemiBold — 카드 헤더, 리스트 그룹 */
  subtitle: {
    fontFamily,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
  /** 17pt Regular — 본문 텍스트 */
  body: {
    fontFamily,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  /** 15pt Medium — 폼 라벨, 버튼, 탭 */
  label: {
    fontFamily,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  /** 13pt Regular — 타임스탬프, 보조 정보 */
  caption: {
    fontFamily,
    fontSize: 13,
    lineHeight: 18,
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
