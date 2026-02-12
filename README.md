# taste-kit

Expo React Native boilerplate for building interaction-focused mobile apps. Comes with a Claude Code AI workflow — agents, commands, skills, and hooks — designed for apps where interaction quality is the core differentiator.

## Stack

- **Expo SDK 54** + Expo Router (file-based routing)
- **React Native Reanimated 4** (UI-thread animations)
- **React Native Gesture Handler 2.x** (Gesture API)
- **TypeScript** (strict mode)
- **Biome** (linting + formatting)
- **pnpm** (package manager)
- **i18next** (i18n — ko/en)
- **Supabase** (backend — auth, database, storage)
- **Jest** + React Native Testing Library (testing)

## Included Components

### Animation Hooks

- **`useScalePress`** — Tap feedback with spring scale/opacity + haptic. Configurable per element.
- **`useEntrance`** — Composable mount animations (fade, slideY, slideX, scale) with delay support.

### UI Components

- **`AnimatedPressable`** — Animated tap wrapper using `useScalePress` + `GestureDetector`.
- **`Button`** — 4 variants (primary, secondary, destructive, ghost), 3 sizes, loading/disabled states, icon support.
- **`Card`** — 3 variants (elevated, outlined, filled) with configurable padding.
- **`Sheet`** — `@gorhom/bottom-sheet` wrapper with backdrop, snap points, dynamic sizing.

### Infrastructure

- **i18n** — `lib/i18n/` with ko/en locales, auto-initialized in root layout.
- **Supabase** — `lib/supabase.ts` client with `expo-secure-store` auth adapter.
- **AppProviders** — Root provider wrapper (`GestureHandlerRootView`).
- **Design Tokens** — Apple HIG colors (light/dark), 8pt spacing grid, 11-level typography scale, layout constants.
- **Animation Presets** — Spring configs (gentle, snappy, bouncy, stiff), timing configs, tap feedback defaults.

## AI Workflow

4-layer architecture installed globally at `~/.claude/`:

```
Agents (WHO)     — ideator, planner, developer, interaction, qa, release
Commands (WHAT)  — /plan, /build, /verify, /checkpoint, /tdd, /qa, ...
Skills (KNOWLEDGE) — apple-hig, reanimated, coding-standards, ...
Hooks (AUTO)     — console.log check, biome format, verify-before-commit, ...
```

See [AI-WORKFLOW.md](./AI-WORKFLOW.md) for full details.

### Quick Workflow

```
/plan [feature]       → architecture + UI patterns + phased tasks
/build [screen]       → implementation
/verify               → typecheck + lint + test
/checkpoint           → verify + commit
```

## Setup

```bash
pnpm install
npx expo start
```

### Supabase (optional)

Create a `.env` file:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Project Structure

```
app/                  # Expo Router screens
components/ui/        # Reusable UI components (Button, Card, Sheet, AnimatedPressable)
hooks/                # Animation hooks (useScalePress, useEntrance)
lib/                  # i18n, Supabase client
constants/            # Design tokens, animation presets
providers/            # App-level providers
types/                # TypeScript definitions
```

## Testing

```bash
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
```

## License

MIT
