function assign(target, obj, prefix = '') {
  const exclude = ['__ko_mapping__', 'ko'];

  for(const key in obj) {
    if (!exclude.includes(key)) {
      target[`${prefix}${key}`] = obj[key];
    }
  }
}

function debounce(fn, wait, immediate) {
  let timeout;

  return function () {
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(this, arguments);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
		timeout = setTimeout(later, wait);

    if (callNow) fn.apply(this, arguments);
	};
}

export const helpers = { assign, debounce };