import { isFunction } from 'lodash';

function unwrap(data) {
  return isFunction(data) ? data() : data;
}

export const observables = {
  unwrap,
};