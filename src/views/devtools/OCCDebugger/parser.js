function parseElementData(configs) {
  function assign(target, obj, prefix = '') {
    const exclude = ['__ko_mapping__', 'ko'];

    for(const key in obj) {
      if (!exclude.includes(key)) {
        target[`${prefix}${key}`] = obj[key];
      }
    }
  }

  function getWidgetsFromRegions(ko, regions) {
    const widgets = {};

    const extractWidgets = regions => {
      const _regions = ko.unwrap(regions);

      _regions.forEach(region => {
        const regionWidgets = ko.unwrap(region.widgets);
        const regionRegions = ko.unwrap(region.regions);

        if (Array.isArray(regionWidgets) && regionWidgets.length) {
          regionWidgets.forEach(widget => {
            const widgetName = ko.unwrap(widget.typeId).replace(/_v\d+$/, '')
            widgets[widgetName] = widget
          });
        }

        // Recursive approach
        if (Array.isArray(regionRegions) && regionRegions.length) {
          extractWidgets(regionRegions);
        }
      });
    }

    extractWidgets(regions);

    return widgets;
  }

  try {
    const result = { __proto__: null };

    if (!__non_webpack_require__) {
      throw new Error('Please, select an element with knockout bindings');
    }

    // Require knockout
    const ko = __non_webpack_require__('knockout');
    const context = ko.contextFor($0);

    if (!context) {
      throw new Error('Please, select an element with knockout bindings.');
    }

    if (!configs.options.details) {
      const masterViewModel = ko.contextFor(document.body).$masterViewModel;
      const widgets = getWidgetsFromRegions(ko, masterViewModel.regions);
      const details = { widgets };
      assign(result, details, '*$');
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