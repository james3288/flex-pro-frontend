# AGENTS.md

Frontend-only **gym membership management** app (React 18 + Vite). Backend is a **separate Django app**; do not look for the API here.

## Global Agent Rules (team-wide, always apply)
### Git Workflow
1. Do not start editing unless the current branch is committed. If there are uncommitted/pushed changes, stop and have the user commit and push first.
2. Create a new branch before editing: `git checkout -b agent/<short-task-name>`.
3. **Never** commit directly to `main` or `master` (protected).
4. Use conventional commit messages: `feat:`, `fix:`, `refactor:`.
5. After finishing changes: run tests → run linters → ensure the project builds.

### Session Handling
After each agent run/session:
1. Export the session for traceability: `opencode export`.
2. Save a summary in `docs/agent-sessions/<date>-session.md` containing goal, files changed, and commands run.

### Mandatory
- Never make changes unless the current branch is committed.
- Always create a git branch before editing code.
- Never modify protected branches.
- Always run tests before committing.
- Always export the session on each completed agent run.

Note (repo reality): there are no tests or typecheck in this repo, and `npm run lint` is unreliable (no ESLint config) — see Commands below. Build = `npm run build`.

## Commands
- Dev: `npm run dev` (Vite)
- Build: `npm run build`; Preview built output: `npm run preview`
- Lint: `npm run lint` (ESLint, `--max-warnings 0`). **No ESLint config file exists**, so lint may fail to run — scripts are here but treat it as unreliable.
- **No tests and no typecheck**: the codebase is plain `.js`/`.jsx` (no TypeScript). Don't assume a test runner.

## Backend coupling (critical)
- Axios base URL is **hardcoded** in `src/others/axiosInstance.js` → `http://127.0.0.1:8000` (a LAN alt is commented out). There is no `.env`; the URL is not configurable at runtime. The Django backend must be running or every API call fails.
- All API access goes through hand-rolled Axios functions in `src/getData/` (GET) and `src/postData/` (POST); most import the shared instance from `@others/axiosInstance`.
- User photos use a **performance-sensitive pipeline**: `getImageData/getImagePath` returns a path, then `loadImageData` loads it via HEAD+GET blob and returns an **object URL with caching** (`src/getData/loadImageData.js`). Reuse this; do not add raw base64 / naive image fetching that bypasses the cache.

## Path aliases (Vite)
`@`→`src`, plus `@components`, `@assets`, `@hooks`, `@utils`, `@getData`, `@pages`, `@others`, `@store`, `@svg`. Note: there is **no alias** for `src/reducers`, `src/constants`, `src/context` — older files use relative imports, newer ones use aliases. Match the surrounding file's style.

## State & data patterns
- **Zustand** stores live in `src/store/` and in nested store dirs (e.g. `src/components/face-scanner/store/numpadStore.js`). Use the store module most specific to the feature.
- `src/reducers/` are plain `useReducer` reducers — **not Redux** (Redux is not a dependency). Don't import from a Redux package.
- Data fetching combines **TanStack React Query** hooks (`src/hooks/`, e.g. `useGenericQueryHook`) with the hand-rolled `getData` functions.

## Duplication / legacy (check before adding)
The codebase has coexisting old and new implementations of the same thing. Before writing a new variant, look for the newest existing one:
- Layouts: `src/components/layout/mainLayout.jsx` (old) vs `src/layouts/MainLayout.jsx` (exported as `MainLayoutNew`, used at the `/` route).
- Dashboard: `src/pages/DashboardPage.jsx` (legacy) vs `src/pages/DashboardPageNew/`.
- Face scanner: `FaceScanner.jsx`, `FaceScannerNew.jsx`, `FaceScannerNew2.jsx`, `FaceScannerNew3.jsx`.
- Image loading: `useFetchImage` vs `useFetchImageRefactor` vs `useLoadImageData` vs `useFetchImage` (in `components/face-scanner/hooks`).
- Two login routes exist: `/user-login` (facial/camera) and `/user-login-daypass`.

## Other gotchas
- `src/assets/js/` holds large **minified vendor bundles** (bootstrap.min.js, masonry, jQuery). Never edit these; treat as third-party assets.
- Global styles are custom CSS in `src/assets/css/`; a `.scss` file also exists (e.g. `facescannernew2.scss`) — Sass is available.
- Key pages/routes are defined in `src/routes/Approutes.jsx`; page identifiers come from `src/constants/enum.js` (`PageName`).
- Active git branch is `staging` (remote: `james3288/flex-pro-frontend`); history shows merges of `staging_new` into `staging`.
- `graphify-out/` and `dist/` are generated/build artifacts — ignore. The `graphify` skill can be used for codebase questions.
