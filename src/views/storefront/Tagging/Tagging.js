import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useStorefront } from '@contexts/storefront';
import { Window, Button } from '@components';

// Style
import { TaggingHeading, TaggingSchemaWrapper } from './Tagging.styles';

// Utils
import { getWidgetEvents, getPageEvent } from './utils'; 

// Subcomponents
import { TaggingSchema } from './TaggingSchema';
import { Events } from '../Events';

function renderSection(section, setSchema) {
  return (
    <Fragment>
      <TaggingHeading>{section.label}</TaggingHeading>
      {
        section.schemas.map(option => (
          <Button sidebar onClick={() => setSchema(option.data)}>{option.label}</Button>
        ))
      }
    </Fragment>
  )
}

export function Tagging({ active }) {
  const { widgets, tagging, page } = useStorefront();
  const [schema, setSchema] = useState();

  const sections = useMemo(() => {
    const data = [];

    data.push({
      label: 'Global',
      type: 'static',
      schemas: [
        {
          label: 'Page',
          data: { type: 'page', page, events: [getPageEvent(page, tagging)] },
        }
      ]
    });

    data.push({
      label: 'Widgets',
      type: 'static',
      schemas: Object.entries(widgets).map(([widgetName, widget]) => {
        return {
          label: widgetName,
          data: { type: 'widget', widget, widgetName, events: getWidgetEvents(widgetName, widget, tagging)},
        };
      })
    });

    return data;
  }, [page, widgets]);

  return (
    <Window.Content visible={active} layout={true}>
      <Window.Sidebar>
        {
          sections.map(section => renderSection(section, setSchema))
        }
      </Window.Sidebar>
      <Window.Main>
        <TaggingSchema schema={schema}/>
      </Window.Main>
      <Window.Sidebar>
        <TaggingHeading>Events</TaggingHeading>
        <TaggingSchemaWrapper>
          <Events />
        </TaggingSchemaWrapper>
      </Window.Sidebar>
    </Window.Content>
  );
}