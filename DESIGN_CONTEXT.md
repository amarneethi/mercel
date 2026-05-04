# Mercel — Design Context for AI Agents

This document captures the layout structure, design system conventions, and aesthetic choices used throughout this codebase. Use it as the source of truth when generating, modifying, or reviewing UI code.

---

## What This App Is

Mercel is a Vercel-inspired frontend deployment platform demo. It is built with **Next.js App Router** and uses a custom internal design system component library called **`aopends`**.

---

## Stack

| Layer             | Choice                                             |
| ----------------- | -------------------------------------------------- |
| Framework         | Next.js 15 (App Router)                            |
| Language          | JavaScript (JSX)                                   |
| Styling           | Tailwind CSS v4 + CSS custom properties (`--ds-*`) |
| Component library | `aopends` (internal, imported from local yalc)     |
| Icons             | `lucide-react`                                     |
| Typography        | Geist Sans + Geist Mono (Google Fonts via Next.js) |

---

## Design Token System

All colors, spacing radii, and shadows are accessed via CSS custom properties defined by `aopends`. **Never hardcode colors.** Always use these tokens via Tailwind's arbitrary value syntax.

### Background tokens

| Token                    | Meaning                                     |
| ------------------------ | ------------------------------------------- |
| `var(--ds-bg-primary)`   | Page/card background (white in light theme) |
| `var(--ds-bg-secondary)` | Subtle section backgrounds, info bars       |
| `var(--ds-bg-tertiary)`  | Deeper inset areas, code pill backgrounds   |
| `var(--ds-bg-hover)`     | Hover state for interactive rows/buttons    |
| `var(--ds-bg-selected)`  | Active/selected tab or toggle state         |

### Text tokens

| Token                      | Meaning                                                 |
| -------------------------- | ------------------------------------------------------- |
| `var(--ds-text-primary)`   | Main body text, headings                                |
| `var(--ds-text-secondary)` | Supporting labels, metadata                             |
| `var(--ds-text-tertiary)`  | De-emphasised — timestamps, icon fill                   |
| `var(--ds-text-brand)`     | Brand-colored links and emphasis (e.g. deployment URLs) |

### Border tokens

| Token                        | Meaning                              |
| ---------------------------- | ------------------------------------ |
| `var(--ds-border-primary)`   | Default card/divider borders         |
| `var(--ds-border-secondary)` | Hover-state border upgrades          |
| `var(--ds-border-brand)`     | Active tab underlines, brand accents |

### Radius tokens

| Token                 | Use                               |
| --------------------- | --------------------------------- |
| `var(--ds-radius-sm)` | Small chips, code pills           |
| `var(--ds-radius-md)` | Buttons, inputs, small containers |
| `var(--ds-radius-lg)` | Cards, modals, panels             |

### Shadow tokens

| Token                 | Use                                               |
| --------------------- | ------------------------------------------------- |
| `var(--ds-shadow-lg)` | Floating panels, dropdowns, notification popovers |

### Usage pattern in Tailwind

```jsx
className =
  'bg-[var(--ds-bg-primary)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)]';
```

---

## App Layout & Route Structure

```
/                                → Overview (project dashboard)
/project/[id]                    → Project detail (tabbed)
/project/[id]/deployments/[id]   → Deployment detail (build logs)
/dsshowcase                      → Design system component showcase
```

### Page shell pattern

Every page follows this structure:

```jsx
<div className="min-h-screen bg-[var(--ds-bg-primary)]">
  <Header logo={<Logo />} productName="..." items={[...]} actions={...} />

  {/* Optional sub-header (project pages only) */}
  <div className="bg-[var(--ds-bg-primary)]">
    <div className="max-w-6xl mx-auto px-6 pt-4 pb-0">
      <Breadcrumb ... />
      <Tabs ... />
    </div>
  </div>

  <main className="max-w-6xl mx-auto px-6 py-6">
    {/* page content */}
  </main>
</div>
```

**Content width:** always constrained to `max-w-6xl mx-auto px-6`.

---

## Global Header

Uses the `Header` component from `aopends`. On every page it includes:

- **Left:** triangle SVG logo + product/account name
- **Center nav:** horizontal page-level nav links (`items` prop)
- **Right actions:** ghost `Button`s (Feedback, Changelog, Help, Docs), a bell icon button, and a `w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500` avatar circle

The triangle logo SVG is always:

