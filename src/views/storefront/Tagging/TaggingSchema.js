import { h, Fragment } from 'preact';
import { Screen, Button, Icon } from '@components';
import { observables } from '@utils';

// Styles
import { TaggingActions, TaggingSchemaWrapper } from './Tagging.styles';

// Compeonents
import { Event } from '../Event';

const renderTitle = schema => {
  const { widgetName, widget, events } = schema;
  const global = observables.unwrap(widget.global);
  let iconName, color;

  if (global) {
    iconName = 'globe';
    color = '#95a5a6';
  } else {
    iconName = events.length ? 'check' : 'attention';
    color = events.length ? '#4dc794' : '#ff8080';
  }

  return (
    <Fragment>
      <Icon name={iconName} text style={{ color }}/>
      {widgetName}
    </Fragment>
  );
}

const renderActions = schema => {
  if (schema.type !== 'widget') return;
  return (
    <TaggingActions>
      <Button
        primary
        onClick={highlightElement(observables.unwrap(schema))}
      >
        Highlight Element
      </Button>
    </TaggingActions>
  )
};

const renderEventDetails = event => {
  return Object.entries(event).map(([name, value]) => {
    if (name === 'detail') return null;

    return (
      <div>
        <strong>{name}:</strong> <span>{JSON.stringify(value)}</span>
      </div>
    )
  });
}

const renderEvents = ({ events = [] }) => {
  if (!events.length) {
    return <p>This widget is not tagged!</p>;
  }

  return events.map(event => {
    return (
      <Event
        header={renderEventDetails(event)}
        content={JSON.stringify(event.detail, null, 2)}
      />
    );
  });
};

const highlightElement = schema => {
  const { widgetName, widget } = schema;
  const widgetId = `${observables.unwrap(widget.typeId)}-${observables.unwrap(widget.id)}`;
  const widgetSelector = `[data-widget-name=${widgetName}]`;

  let timeout;

  return () => {
    const elements = [...document.querySelectorAll(widgetSelector)];

    if (elements.length) {
      for (const element of elements) {
        element.setAttribute("data-highlight-state", "reset");
        setTimeout(() => element.setAttribute("data-highlight-state", "active"), 0);

        if (timeout) {
          clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
          element.removeAttribute("data-highlight-state");
        }, 2000);
      }

      elements.pop().scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };
};

export function TaggingSchema({ schema }) {
  if (!schema) {
    return <Screen>Select a context</Screen>;
  }

  return (
    <TaggingSchemaWrapper>
      {renderActions(schema)}
      {renderEvents(schema)}
    </TaggingSchemaWrapper>
  );
};