# taste-kit

인터랙션 중심 모바일 앱을 위한 Expo React Native 보일러플레이트. Claude Code AI 워크플로우(에이전트, 커맨드, 스킬, 훅)가 포함되어 있으며, 인터랙션 품질이 핵심 차별점인 앱 개발에 특화.

## 기술 스택

- **Expo SDK 54** + Expo Router (파일 기반 라우팅)
- **React Native Reanimated 4** (UI 스레드 애니메이션)
- **React Native Gesture Handler 2.x** (Gesture API)
- **TypeScript** (strict 모드)

## AI 워크플로우

`~/.claude/`에 전역 설치되는 4계층 구조:

```
Agents (WHO)     — ideator, planner, developer, interaction, qa, release
Commands (WHAT)  — /plan, /build, /verify, /checkpoint, /tdd, /qa, ...
Skills (KNOWLEDGE) — apple-hig, reanimated, coding-standards, ...
Hooks (AUTO)     — console.log 체크, prettier, verify-before-commit, ...
```

자세한 내용은 [AI-WORKFLOW.md](./AI-WORKFLOW.md) 참조.

### 기본 워크플로우

```
/plan [feature]       → 아키텍처 + UI 패턴 + 단계별 태스크
/build [screen]       → 구현
/verify               → 타입체크 + 린트
/checkpoint           → 검증 + 커밋
```

## 설치

```bash
npm install
npx expo start
```

## 프로젝트 구조

```
app/                  # Expo Router 화면
components/ui/        # 재사용 UI 컴포넌트
hooks/                # 커스텀 훅
lib/                  # 유틸리티, API 클라이언트
constants/            # 디자인 토큰, 애니메이션 프리셋
types/                # TypeScript 타입 정의
```

## 라이선스

Private
