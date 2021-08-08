import { h } from 'preact';
import { isEmpty, get } from 'lodash';
import { Accordion } from '@components';
import { PageContextResultStyled, PageContextLink, PageContextValue } from './PageContext.styles';
import { PageContextData, storeInGlobalScope } from './PageContextData';
import { capitalizeFirstLetter } from '@utils';

export function PageContextResultNonPrimitive({ parent, type, label, value }) {
  const isDataEmpty = isEmpty(value);
  const title = (
    <span>
      <PageContextLink
        onClick={storeInGlobalScope(
          get(parent, 'label', label),
          get(parent, 'value', value)
        )}
      >{label}:</PageContextLink>&nbsp;
      <PageContextValue color={'#2c3e50'}>
        {`<${capitalizeFirstLetter(type)}>`}
        {isDataEmpty && <i>(empty)</i>}
      </PageContextValue>
    </span>
  );

  return (
    <PageContextResultStyled>
      <Accordion title={title} enabled={!isDataEmpty}>
        <PageContextData data={value} />
      </Accordion>
    </PageContextResultStyled>
  );
}