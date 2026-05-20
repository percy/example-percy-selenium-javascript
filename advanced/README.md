# Advanced Percy + Selenium-JavaScript example — STUB

**Status:** Phase 1 stub. `matrix.yml` is populated based on `@percy/selenium-webdriver` research. Test code in `tests/advanced.test.js` is **not yet written**.

See the basic example at the repo root. See [`matrix.yml`](./matrix.yml) for the planned matrix-row coverage.

## What this example will cover

Each test will exercise one row of the matrix (widths, minHeight, percyCSS, enableJavaScript, responsiveSnapshotCapture, readiness preset, regions via `createRegion`, ignoreCanvasSerializationErrors, ignoreStyleSheetSerializationErrors, slowScrollToBottom lazy-loading helper).

Note: `scope`, `dom_transformation`, `discovery` are marked `N/A` — not exposed in `@percy/selenium-webdriver`'s SnapshotOptions surface as of 2.2.6.

## Run locally (once tests are written)

```bash
cd advanced
npm install
export PERCY_TOKEN="<your project token>"      # do NOT commit
npm run test:advanced
```

## Coverage matrix

Source of truth: [`matrix.yml`](./matrix.yml).

> Phase 1 stub: most rows are currently `Planned`. Basic example has three bare `percySnapshot(driver, name)` calls.
