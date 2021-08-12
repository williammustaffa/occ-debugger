import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Sidepanel } from '@components';
import { TaggingHeading } from './TaggingWidgets.styles';
import { TaggingPageDetail } from './TaggingPageDetail';
import { getWidgetEvents, getPageEvent } from './utils'; 

// Subcomponents
import { TaggingRelationship } from './TaggingRelationship';

export function TaggingWidgets({ active }) {
  const { widgets, tagging, page } = useStorefront();

  const pageRelationship = useMemo(() => {
    return {
      page,
      event: getPageEvent(page, tagging)
    };
  }, [tagging, page]);

  const taggingRelationships = useMemo(() => {
    return Object.entries(widgets).map(([widgetName, widget]) => {
      return {
        widgetName,
        widget,
        events: getWidgetEvents(widgetName, widget, tagging)
      };
    });
  }, [tagging, widgets]);

  return (
    <Sidepanel.Content hide={!active}>
      <TaggingHeading>Page</TaggingHeading>
      <TaggingPageDetail pageRelationship={pageRelationship} />
      <TaggingHeading>Widgets</TaggingHeading>
      {
        taggingRelationships.map(relationship => {
          return <TaggingRelationship relationship={relationship}/>
        })
      }
    </Sidepanel.Content>
  );
}