import { h } from 'preact';
import { get } from 'lodash';
import { PageContextResultStyled, PageContextLink, PageContextValue } from './PageContext.styles';
import { storeInGlobalScope } from './PageContextData';
import { capitalizeFirstLetter } from '@utils';

export function PageContextResultNoData({ parent, type, label, value }) {
  return (
    <PageContextResultStyled>
      <PageContextLink
        onClick={storeInGlobalScope(
          get(parent, 'label', label),
          get(parent, 'value', value)
        )}
      >{label}{parent && `()`}:</PageContextLink>&nbsp;
      <PageContextValue color={'#c0392b'}>{String(value)}</PageContextValue>
    </PageContextResultStyled>
  );
}