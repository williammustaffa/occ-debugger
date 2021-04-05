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
    const result = { __proto__: null };

    if (!__non_webpack_require__) {
      throw new Error('Require is not loaded yet.');
    }

    // Require knockout
    const ko = __non_webpack_require__('knockout');

    if (!ko) {
      throw new Error('Knockout is not loaded yet.');
    }

    const context = ko.contextFor($0);

    if (!context) {
      throw new Error('Please, select an element with knockout bindings.');
    }

    // If assign options is enabled
    // Add serialized data
    if (configs.options.toJS) {
      const serialized = ko.toJS(context.$data);
      assign(result, serialized);
    }

    // Add context to result object
    // Setting prefix for context when serialize option is enabled
    assign(result, context, configs.options.toJS ? '*' : '');

    return result;
  } catch({ message }) {
    return { message, __proto__: null };
  }
}

export const getParser = configs => {
  return `(${parseElementData.toString()})(${JSON.stringify(configs)})`;
}