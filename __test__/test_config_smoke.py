import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class TestQuartoConfigSmoke(unittest.TestCase):
    def test_quarto_yaml_has_expected_layout_policy(self):
        config_path = REPO_ROOT / "_quarto.yml"
        text = config_path.read_text(encoding="utf-8")

        # Project basics
        self.assertIn("type: website", text)
        self.assertIn("output-dir: _site", text)

        # Navigation + contribution affordances
        self.assertIn("repo-actions: [edit, issue]", text)
        self.assertIn("search: true", text)

        # Guardrail: reader-mode off (sidebar should not vanish)
        self.assertIn("reader-mode: false", text)

        # Guardrail: global HTML TOC off (margin used for notes/captions)
        # Note: this is a text-level assertion to avoid requiring YAML parsing deps.
        self.assertIn("format:\n  html:", text)
        self.assertIn("toc: false", text)

        # Typography: Inter injected via include-in-header
        self.assertIn("fonts.googleapis.com/css2?family=Inter", text)


if __name__ == "__main__":
    unittest.main()
