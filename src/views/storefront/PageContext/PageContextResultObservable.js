import { h } from 'preact';
import { useObservable } from '../../../hooks/useObservable';
import { getDataComponent, getDataType } from './PageContextData';

export function PageContextResultObservable({ type, label, value }) {
  const rawValue = useObservable(value);
  const rawType = getDataType(rawValue);
  const { Component } = getDataComponent(rawType);
  const parent = { type, label, value };

  return (
    <Component
      parent={parent}
      type={rawType}
      label={label}
      value={rawValue}
    />
  );
}