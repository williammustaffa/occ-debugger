import { resources } from '@utils';
import { getParser } from './parser';

let details;

export default {
  id: 'analyticsPanel',
  name: 'OCC Analytics',
  triggers: ['default'],
  load(sidebar, state, next, fail) {
    const maxTries = 20;
    let nOfTries = 0;

    sidebar.setObject({ message: 'Waiting for analytics file...', __proto__: null });

    const checkAnalyticsInHAR = () => {
      resources.getHARLog().then(async result => {
        const resource = result.find(a => a.request.url.match(/analytics\/main\.json/));

        if (nOfTries >= maxTries) {
          fail('Failed intercepting analytics file... Please reload the page.');
          return;
        }

        if (resource) {
          try {
            const content = await resources.getResourceContent(resource);
            details = JSON.parse(content);
            next();
          } catch(e) {
            fail('Failed intercepting analytics file... Please reload the page.');
          }
        } else {
          nOfTries++;
          setTimeout(checkAnalyticsInHAR, 1000);
        }
      });
    };

    checkAnalyticsInHAR();
  },
  update(sidebar, { configs }) {
    try {
      const parser = getParser(details);
      sidebar.setExpression(parser);
    } catch({ message }) {
      sidebar.setObject({ message, __proto__: null });
    }
  }
}