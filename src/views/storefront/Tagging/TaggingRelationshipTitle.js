import { h, Fragment } from 'preact';
import { Icon } from '@components';

export const TaggingRelationshipTitle = ({ relationship }) => {
  const { widgetName, events } = relationship;

  const iconName = events.length ? 'check' : 'attention';
  const color = events.length ? 'green' : 'red';

  return (
    <Fragment>
      <Icon name={iconName} text style={{ color }}/>
      {widgetName}
    </Fragment>
  );
}