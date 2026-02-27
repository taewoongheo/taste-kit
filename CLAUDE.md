# 필수 룰

## 색상
- `Colors[colorScheme]` 토큰만 사용. `'#000000'` 같은 하드코딩 금지
- 패턴: `const colors = Colors[useColorScheme()]`
- 토큰에 없는 색상이 필요하면 자주 사용되는 핵심 컬러만 `design-tokens/colors.ts`에 추가. 일회성 색상은 컴포넌트 파일 상단에 상수로 선언

## 텍스트
- `@/components/ui`의 `<Text>` 컴포넌트만 사용. RN `<Text>` 직접 사용 금지
- UI 문자열은 i18next 사용 (`t('key')`). 컴포넌트 내 한국어/영어 하드코딩 금지

## 권한
- 네이티브 API(카메라, 갤러리, 알림 등) 사용 전 반드시 권한 요청

## 스타일
- `StyleSheet.create` 사용. 인라인 스타일은 동적 값(`colors`, 계산값)만 허용
- 간격은 `Spacing` 토큰 사용. 매직 넘버 금지
