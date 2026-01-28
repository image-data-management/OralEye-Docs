import shutil
import subprocess
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


class TestQuartoRenderSmoke(unittest.TestCase):
    def test_render_html_smoke(self):
        if shutil.which("quarto") is None:
            self.skipTest("quarto not found on PATH; skipping render smoke test")

        output_dir = REPO_ROOT / "__test__" / ".tmp_site"

        # Ensure a clean output directory.
        if output_dir.exists():
            shutil.rmtree(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)

        try:
            cmd = [
                "quarto",
                "render",
                "--to",
                "html",
                "--output-dir",
                str(output_dir.relative_to(REPO_ROOT)),
            ]
            proc = subprocess.run(
                cmd,
                cwd=str(REPO_ROOT),
                capture_output=True,
                text=True,
            )
            if proc.returncode != 0:
                self.fail(
                    "Quarto render failed\n"
                    f"Command: {' '.join(cmd)}\n\n"
                    f"STDOUT:\n{proc.stdout}\n\nSTDERR:\n{proc.stderr}\n"
                )

            # Core expected pages (high-signal regression check)
            self.assertTrue((output_dir / "index.html").exists())
            self.assertTrue((output_dir / "ifu" / "index.html").exists())
            self.assertTrue((output_dir / "regulatory" / "index.html").exists())
            self.assertTrue((output_dir / "tutorials" / "index.html").exists())

        finally:
            # Keep things tidy so `_site/` remains the only major build dir.
            if output_dir.exists():
                shutil.rmtree(output_dir)


if __name__ == "__main__":
    unittest.main()
