import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { map, toPairs } from 'lodash';
import { PageContextDataStyled } from './PageContext.styles';
import { PageContextResultObservable } from './PageContextResultObservable';
import { PageContextResultFunction } from './PageContextResultFunction';
import { PageContextResultNonPrimitive } from './PageContextResultNonPrimitive';
import { PageContextResultNoData } from './PageContextResultNoData';
import { PageContextResultPrimitive } from './PageContextResultPrimitive';

const DEFAULT_COMPONENT = { type: 'undefined', value: ['undefined'], Component: PageContextResultNoData };
const DATA_COMPONENTS = [
  { type: 'primitives', value: ['boolean', 'string', 'number'], Component: PageContextResultPrimitive },
  { type: 'non-primitives', value: ['object', 'array'], Component: PageContextResultNonPrimitive },
  { type: 'functions', value: ['function'], Component: PageContextResultFunction },
  { type: 'observable', value: ['observable'], Component: PageContextResultObservable },
  DEFAULT_COMPONENT,
];

export function getDataComponent(type) {
  return DATA_COMPONENTS
    .find(dataType => dataType.value.includes(type)) || DEFAULT_COMPONENT;
}

export function getDataType(value) {
  let type;

  switch(typeof value) {
    // Function and observable
    case 'function':
      if (value.subscribe) {
        type = 'observable';
      } else {
        type = 'function';
      }
      break;

    // Object, array and null
    case 'object':
      if (Array.isArray(value)) {
        type = 'array';
      } else if (value === null) {
        type = 'undefined';
      } else {
        type = 'object';
      }
      break;

    // String, boolean, number
    default:
      type = typeof value;
  }

  return type;
}

export function renderResultData({ label, value }) {
  const type = getDataType(value);
  const { Component } = getDataComponent(type);

  return <Component type={type} label={label} value={value} />;
}

export function storeInGlobalScope(label, value) {
  return () => {
    const globalKey = `${label}_${Date.now()}`;
    window[globalKey] = value;
  
    console.info(`Storing ${label} in global scope as ${globalKey}`);
  }
}

export function PageContextData({ data }) {
  const contextData = useMemo(() => {
    return map(toPairs(data), ([label, value]) => {
      return { label, value };
    });
  }, [data]);

  return (
    <PageContextDataStyled>
      {map(contextData, renderResultData)}
    </PageContextDataStyled>
  )
}