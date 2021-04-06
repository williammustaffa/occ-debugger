import { resources } from '@utils';
import { getParser } from './parser';

export default {
  id: 'analyticsPanel',
  name: 'OCC Analytics',
  triggers: ['default'],

  load(sidebar, state, next) {
    const analyticsInterval = setInterval(() => {
      sidebar.setObject({ message: "Error parsing analytics file. Please refresh the page to try again.", __proto__: null });

      resources.getHARLog().then(async result => {
        const resource = result.find(a => a.request.url.match(/analytics\/main\.json/));

        if (resource) {
          try {
            const content = await resources.getResourceContent(resource);
            this.details = JSON.parse(content);
            clearInterval(analyticsInterval);
            next();
          } catch(e) {
            sidebar.setObject({ message: e.message, __proto__: null });
            clearInterval();
          }
        }
      });
    }, 500);
  },

  update(sidebar, { configs }) {
    try {
      sidebar.setExpression(getParser(configs));
    } catch({ message }) {
      sidebar.setObject({ message, __proto__: null });
    }
  }
}