# taste-kit

Expo React Native boilerplate for building interaction-focused mobile apps. Comes with a Claude Code AI workflow — agents, commands, skills, and hooks — designed for apps where interaction quality is the core differentiator.

## Stack

- **Expo SDK 54** + Expo Router (file-based routing)
- **React Native Reanimated 4** (UI-thread animations)
- **React Native Gesture Handler 2.x** (Gesture API)
- **TypeScript** (strict mode)

## AI Workflow

4-layer architecture installed globally at `~/.claude/`:

```
Agents (WHO)     — ideator, planner, developer, interaction, qa, release
Commands (WHAT)  — /plan, /build, /verify, /checkpoint, /tdd, /qa, ...
Skills (KNOWLEDGE) — apple-hig, reanimated, coding-standards, ...
Hooks (AUTO)     — console.log check, prettier, verify-before-commit, ...
```

See [AI-WORKFLOW.md](./AI-WORKFLOW.md) for full details.

### Quick Workflow

```
/plan [feature]       → architecture + UI patterns + phased tasks
/build [screen]       → implementation
/verify               → typecheck + lint
/checkpoint           → verify + commit
```

## Setup

```bash
npm install
npx expo start
```

## Project Structure

```
app/                  # Expo Router screens
components/ui/        # Reusable UI components
hooks/                # Custom hooks
lib/                  # Utilities, API clients
constants/            # Design tokens, animation presets
types/                # TypeScript definitions
```

## License

Private
