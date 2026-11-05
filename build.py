#!/usr/bin/env python3
"""Assemble src/pages/*.html with the shared partials into docs/ (served by GitHub Pages)."""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "docs"

partials = {name: (SRC / "partials" / f"{name}.html").read_text() for name in ("head", "header", "footer")}
META = re.compile(r"<!--\s*(\w+):\s*(.*?)\s*-->\n?")

for page in sorted((SRC / "pages").glob("*.html")):
    body = page.read_text()
    meta = dict(META.findall(body))
    body = META.sub("", body)

    head = partials["head"].replace("{{title}}", meta["title"]).replace("{{description}}", meta["description"])
    header = partials["header"]
    nav = meta.get("nav")
    if nav:
        header = header.replace(f'data-nav="{nav}" href', f'data-nav="{nav}" aria-current="page" href')
        header = header.replace(f'class="nav-link" data-nav="{nav}" aria-expanded', f'class="nav-link is-current" data-nav="{nav}" aria-expanded')

    scripts = "".join(f'<script src="assets/js/{name}"></script>\n' for name in meta.get("scripts", "").split())
    footer = partials["footer"].replace("{{page_scripts}}\n", scripts)

    (OUT / page.name).write_text(head + header + body + footer)
    print(f"built docs/{page.name}")
