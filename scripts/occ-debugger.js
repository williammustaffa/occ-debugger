function injectScript() {
  var src = document.createElement('script');
  src.setAttribute('type', 'text/javascript');
  src.text = `
  function init(options) {
    if (!options.key) options.key = 'OCC debugger';

    // Override spinner builder
    if (options.spinner) {
      var _spinner = require('spinner');

      var spinnerLegacyBuildCSS = _spinner.buildCSS;
      var spinnerLegacyDestroy = _spinner.destroyWithoutDelay;

      
      _spinner.buildCSS = function () {
        console.warn('[' + options.key + '][SPINNER CREATED]', arguments);
        spinnerLegacyBuildCSS.apply(this, arguments);
      }

      _spinner.destroyWithoutDelay = function () {
        console.warn('[' + options.key + '][SPINNER DESTROYED]', arguments);
        spinnerLegacyDestroy.apply(this, arguments);
      }
    }

    // Listen to all topics
    if (options.topics) {
      var _pubsub = require('pubsub');

      Object.keys(_pubsub.topicNames).map(function (topicName) {
        $.Topic(_pubsub.topicNames[topicName]).subscribe(function () {
          var args = Array.prototype.slice.call(arguments);
          console.warn('[' + options.key + '][TOPIC TRIGGER]' + topicName + ':', args);
        });
      });
    }
  }

  function waitForRequire(callback) {
    var listener = setInterval(function () {
      if (typeof require === 'undefined') return;
      require(['spinner', 'pubsub'], callback);
      clearInterval(listener);
    });
  };

  waitForRequire(function () {
    init({
      topics: true,
      spinner: true,
      key: 'OCC_DEBUGGER'
    });
  });
  `

  document.head.appendChild(src);
}

if (new RegExp(occDebuggerConfigs.domain).test(window.location.href)) {
  injectScript();
}