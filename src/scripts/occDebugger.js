const occRequire = __non_webpack_require__;
const options = window.occDebuggerConfigs;

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

function init(pubsub, spinner) {
  const optionsMap = {
    spinner: debugSpinner,
    topics: debugTopics
  };

  try {
    log('info', 'Initializing OCC debugger');

    Object.keys(options).forEach(featureName => {
      const featureEnabled = options[featureName];
      const featureFn = optionsMap[featureName];

      if (featureEnabled && typeof featureFn === 'function') {
        log('info', `Feature enabled`, featureName);
        featureFn.call(this, { pubsub, spinner });
      }
    });
  } catch(e) {
    log('info', 'Failed initializing OCC debugger');
  }
}

function debugSpinner({ spinner }) {
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

function debugTopics({ pubsub }) {
  Object.keys(pubsub.topicNames).map(function (topicName) {
    $.Topic(pubsub.topicNames[topicName]).subscribe((...args) => {
      trace(`Topic triggered: ${topicName}`, ...args);
    });
  });
}

// Require and init
occRequire(['pubsub', 'spinner'], init);
