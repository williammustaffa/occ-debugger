import { logger } from '@utils/logger';

const occRequire = __non_webpack_require__;
const occDependencies = ['pubsub', 'spinner'];
const options = window._occDebugger.options;

function init(...dependencies) {
  const optionsMap = {
    spinner: debugSpinner,
    topics: debugTopics,
    cookies: debugCookies
  };

  try {
    logger.log({ suffix: 'Initializing...' });

    Object.keys(options).forEach(featureName => {
      const featureEnabled = options[featureName];
      const featureFn = optionsMap[featureName];

      if (featureEnabled && typeof featureFn === 'function') {
        logger.log({ label: 'Feature Enabled', suffix: featureName });
        featureFn.apply(this, dependencies);
      }
    });

    // Tell occ debugger is initialized
    window.postMessage({ action: 'occ-debugger-initialized' })
  } catch(e) {
    logger.error({ suffix: 'Failed initializing OCC debugger' }, e.message);
  }
}

function debugSpinner(pubsub, spinner) {
  // Save original methods
  const create = spinner.create;
  const destroyWithoutDelay = spinner.destroyWithoutDelay;

  const getParent = args => {
    const result = Array.isArray(args) && args[0];

    if (typeof result === 'string'){
      return result;
    }

    if (result && result.parent) {
      return result.parent;
    }

    return 'Unidentified';
  }

  spinner.create = function (...args) {
    logger.debug({ label: 'Spinner Created', suffix: getParent(args) }, ...args);
    create.apply(this, args);
  };

  spinner.destroyWithoutDelay = function (...args) {
    logger.debug({ label: 'Spinner Destroyed', suffix: getParent(args) }, ...args);
    destroyWithoutDelay.apply(this, args);
  };
}

function debugTopics(pubsub, spinner) {
  Object.keys(pubsub.topicNames).map(function (topicName) {
    $.Topic(pubsub.topicNames[topicName]).subscribe((...args) => {
      logger.debug({ label: 'Topic Triggered', suffix: topicName }, ...args);
    });
  });
}

function debugCookies(pubsub, spinner) {
  const findDiff = (object1, object2) => {
    const target = { ...object1, ...object2 };
    const result = {
      '@added': {},
      '@removed': {},
      '@modified': {},
      count: 0
    };

    for (let key in target) {
      if(object1[key] !== object2[key]) {
        if (
          object1.hasOwnProperty(key) &&
          object2.hasOwnProperty(key)
        ) {
          result["@modified"][key] = object2[key];
        } else if (object2.hasOwnProperty(key)) {
          result["@added"][key] = object2[key];
        } else {
          result["@removed"][key] = object1[key];
        }
        result.count++;
      }
    }

    return result;
  }

  const listenCookieChange = (callback, interval = 100) => {
    let previousCookie = document.cookie;

    setInterval(()=> {
      const currentCookie = document.cookie;

      if (currentCookie !== previousCookie) {
        try {
          const oldValue = parseCookies(previousCookie);
          const newValue = parseCookies(currentCookie);
          const diff = findDiff(oldValue, newValue);

          if (diff.count > 0) {
            callback({ oldValue, newValue, diff });
          }
        } catch(e) {
          logger.error({ suffix: 'Failed parsing cookies' }, e.message);
        } finally {
          previousCookie = currentCookie;
        }
      }
    }, interval);
  }

  const parseCookies = cookieString => {
    const cookies = cookieString
      .split(';')
      .reduce((result, expression) => {
        if (!expression) return result;
        const [key, value] = expression.split('=');
        result[key.trim()] = value.trim();
        return result;
      }, {});

    return cookies;
  }

  const handleCookieChanges = changes => {
    const nOfChanges = changes.diff.count;
    delete changes.diff.count;
    logger.debug({ label: 'Cookies Changed', suffix: `${nOfChanges} change(s)` }, changes);
  }

  listenCookieChange(handleCookieChanges);
}

// Require and init
occRequire(occDependencies, init);
