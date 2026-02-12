# AI Workflow Guide

Claude Code 기반 AI 워크플로우. 인터랙션에 특화된 Expo RN 앱 개발을 위한 에이전트, 커맨드, 스킬, 훅 구성.

모든 설정은 `~/.claude/`에 전역 설치되어 있어 어떤 프로젝트에서든 동일하게 사용 가능.

---

## 전체 구조

```
4 Layer Architecture
─────────────────────────────────────────────────

Agents (WHO — 자동 위임)
  ideator → planner → developer / interaction → qa → release

Commands (WHAT — 수동 호출)
  /plan → /build → /verify → /checkpoint
           ↑
     /design (선택적)  /interaction-spec  /interaction-audit
     /tdd  /code-review  /qa  /refactor-clean  /release

Skills (KNOWLEDGE — 자동 로드)
  기획: concept-mapping, behavioral-psychology
  디자인: apple-hig (+ UI/UX 패턴 선택), animation-principles
  인터랙션: interaction-design, accessibility
  개발: reanimated, expo-rn, coding-standards, tdd-workflow
  배포: app-store

Hooks (AUTOMATION — 자동 실행)
  Edit/Write 후: console.log 체크, prettier
  git commit 전: verify (tsc + lint)
  민감 파일: 편집 차단
```

### 기본 워크플로우

```
/plan (아키텍처 + UI 패턴 결정)
  ↓
/build (구현)  ←──  /interaction-spec (L2 화면)
  ↓
/verify (검증)
  ↓
/checkpoint (커밋)
```

### 디자인 토큰 흐름

```
apple-hig (지식) → constants/design-tokens.ts (보일러플레이트)
                        ↓
coding-standards: tokens 우선, 확장 가능, 1회성 인라인 허용
                        ↓
developer가 import, 필요 시 직접 확장
```

---

## Agents (자동 위임)

직접 호출하지 않음. Claude가 작업 성격에 따라 자동으로 위임.

| Agent | Model | 역할 |
|-------|-------|------|
| `ideator` | opus | 아이디어 카드 → 구체적 feature-interaction 매핑, L1/L2 분류, 감정 여정 |
| `planner` | sonnet | 유저 플로우, 화면 구조, UI/UX 패턴 결정, 데이터 모델, 구현 페이즈 분리 |
| `developer` | sonnet | Expo RN 구현, Reanimated + Gesture Handler |
| `interaction` | opus | 기술적 인터랙션 설계 + 60fps 성능 감사 |
| `qa` | sonnet | 완성도/접근성/인터랙션 품질 검증 |
| `release` | sonnet | 앱스토어 빌드 + 제출 + 후속 모니터링 |

### ideator vs planner 분리 이유

```
ideator (창의적)                 planner (분석적)
─────────────────               ─────────────────
아이디어 카드 입력               feature-interaction 맵 입력
  ↓                               ↓
메타포 → 화면/기능 매핑          유저 플로우 설계
L1/L2 인터랙션 분류              기술 아키텍처 결정
감정 여정 설계                   UI/UX 패턴 결정 (HIG 기반)
충실도 우선순위                   데이터 모델 + 의존성
심리학 기반 검증                  구현 페이즈 분리 + 리스크 평가
  ↓                               ↓
feature-interaction 맵           구현 계획 (UI 패턴 포함)
```

아이디어 자체는 `~/Desktop/thought/`에서 별도 생성. ideator는 그 아이디어를 구체적 기능으로 연결하는 역할.

---

## Commands (수동 호출)

`/커맨드명`으로 호출. 고정된 워크플로우를 실행.

### 개발 사이클

```
/plan → /build → /verify → /checkpoint
        ↑
  /design (선택적, 복잡한 L2 화면만)
```

| Command | 용도 | 사용 시점 |
|---------|------|----------|
| `/plan` | 기획 + UI 패턴 결정 (메타포 앱은 ideator → planner) | 새 기능/화면 시작 시 |
| `/design` | 복잡한 화면 레이아웃 심화 (선택적) | L2-Core 등 복잡한 화면만 |
| `/build` | 기능 구현 | 코드 작성 시 |
| `/verify` | tsc + lint 빠른 검증 | 코드 변경 후 수시로 |
| `/checkpoint` | 검증 + 커밋 | 논리적 단위 완료 시 |

### 인터랙션

| Command | 용도 | 사용 시점 |
|---------|------|----------|
| `/interaction-spec` | 모션/제스처 스펙 작성 | 인터랙션 설계 시 |
| `/interaction-audit` | 기존 애니메이션 성능 감사 | 인터랙션 구현 후 |

### 품질 관리

| Command | 용도 | 사용 시점 |
|---------|------|----------|
| `/tdd` | Red→Green→Refactor 사이클 | 테스트 주도 개발 시 |
| `/code-review` | 코드 품질 + 보안 리뷰 | PR 전, 주요 변경 후 |
| `/qa` | 종합 QA (완성도/접근성/인터랙션) | 커밋 또는 릴리스 전 |
| `/refactor-clean` | 데드 코드 제거 + 단순화 | 정리가 필요할 때 |

### 릴리스

