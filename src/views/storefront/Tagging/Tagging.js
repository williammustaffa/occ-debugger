import { h, Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Section, TaggingStyled, GlobalTaggingStyles } from './Tagging.styles';
import { getWidgetEvents } from './utils'; 

// Subcomponents
import { TaggingRelationship } from './TaggingRelationship';

export function Tagging() {
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

  return (
    <TaggingStyled>
      <GlobalTaggingStyles />
      <Section>
        Analytics data
      </Section>
      <Section>
        {
          taggingRelationships.map(relationship => {
            return <TaggingRelationship relationship={relationship}/>
          })
        }
      </Section>
    </TaggingStyled>
  );
}