
function parser() {
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

  function getPageData(masterViewModel) {
    return unwrap(
      masterViewModel &&
      masterViewModel.data &&
      masterViewModel.data.global &&
      masterViewModel.data.global.pageContext
    );
  }

  function getUserData(masterViewModel) {
    const user = unwrap(
      masterViewModel &&
      masterViewModel.data &&
      masterViewModel.data.global &&
      masterViewModel.data.global.user
    );

    return { user };
  }

  // Execute
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

    const context = ko.contextFor(document.body);

    if (!context) {
      throw new Error('View model is not loaded yet.')
    }

    const masterViewModel = context.$masterViewModel;
    const widgets = getWidgetsFromRegions(masterViewModel);
    const page = getPageData(masterViewModel);
    const user = getUserData(masterViewModel);

    assign(result, widgets);
    assign(result, page);
    assign(result, user);

    return result;
  } catch({ message }) {
    return { message, __proto__: null };
  }
}

export const getParser = configs => {
  return `(${parser.toString()})(${JSON.stringify(configs)})`;
}