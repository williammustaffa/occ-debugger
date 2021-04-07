function parser(details) {
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

  function isObject(data) {
    return typeof data === 'object' ? true : false;
  }

  function merge(target, source) {
    target = $.extend(true, {}, target);

    const processMerge = (target, source) => {
      if (!isObject(target)) {
        return source;
      }

      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          const value = processMerge(target ? target[key] : {}, source[key]);
          Object.assign(source[key], value);
        }
      })
  
      // Join `target` and modified `source`
      Object.assign(target || {}, source);
      return target;
    };
  
    return processMerge(target, source);
  }

  function buildEventData(events) {
    return events.reduce((acc, event) => {
      const key = event.selector || event.topic;
      if (!acc.hasOwnProperty(key)) acc[key] = [];
      acc[key].push(event);
      return acc;
    }, {});
  }

  function buildComponentData(widget, component, commonEvents) {
    if (unwrap(widget.global)) return 'Global';
    if (!component) return 'Widget has no tagging events';

    const events = [];

    component.events.forEach(event => {
      const triggers = event.trigger.split(',');

      triggers.forEach(trigger => {
        const subEvent = $.extend(true, {}, event, { trigger });

        commonEvents.forEach(commonEvent => {
          const commonDataTriggers = commonEvent.trigger.split(',');

          if (
            commonEvent.trigger === 'all' ||
            commonDataTriggers.indexOf(subEvent.trigger) > -1
          ) {
            subEvent.detail = merge(commonEvent.detail, subEvent.detail);
          }
        });

        if (!subEvent.selector) {
          subEvent.selector = subEvent.trigger;
        }

        events.push(subEvent);
      })
    });

    return buildEventData(events);
  }

  function getWidgetTagging(widgetName, widget) {
    const components = details && details.components;
    const { common, custom } = components;
    const component = custom.find(data => data.component === widgetName);

    return buildComponentData(widget, component, common);
  }

  // Define processors
  function getWidgetData(masterViewModel, details) {
    const widgets = {};
    const viewModelRegions = masterViewModel && masterViewModel.regions || [];

    const extractWidgets = regions => {
      const _regions = unwrap(regions);

      _regions.forEach(region => {
        const regionWidgets = unwrap(region.widgets);
        const regionRegions = unwrap(region.regions);

        if (Array.isArray(regionWidgets) && regionWidgets.length) {
          regionWidgets.forEach(widget => {
            const widgetName = unwrap(widget.typeId).replace(/_v\d+$/, '');
            widgets[widgetName] = getWidgetTagging(widgetName, widget);
          });
        }

        // Recursive approach
        if (Array.isArray(regionRegions) && regionRegions.length) {
          extractWidgets(regionRegions);
        }
      });
    }

    extractWidgets(viewModelRegions);

    return widgets;
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
    const widgets = getWidgetData(masterViewModel, details);

    assign(result, widgets);

    return result;
  } catch({ message, stack }) {
    return { message, stack, __proto__: null };
  }
}

export const getParser = (details = {}) => {
  return `(${parser.toString()})(${JSON.stringify(details)})`;
};