```jsx
const Logo = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2L2 22h20L12 2z' />
  </svg>
);
```

---

## Overview Page (`/`)

**Toolbar row:**

- `Search` component (flex-1, placeholder "Search Repositories and Projects...")
- `Dropdown` for sort order (activity / name / created)
- Grid/list view toggle: two `<button>` elements inside a shared bordered container
- Primary `Button` with `Plus` icon for "Add New..."

**Project grid:**

- `grid grid-cols-2 gap-4` in grid mode, `flex flex-col gap-3` in list mode
- Each card: `border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4 bg-[var(--ds-bg-primary)] hover:border-[var(--ds-border-secondary)] transition-colors`
- Card header row: framework-colored 40×40 avatar (initial letter, `rounded-lg`), project name + URL, activity icon button + `OverflowMenu`
- Body: GitHub icon + repo name, then commit info row with `GitCommit` / `GitBranch` icons and a `Tag` for status

**Framework avatar colors** (hardcoded, not tokenized):

```js
const frameworkColors = {
  'Next.js': '#000',
  SvelteKit: '#ff3e00',
  'Create React App': '#61dafb',
  Astro: '#ff5d01',
  Vite: '#646cff',
};
```

---

## Project Detail Page (`/project/[id]`)

**Sub-header** (sits between `Header` and `<main>`):

- `Breadcrumb` with avatar icon on the first item (same gradient circle as nav)
- Right: `Button` row — Repository (secondary), Usage (secondary), Domains (secondary), Visit (primary)
- `Tabs` component with `variant="pill"`, `size="md"`

**Tabs available:** Project, Deployments, Analytics, Speed Insights, Logs, Firewall, Storage, Settings

### Project tab content pattern

Section titles: `<h2 className="font-semibold text-[var(--ds-text-primary)]">` with an optional `<p className="text-sm text-[var(--ds-text-secondary)]">` subtitle beneath.

Section header rows with actions:

```jsx
<div className='flex items-center justify-between mb-3'>
  <div>
    <h2 className='font-semibold text-[var(--ds-text-primary)]'>Title</h2>
    <p className='text-sm text-[var(--ds-text-secondary)]'>Subtitle</p>
  </div>
  <div className='flex gap-2'>
    <Button variant='secondary' size='sm' icon={<SomeIcon size={14} />}>
      Action
    </Button>
  </div>
</div>
```

Inline info bar (push-to-deploy hint):

```jsx
<div className='mt-3 p-3 bg-[var(--ds-bg-secondary)] rounded-[var(--ds-radius-md)] flex items-center justify-between'>
  <p className='text-sm text-[var(--ds-text-secondary)]'>...</p>
  <Button variant='ghost' size='sm'>
    Learn More
  </Button>
</div>
```

Active branch list rows (divided list inside a bordered container):

```jsx
<div className='border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden'>
  <div
    className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''} hover:bg-[var(--ds-bg-hover)]`}
  >
    ...
  </div>
