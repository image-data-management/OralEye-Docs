# Publishing Method (GitHub Pages)

This repository uses **Quarto** to render a documentation website to GitHub Pages.

We are adopting **Option B: tag-based publishing** to build release discipline ahead of 510(k) submission. Day-to-day edits can continue rapidly, but **public publication** is tied to explicit versioned releases.

## Goals

- Enable fast iteration on content without continuously changing the public site.
- Ensure each public publication maps to a specific, immutable git state.
- Maintain a clear, auditable workflow identifying who approved and who performed a release.
- Provide practical ways for reviewers to preview changes before merging and before release.

## Definitions

- **Source**: `.qmd` files and assets in this repository.
- **Rendered site**: output written to `_site/` by Quarto.
- **Release**: a published website update that corresponds to a git tag (e.g. `v0.3.0`).
- **Approver(s)**: named individuals responsible for release approval.
- **Release manager**: the person who creates the tag (or GitHub Release) and triggers publication.

## Publishing Policy (Tag-based)

### What triggers publication

- The public GitHub Pages site should publish **only** from **version tags** on `main`, e.g.:
  - `v0.1.0`, `v0.2.0`, `v1.0.0`

### What does NOT trigger publication

- Normal pushes to feature branches.
- Normal merges/pushes to `main` that are not tagged.

### Why tags

- A tag is an immutable pointer to a specific commit, making it easy to answer:
  - “What exact content is currently published?”
  - “Which changes are in the published documentation vs in-progress edits?”

## Daily Editing Workflow

### 1) Work on branches

- Create a feature branch for each change set.
- Keep PRs small when possible (one theme per PR).

### 2) Preview locally while writing

- Use Quarto’s preview server:
  - `quarto preview`
- Use a full render to validate a clean build:
  - `quarto render`

### 3) Open a Pull Request (PR)

- Use PR review to gate changes into `main`.
- Prefer requiring at least one reviewer for all PRs.

## Previewing Changes (Branch / PR / Main)

We need reviewers to preview changes before merging and before releasing.

### Recommended preview methods

1) **Local preview (fastest for authors)**
   - Authors run `quarto preview` while editing.
   - Good for rapid iteration, but not ideal as the only review mechanism.

2) **PR build artifacts (recommended for reviewers)**
   - CI renders the site for a PR and uploads `_site/` as a downloadable artifact.
   - Reviewers download and open the generated HTML locally (or serve it locally).
   - Benefits:
     - Preview is reproducible (built in CI).
     - No need for reviewers to install Quarto/TinyTeX.

3) **Main preview**
   - `main` can be previewed the same way as PRs:
     - CI builds and attaches artifacts for commits.
     - Or a maintainer can run `quarto preview` locally.

> Note: GitHub Pages itself is reserved for **released tags**, so it remains stable and clearly “official.”

## Release Workflow (How to publish)

### 0) Pre-release checklist

- PRs merged to `main` are reviewed and CI is green.
- Any visible version string in the site (e.g., footer “Document Version”) is updated as appropriate.
- Decide the next tag (semantic versioning recommended).

### 1) Release approval

- A release is approved by the designated approver(s) listed below.
- Approval should be recorded in one of these forms:
  - A GitHub Issue/Discussion titled “Release vX.Y.Z approval” with explicit approval comments.
  - A PR that bumps the version, with required reviewers approving.

### 2) Create the release tag

- The release manager creates an annotated tag on the intended commit on `main`:
  - `vX.Y.Z`

### 3) CI publishes GitHub Pages from the tag

- GitHub Actions renders and deploys the site.
- The published site now corresponds to `vX.Y.Z`.

## Roles and Approvers

### Approvers (must approve every release)

Fill these in and keep them current.

- Primary approver: TBD
- Secondary approver (backup): TBD

### Release managers (may create tags / publish)

Fill these in and keep them current.

- Release manager(s): TBD

### Optional strengthening (as we approach submission)

- Add `CODEOWNERS` so specific files/sections require review.
- Require branch protection on `main`:
  - required reviews
  - required status checks (Quarto render)
- Add a short “release PR” that bumps the displayed document version and links the release tag.

## Versioning Guidance

- Use semantic-ish versioning even during early development:
  - `v0.MINOR.PATCH` is fine for pre-1.0 work.
- Tie the site-visible “Document Version” to the tag name whenever possible.

## Notes

- `_site/` is build output and should not be hand-edited.
- Stopping `quarto preview` with Ctrl-C results in a non-zero exit code (expected).
