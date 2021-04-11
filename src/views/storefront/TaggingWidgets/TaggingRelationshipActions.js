import { h } from 'preact';
import { Button } from '@components'; 
import { TaggingActionsStyled } from './TaggingWidgets.styles';
import { observables } from '@utils';

const highlightElement = relationship => {
  const { widgetName, widget } = relationship;
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