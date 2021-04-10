import { h, Fragment } from 'preact';
import { Icon } from '@components';
import { observables } from '@utils';

export const TaggingRelationshipTitle = ({ relationship }) => {
  const { widgetName, widget, events } = relationship;

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