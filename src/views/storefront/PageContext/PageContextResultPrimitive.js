import { h } from 'preact';
import { get } from 'lodash';
import { PageContextResultStyled, PageContextLink, PageContextValue } from './PageContext.styles';
import { storeInGlobalScope } from './PageContextData';

export function PageContextResultPrimitive({ parent, type, label, value }) {
  const primitiveValue = typeof value === 'string' ? `"${value}"` : String(value);
  const primitiveColor = typeof value === 'string' ? '#16a085' : '#000080';

  return (
    <PageContextResultStyled>
      <PageContextLink
        onClick={storeInGlobalScope(
          get(parent, 'label', label),
          get(parent, 'value', value)
        )}
      >{label}{parent && `()`}:</PageContextLink>&nbsp;
      <PageContextValue color={primitiveColor}>{primitiveValue}</PageContextValue>
    </PageContextResultStyled>
  );
}