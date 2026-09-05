# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Frontend-only **gym membership management** app (React 18 + Vite). Backend is a **separate Django app** — do not look for the API here. This is a Time-in/Time-out (DTR) + facial-login + subscription system for a gym.

## Commands

- **Dev**: `npm run dev` (Vite)
- **Build**: `npm run build`; preview built output with `npm run preview`
- **Lint**: `npm run lint` (ESLint, `--max-warnings 0`). **No ESLint config file exists**, so lint is unreliable — treat it as a hint, not a gate.
- **Tests**: **None.** This is plain `.js`/`.jsx` (no TypeScript, no test runner). Don't assume one exists.
- Verification is manual: run the Django backend (see below) + `npm run dev`/`preview` and exercise the flow in a browser.

## Backend coupling (critical)

- Axios base URL is **hardcoded** in `src/others/axiosInstance.js` → `http://127.0.0.1:8000` (a LAN alt `192.168.2.97:8001` is commented out). There is **no `.env`**; the URL is not configurable at runtime. The Django backend must be running or every API call fails.
- All API access goes through hand-rolled Axios functions in `src/getData/` (GET) and `src/postData/` (POST); most import the shared instance via the `@others/axiosInstance` alias.

## Path aliases (Vite, `vite.config.js`)

`@`→`src`, plus `@components`, `@assets`, `@hooks`, `@utils`, `@getData`, `@pages`, `@others`, `@store`, `@svg`. **No alias** exists for `src/reducers`, `src/constants`, `src/context` — older files use relative imports, newer ones use aliases. Match the surrounding file's style.

## Data & state architecture

- **Zustand** stores live in `src/store/` and in nested feature store dirs (e.g. `src/components/face-scanner/store/numpadStore.js`). Use the store module most specific to the feature.
- `src/reducers/` are plain `useReducer` reducers — **not Redux** (Redux is not a dependency; don't import a Redux package).
- Data fetching combines **TanStack React Query** (`src/hooks/`, e.g. `useGenericQueryHook`) with the hand-rolled `getData` functions. `main.jsx` wraps the app in a `QueryClientProvider`.
- Routes are defined in `src/routes/Approutes.jsx` via `createBrowserRouter`. Page identifiers come from `src/constants/enum.js` (`PageName`).

## User-photo pipeline (performance-sensitive — do not bypass)

User photos are loaded through a deliberate, cache-aware flow:
1. `getImagePath(id)` → `src/getData/getImagePath.js` returns `{ image1 }` path(s).
2. `loadImageData(path)` → `src/getData/loadImageData.js` does a HEAD (to read `etag`/`content-length`/`last-modified`), serves a cached object URL if metadata matches, otherwise fetches a blob and caches it. `clearImageCache()` revokes URLs.
3. `src/utils/mapWithConcurrency.js` runs image enrichment over user lists **concurrently (batch ~6)** — see `getUsers.js` and `useGetActiveUsers.js` for the pattern.

**Reuse this pipeline.** Do not add raw base64 / naive per-image `<img src>` fetching that bypasses the object-URL cache — it caused multi-minute login-page hangs (see session notes). The login page (`/user-login`, facial login) is the most performance-sensitive screen; keep its user query lean (e.g. the `useLoginUsers` hook) and image loading concurrency-limited.

## Routing / pages

Two separate login flows exist: `/user-login` (facial/camera) and `/user-login-daypass`. The `/` route uses `MainLayoutNew` (`src/layouts/MainLayout.jsx`) wrapping `DashboardPageNew`.

## Duplication / legacy (check before adding)

The codebase has coexisting old and new implementations of the same thing. Before writing a new variant, find the newest existing one:
- Layouts: `src/components/layout/mainLayout.jsx` (old) vs `src/layouts/MainLayout.jsx` (`MainLayoutNew`, used at `/`).
- Dashboard: `src/pages/DashboardPage.jsx` (legacy) vs `src/pages/DashboardPageNew/`.
- Face scanner: `FaceScanner.jsx`, `FaceScannerNew.jsx`, `FaceScannerNew2.jsx`, `FaceScannerNew3.jsx` (newest).
- Image loading hooks: `useFetchImage`, `useFetchImageRefactor`, `useLoadImageData`, plus `src/components/face-scanner/hooks/useFetchImage.js`.
- Various `mySection/*` vs `pages/*New/` section components.

## Git workflow

- Current branch: `refactor_face_recognition` (remote: `james3288/flex-pro-frontend`). History merges from `staging_new`; `main`/`master` are protected.
- Do not edit unless the working tree is committed. Create a feature branch before editing (`git checkout -b ...`), and **never** commit directly to protected branches.
- Use conventional commit messages (`feat:`, `fix:`, `refactor:`).
- Session notes are saved to `docs/agent-sessions/<date>-session.md` (goal, files changed, commands) — follow this pattern for new work.

## Other gotchas

- `src/assets/js/` holds large **minified vendor bundles** (bootstrap.min.js, masonry, jQuery). Never edit; treat as third-party.
- Global styles are custom CSS in `src/assets/css/`; a `.scss` file also exists (e.g. `facescannernew2.scss`) — Sass is available.
- `dist/` and `graphify-out/` are generated/build artifacts — ignore. The `graphify` skill can be used for codebase questions.