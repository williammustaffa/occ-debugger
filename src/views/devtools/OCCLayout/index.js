import { getParser } from './parser';

export default {
  id: 'layoutPanel',
  name: 'OCC Layout',
  triggers: ['default'],

  update(sidebar, { configs }) {
    try {
      sidebar.setExpression(getParser(configs));
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}