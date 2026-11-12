import json
from pathlib import Path
from typing import Any


def read_json_object(path: Path) -> dict[str, Any]:
    """Read a UTF-8 JSON object and report invalid input clearly."""
    try:
        with path.open(encoding="utf-8") as config_file:
            data: object = json.load(config_file)
    except UnicodeDecodeError as error:
        raise ValueError(f"Configuration is not valid UTF-8: {path}") from error
    except json.JSONDecodeError as error:
        raise ValueError(f"Configuration is not valid JSON: {path}") from error

    if not isinstance(data, dict):
        raise ValueError("Configuration root must be a JSON object")
    return data
