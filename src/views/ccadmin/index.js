import routes from './routes';
import { buildRemoteModulePath, buildRemoteViewPath } from './utils';

require(['common/container/pageContainer'], (pageContainer) => {
  const _originalStart = pageContainer.start;
  /**
   * When pagecontainer.start runs it will receive a controller
   * which will attach data to model
   *
   * @param {Object} controller 
   * @returns {*} Original return
   */
  pageContainer.start = function ({ controller }) {
    const model = require('common/container/model');
    const _controllerInitialize = controller.initialize;

    controller.initialize = async function () {
      const result = await _controllerInitialize.apply(this, arguments);

      for (const route of routes) {
        route.modulePath = buildRemoteModulePath(route.modulePath);
        route.viewPath = buildRemoteViewPath(route.viewPath);
        model.pageConfigurations.push(route);
      }

      console.log("PRAIA UPDATED?", model.pageConfigurations)
      return result;
    };

    return _originalStart.apply(this, arguments);
  }
});