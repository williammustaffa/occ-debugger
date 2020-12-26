class OccDebugger {
  constructor(features) {
    this.prefix = '[OCC-DEBUGGER]';
    this.features = features || [];
  }

  log() {
    const args = Array.prototype.slice.call(arguments);
    const type = args.shift();
  
    args.unshift(this.prefix);

    console[type].apply(console.log, args);
  }

  enable(featureName) {
    this.features.push(featureName);
  }

  init() {
    const featuresMapping = {
      spinner: this.debugSpinner,
      topics: this.debugTopics
    };

    this.features.forEach((featureName) => {
      const featureFn = featuresMapping[featureName];

      if (typeof featureFn !== 'undefined') {
        featureFn.call(this);
      } else {
        this.log('info', `[WARN] Feature << ${featureName} >> not found`);
      }
    });
  }

  debugSpinner() {
    const self = this;
    const spinner = require('spinner');

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
    const pubsub = require('pubsub');

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
    if (typeof require === 'undefined') return;
    require(['spinner', 'pubsub'], callback);
    clearInterval(listener);
  });
}

waitForRequire(function () {
  const instance = new OccDebugger();
  instance.enable('topics');
  instance.enable('spinner');
  instance.init();
});
