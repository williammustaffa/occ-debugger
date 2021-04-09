import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { Section, ContentStyled, TaggingEvent } from './Analytics.styles';
import { useStorefront } from '@contexts/storefront';
import { Title } from '@components';

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

function buildComponentData(widget, component, commonEvents) {
  if (!component || unwrap(widget.global)) return [];

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

  return events;
}

function getWidgetEvents(widgetName, widget, tagging) {
  const components = tagging && tagging.components || {};
  const { common, custom } = components;
  const component = custom.find(data => data.component === widgetName);

  return buildComponentData(widget, component, common);
}

export function Analytics() {
  const { layout, tagging } = useStorefront();

  if (!layout || !tagging) return 'Loading...';

  const taggingRelationships = useMemo(() => {
    return Object.entries(layout.widgets).map(([widgetName, widget]) => {
      return {
        widgetName,
        widget,
        events: getWidgetEvents(widgetName, widget, tagging)
      };
    });
  }, [tagging, layout]);

  const renderTaggingRelationship = relationship => {
    const renderTaggingEvent = event => {
      return (
        <TaggingEvent>{JSON.stringify(event.detail, null, 2)}</TaggingEvent>
      );
    }
  
    const renderTaggingDetail = relationship => {
      const { events } = relationship;
  
      if (!events.length) {
        return <p>this widget is not tagged!</p>;
      }
  
      return relationship.events.map(renderTaggingEvent);
    }

    return (
      <div>
        <Title>{relationship.widgetName}</Title>
        <div>
          {renderTaggingDetail(relationship)}
        </div>
      </div>
    )
  };

  return (
    <ContentStyled>
      <Section>
        Analytics data
      </Section>
      <Section>
        {taggingRelationships.map(renderTaggingRelationship)}
      </Section>
    </ContentStyled>
  );
}