| Command | 용도 | 사용 시점 |
|---------|------|----------|
| `/release` | 버전 범프 → 빌드 → 스토어 제출 | 앱스토어 배포 시 |

### verify 모드

```
/verify          → tsc + lint (기본, 가장 빠름)
/verify full     → tsc + lint + test + build
/verify pre-commit → tsc + lint + 변경 파일 테스트
```

### qa 모드

```
/qa              → 전체 검사
/qa quick        → 완성도 + 빌드만
/qa [path]       → 특정 파일/디렉토리만
```

---

## Skills (자동 로드)

호출하지 않음. 관련 파일 작업 시 자동으로 도메인 지식이 로드됨.

### 기획/설계

| Skill | 트리거 | 내용 |
|-------|--------|------|
| `concept-mapping` | 기획/컨셉 관련 | 메타포→기능 매핑, L1/L2 분류, 충실도 우선순위 |
| `behavioral-psychology` | 기획/리텐션 관련 | 커밋먼트, 손실 회피, 피크엔드, 소유 효과, 플로우 |

### 디자인/인터랙션

| Skill | 트리거 | 내용 |
|-------|--------|------|
| `apple-hig` | UI/디자인/기획 작업 | 색상, 타이포, 간격, 컴포넌트 패턴, **UI/UX 패턴 선택 규칙** |
| `animation-principles` | 애니메이션 관련 | 이징 판단, 타이밍 규칙, 실전 팁 (Emil Kowalski) |
| `interaction-design` | 모션/제스처 설계 | Two-Layer 시스템, 햅틱 매트릭스, 제스처 체크리스트 |
| `accessibility` | 인터랙티브 컴포넌트 | VoiceOver, 터치 타겟, 제스처 대안 |

### 개발

| Skill | 트리거 | 내용 |
|-------|--------|------|
| `reanimated` | 애니메이션 코드 | Reanimated 4 API, 워크릿, 제스처 통합 |
| `expo-rn` | 프로젝트 구조/라우팅 | Expo Router, Supabase 연동, EAS |
| `coding-standards` | `.ts/.tsx` 작성 | 타입 규칙, 네이밍, import 순서, **디자인 토큰 사용 규칙** |
| `tdd-workflow` | `.test.ts/.tsx` 작성 | Jest 패턴, mock 전략, 커버리지 가이드 |

### 배포

| Skill | 트리거 | 내용 |
|-------|--------|------|
| `app-store` | 릴리스 준비 | 메타데이터, 프라이버시, 리젝 사유 |

---

## Hooks (자동 실행)

호출하지 않음. 특정 이벤트 시 자동으로 실행됨.

| Hook | 시점 | 동작 |
|------|------|------|
| `check-console-log` | 파일 Edit/Write 후 | console.log/warn 잔존 시 경고 |
| `prettier-after-edit` | 파일 Edit/Write 후 | 자동 코드 포맷팅 |
| `verify-before-commit` | `git commit` 전 | tsc + lint 실패 시 커밋 차단 |
| `protect-sensitive-files` | 파일 Edit/Write 전 | `.env`, credentials 편집 차단 |

---

## 워크플로우 예시

### 메타포 앱 — 아이디어 카드에서 시작

```
/plan --idea [카드]  → ideator + planner (아키텍처 + UI 패턴)
/interaction-spec    → L2-Core 화면 우선
/build               → 구현
/verify → /checkpoint
```

### 프리랜스/일반 기능

```
/plan [feature]  → planner만 (ideator 스킵)
/build
/verify → /checkpoint
```

### 기타

```
/tdd useAuth                          # TDD로 훅 개발
/interaction-audit → /qa → /release   # 릴리스 전 점검
(코드 수정) → /verify → /checkpoint   # 빠른 버그 수정
```

---

## 파일 위치

```
~/.claude/
├── agents/          # 6개 에이전트
│   ├── ideator.md       # 컨셉 → 기능 매핑 (opus)
│   ├── planner.md       # 아키텍처 + UI 패턴 + 구현 계획 (sonnet)
│   ├── developer.md     # 코드 구현 (sonnet)
│   ├── interaction.md   # 인터랙션 스펙 + 성능 (opus)
│   ├── qa.md            # 품질 검증 (sonnet)
│   └── release.md       # 앱스토어 배포 (sonnet)
├── commands/        # 12개 커맨드
├── skills/          # 11개 스킬
│   ├── concept-mapping/       # 메타포→기능 매핑 원칙
│   ├── behavioral-psychology/ # 행동 심리학
│   ├── apple-hig/             # Apple HIG + UI/UX 패턴 선택
│   ├── animation-principles/  # 애니메이션 원칙 (Emil Kowalski)
│   ├── interaction-design/    # 인터랙션 설계
│   ├── reanimated/            # Reanimated 4
│   ├── expo-rn/               # Expo RN 패턴
│   ├── coding-standards/      # 코딩 표준 + 토큰 사용 규칙
│   ├── tdd-workflow/          # TDD 패턴
│   ├── accessibility/         # 접근성
│   └── app-store/             # 앱스토어
├── hooks/           # 5개 훅 스크립트
└── settings.json    # 훅 설정
```
