import tempfile
import unittest
from pathlib import Path

from config_reader import read_json_object


class ReadJsonObjectTests(unittest.TestCase):
    def test_reads_a_json_object(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            config_path = Path(temporary_directory) / "config.json"
            config_path.write_text('{"enabled": true}', encoding="utf-8")

            self.assertEqual(read_json_object(config_path), {"enabled": True})

    def test_rejects_malformed_json(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            config_path = Path(temporary_directory) / "config.json"
            config_path.write_text("{", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "valid JSON"):
                read_json_object(config_path)

    def test_rejects_non_object_roots(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            config_path = Path(temporary_directory) / "config.json"
            config_path.write_text("[]", encoding="utf-8")

            with self.assertRaisesRegex(ValueError, "JSON object"):
                read_json_object(config_path)


if __name__ == "__main__":
    unittest.main()
