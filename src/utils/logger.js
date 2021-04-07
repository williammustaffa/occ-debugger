const TYPES = {
  log: '#00b894',
  error: '#f03434',
  info: '#029dce',
  warn: '#f39c12'
};

const STYLES = {
  prefix: 'font-weight: bold; color: #ffffff; background-color: __type__; padding: 1px 5px; border-radius: 3px',
  label: 'font-weight: bold; color: #222; padding: 1px 5px;',
  suffix: 'font-weight: normal; color: #222; padding: 1px 5px;'
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
    console.groupCollapsed('Arguments');
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