# Workflow: styling + layout for OralEye Quarto docs

This note is for a fresh agent inheriting the repo. It focuses on **how the site looks and navigates** (Quarto config + SCSS overrides), what decisions were made, and what to be careful about.

## 1) Where styling and layout live

Primary sources of truth:

- `_quarto.yml`
  - Owns site structure (navbar + sidebars), layout grid, HTML/PDF format defaults, and execution defaults.
- `custom.scss`
  - Owns visual identity overrides (colors, typography, navbar “tabs”, left sidebar tint, margin-note styling, etc.).

Secondary / examples:

- `contribute.qmd`
  - Contains canonical authoring examples, especially the `::: {.column-margin}` pattern.

Build output (not edited directly):

- `_site/` is generated output. It should stay untracked/ignored.

## 2) Current Quarto website structure (navigation model)

The site is a Quarto **website** project:

- `project.type: website`
- `project.output-dir: _site`

### Navbar (top)

The navbar is used as the “global section switcher”. Current entries:

- Home → `index.qmd`
- Instructions For Use → `ifu/index.qmd`
- Regulatory → `regulatory/index.qmd`
- Tutorials → `tutorials/index.qmd`
- Contribute → `contribute.qmd` (right side)
- GitHub icon (right side)

SCSS makes navbar links feel like “tabs” (active page highlighted).

### Sidebars (left)

There are four sidebar configs under `website.sidebar:`

- **Site**: only `index.qmd`
- **Instructions For Use**: the IFU tree (overview, intended use, device description, safety/operation, support)
- **Regulatory**: index + clearance + symbols + version history
- **Tutorials**: currently only `tutorials/index.qmd`

Important behavior:

- `collapse-level: 0` is intentional so sections are expanded by default.
- `style: docked` is used for “Site”, “IFU”, and “Tutorials” (Regulatory currently has no explicit `style`, relying on default behavior).

## 3) Layout decisions (TOC and margin column)

### Global HTML TOC is disabled

In `_quarto.yml`:

- `format.html.toc: false`

Intent:

- Avoid redundant navigation (left sidebar already provides structure).
- Keep the right margin available for margin notes/captions rather than “On this page”.

### Margin column remains enabled

In `_quarto.yml`:

- `format.html.grid.margin-width: 320px`

This is deliberate: the margin column is used for `column-margin` blocks (callouts/captions), not the TOC.

### If a page sets `toc: true`

If any page overrides to `toc: true`, Quarto will typically place the TOC in the margin column (depending on theme/layout). `custom.scss` includes styling for the TOC container in `#quarto-margin-sidebar`.

## 4) Reader mode is off (sidebar disappearance “gotcha”)

In `_quarto.yml`:

- `website.reader-mode: false`

Reason:

- Reader mode can hide the left sidebar after load. It looked like a “sidebar flashing/disappearing” bug, but was effectively a UI mode toggle.

If a user reports the sidebar vanishing, check reader mode and the browser’s persisted state.

## 5) Visual identity (SCSS overrides)

The site theme is:

- Bootswatch `flatly` + `custom.scss`

`custom.scss` uses SCSS variable overrides + targeted selectors.

### Color system

Key SCSS variables:

- `$primary: #2563eb` (blue)
- `$navbar-bg: #1e3a8a` (deep blue)
- `$navbar-fg: #f1f5f9` (light text)

These affect both Bootstrap-derived components and custom rules.

### Typography

Font is set to Inter:

- `_quarto.yml` injects Google Fonts via `format.html.include-in-header`.
- `custom.scss` sets `$font-family-sans-serif: "Inter", ...`.

Headings are slightly heavier:

- `$headings-font-weight: 600`

### Navbar “tabs” styling

Key rules in `custom.scss`:

- `.navbar` gets background, subtle border, and shadow.
- `.navbar-nav .nav-link` gets padding, rounded corners, and a transparent border.
- `.navbar-nav .nav-link.active` and `[aria-current="page"]` get a tinted background and border to look tab-like.

### Left sidebar tint + active item

Target:

- `#quarto-sidebar.sidebar-navigation`

Behavior:

- Sidebar has a light blue background and right border.
- Hover state highlights links.
- Active link uses stronger background and a left border accent.

These selectors are Quarto-specific and assume Quarto’s DOM IDs/classes stay stable.

### Margin notes / captions

Target:

- `.column-margin`

This is the canonical pattern for notes/captions placed into the margin column. The SCSS makes these look like a soft bordered card.

Authoring pattern (see `contribute.qmd`):

```markdown
::: {.column-margin}
Key point: ...
:::
```

### TOC panel styling (only if TOC exists)

Targets:

- `#quarto-margin-sidebar nav#TOC`
- `#quarto-margin-sidebar .toc`

These rules are harmless when `toc: false`; they apply only when a TOC actually exists.

### Tables and callouts

`custom.scss` adds consistent presentation for:

- `.callout` and callout variants (`important`, `warning`, `note`, `tip`)
- `table`, `th`, `td`

Note: the table header uses `$primary` as a solid background.

## 6) Layout sizing (docs-like proportions)

In `_quarto.yml`:

```yaml
format:
  html:
    grid:
      sidebar-width: 320px
      body-width: 980px
      margin-width: 320px
```

Intent:

- A predictable reading column.
- Enough room for margin notes.
- A “docs portal” feel rather than a blog.

## 7) PDF vs HTML differences (styling expectations)

- HTML uses Bootswatch + `custom.scss`.
- PDF uses LaTeX settings under `format.pdf` (e.g., `fancyhdr` headers).

Do not assume SCSS affects PDF output.

## 8) Execution + caching settings that affect preview

In `_quarto.yml`:

- `execute.freeze: auto`
- `execute.cache: true`
- `execute.cache-path: _cache`
- `execute.cache-scope: global`

Implications:

- First preview/render may be slower; subsequent previews can be much faster.
- `_cache/` is intentionally a build artifact; it should remain ignored.

## 9) Practical “how to change X” cheat sheet

- Change the top nav items: edit `website.navbar` in `_quarto.yml`.
- Change the left nav structure: edit `website.sidebar` entries in `_quarto.yml`.
- Change overall widths / margin behavior: edit `format.html.grid` in `_quarto.yml`.
- Change fonts/colors/navbar/sidebar look: edit `custom.scss`.
- Add a margin note: use `::: {.column-margin} ...` in a `.qmd` page.
- Re-enable TOC for a specific page: add YAML front matter `toc: true` to that page.

## 10) Guardrails / non-goals (keep the design consistent)

- Keep `format.html.toc: false` globally unless you intentionally reintroduce right-side TOCs.
- Keep `reader-mode: false` unless you want the sidebar to be user-toggleable (and accept the confusion it can cause).
- Avoid editing `_site/` directly.

## 11) Related (release discipline, not styling)

Publishing is tag-based (e.g., `v1.0.1`) via GitHub Actions. Styling changes should be reviewed like any other content change before tagging a release.
