"""
wsgi.py – PythonAnywhere WSGI entry point
─────────────────────────────────────────
PythonAnywhere's WSGI server imports this file and looks for a callable
named `application`.

In the PythonAnywhere Web tab → WSGI configuration file, replace the
auto-generated content with a path reference to THIS file, e.g.:

    /home/<your_username>/salary-ai-platform/wsgi.py

The WSGI file configured in PythonAnywhere's dashboard should then
contain just:

    import sys, os
    sys.path.insert(0, '/home/<your_username>/salary-ai-platform')
    from wsgi import application

(See the deployment guide for the exact content.)
"""

import sys
import os
from pathlib import Path

# ── Ensure the project root is on the Python path ──────────────────
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# ── Optional: load .env if present (not needed on PythonAnywhere   ──
# ── when env vars are set via the Web tab → Environment variables) ──
from dotenv import load_dotenv
dotenv_path = PROJECT_ROOT / ".env"
if dotenv_path.exists():
    load_dotenv(dotenv_path)

# ── Import the Flask app ────────────────────────────────────────────
from app import app as application  # noqa: F401  (PythonAnywhere looks for `application`)

# Expose `app` as well for compatibility
app = application
