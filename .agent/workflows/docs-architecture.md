# OralEye Docs: Architecture + Workflow

Date: 2026-01-28

## What this repo is
- This repository is a **Quarto website** project.
- Source content is written in `.qmd` files.
- The rendered website output is written to `_site/` (configured in `_quarto.yml`).

### Key folders
- `index.qmd`: site landing page.
- `ifu/`: “Instructions For Use” content (Quarto `.qmd`).
- `regulatory/`: regulatory content (Quarto `.qmd`).
- `images/`: static assets.
- `_site/`: rendered output (HTML, search index, site libs). Treat as build artifact; do not edit by hand.

### Project configuration
- `_quarto.yml` defines:
  - `project.type: website`
  - `project.output-dir: _site`
  - Navbar + sidebars for IFU and Regulatory sections
  - HTML theme (`cosmo` + `custom.scss`)
  - PDF format settings (TinyTeX/LaTeX may be needed for PDF rendering)

## Local development

### Preview the site
- Use Quarto’s dev server:
  - `quarto preview`
- Notes:
  - Stopping preview with Ctrl-C will exit with a non-zero code (expected).
  - If preview/render fails, run `quarto render` to get a deterministic build error.

### Render
- `quarto render` produces `_site/`.

## Deployment (GitHub Pages)

### Current CI deployment
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- CI builds with:
  - Quarto pinned to `1.4.549`
  - `quarto install tinytex`
  - `quarto render`
  - Upload `_site/` as a Pages artifact
  - Deploy via `actions/deploy-pages@v4`

### Recommended policy for regulated documentation
For FDA/regulated documentation, prefer a workflow with:
- Controlled change review (PRs + required reviewers)
- Audit trail of approvals
- Reproducible builds (CI renders, not developer laptops)
- A clear “release gate” for publishing to GitHub Pages

Recommended approach:
1. Do day-to-day work on branches.
2. Open Pull Requests early; iterate via PR commits.
3. Require reviews + passing checks to merge.
4. Publish only when explicitly approved (one of):
   - Manual CI trigger (`workflow_dispatch`) for deployment, OR
   - Deploy on version tags (e.g. `v1.0.0`), OR
   - Use GitHub environment protection on `github-pages` (requires reviewers before deploy step).

Avoid relying on `quarto publish gh-pages` from a developer machine as the primary release mechanism, because it is harder to prove reproducibility.

## Suggested branching + review workflow (early stage)
- Use short-lived feature branches for additions/edits (e.g. `feat/ifu-overview`, `fix/sidebar-order`).
- Keep `main` as the integration branch.
- Configure branch protection on `main`:
  - Require PR reviews
  - Require status checks (at minimum: Quarto render/build)
  - Optionally require signed commits

## Operational checklists

### Before merging a PR
- Confirm sidebar/nav entries are correct in `_quarto.yml`.
- Confirm `quarto render` succeeds (CI or local).
- Confirm content changes meet internal review expectations.

### Before publishing
- Ensure the release has explicit approval (manual dispatch or environment gate).
- Record the published version (e.g. `Document Version` shown in `_quarto.yml` footer) and link it to a git tag/release.

## Open questions to decide
- Publishing gate: manual dispatch vs tag-based vs environment approval.
- Whether PDF artifacts are required in CI and/or published.
- Versioning scheme: keep “Document Version” in one place and tie it to git tags.
