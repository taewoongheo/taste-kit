import { Platform } from 'react-native';

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
