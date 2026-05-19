#!/usr/bin/env python3
"""
Generate Cedar & Clay Avery label / direction print files.

Uses macOS textutil for .doc -> .docx, then minimally patches document.xml
inside the zip (preserves Avery paragraph spacing and original run structure).
"""

from __future__ import annotations

import html
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCES = ROOT / "templates" / "sources"

BRAND = {
    "name": "Cedar & Clay",
    "website": "cedarclaylife.com",
    "phone": "(920) 538-6638",
    "contact": "Samantha Bergstrom",
    "address": "W4187 Blackhawk Ave, Redgranite, WI 54970",
}

BATH_PRODUCTS = [
    "Pink Himalayan Detox Bath",
    "Bentonite Clay Bath Soak",
    "Bath Salt Soak",
]

PARA_RE = re.compile(r"<w:p\b.*?</w:p>", re.DOTALL)
RUN_RE = re.compile(r"<w:r\b.*?</w:r>", re.DOTALL)


def run_textutil_convert(src: Path, fmt: str, dst: Path) -> None:
    subprocess.run(
        ["textutil", "-convert", fmt, str(src), "-output", str(dst)],
        check=True,
        capture_output=True,
    )


def escape_xml(text: str) -> str:
    return html.escape(text, quote=False)


def paragraph_text(p_xml: str) -> str:
    parts = re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p_xml)
    return html.unescape("".join(parts)).strip()


def is_sticker_paragraph(p_xml: str) -> bool:
    return 'w:after="200"' in p_xml and not (
        re.search(r'w:before="43"', p_xml) and re.search(r'w:after="43"', p_xml)
    )


def set_primary_run_lines(p_xml: str, lines: list[str]) -> str:
    """
    Keep Avery w:pPr and all existing w:r wrappers; only replace text in the
    first run and append w:br/w:t siblings inside that same run.
    """
    if not lines:
        lines = [""]

    def patch_first_run(match: re.Match[str]) -> str:
        run = match.group(0)
        run = re.sub(r"<w:t[^>]*>.*?</w:t>", "", run, flags=re.DOTALL)
        run = re.sub(r"<w:br\s*/>", "", run)
        parts: list[str] = []
        for i, line in enumerate(lines):
            if i:
                parts.append("<w:br/>")
            parts.append(f'<w:t xml:space="preserve">{escape_xml(line)}</w:t>')
        return run.replace("</w:r>", "".join(parts) + "</w:r>")

    return RUN_RE.sub(patch_first_run, p_xml, count=1)


def patch_docx_xml(src_docx: Path, dst_docx: Path, transform) -> None:
    shutil.copy2(src_docx, dst_docx)

    with zipfile.ZipFile(src_docx, "r") as zin:
        infos = zin.infolist()
        payload = {info.filename: zin.read(info.filename) for info in infos}

    xml = payload["word/document.xml"].decode("utf-8")
    payload["word/document.xml"] = transform(xml).encode("utf-8")
    ET.fromstring(payload["word/document.xml"])

    with zipfile.ZipFile(dst_docx, "w", zipfile.ZIP_DEFLATED) as zout:
        for info in infos:
            zout.writestr(info, payload[info.filename])


def sticker_lines(product: str) -> list[str]:
    return [BRAND["name"], product, BRAND["website"]]


def transform_single_line_stickers(xml: str, product: str) -> str:
    lines = sticker_lines(product)
    out: list[str] = []
    last = 0
    for match in PARA_RE.finditer(xml):
        out.append(xml[last : match.start()])
        para = match.group(0)
        if is_sticker_paragraph(para) and paragraph_text(para) in {product, "Laundry Soap", "Elderberry Syrup"}:
            para = set_primary_run_lines(para, lines)
        out.append(para)
        last = match.end()
    out.append(xml[last:])
    return "".join(out)


def bath_sticker_slots() -> list[str | None]:
    slots: list[str | None] = []
    for product in BATH_PRODUCTS:
        slots.extend([product] * 6)
    return slots


def transform_bath_stickers(xml: str) -> str:
    slots = bath_sticker_slots()
    slot = 0
    out: list[str] = []
    last = 0

    for match in PARA_RE.finditer(xml):
        out.append(xml[last : match.start()])
        para = match.group(0)
        text = paragraph_text(para)

        if not is_sticker_paragraph(para):
            out.append(para)
            last = match.end()
            continue

        if text == "Cedar & Clay":
            para = set_primary_run_lines(para, [BRAND["name"]])
        elif text in BATH_PRODUCTS:
            para = set_primary_run_lines(para, [text, BRAND["website"]])
        elif text == "Laundry Soap":
            product = slots[slot] if slot < len(slots) else None
            slot += 1
            para = set_primary_run_lines(para, sticker_lines(product) if product else [""])
        out.append(para)
        last = match.end()

    out.append(xml[last:])
    return "".join(out)


def transform_directions(xml: str) -> str:
    contact = f"{BRAND['contact']} | {BRAND['phone']}"
    out: list[str] = []
    last = 0

    for match in PARA_RE.finditer(xml):
        out.append(xml[last : match.start()])
        para = match.group(0)
        text = paragraph_text(para)

        if not is_sticker_paragraph(para):
            out.append(para)
            last = match.end()
            continue

        if "Samantha Bergstrom" in text:
            para = set_primary_run_lines(para, [contact])
        elif text.startswith("Address:"):
            para = set_primary_run_lines(para, [BRAND["address"], BRAND["website"]])
        elif text == "Cedar & Clay":
            para = set_primary_run_lines(para, [BRAND["name"], BRAND["website"]])
        out.append(para)
        last = match.end()

    out.append(xml[last:])
    return "".join(out)


def process_doc_to_docx(src_doc: Path, dst_docx: Path, transform) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        raw_docx = Path(tmp) / "raw.docx"
        run_textutil_convert(src_doc, "docx", raw_docx)
        patch_docx_xml(raw_docx, dst_docx, transform)


def emit(src_name: str, dst_name: str, transform) -> None:
    src = SOURCES / src_name
    dst = ROOT / dst_name
    if not src.exists():
        raise FileNotFoundError(f"Missing Avery template: {src}")
    process_doc_to_docx(src, dst, transform)
    print(f"  wrote {dst_name}")


def main() -> None:
    print("Generating Avery print files...")

    emit(
        "laundry soap labels.doc",
        "laundry soap labels - print.docx",
        lambda xml: transform_single_line_stickers(xml, "Laundry Soap"),
    )
    emit(
        "Elderberry Syrup Label.doc",
        "Elderberry Syrup Label - print.docx",
        lambda xml: transform_single_line_stickers(xml, "Elderberry Syrup"),
    )
    emit(
        "Bath Salt.doc",
        "Bath Salt - print.docx",
        transform_bath_stickers,
    )
    emit(
        "Laundry Soap and Bath Salt Directions.doc",
        "Laundry Soap and Bath Salt Directions - print.docx",
        transform_directions,
    )
    emit(
        "elderberry syrup kit directions.doc",
        "elderberry syrup kit directions - print.docx",
        transform_directions,
    )

    shutil.copy2(
        ROOT / "elderberry syrup kit directions - print.docx",
        ROOT / "Directions for Elder berries - print.docx",
    )
    print("  wrote Directions for Elder berries - print.docx")
    print("Done. Open *-print.docx in Microsoft Word.")


if __name__ == "__main__":
    main()
