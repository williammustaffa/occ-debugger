import { getParser } from './parser';

export default {
  id: 'layoutPanel',
  name: 'OCC Layout',
  triggers: ['default'],
  update(sidebar, { configs }) {
    try {
      const parser = getParser(configs);
      sidebar.setExpression(parser);
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}