// PER-8195 Phase 1 — selenium-javascript advanced example.
// Each test exercises one row of the Advanced Feature Matrix. See ../matrix.yml
// for the canonical mapping of test name -> matrix row.

const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const percySnapshot = require('@percy/selenium-webdriver');
const httpServer = require('http-server');

const PORT = process.env.PORT_NUMBER || 8003;
const TEST_URL = `http://localhost:${PORT}`;

describe('TodoMVC Advanced', function () {
  this.timeout(120000);
  let driver;
  let server;

  before(async () => {
    server = httpServer.createServer({ root: `${__dirname}/../..` });
    server.listen(PORT);

    const options = new firefox.Options().addArguments('-headless');
    if (process.env.FIREFOX_BINARY) options.setBinary(process.env.FIREFOX_BINARY);

    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  });

  after(async () => {
    if (driver) await driver.quit();
    if (server) server.close();
  });

  beforeEach(async () => {
    await driver.get(TEST_URL);
    await driver.wait(until.titleIs('VanillaJS • TodoMVC'), 5000);
    await driver
      .findElement(By.className('new-todo'))
      .sendKeys('Walk the dog', Key.ENTER);
  });

  it('exercises widths', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      widths: [375, 768, 1280, 1920],
    });
  });

  it('exercises minHeight', async function () {
    await percySnapshot(driver, this.test.fullTitle(), { minHeight: 2000 });
  });

  it('exercises percyCSS', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      percyCSS: '.todo-list li { background: #fffde7 !important; }',
    });
  });

  it('exercises enableJavaScript', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      enableJavaScript: true,
    });
  });

  it('exercises responsiveSnapshotCapture', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      responsiveSnapshotCapture: true,
      widths: [375, 1280],
    });
  });

  it('exercises readiness preset', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      readiness: { preset: 'strict', timeoutMs: 5000 },
    });
  });

  it('exercises labels', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      labels: 'smoke,sdk-selenium-js',
    });
  });

  it('exercises testCase', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      testCase: 'todomvc-advanced-suite',
    });
  });

  it('exercises devicePixelRatio', async function () {
    await percySnapshot(driver, this.test.fullTitle(), { devicePixelRatio: 2 });
  });

  it('exercises regions', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      regions: [
        {
          algorithm: 'ignore',
          elementSelector: {
            boundingBox: { x: 0, y: 0, width: 200, height: 100 },
          },
        },
      ],
    });
  });

  it('exercises browsers override', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      browsers: ['chrome', 'firefox'],
    });
  });

  it('exercises sync mode', async function () {
    await percySnapshot(driver, this.test.fullTitle(), { sync: false });
  });

  it('exercises ignoreCanvasSerializationErrors', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      ignoreCanvasSerializationErrors: true,
    });
  });

  it('exercises ignoreStyleSheetSerializationErrors', async function () {
    await percySnapshot(driver, this.test.fullTitle(), {
      ignoreStyleSheetSerializationErrors: true,
    });
  });
});
