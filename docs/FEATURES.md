# taste-kit Template Features

인터랙션 특화 Expo React Native 앱 템플릿의 기능 명세.

---

## 1. Design Tokens

**파일**: `src/constants/design-tokens.ts`

Apple HIG 기반 디자인 토큰 시스템.

| Token | 설명 |
|-------|------|
| `Colors` | light/dark 14개 시맨틱 컬러 (background, text, accent, separator 등) |
| `Spacing` | 8pt 그리드 — xs(4), sm(8), md(16), lg(24), xl(32) |
| `Typography` | Apple HIG 타이포그래피 스케일 10종 (largeTitle ~ caption2) |
| `Layout` | margin(16), touchTarget(44), radius(sm/md/lg), separator |

```ts
import { Colors, Spacing, Typography, Layout } from '@/constants';
```

---

## 2. Animation Presets

**파일**: `src/constants/animations.ts`

Reanimated spring/timing 프리셋.

| Preset | 용도 |
|--------|------|
| `Springs.gentle` | 페이지 전환, 큰 요소 |
| `Springs.snappy` | 버튼, 토글 |
| `Springs.bouncy` | 축하, 주목 |
| `Springs.stiff` | 보정, 리셋 |
| `Timings.fast` | 마이크로 인터랙션 (150ms) |
| `Timings.normal` | 표준 전환 (250ms) |
| `Timings.slow` | 느린 전환 (400ms) |
| `TapFeedback` | 탭 피드백 기본값 (scale: 0.97, opacity: 0.8) |

```ts
import { Springs, Timings, TapFeedback } from '@/constants';
```

---

## 3. Animation Hooks

### useScalePress

**파일**: `src/hooks/use-scale-press.ts`

탭 피드백 (scale + opacity + haptic) 을 제공하는 gesture hook.

| Option | Type | Default | 설명 |
|--------|------|---------|------|
| `scale` | `number` | 0.97 | 눌렀을 때 scale |
| `opacity` | `number` | 0.8 | 눌렀을 때 opacity |
| `spring` | `WithSpringConfig` | Springs.snappy | 스프링 설정 |
| `haptic` | `ImpactFeedbackStyle \| null` | Light | 햅틱 스타일 (null로 비활성화) |
| `onPress` | `() => void` | — | 탭 콜백 |
| `disabled` | `boolean` | false | 비활성화 |

**반환값**: `{ gesture, animatedStyle, pressed }`

```tsx
const { gesture, animatedStyle } = useScalePress({ onPress: handleTap });

<GestureDetector gesture={gesture}>
  <Animated.View style={animatedStyle}>...</Animated.View>
</GestureDetector>
```

### useEntrance

**파일**: `src/hooks/use-entrance.ts`

마운트 시 진입 애니메이션 (fade, slide, scale 조합).

| Option | Type | Default | 설명 |
|--------|------|---------|------|
| `fade` | `boolean` | true | 페이드 인 |
| `slideY` | `number` | — | Y축 슬라이드 (px) |
| `slideX` | `number` | — | X축 슬라이드 (px) |
| `scale` | `number` | — | 스케일 진입값 |
| `spring` | `WithSpringConfig` | Springs.gentle | 스프링 설정 |
| `delay` | `number` | 0 | 지연 시간 (ms) |
| `autoPlay` | `boolean` | true | 마운트 시 자동 실행 |

**반환값**: `{ animatedStyle, enter, reset, isVisible }`

```tsx
const { animatedStyle } = useEntrance({ slideY: 20, delay: 100 });

<Animated.View style={animatedStyle}>...</Animated.View>
```

---

## 4. UI Components

### AnimatedPressable

**파일**: `src/components/ui/animated-pressable.tsx`

`useScalePress`를 내장한 범용 탭 가능 컨테이너.

```tsx
<AnimatedPressable onPress={handleTap} scale={0.95}>
  <Text>Tap me</Text>
</AnimatedPressable>
```

### Button

**파일**: `src/components/ui/button.tsx`

4개 variant (primary, secondary, destructive, ghost) × 3개 size (sm, md, lg).
loading 상태, icon 지원, 자동 탭 피드백.

```tsx
<Button title="Submit" variant="primary" size="md" onPress={handleSubmit} />
<Button title="Delete" variant="destructive" loading={isDeleting} />
```

