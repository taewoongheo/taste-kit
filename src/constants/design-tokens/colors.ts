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
