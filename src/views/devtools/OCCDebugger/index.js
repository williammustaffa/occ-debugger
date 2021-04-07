import { getParser } from './parser';

export default {
  id: 'debuggerPanel',
  name: 'OCC Debugger',
  triggers: ['default', 'selection'],
  update(sidebar, { configs }) {
    try {
      const parser = getParser(configs);
      sidebar.setExpression(parser);
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}