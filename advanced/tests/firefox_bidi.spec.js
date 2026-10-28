// Firefox started with `webSocketUrl: true` (WebDriver BiDi). With a BiDi
// session the SDK can set exact responsive widths and read closed shadow roots;
// SDK versions without BiDi support ignore the capability.

const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const percySnapshot = require('@percy/selenium-webdriver');
const httpServer = require('http-server');

const PORT = process.env.BIDI_PORT_NUMBER || 8004;
const BASE_URL = `http://localhost:${PORT}`;

describe('Firefox BiDi', function () {
  this.timeout(120000);
  let driver;
  let server;

  before(async () => {
    server = httpServer.createServer({ root: `${__dirname}/../..` });
    server.listen(PORT);

    const options = new firefox.Options().addArguments('-headless');
    options.set('webSocketUrl', true);
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

  it('captures exact responsive widths', async function () {
    await driver.get(BASE_URL);
    await driver.wait(until.titleIs('VanillaJS • TodoMVC'), 5000);
    await driver.findElement(By.className('new-todo')).sendKeys('Walk the dog', Key.ENTER);

    await percySnapshot(driver, this.test.fullTitle(), {
      responsiveSnapshotCapture: true,
      widths: [375, 1280],
    });
  });

  it('captures open, closed and late-attached shadow roots', async function () {
    await driver.get(`${BASE_URL}/advanced/pages/shadow-dom.html`);
    await driver.wait(
      () => driver.executeScript('return document.documentElement.dataset.lateShadowAttached === "true"'),
      5000
    );

    await percySnapshot(driver, this.test.fullTitle(), { widths: [375, 1280] });
  });
});
