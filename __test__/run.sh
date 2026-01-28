#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

python3 -m unittest discover -s __test__ -p 'test_*.py' -v
