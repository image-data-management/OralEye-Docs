import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class TestCustomScssSmoke(unittest.TestCase):
    def test_custom_scss_contains_key_rules(self):
        scss_path = REPO_ROOT / "custom.scss"
        text = scss_path.read_text(encoding="utf-8")

        # Brand/nav styling
        self.assertIn("$navbar-bg", text)
        self.assertIn(".navbar-nav .nav-link.active", text)

        # Left sidebar tinting (Quarto DOM selectors)
        self.assertIn("#quarto-sidebar.sidebar-navigation", text)

        # Margin notes/captions
        self.assertIn(".column-margin", text)

        # Inter font applied via SCSS variables
        self.assertIn('"Inter"', text)


if __name__ == "__main__":
    unittest.main()
