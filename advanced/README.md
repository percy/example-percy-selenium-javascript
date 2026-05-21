# Advanced Percy + Selenium-JS example

This directory exercises the full applicable Percy SDK feature surface for `@percy/selenium-webdriver`. See the basic example at the repo root for the minimum integration.

## What this example covers

A single `mocha` spec (`tests/todomvc_advanced.spec.js`) where each `it(...)` block exercises one row of the [Percy SDK Advanced Feature Matrix](../../../docs/advanced-example-feature-matrix.md). Global SDK config — readiness preset, default widths, discovery — lives in `.percy.yml` and is consumed by every snapshot.

## Run locally

```bash
cd advanced
npm install
export PERCY_TOKEN="<your project token>"      # do NOT commit this
npm run test:advanced
```

To run without a real token (CI assertion mode):

```bash
npm run test:advanced:ci   # uses --testing + PERCY_TOKEN=fake_token
```

The CI variant asserts every matrix row appears in the captured POST bodies at the local `/test/requests` endpoint. No real Percy build is created.

## Coverage matrix

States: `Covered` / `N/A — <reason>` / `Planned` / `Deprecated`. Source of truth is [`matrix.yml`](./matrix.yml).

| Feature | State | Test |
|---|---|---|
| widths | Covered | `exercises widths` |
| minHeight | Covered | `exercises minHeight` |
| percyCSS | Covered | `exercises percyCSS` |
| enableJavaScript | Covered | `exercises enableJavaScript` |
| responsiveSnapshotCapture | Covered | `exercises responsiveSnapshotCapture` |
| readiness preset | Covered | `exercises readiness preset` |
| labels | Covered | `exercises labels` |
| testCase | Covered | `exercises testCase` |
| devicePixelRatio | Covered | `exercises devicePixelRatio` |
| regions | Covered | `exercises regions` |
| browsers override | Covered | `exercises browsers override` |
| sync mode | Covered | `exercises sync mode` |
| ignoreCanvasSerializationErrors | Covered | `exercises ignoreCanvasSerializationErrors` |
| ignoreStyleSheetSerializationErrors | Covered | `exercises ignoreStyleSheetSerializationErrors` |
| Chrome CDP resize on responsive | Covered | automatic via `@percy/selenium-webdriver >= 2.2.6` |
| cookie capture via `getCookies` | Covered | automatic via `@percy/selenium-webdriver` |
| `.percy.yml` global config | Covered | `.percy.yml` consumed at build start |
| environment info reporting | Covered | automatic via `@percy/selenium-webdriver` client info |
| PERCY_SERVER_ADDRESS via env | Covered | CI advanced job picks up `PERCY_SERVER_ADDRESS` |
| `createRegion` helper | Planned | — |
| `slowScrollToBottom` (lazy loading) | Planned | — |
| `scope` | N/A | Not exposed in SDK 2.2.6 |
| `domTransformation` | N/A | Not exposed in SDK 2.2.6 |
| `discovery` per-snapshot | N/A | discovery is per-build only |
