// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  src_folders: ['tests'],
  page_objects_path: ['nightwatch/page-objects'],
  custom_commands_path: ['nightwatch/custom-commands'],
  custom_assertions_path: ['nightwatch/custom-assertions'],
  plugins: [],
  globals_path: '',
  webdriver: {},
  test_workers: {
    enabled: true,
  },
  test_settings: {
    default: {
      skip_testcases_on_fail: false,
      disable_error_log: false,
      launch_url: 'http://automationpractice.multiformis.com/index.php',
      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },
      desiredCapabilities: {
        browserName: 'chrome',
      },
      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
      },
    },
    chrome: {
      skip_testcases_on_fail: false,
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--headless',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--window-size=1920,1080',
          ],
        },
      },
      webdriver: {
        start_process: true,
        server_path: require('chromedriver').path,
      },
    },
  },
};

