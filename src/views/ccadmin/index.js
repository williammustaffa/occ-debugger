import routes from './routes';

__non_webpack_require__(['common/container/pageContainer'], (pageContainer) => {
  const _originalStart = pageContainer.start;

  /**
   * When pagecontainer.start runs it will receive a controller
   * which will attach data to model
   *
   * @param {Object} controller 
   * @returns {*} Original return
   */
  pageContainer.start = function ({ controller }) {
    const model = __non_webpack_require__('common/container/model');
    const _controllerInitialize = controller.initialize;

    controller.initialize = async function () {
      const result = await _controllerInitialize.apply(this, arguments);

      for (const route of routes) {
        const { extensionPath } = window._occDebugger;
        route.modulePath = `${extensionPath}${route.modulePath}`;
        route.viewPath = `${extensionPath}${route.viewPath}`;
        model.pageConfigurations.push(route);
      }

      return result;
    };

    return _originalStart.apply(this, arguments);
  }
});