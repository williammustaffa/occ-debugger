function parseElementData(configs) {
  function assign(target, obj, prefix = '') {
    const exclude = ['__ko_mapping__', 'ko'];

    for(const key in obj) {
      if (!exclude.includes(key)) {
        target[`${prefix}${key}`] = obj[key];
      }
    }
  }


  try {
    const occRequire = __non_webpack_require__;
    const result = { __proto__: null };

    // Require knockout
    const ko = occRequire('knockout');
    const context = ko.contextFor($0);

    if (!context) {
      throw new Error('Please, select an element with knockout bindings.');
    }

    // Add context to result object
    // Setting prefix for context when serialize option is enabled
    assign(result, context, configs.options.toJS ? '*' : '');

    // If assign options is enabled
    // Add serialized data
    if (configs.options.toJS) {
      const serialized = ko.toJS(context.$data);
      assign(result, serialized);
    }

    return result;
  } catch({ message }) {
    return { message, __proto__: null };
  }
}

export const getParser = configs => {
  return `(${parseElementData.toString()})(${JSON.stringify(configs)})`;
}