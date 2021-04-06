
function parser(configs) {
  // Utils
  function assign(target, obj, prefix = '') {
    const exclude = ['__ko_mapping__', 'ko'];

    for(const key in obj) {
      if (!exclude.includes(key)) {
        target[`${prefix}${key}`] = obj[key];
      }
    }
  }

  function unwrap(data) {
    return typeof data === 'function' ? data() : data;
  }

  // Define processors
  function getWidgetsFromRegions(masterViewModel) {
    const widgets = {};
    const viewModelRegions = masterViewModel && masterViewModel.regions || [];

    const extractWidgets = regions => {
      const _regions = unwrap(regions);

      _regions.forEach(region => {
        const regionWidgets = unwrap(region.widgets);
        const regionRegions = unwrap(region.regions);

        if (Array.isArray(regionWidgets) && regionWidgets.length) {
          regionWidgets.forEach(widget => {
            const widgetName = unwrap(widget.typeId).replace(/_v\d+$/, '')
            widgets[widgetName] = widget
          });
        }

        // Recursive approach
        if (Array.isArray(regionRegions) && regionRegions.length) {
          extractWidgets(regionRegions);
        }
      });
    }

    extractWidgets(viewModelRegions);

    return { widgets };
  }

  // Execute
  try {
    const result = { __proto__: null };

    if (!__non_webpack_require__) {
      throw new Error('Please, select an element with knockout bindings');
    }

    // Require knockout
    const ko = __non_webpack_require__('knockout');

    const masterViewModel = ko.contextFor(document.body).$masterViewModel;
    const widgets = getWidgetsFromRegions(masterViewModel);


    assign(result, widgets);

    return result;
  } catch({ message }) {
    return { message, __proto__: null };
  }
}

export const getParser = configs => {
  return `(${parser.toString()})(${JSON.stringify(configs)})`;
};