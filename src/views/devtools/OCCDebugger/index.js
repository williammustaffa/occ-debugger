import { getParser } from './parser';

export default {
  id: 'debuggerPanel',
  name: 'OCC Debugger',
  triggers: ['default', 'selection'],

  update(sidebar, { configs }) {
    try {
      sidebar.setExpression(getParser(configs));
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}