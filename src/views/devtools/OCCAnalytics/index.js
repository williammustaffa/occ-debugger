import { getParser } from './parser';

export default {
  id: 'analyticsPanel',
  name: 'OCC Analytics',
  triggers: ['default'],

  load(sidebar, next) { 
    const listener = ({ request, getContent }) => {
      if (request.url.match(/analytics\/main\.json/)) {
        getContent(content => {
          try {
            const details = JSON.parse(content);
            // TODO> use this details to match tagged widgets
          } catch(e) {
            console.warn("Error parsing analytics file");
          }

          chrome.devtools.network.onRequestFinished.removeListener(listener);
          next();
        });
      }
    }

    chrome.devtools.network.onRequestFinished.addListener(listener);
  },

  update(sidebar, { configs }) {
    try {
      sidebar.setExpression(getParser(configs));
    } catch({ message }) {
      sidebar.setObject({ message });
    }
  }
}