import { isObject } from 'lodash';
import { observables } from '@utils';

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

function buildComponentData(widget, component, commonEvents) {
  if (!component || observables.unwrap(widget.global)) return [];

  const events = [];

  component.events.forEach(event => {
    const triggers = event.trigger.split(',');

    triggers.forEach(trigger => {
      const subEvent = $.extend(true, {}, event, { trigger });

      if (!subEvent.detail.action) {
        subEvent.detail.action = subEvent.trigger;
      }
  
      if (!subEvent.selector) {
        subEvent.selector = subEvent.trigger;
      }

      commonEvents.forEach(commonEvent => {
        const commonDataTriggers = commonEvent.trigger.split(',');

        if (
          commonEvent.trigger === 'all' ||
          commonDataTriggers.indexOf(subEvent.trigger) > -1
        ) {
          subEvent.detail = merge(commonEvent.detail, subEvent.detail);
        }
      });

      events.push(subEvent);
    })
  });

  return events;
}

export function getWidgetEvents(widgetName, widget, tagging) {
  const components = tagging && tagging.components || {};
  const { common, custom } = components;
  const component = custom.find(data => data.component === widgetName);

  return buildComponentData(widget, component, common);
}