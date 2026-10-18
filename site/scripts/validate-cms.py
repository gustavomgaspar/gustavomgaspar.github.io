#!/usr/bin/env python3
"""
Valida a integração CMS ↔ conteúdo:
  1. config.yml é YAML válido e tem backend + collections
  2. cada campo (name) declarado existe no JSON correspondente
  3. JSONs de conteúdo são parseáveis

Uso:  python3 site/scripts/validate-cms.py
"""
import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
CONFIG = ROOT / "site/public/admin/config.yml"
CONTENT_FILES = {
    "site/content/settings.json",
    "site/content/home.json",
}

errors: list[str] = []
warnings: list[str] = []


def lookup(obj, dotted):
    cur = obj
    for part in dotted.split("."):
        if isinstance(cur, list):
            try:
                cur = cur[int(part)]
            except (ValueError, IndexError):
                return None
        elif isinstance(cur, dict):
            cur = cur.get(part)
        else:
            return None
    return cur


def check_fields(fields, data, prefix=""):
    for f in fields:
        name = f.get("name")
        widget = f.get("widget")
        if name is None or widget in ("hidden",):
            continue
        path = f"{prefix}.{name}" if prefix else name
        val = lookup(data, name)
        if val is None and f.get("required", True):
            errors.append(f"campo ausente no JSON: {path}")
        elif val is None:
            warnings.append(f"campo opcional ausente (ok): {path}")
        # listas/objetos: desce (relative ao dado atual, só o display acumula)
        subfields = f.get("fields")
        field = f.get("field")
        if subfields and isinstance(val, list):
            for i, item in enumerate(val):
                sub = item if isinstance(item, dict) else {"value": item}
                check_fields(subfields, sub, f"{path}.{i}")
        elif subfields and isinstance(val, dict):
            check_fields(subfields, val, path)
        elif field and isinstance(val, list):
            for i, item in enumerate(val):
                if isinstance(item, dict):
                    check_fields([field], item, f"{path}.{i}")
                # lista de strings: item é o valor puro — nada a checar


def main():
    config = yaml.safe_load(CONFIG.read_text())

    if config.get("backend", {}).get("name") != "github":
        errors.append("backend.name deve ser github")
    if not config.get("backend", {}).get("repo"):
        errors.append("backend.repo ausente")
    if not config.get("collections"):
        errors.append("nenhuma collection definida")

    for col in config.get("collections", []):
        for entry in col.get("files", []):
            file_path = entry.get("file")
            if not file_path:
                errors.append(f"collection {col['name']}: file ausente")
                continue
            if file_path not in CONTENT_FILES:
                warnings.append(f"arquivo fora de content/: {file_path}")
            try:
                data = json.loads((ROOT / file_path).read_text())
            except Exception as e:
                errors.append(f"{file_path}: JSON inválido ({e})")
                continue
            check_fields(entry.get("fields", []), data)

    for w in warnings:
        print(f"  aviso: {w}")
    if errors:
        for e in errors:
            print(f"  ERRO: {e}")
        sys.exit(1)
    print("CMS: config e conteúdo em sincronia ✓")


if __name__ == "__main__":
    main()
