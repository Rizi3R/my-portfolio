# Portfolio Architecture

Overview of the application structure, content pipeline, multilingual setup, and optional visitor API.

## 1. Frontend Structure

`src/App.tsx` renders the main portfolio view (`portfolio`) by default and switches cleanly between secondary views (`trace`, `atlas`, `plain`, `receipt`) via URL query/hash state (`?view=...`, `?case=...`, `#...`). Secondary views and modals (`TraceView`, `AtlasView`, `PlainView`, `ReceiptSection`, `TheLab`, `ResumeModal`) are code-split with `React.lazy`.

- **Primary Sections**:
  - `HeroSection`: Introduction, owner-provided role scope, quick résumé/case-study actions, and an illustrative triage workflow diagram.
  - `ProjectsSection`: Four Selected Work case studies rendered from `CASE_STUDIES` (`case-lark-migration`, `case-integrations`, `case-pos-triage`, `case-store-launch`).
  - `TimelineSection`: Experience timeline (`emart24 Malaysia`, `HWC Coffee Malaysia (Palaterium Sdn Bhd)`, `Managed print services`, and the diploma internship at the `Attorney General's Chambers of Malaysia`).
  - `ConstellationSection`: Four-group capability summary (`Application Support`, `Business Systems & SaaS`, `IT Operations & Helpdesk`, `Technical Foundations`) plus entry point to `AtlasView`.
  - `CredentialsSection`: UiTM Diploma, AWS Certified Cloud Practitioner credential, AI Teach Malaysia completed program, and an isolated Currently Learning entry for UiPath / RPA.
  - `AboutSection`: Background narrative and entry points to `TheLab`, `TraceView`, `AtlasView`, and `InteractiveTerminal`.
  - `ContactSection` & `Footer`: Email copy helper, LinkedIn link, résumé modal trigger, and `LanguageSelector`.
- **Overlays & Navigation Aids**:
  - `Navbar`, `CommandPalette` (`Ctrl+K` / `Cmd+K`), `ResumeModal` / `ResumeDocument` (print styles in `src/index.css`), and focus trapping via `src/utils/useDialogFocusTrap.ts`.

## 2. Content & Multilingual Pipeline

- **Canonical Data (`src/data/universeContent.ts`)**: Stores profile metadata, `SKILL_GROUPS`, `EXPERIENCES`, `CASE_STUDIES`, `EDUCATION`, `CERTIFICATIONS`, `LEARNING_ENTRIES`, `STRATA`, `NODES`, and `EDGES`.
- **Locale Bundles (`src/i18n/`)**:
  - `src/i18n/config.ts` defines the four supported locales (`en-MY`, `ms-MY`, `zh-Hans-MY`, `ta-MY`) and resolves active locale from URL `?lang=`, `localStorage`, or default `en-MY`.
  - `src/i18n/translations/` provides typed `LocaleBundle` modules (`ui` + `content`).
  - `src/i18n/I18nContext.tsx` supplies translations via `useI18n()` and synchronizes `<html lang>` and `dir`.
- **Automated Content & i18n Checks**:
  - `scripts/validate-content.ts` checks employment dates, case ordering, prohibited rating/proficiency fields, forbidden overclaims, node `evidenceRef` integrity, and UiPath learning isolation.
  - `scripts/validate-i18n.ts` asserts exact parity between `en-MY` and `universeContent.ts`, 100% recursive key/placeholder/array parity across all 4 locales, and non-English translation completeness.

## 3. Visitor Counter Endpoint (`/api/visitors`)

- `api/_visitorCore.ts` holds shared validation, origin checks, Redis REST command helpers, and HMAC-SHA256 hashing helpers (`createHashedIp`, `createVisitorFingerprint`).
- `api/visitors.ts` implements the Vercel serverless handler; `server.ts` provides local Express parity alongside Vite dev middleware (or static `dist/` serving when `NODE_ENV=production`).
- Both entry points require a non-empty `VISITOR_HASH_SALT` of at least 16 characters. If `VISITOR_HASH_SALT` (or Redis credentials on Vercel) is missing or weak, `/api/visitors` returns HTTP `200` with `{ configured: false, count: null, deduplicated: false }` and performs no hashing or persistence.

## 4. Scope & Limitations

- The frontend UI does not currently call or display `/api/visitors`; the endpoint exists purely as an optional backend counter service.
- `vite.config.ts` sets `build.sourcemap: false` so TypeScript source maps are excluded from `dist/`.
- `tests/visitors.test.ts` exercises `/api/visitors` request validation, secret guards, and HMAC-SHA256 behavior with a mocked `fetch`; live Upstash Redis calls are not run during offline CI checks.
