const occRequire = __non_webpack_require__;
const occDependencies = ['pubsub', 'spinner'];
const options = window._occDebugger.options;

function trace(label, ...args) {
  console.groupCollapsed(`[OCC Debugger] ${label}`);

  // Log arguments
  if (args.length) {
    console.groupCollapsed('Arguments');
    args.forEach(console.log);
    console.groupEnd();
  }

  // Stack trace
  console.groupCollapsed('Stack trace');
  console.trace('');
  console.groupEnd();

  console.groupEnd();
}

function log(type, ...args) {
  args.unshift(`[OCC Debugger]`);
  console[type].apply(console, args);
}

function init(...dependencies) {
  const optionsMap = {
    spinner: debugSpinner,
    topics: debugTopics,
    cookies: debugCookies
  };

  try {
    log('info', 'Initializing OCC debugger');

    Object.keys(options).forEach(featureName => {
      const featureEnabled = options[featureName];
      const featureFn = optionsMap[featureName];

      if (featureEnabled && typeof featureFn === 'function') {
        log('info', `Feature enabled`, featureName);
        featureFn.apply(this, dependencies);
      }
    });
  } catch(e) {
    log('info', 'Failed initializing OCC debugger', e);
  }
}

function debugSpinner(pubsub, spinner) {
  // Save original methods
  const buildCSS = spinner.buildCSS;
  const destroyWithoutDelay = spinner.destroyWithoutDelay;

  spinner.buildCSS = function (...args) {
    trace('Spinner created', ...args);
    buildCSS.apply(this, args);
  };

  spinner.destroyWithoutDelay = function (...args) {
    trace('Spinner destroyed', ...args);
    destroyWithoutDelay.apply(this, args);
  };
}

function debugTopics(pubsub, spinner) {
  Object.keys(pubsub.topicNames).map(function (topicName) {
    $.Topic(pubsub.topicNames[topicName]).subscribe((...args) => {
      trace(`Topic triggered: ${topicName}`, ...args);
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
            delete diff.count;
            callback({ oldValue, newValue, diff });
          }
        } catch(e) {
          ccLogger.info('[msiGDPRCookies] Error parsing cookie values', e);
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
    log('info', 'Cookies changed:', changes);
  }

  listenCookieChange(handleCookieChanges);
}

// Require and init
occRequire(occDependencies, init);
