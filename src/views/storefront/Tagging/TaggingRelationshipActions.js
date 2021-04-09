import { h } from 'preact';
import { Button } from '@components'; 
import { TaggingActionsStyled } from './Tagging.styles';
import { observables } from '@utils';

const highlightElement = relationship => {
  const { widgetName, widget } = relationship;
  const widgetId = `${observables.unwrap(widget.typeId)}-${observables.unwrap(widget.id)}`;
  const widgetSelector = `[id=${widgetId}] [data-widget-name]`;

  let timeout, interactive = true;

  return () => {
    if (!interactive) return;

    const elements = [
      ...document.querySelectorAll(widgetSelector)
    ];

    if (elements.length) {
      interactive = false;

      for (const element of elements) {
        element.removeAttribute("data-highlight-state");

        element.setAttribute("data-highlight-state", "active");

        // delay a little bit
        setTimeout(() => {
          element.setAttribute("data-highlight-state", "fading");
        }, 0);
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        for (const element of elements) {
          element.removeAttribute("data-highlight-state");
        }

        interactive = true;
      }, 2000);

      elements[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };
};

export const TaggingRelationshipActions = ({ relationship }) => {
  return (
    <TaggingActionsStyled>
      <Button
        primary
        onClick={highlightElement(observables.unwrap(relationship))}
      >
        Highlight Element
      </Button>
    </TaggingActionsStyled>
  );
};