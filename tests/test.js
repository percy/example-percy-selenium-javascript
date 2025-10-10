const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
// chromedriver package makes sure a chromedriver binary is available in PATH
try { require('chromedriver'); } catch (e) { /* chromedriver may not be installed */ }
const percySnapshot = require('@percy/selenium-webdriver');
const httpServer = require('http-server');
const spawn = require('child_process').spawn;
const server = httpServer.createServer();

const PORT = process.env.PORT_NUMBER || 8000;
const TEST_URL = `http://localhost:${PORT}`;

server.listen(PORT);
console.log(`Server is listening on ${TEST_URL}`);

async function cleanup({ driver, server, isError = 0 }) {
  driver && (await driver.quit());
  server && server.close();

  process.exit(isError);
}

(async function() {
  let driver;

  try {
    // Try Firefox first (as original). If it fails (no binary in environment),
    // fall back to Chrome headless using chromedriver.
    try {
  const options = new firefox.Options();
  // Use headless flag compatible with newer selenium versions
  options.addArguments('-headless');

      if (process.env.FIREFOX_BINARY) {
        options.setBinary(process.env.FIREFOX_BINARY);
      }

      driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    } catch (err) {
      console.log('Firefox launch failed, falling back to Chrome:', err.message);
      // Fallback to Chrome headless
      const chromeOptions = new chrome.Options();
      // Use new headless mode for recent Chrome versions
      chromeOptions.addArguments('--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage');

      // If an explicit CHROME_BINARY is provided, use it (useful for CI)
      if (process.env.CHROME_BINARY) {
        chromeOptions.setChromeBinaryPath(process.env.CHROME_BINARY);
      }

      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    }

    async function emptyTodos() {
      await driver.get(TEST_URL);
      await driver.wait(until.titleIs('VanillaJS • TodoMVC'), 1000);
      await percySnapshot(driver, 'Empty Todos');
    }

    async function newTodo() {
      await driver.get(TEST_URL);
      await driver.wait(until.titleIs('VanillaJS • TodoMVC'), 1000);

      await driver.findElement(By.className('new-todo')).sendKeys('Write tests', Key.ENTER);
      await percySnapshot(driver, 'New todo');
    }

    async function completeTodo() {
      await driver.get(TEST_URL);
      await driver.wait(until.titleIs('VanillaJS • TodoMVC'), 1000);

      await driver.findElement(By.css('.todo-list li:first-child .toggle')).click();
      await percySnapshot(driver, 'Completed todo');
    }

    await emptyTodos();
    await newTodo();
    await completeTodo();
  } catch (error) {
    console.log(error);
    await cleanup({ driver, server, isError: 1 });
  } finally {
    await cleanup({ driver, server });
  }
})();
