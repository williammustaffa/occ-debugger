import { h } from 'preact';
import { get } from 'lodash';
import { PageContextResultStyled, PageContextLink, PageContextValue } from './PageContext.styles';
import { storeInGlobalScope } from './PageContextData';
import { capitalizeFirstLetter } from '@utils';

export function PageContextResultFunction({ parent, type, label, value }) {
  return (
    <PageContextResultStyled>
      <PageContextLink
        onClick={storeInGlobalScope(
          get(parent, 'label', label),
          get(parent, 'value', value)
        )}
      >{label}{parent && `()`}:</PageContextLink>&nbsp;
      <PageContextValue color={'#000080'}>{`<${capitalizeFirstLetter(type)}>`}</PageContextValue>
    </PageContextResultStyled>
  );
}