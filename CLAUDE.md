# taste-kit

Interaction-first Expo React Native app template. Personal boilerplate for building apps with high visual taste.

## Philosophy

**taste** = the sensitivity to quality across four domains:

- **product** — what to build, what problem to solve, what to include and exclude
- **visual** — how it looks and feels: layout, typography, color, spacing + timing, easing, gestures, haptics
- **technical** — code structure, abstraction level, cleanliness
- **distribution** — market, positioning, pricing, content that resonates

This template covers all four, with a deliberate emphasis on **visual**.
The method: interaction-driven design — motion, gesture, haptic feedback as first-class concerns.

## Tech Stack

- Expo SDK 54 + Expo Router (file-based routing)
- React Native 0.81 + TypeScript strict
- react-native-reanimated 4 + react-native-gesture-handler
- @shopify/react-native-skia (shader graphics)
- Zustand (state) + expo-sqlite (local DB)
- i18next (i18n, ko/en)
- Biome (lint + format)

## Architecture

```
src/
├── components/
│   ├── ui/            # 16 UI components (single-file each)
│   ├── onboarding/    # Onboarding funnel
│   ├── graphics/      # Skia shader components
│   └── demo/          # Demo screen components
├── constants/         # Design tokens + animation presets
├── hooks/             # useColorScheme
├── lib/               # database, haptics, fonts, i18n
├── providers/         # AppProviders (root wrapper)
├── stores/            # Zustand stores
└── types/             # Type declarations

app/
├── (tabs)/            # Tab navigation (Home, Explore)
├── demo/              # Component demo routes
├── onboarding.tsx
├── graphics.tsx
└── modal.tsx
```

## UI Components

All in `src/components/ui/`, single file per component.

| Component | File | Purpose |
|-----------|------|---------|
| AnimatedPressable | animated-pressable.tsx | Tap feedback container (scale + opacity + haptic) |
| BottomSheet | bottom-sheet.tsx | @gorhom/bottom-sheet wrapper, snap points |
| Button | button.tsx | 4 variants × 3 sizes, loading, icon |
| Checkbox | checkbox.tsx | Animated checkmark |
| Collapse | collapse.tsx | Animated expand/collapse |
| Dialog | dialog.tsx | Compound component, 3D perspective animation |
| Divider | divider.tsx | List separator |
| Dropdown | dropdown.tsx | Tap + Pan dropdown (two components) |
| ErrorBoundary | error-boundary.tsx | Crash fallback + retry |
| ExpandableBottomSheet | expandable-bottom-sheet.tsx | Detached card → full expansion |
| Image | image.tsx | expo-image wrapper |
| Skeleton | skeleton.tsx | Loading pulse animation |
| Tag | tag.tsx | 5 variants (default, success, warning, error, info) |
| Text | text.tsx | Typography component, 10 variants |
| TextInput | text-input.tsx | Styled input with label/error |
| Toast | toast.tsx | Imperative toast + provider, stacked animations |

## Design Tokens

`src/constants/design-tokens/` — Apple HIG-based.

- **Colors**: 14 semantic tokens per scheme (light/dark)
- **Spacing**: 8pt grid — xs(4), sm(8), md(16), lg(24), xl(32), 2xl(48)
- **Typography**: 10 scale variants (hero → caption)
- **Layout**: touchTarget(44), radiusSm/Md/Lg, separator

## Theme Pattern

Single pattern across entire codebase — no exceptions:

```tsx
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks';

const colorScheme = useColorScheme();
const colors = Colors[colorScheme];
// use colors.background, colors.accent, etc.
```

`useColorScheme` (custom hook) respects user preference (system/light/dark) via Zustand.

## Providers

`src/providers/app-providers.tsx` — wraps entire app:

```
GestureHandlerRootView → ErrorBoundary → SQLiteProvider → ToastProviderWithViewport → children
```

## AI Workflow

See `AI-WORKFLOW.md` for agents, commands, skills, and hooks configuration.
