const TYPES = {
  log: '#00b894',
  error: '#f03434',
  info: '#029dce',
  warn: '#f39c12'
};

const STYLES = {
  prefix: 'color: #ffffff; font-weight: bold; padding: 1px 5px; background-color: __type__; border: 1px solid __type__; border-radius: 3px 0 0 3px;',
  label: 'color: #ffffff; background-color: #222; padding: 1px 5px; border: 1px solid __type__; border-left: none; border-right: none;',
  suffix: 'padding: 1px 5px; border: 1px solid __type__; border-radius: 0 3px 3px 0; border-left: none;'
};

function getBadge(type, options) {
  const badgeStyles = [];
  const badgeTemplate = [];

  const applyType = value => {
    const target = TYPES[type];
    if (!target) return value;
    return value.replace(/__type__/g, target);
  }

  // Add default prefix
  badgeTemplate.push(`%c${options.prefix || 'OCC Debugger'}`);
  badgeStyles.push(applyType(STYLES.prefix));

  if (options.label) {
    badgeTemplate.push(`%c${options.label}`);
    badgeStyles.push(applyType(STYLES.label));
  }

  if (options.suffix) {
    badgeTemplate.push(`%c${options.suffix}`);
    badgeStyles.push(applyType(STYLES.suffix));
  }

  return [badgeTemplate.join(''), ...badgeStyles];
}

function createByType(type) {
  return (badgeOptions, ...args) => {
    const badge = getBadge(type, badgeOptions);
    console.log(...badge, ...args);
  };
}

function debug(badgeOptions, ...args) {
  const badge = getBadge('info', badgeOptions);

  console.groupCollapsed(...badge);

  // Log arguments
  if (args.length) {
    console.groupCollapsed('Data');
    args.forEach(arg => console.log(arg));
    console.groupEnd();
  }

  // Stack trace
  console.groupCollapsed('Stack trace');
  console.trace('');
  console.groupEnd();

  console.groupEnd();
}

const log = createByType('log');
const info = createByType('info');
const error = createByType('error');

export const logger = { log, info, error, debug };