import logging
import os
import sys
from datetime import datetime
from pathlib import Path

# ─────────────────────────────────────────────────────────────────
# Log directory resolution
#
# On PythonAnywhere the project directory may be read-only (e.g. under
# /var/www), so we write logs to ~/salary_ai_platform/logs/ instead.
# Falls back to <project_root>/logs/ for local development.
# ─────────────────────────────────────────────────────────────────

def _resolve_log_dir() -> Path:
    # Use project-local logs/ if it is writable (local dev)
    root_dir = Path(__file__).resolve().parent.parent
    local_log = root_dir / "logs"
    try:
        local_log.mkdir(parents=True, exist_ok=True)
        # Quick write test
        test_file = local_log / ".write_test"
        test_file.touch()
        test_file.unlink()
        return local_log
    except OSError:
        pass

    # Fallback: writable home directory (PythonAnywhere)
    home_log = Path.home() / "salary_ai_platform" / "logs"
    home_log.mkdir(parents=True, exist_ok=True)
    return home_log


LOG_DIR = _resolve_log_dir()

# Log file name with current date and time
LOG_FILE = f"{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.log"
LOG_FILE_PATH = LOG_DIR / LOG_FILE

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="[ %(asctime)s ] %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(str(LOG_FILE_PATH)),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)