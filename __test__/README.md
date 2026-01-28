# Local regression checks (`__test__/`)

This repo is a Quarto website. Traditional “unit tests” aren’t common here, but you *can* run lightweight regression checks before committing/tagging.

These tests are intentionally:

- **Fast** (mostly text assertions)
- **No extra dependencies** (Python stdlib only)
- **Optional render smoke test** (runs `quarto render --to html`)

## Run

From the repo root:

- `bash __test__/run.sh`

Or directly:

- `python3 -m unittest discover -s __test__ -p 'test_*.py' -v`

## What’s covered

- Quarto config smoke checks (ensures key settings that affect layout don’t drift)
- SCSS smoke checks (ensures key selectors/variables remain present)
- Optional HTML render smoke check (renders the site to a temporary output directory and verifies core pages exist)

## Notes

- The render smoke test uses `quarto render --to html` to avoid PDF/TinyTeX dependencies.
- If `quarto` is not on PATH, the render test is skipped.
