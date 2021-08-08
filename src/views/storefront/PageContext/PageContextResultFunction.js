import { h } from 'preact';
import { get } from 'lodash';
import { PageContextResultStyled, PageContextLink, PageContextValue } from './PageContext.styles';
import { storeInGlobalScope } from './PageContextData';

export function PageContextResultFunction({ parent, type, label, value }) {
  return (
    <PageContextResultStyled>
      <PageContextLink
        onClick={storeInGlobalScope(
          get(parent, 'label', label),
          get(parent, 'value', value)
        )}
      >{label}:</PageContextLink>&nbsp;
      <PageContextValue>{`<Function>`}</PageContextValue>
    </PageContextResultStyled>
  );
}