</div>
```

Code pill pattern (used inline for branch names, commit hashes):

```jsx
<code className='text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]'>main</code>
```

---

## Deployment Detail Page

**Build log viewer** — a dark terminal-style panel with a `bg-[#0f172a]` (slate-950) background. Log lines are colored by type using hardcoded hex values (not design tokens — intentionally evokes a terminal aesthetic):

| Line type | Color          |
| --------- | -------------- |
| `phase`   | `#e2e8f0` bold |
| `command` | `#94a3b8`      |
| `output`  | `#cbd5e1`      |
| `success` | `#4ade80`      |
| `error`   | `#f87171`      |
| `warning` | `#fbbf24`      |
| `info`    | `#7dd3fc`      |
| `divider` | `#334155`      |

**Sidebar** (right column, ~30% width): build phase timeline, deployment metadata, action buttons. Main content area: scrollable log stream.

---

## `aopends` Component Usage Conventions

Import all components from `'aopends'`:

```js
import { Button, Header, Tabs, Tag, Toast, Modal, ... } from 'aopends';
```

Import styles and theme in `layout.js` only:

```js
import 'aopends/styles.css';
import 'aopends/themes/light';
```

Wrap the app in `<ThemeProvider>` at the root layout level.

### Button intents used in this app

- `primary` — main CTA (Add New, Deploy, Visit)
- `secondary` — secondary actions (Repository, Domains, Build Logs)
- `ghost` — low-emphasis actions (Help, Feedback, Learn More, icon-only buttons)
- `danger` — destructive actions (Delete)

### Tag intents used in this app

| Status               | Intent    |
| -------------------- | --------- |
| Ready                | `success` |
| Building             | `info`    |
| Error                | `danger`  |
| Canceled             | `default` |
| No production deploy | `default` |

### Toast usage

Always controlled with `open` + `onClose` + `duration={3000–4000}`. Intent matches the action result (`success` for create, `info` for info/delete, `danger` for errors).

---

## Iconography

All icons are from `lucide-react`. Common sizes:

- `size={16}` — header/toolbar actions
- `size={14}` — card body icons, button icons
- `size={12}` — inline metadata (branch, commit)
- `size={13}` — project sub-header button icons
- `size={32}` — empty state icons

Icons always receive a color class from design tokens when used standalone:

```jsx
<GitBranch size={14} className="text-[var(--ds-text-secondary)]" />
<GitCommit size={12} className="text-[var(--ds-text-tertiary)]" />
```

---

## Aesthetic Taste Notes

- **Minimal chrome.** No sidebar navigation — a single top `Header` with flat nav links. Content is always in a centered max-width container.
- **Dense but breathable.** Cards carry a lot of info (status, branch, commit, URL) but use small text sizes (`text-xs`, `text-sm`) and tight spacing to stay compact without feeling cramped.
- **Borders over shadows.** Cards use `border` to delineate; shadows only appear on floating overlays (notifications, dropdowns). No decorative shadows on cards.
- **Hover upgrades, not fills.** Interactive cards upgrade their border on hover (`hover:border-[var(--ds-border-secondary)]`); rows get a subtle fill (`hover:bg-[var(--ds-bg-hover)]`). Nothing bold.
- **Terminal contrast for logs.** The build log viewer deliberately breaks the light-mode token system and goes full dark (slate-950 background, bright terminal colors). This contrast is intentional — it signals "you are now in a technical zone."
- **Framework identity.** Project avatars use framework brand colors as their background — this is the only place brand colors outside the `--ds-*` system appear in cards.
- **Vercel-inspired vocabulary.** "Production Deployment," "Active Branches," "Instant Rollback," "Speed Insights," "Firewall" — the UX language mirrors Vercel intentionally as this is a demo/homage.

---

## Typography

### Fonts

Two fonts are loaded globally via Next.js `Geist` and `Geist_Mono` and exposed as CSS variables:

| Variable            | Font       | Usage                                                        |
| ------------------- | ---------- | ------------------------------------------------------------ |
| `--font-geist-sans` | Geist Sans | All UI text — body, labels, headings, buttons                |
| `--font-geist-mono` | Geist Mono | Deployment IDs, commit hashes, branch names, terminal output |

`font-family` on `<body>` falls back to `Arial, Helvetica, sans-serif` if Geist fails to load (defined in `globals.css`).

Apply mono font explicitly where needed:

```jsx
<Link className="font-mono">dpl_AbCd1234</Link>
<code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded">main</code>
```

Inline `<code>` elements automatically render in the system monospace stack. For styled mono text outside a `<code>` tag, add `font-mono` explicitly.

---

### Type Scale

The app uses a narrow band of the Tailwind scale. No heading elements larger than `text-base` (`font-semibold`) appear in the main UI — this is intentional; the design avoids large display text.

| Class       | Size | Where used                                                                                               |
| ----------- | ---- | -------------------------------------------------------------------------------------------------------- |
| `text-xs`   | 12px | Metadata labels, timestamps, inline code pills, tag content, commit hashes, icon-accompanied info rows   |
| `text-sm`   | 14px | Card body text, section subtitles, settings nav items, table cell content, modal body, notification text |
| `text-base` | 16px | Default / implicit — rarely set explicitly; used by `aopends` components internally                      |

**There are no `text-lg`, `text-xl`, or larger classes used directly in page/tab code.** Section headings use `text-sm` or `text-base` size achieved via `font-semibold` weight alone, not larger text.

---

### Font Weight

| Class           | Weight | Where used                                                            |
| --------------- | ------ | --------------------------------------------------------------------- |
| `font-medium`   | 500    | Active settings nav items, deployment ID links, minor emphasis        |
| `font-semibold` | 600    | Section headings (`<h2>`, `<h3>`), card project names, column headers |
| `font-bold`     | 700    | Avatar initials, user badge initials                                  |

`font-normal` (400) is the implicit default — never set explicitly.

---

### Text Color Patterns

Text color always comes from design tokens. The mapping from semantic role to token is consistent across every page:

| Role                       | Token                      | Example context                                             |
| -------------------------- | -------------------------- | ----------------------------------------------------------- |
| Primary body / headings    | `var(--ds-text-primary)`   | Section headings, card names, table cells                   |
| Supporting / metadata      | `var(--ds-text-secondary)` | Subtitles, repo names, timestamps, placeholder labels       |
| De-emphasised / decorative | `var(--ds-text-tertiary)`  | Icon fill, divider text, very low-priority metadata         |
| Brand / interactive        | `var(--ds-text-brand)`     | Deployment URL links, active nav items, selected state text |

**Exceptions (hardcoded semantic colors, not design tokens):**

These appear only in specific, intentional contexts and should not be extended:

| Color                                             | Context                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------- |
| `text-red-600` / `text-red-500`                   | Danger zone heading in Settings, error status icons                          |
| `text-green-500` / `text-green-600`               | Success status icons, HTTP 2xx status codes in Logs                          |
| `text-amber-600`                                  | HTTP 4xx status codes in Logs                                                |
| `text-blue-600`                                   | HTTP 3xx status codes in Logs                                                |
| `text-red-400`, `text-green-400`, `text-blue-400` | Build phase status labels inside the dark terminal panel (deployment detail) |
| `text-white`                                      | Avatar initials overlaid on colored backgrounds                              |

---

### Spacing Between Text and Surrounding Elements

Consistent vertical rhythm is achieved with `mb-*` on headings and `space-y-*` on containers:

| Pattern                             | Spacing                      | Example                                                      |
| ----------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| Section heading → subtitle          | `mb-1`                       | `<h2 ...>Title</h2><p className="text-sm ...">Subtitle</p>`  |
| Section heading group → content     | `mb-3` or `mb-4`             | After a `flex items-center justify-between` header row       |
| Settings card heading → helper text | `mb-1` then `mb-4`           | `<h3>` → `<p>` → form field                                  |
| Sidebar filter label → control      | `mb-2`                       | Section label above a `Select` or `Checkbox` group           |
| Table/list rows                     | `space-y-0.5` or `space-y-2` | Settings nav items, checkbox groups                          |
| Tab content sections                | `space-y-6`                  | Wrapping `<div>` in ProjectTab, space between major sections |

---

### Special Typography Contexts

**Section divider labels (Logs sidebar):**

```jsx
<h3 className='text-xs font-semibold text-[var(--ds-text-secondary)] uppercase tracking-wider mb-2'>Filters</h3>
```

This is the one place `uppercase tracking-wider` appears — used only for sidebar category headers, not for any inline or card text.

**Build log terminal (deployment detail page):**
Log text is rendered with `font-family: 'Geist Mono', monospace` inline styles at `12px` or `text-xs`, with `line-height: 1.6`. Colors are hardcoded (see log color table in the Deployment Detail Page section). This zone intentionally bypasses the design token system.

**Inline code in body text:**

```jsx
<code className='text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]'>main</code>
```

Used for branch names and commit hashes embedded in prose. The `rounded` here is not `rounded-[var(--ds-radius-sm)]` — it uses Tailwind's default `rounded` (4px) to stay tight.

**Table column headers (DeploymentsTab via `DataTable`):**
Column header strings are passed as `SCREAMING_SNAKE_CASE` uppercase strings (`'DEPLOYMENT'`, `'STATUS'`, `'SOURCE'`) — the `DataTable` component handles rendering those as uppercase labels. Do not add extra `uppercase` classes outside of `DataTable` column config.

---

## Wireframe System (LIE_WIREFRAME.md)

The repo also contains a wireframe generator prompt (`LIE_WIREFRAME.md`) for producing low-fidelity HTML wireframes. Key constraints for that system (separate from the actual app):

- Black/white/transparent palette only
- Four element types only: `<body>` (Frame), `<div>` (Rectangle), `<p>` (Text), `<i>` (Icon)
- Tailwind utility classes + Lucide icons via CDN
- No JavaScript except `lucide.createIcons()`
- No border-radius, no shadows, no color outside the palette

This wireframe system is **not** how the app itself is built — it is a separate prompt used to generate layout sketches.
