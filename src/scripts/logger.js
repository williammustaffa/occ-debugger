function error(label, ...args) {
  console.log(
    `%cOCC Debugger%c${label}`,
    'color: #ffffff; font-weight: bold; padding: 1px 5px; background-color: #f03434; border: 1px solid #f03434; border-radius: 3px 0 0 3px;',
    'background-color: #ffffff; padding: 1px 5px; border: 1px solid #f03434; border-radius: 0 3px 3px 0; border-left: none;',
    ...args
  );
}

function log(label, ...args) {
  console.log(
    `%cOCC Debugger%c${label}`,
    'color: #ffffff; font-weight: bold; padding: 1px 5px; background-color: #029dce; border: 1px solid #029dce; border-radius: 3px 0 0 3px;',
    'background-color: #ffffff; padding: 1px 5px; border: 1px solid #029dce; border-radius: 0 3px 3px 0; border-left: none;',
    ...args
  );
}

function feature(featureName) {
  console.log(
    `%cOCC Debugger%cFeature Enabled%c${featureName}`,
    'color: #ffffff; font-weight: bold; padding: 1px 5px; background-color: #029dce; border: 1px solid #029dce; border-radius: 3px 0 0 3px;',
    'color: #ffffff; background-color: #222; padding: 1px 5px; border: 1px solid #029dce; border-left: none; border-right: none;',
    'background-color: #ffffff; padding: 1px 5px; border: 1px solid #029dce; border-radius: 0 3px 3px 0; border-left: none;',
  );
}

function debug(feature, label, ...args) {
  console.groupCollapsed(
    `%cOCC Debugger%c${feature}%c${label}`,
    'color: #ffffff; font-weight: bold; padding: 1px 5px; background-color: #029dce; border: 1px solid #029dce; border-radius: 3px 0 0 3px;',
    'color: #ffffff; background-color: #222; padding: 1px 5px; border: 1px solid #029dce; border-left: none; border-right: none;',
    'background-color: #ffffff; padding: 1px 5px; border: 1px solid #029dce; border-radius: 0 3px 3px 0; border-left: none;',
  );

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

export default {
  error,
  log,
  feature,
  debug
}