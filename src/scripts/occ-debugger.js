let occRequire = __non_webpack_require__;
const OCC_PACKAGES = ['spinner', 'pubsub'];

class OccDebugger {
  constructor(options) {
    this.prefix = '[OCC-DEBUGGER]';
    this.features = options || {};
  }

  log() {
    const args = Array.prototype.slice.call(arguments);
    const type = args.shift();
  
    args.unshift(`${this.prefix}[${type}]`);

    console[type].apply(console, args);
  }

  init() {
    this.log('info', 'Initializing occ-debugger extension');

    const featuresMapping = {
      spinner: this.debugSpinner,
      topics: this.debugTopics
    };

    Object.keys(this.features).forEach(featureName => {
      const featureEnabled = this.features[featureName];
      const featureFn = featuresMapping[featureName];

      if (featureEnabled && typeof featureFn === 'function') {
        this.log('info', `Feature enabled: ${featureName}`);
        featureFn.call(this);
      }
    });
  }

  debugSpinner() {
    const self = this;
    const spinner = occRequire('spinner');

    // Save original methods
    const buildCSS = spinner.buildCSS;
    const destroyWithoutDelay = spinner.destroyWithoutDelay;

    spinner.buildCSS = function () {
      self.log('warn', '[SPINNER CREATED]', arguments);
      buildCSS.apply(this, arguments);
    };

    spinner.destroyWithoutDelay = function () {
      self.log('warn', '[SPINNER DESTROYED]', arguments);
      destroyWithoutDelay.apply(this, arguments);
    };
  }

  debugTopics() {
    const self = this;
    const pubsub = occRequire('pubsub');

    Object.keys(pubsub.topicNames).map(function (topicName) {
      $.Topic(pubsub.topicNames[topicName]).subscribe(function () {
        const args = Array.prototype.slice.call(arguments);
        self.log('warn', `[TOPIC TRIGGER]${topicName}`, args);
      });
    });
  }
}

function waitForRequire(callback) {
  const listener = setInterval(function () {
    if (typeof occRequire === 'undefined') return;
    occRequire(OCC_PACKAGES, callback);
    clearInterval(listener);
  });
}

waitForRequire(function () {
  new OccDebugger(occDebuggerConfigs).init();
});
