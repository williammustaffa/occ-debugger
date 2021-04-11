import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Screen } from '@components';
import { StorefrontWrapper } from '../Storefront.styles';
import { getWidgetEvents } from './utils'; 

// Subcomponents
import { TaggingRelationship } from './TaggingRelationship';

export function TaggingWidgets() {
  const { layout, tagging } = useStorefront();

  if (!layout || !tagging) {
    return (
      <Screen>Waiting for layout data</Screen>
    )
  };

  const taggingRelationships = useMemo(() => {
    return Object.entries(layout.widgets).map(([widgetName, widget]) => {
      return {
        widgetName,
        widget,
        events: getWidgetEvents(widgetName, widget, tagging)
      };
    });
  }, [tagging, layout]);

  return (
    <StorefrontWrapper>
      {
        taggingRelationships.map(relationship => {
          return <TaggingRelationship relationship={relationship}/>
        })
      }
    </StorefrontWrapper>
  );
}