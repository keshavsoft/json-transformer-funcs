# @keshavsoft/json-transformer

> Pure JSON Specification Compiler: `(structure, data) -> Spec JSON`

---

## 📚 Documentation Tracks

- [💡 **Conceptual Walkthrough**](docs/walkthrough/index.html) — **Start here!** A 6-part pedagogical tour starting with source-driven traversal.
- [👤 **User Guide & Live Sandbox**](docs/user/index.html) — Directives toolkit (`alterKey`, `valueType`), real-world enterprise cookbooks, and in-browser playground.
- [🛠️ **Developer Guide**](docs/developer/index.html) — Engine invariants (`in`/`local`), the 5-module compiler pipeline, and test verification suite.

---

## The Mental Model: The Food & The Recipe

In application architecture, transforming data should never involve arbitrary scripts mutating objects in place.

Think of it this way:

- **`structure.json` is the Food**: Raw, untouched source data coming from an external client, database, or API (such as Tally or SAP).
- **`data.json` is the Recipe**: The declarative transformation instructions specifying which keys to alter, which branches to drill into, and how to reshape the output.
- **`json-transformer` is the Kitchen**: It takes the food, reads the recipe, and produces the final dish without ever touching or modifying the original ingredients.

```
       structure.json (The Food)           data.json (The Recipe)
       [Untouchable Client Data]          [Declarative Directives]
                   │                                  │
                   └────────────────┬─────────────────┘
                                    │
                                    ▼
                         @keshavsoft/json-transformer
                                    │
                                    ▼
                               Result JSON
                         [Clean, Reshaped Output]
```

---

## Why Two Separate JSONs? The Immutability Principle

Developers often ask: *"Why maintain two separate files? Why not embed transformation directives directly into the source JSON?"*

There is a fundamental architectural reason:

1. **Client Data Must Remain Sacrosanct**:
   Source data belongs to the external producer (client, upstream service, database). You do not own it. Mutating it in place corrupts original caches and introduces unintended side-effects.

2. **Preventing Infinite Loops**:
   If you modify the source object while recursively traversing it, the traversal engine can easily get caught in infinite recursion loops.

3. **Separation of Concerns**:
   The data changes dynamically on every request. The recipe changes only when your business contract evolves. Keeping them separated creates a clean, deterministic pipeline.

---

## How It Works: The Traversal Pipeline

Under the hood in `v9`, the traversal follows a strict, predictable sequence:

### 1. Central Dispatcher (`traverse.js`)
The engine inspects the input:
- If it is an Array ➔ delegates to `traverseArray`.
- If it is an Object ➔ delegates to `traverseObject`.
- Otherwise ➔ returns the primitive as-is.

### 2. The Decision Point in `traverseObject` (Line 14 Rule)
The engine checks the **Recipe**, not the source:

```javascript
if (localRecipe && typeof localRecipe === "object" && "transform" in localRecipe) {
    newElement = ifTransformFound({
        inSource: localSource,
        inTransform: localRecipe.transform
    });
}
```

The engine queries the recipe: *"Do you have instructions for this level?"* If `"transform"` exists, it delegates to `ifTransformFound`.

### 3. Orchestrated Execution in `ifTransformFound`
Here, the roles flip:
- `localSource` becomes the **Source of Truth** that drives the loop (`Object.entries(localSource)`).
- `localTransform` acts strictly as the **Lookup Table** for instructions.

Instead of a monolithic loop, `v9` runs a pipeline of four dedicated, single-purpose functions:

```javascript
const directive = localTransform[key];
const newKey = resolveKey({ inKey: key, inDirective: directive });

let processedValue = value;
processedValue = applyTransform({ inValue: processedValue, inDirective: directive });
processedValue = normalizeValueType({ inValue: processedValue, inDirective: directive });
processedValue = extractValueKey({ inValue: processedValue, inDirective: directive });

newElement[newKey] = processedValue;
```

- **`resolveKey`**: Resolves `alterKey || key`.
- **`applyTransform`**: Recursively invokes `traverse` on nested values when `"transform"` is present.
- **`normalizeValueType`**: Enforces array normalization (`valueType: "array"`) for singleton objects when downstream consumers expect arrays (e.g., `COMPANY` $\rightarrow$ `Companies: [ { ... } ]`).
- **`extractValueKey`**: Extracts child properties or strips XML metadata text wrappers (`valueKey`).

---

## Quickstart

```bash
npm install @keshavsoft/json-transformer
```

```javascript
import transform from "@keshavsoft/json-transformer";

const source = {
    STOCKITEM: [
        {
            BASEUNITS: { "#text": "kgs", "@_TYPE": "String" },
            NAME: "Item A"
        }
    ]
};

const recipe = {
    transform: {
        STOCKITEM: {
            alterKey: "StockItems",
            transform: {
                BASEUNITS: { alterKey: "Units", valueKey: "#text" },
                NAME: { alterKey: "Name" }
            }
        }
    }
};

const result = transform(source, recipe);
```

**Output:**
```json
{
  "StockItems": [
    {
      "Units": "kgs",
      "Name": "Item A"
    }
  ]
}
```

---

## Directives Reference

| Directive | Type | Description |
| :--- | :--- | :--- |
| `alterKey` | `string` | Renames the key in the transformed output. |
| `transform` | `object` | Specifies nested transformation rules for children. |
| `valueKey` | `string` | Unwraps a specific child property from an object (e.g. `"#text"`). |
| `valueType` | `"array"` | Guarantees the output value is wrapped in an array. |

---

## Architecture (`src/v8/`)

```
src/v8/
├── index.js                  # Clean public entry point: transform(source, recipe)
├── traverse.js               # Central recursive dispatcher
├── traverseObject/
│   └── index.js              # Object handler: checks recipe for transform
├── traverseArray/
│   └── index.js              # Array handler: maps elements through traverse
└── ifTransformFound/
    └── index.js              # Directive applicator: walks source entries
```

- **Zero comments**: Code intent is conveyed entirely through folder structure and naming.
- **Strict In-Local convention**: Parameter unpacking is strictly internal.
- **Zero dependencies**: Pure, deterministic JavaScript.