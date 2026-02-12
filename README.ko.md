# taste-kit

인터랙션 중심 모바일 앱을 위한 Expo React Native 보일러플레이트. Claude Code AI 워크플로우(에이전트, 커맨드, 스킬, 훅)가 포함되어 있으며, 인터랙션 품질이 핵심 차별점인 앱 개발에 특화.

## 기술 스택

- **Expo SDK 54** + Expo Router (파일 기반 라우팅)
- **React Native Reanimated 4** (UI 스레드 애니메이션)
- **React Native Gesture Handler 2.x** (Gesture API)
- **TypeScript** (strict 모드)
- **Biome** (린트 + 포맷팅)
- **pnpm** (패키지 매니저)
- **i18next** (i18n — 한국어/영어)
- **Supabase** (백엔드 — 인증, 데이터베이스, 스토리지)
- **Jest** + React Native Testing Library (테스트)

## 포함된 컴포넌트

### 애니메이션 훅

- **`useScalePress`** — 탭 피드백 (스프링 스케일/투명도 + 햅틱). 요소별 설정 가능.
- **`useEntrance`** — 조합 가능한 마운트 애니메이션 (fade, slideY, slideX, scale) + 딜레이 지원.

### UI 컴포넌트

- **`AnimatedPressable`** — `useScalePress` + `GestureDetector`를 사용한 탭 래퍼.
- **`Button`** — 4 변형 (primary, secondary, destructive, ghost), 3 크기, loading/disabled 상태, 아이콘 지원.
- **`Card`** — 3 변형 (elevated, outlined, filled), 패딩 설정 가능.
- **`Sheet`** — `@gorhom/bottom-sheet` 래퍼. 배경, 스냅 포인트, 동적 사이징.

### 인프라

- **i18n** — `lib/i18n/` ko/en 로케일, 루트 레이아웃에서 자동 초기화.
- **Supabase** — `lib/supabase.ts` 클라이언트, `expo-secure-store` 인증 어댑터.
- **AppProviders** — 루트 프로바이더 래퍼 (`GestureHandlerRootView`).
- **디자인 토큰** — Apple HIG 색상 (라이트/다크), 8pt 스페이싱 그리드, 11단계 타이포그래피, 레이아웃 상수.
- **애니메이션 프리셋** — 스프링 설정 (gentle, snappy, bouncy, stiff), 타이밍 설정, 탭 피드백 기본값.

## AI 워크플로우

`~/.claude/`에 전역 설치되는 4계층 구조:

```
Agents (WHO)     — ideator, planner, developer, interaction, qa, release
Commands (WHAT)  — /plan, /build, /verify, /checkpoint, /tdd, /qa, ...
Skills (KNOWLEDGE) — apple-hig, reanimated, coding-standards, ...
Hooks (AUTO)     — console.log 체크, biome 포맷, verify-before-commit, ...
```

자세한 내용은 [AI-WORKFLOW.md](./AI-WORKFLOW.md) 참조.

### 기본 워크플로우

```
/plan [feature]       → 아키텍처 + UI 패턴 + 단계별 태스크
/build [screen]       → 구현
/verify               → 타입체크 + 린트 + 테스트
/checkpoint           → 검증 + 커밋
```

## 설치

```bash
pnpm install
npx expo start
```

### Supabase (선택)

`.env` 파일 생성:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 프로젝트 구조

```
app/                  # Expo Router 화면
components/ui/        # 재사용 UI 컴포넌트 (Button, Card, Sheet, AnimatedPressable)
hooks/                # 애니메이션 훅 (useScalePress, useEntrance)
lib/                  # i18n, Supabase 클라이언트
constants/            # 디자인 토큰, 애니메이션 프리셋
providers/            # 앱 레벨 프로바이더
types/                # TypeScript 타입 정의
```

## 테스트

```bash
pnpm test             # 전체 테스트 실행
pnpm test:watch       # 워치 모드
```

## 라이선스

MIT
