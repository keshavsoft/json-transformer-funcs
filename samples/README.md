# Samples: json-transformer-funcs + json-to-tag CDN

This directory contains executable, end-to-end examples demonstrating how to use **`json-transformer-funcs`** to compile tabular data into a JSON specification tree and render it into the live browser DOM using **`json-to-tag` via CDN**.

---

## 📂 Samples Structure

| Sample | Path | Description |
| :--- | :--- | :--- |
| 🟢 **Minimal Simple Example** | [`simple.html`](../simple.html) | Ultra-lightweight, 8-line minimal HTML with no UI fluff: reads 3 JSON files, builds spec, renders via CDN |
| 📊 **Modular Table Example** | [`samples/table/index.html`](table/index.html) | Multi-file modular example importing `data.json`, `spec.json`, `table.json`, and rendering via `json-to-tag` CDN |
| ⚡ **Standalone Single-File CDN** | [`samples/cdn-standalone.html`](cdn-standalone.html) | Zero-build, self-contained single HTML file that works directly in any browser |

---

## 🚀 How to Run the Samples

### Option 1: Via Local Dev Server (Vite)

From the repository root:

```bash
npm run dev
# Or
npx vite
```

Open `http://localhost:5173/` in your browser to view the interactive showcase playground, or navigate to:
- `http://localhost:5173/samples/table/index.html`
- `http://localhost:5173/samples/cdn-standalone.html`

### Option 2: Direct Browser Double-Click

Open `samples/cdn-standalone.html` directly in Google Chrome, Microsoft Edge, Firefox, or Safari. It uses pure ES modules and CDN scripts with zero setup required.

---

## 🧩 Architectural Pipeline

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    data.json    │   +   │    spec.json    │   +   │   table.json    │
│ (columns, rows) │       │ (cell blueprint)│       │(table scaffold) │
└────────┬────────┘       └────────┬────────┘       └────────┬────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   │
                                   ▼
                            tableFromData()
                      (json-transformer-funcs)
                                   │
                                   ▼
                           JSON Spec Tree
                                   │
                                   ▼
                          buildSpecElement()
                          (json-to-tag CDN)
                                   │
                                   ▼
                           Live DOM Table
```
