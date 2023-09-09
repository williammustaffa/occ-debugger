import { h } from 'preact';
import { TaggingEvent } from '../TaggingEvent';
import { TaggingEventwrapper } from '../Storefront.styles';

export const TaggingPageDetail = ({ pageRelationship }) => {
  if (!pageRelationship?.page) {
    return null;
  }

  return (
    <TaggingEventwrapper>
      <TaggingEvent
        header={(
          <div>
            <strong>Repository Id:</strong> <span>{pageRelationship?.page?.repositoryId || '--'}</span><br />
            <strong>Page Id:</strong> <span>{pageRelationship?.page?.pageId || '--'}</span><br />
            <strong>Context Id:</strong> <span>{pageRelationship?.page?.contextId || '--'}</span><br />
          </div>
        )}
        content={JSON.stringify(pageRelationship.event.detail, null, 2)}
      />
    </TaggingEventwrapper>
  );
}