### Card

**파일**: `src/components/ui/card.tsx`

3개 variant (elevated, outlined, filled). 자동 다크모드 대응.

```tsx
<Card variant="elevated" padding={24}>
  <Text>Content</Text>
</Card>
```

### Sheet

**파일**: `src/components/ui/sheet.tsx`

`@gorhom/bottom-sheet` 래퍼. snap points, dynamic sizing, backdrop dismiss 지원.

```tsx
const sheetRef = useRef<BottomSheet>(null);

<Sheet sheetRef={sheetRef} snapPoints={['25%', '50%']}>
  <Text>Sheet content</Text>
</Sheet>
```

---

## 5. State Management (Zustand)

**파일**: `src/stores/app-store.ts`

AsyncStorage 기반 persist 미들웨어가 적용된 Zustand 스토어.

```ts
import { useAppStore } from '@/stores';

// 읽기
const isOnboarded = useAppStore((s) => s.isOnboarded);

// 쓰기
const setOnboarded = useAppStore((s) => s.setOnboarded);
setOnboarded(true);
```

**새 스토어 추가 패턴:**

```ts
// src/stores/my-store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MyState {
  value: string;
  setValue: (v: string) => void;
}

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      value: '',
      setValue: (v) => set({ value: v }),
    }),
    {
      name: 'my-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
```

---

## 6. Local Database (expo-sqlite)

**파일**: `src/lib/database.ts`

SQLite 로컬 DB. `SQLiteProvider`로 앱 전체에 제공됨.

| 설정 | 값 |
|------|-----|
| DB 파일 | `taste-kit.db` |
| Journal mode | WAL |
| Foreign keys | ON |

**테이블 추가 패턴** (`migrate` 함수에 추가):

```ts
export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS my_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
}
```

**쿼리 사용** (컴포넌트에서):

```ts
import { useSQLiteContext } from 'expo-sqlite';

function MyComponent() {
  const db = useSQLiteContext();
  // db.getAllAsync('SELECT * FROM my_table');
}
```

---

## 7. i18n (다국어)

**파일**: `src/lib/i18n/`

i18next + react-i18next. 기본 언어: ko, 폴백: en.

| 파일 | 설명 |
|------|------|
| `locales/ko.json` | 한국어 번역 |
| `locales/en.json` | 영어 번역 |

**기본 키**: `common.ok`, `common.cancel`, `common.done`, `common.delete`, `common.save`, `common.edit`, `common.loading`, `common.error`, `common.retry`, `common.empty`, `tabs.home`, `tabs.explore`

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <Text>{t('common.ok')}</Text>;
}
```

---

## 8. Providers

**파일**: `src/providers/app-providers.tsx`

앱 전체를 감싸는 provider 스택.

```
GestureHandlerRootView
  └─ SQLiteProvider (taste-kit.db, onInit: migrate)
       └─ children
```

**provider 추가 시**: `AppProviders` 내부에 중첩.

---

## 9. Navigation (Expo Router)

**디렉토리**: `app/`

| Route | 설명 |
|-------|------|
| `app/_layout.tsx` | Root Stack (providers, theme) |
| `app/(tabs)/_layout.tsx` | Bottom tabs |
| `app/(tabs)/index.tsx` | Home 탭 |
| `app/(tabs)/explore.tsx` | Explore 탭 |
| `app/modal.tsx` | Modal 화면 |

---

## 10. 개발 도구

| 도구 | 설명 |
|------|------|
| TypeScript | strict mode, `@/*` path alias |
| Biome | lint + format |
| Jest + RNTL | 단위/컴포넌트 테스트 (38 tests) |
| expo-sqlite | 로컬 DB |

---

## 디렉토리 구조

```
src/
├── components/ui/     # UI 컴포넌트 (AnimatedPressable, Button, Card, Sheet)
├── constants/         # 디자인 토큰, 애니메이션 프리셋
├── hooks/             # 커스텀 hooks (useScalePress, useEntrance, useColorScheme, useThemeColor)
├── lib/               # 유틸리티 (database, i18n)
├── providers/         # AppProviders
├── stores/            # Zustand 스토어
└── types/             # 타입 선언
```
