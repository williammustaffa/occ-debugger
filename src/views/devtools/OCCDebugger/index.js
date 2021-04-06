import { getParser } from './parser';

export default {
  id: 'debuggerPanel',
  name: 'OCC Debugger',
  triggers: ['default'],

  update(sidebar, { configs, tab, ready }) {
    try {
      sidebar.setExpression(getParser(configs));
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}