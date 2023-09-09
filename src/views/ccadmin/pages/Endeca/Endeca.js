define('ccadmin/pages/Endeca', function (require) {
  const i18n = require('common/util/i18n');
  const Page = require('common/pages/Page');
  const ReportingPanel = require('admin/pages/home/ReportingPanel');
  const ResourcesPanel = require('admin/pages/home/ResourcesPanel');
  const utils = require('common/util/utils');
  const REPORTING_PANEL_TEMPLATE = require('text!admin/pages/home/ReportingPanel.html');
  const RESOURCE_PANEL_TEMPLATE = require('text!admin/pages/home/ResourcesPanel.html');

  require('common/jet-composites/oj-oc-slate-page/loader');
  require('common/jet-composites/oj-oc-page-header/loader');
  require('text!ccadmin/pages/Endeca/Endeca.html');

  var $ = require('jquery');

  var homeBundle = require('ojL10n!admin/nls/home');

  i18n.addBundle('home', homeBundle);

  /**
   * @alias Endeca
   * @classdesc The home (dashboard) page
   * @constructor
   */
  var Endeca = function(params) {
      var extendedParams = $.extend({}, params, {
          pageId: 'cc-page-home'
      });
      Page.call(this, extendedParams);

      // Create and initialize the reporting panel, for loading with oj-module.
      var reportingPanel = new ReportingPanel();
      reportingPanel.initialize();

      /**
       * The module configuration for the reporting panel.
       * @type {oj-module.config}
       */
      this.reportingPanelConfig = {
          viewModel: reportingPanel,
          view: utils.parseTemplate(REPORTING_PANEL_TEMPLATE)
      };

      /**
       * The module configuration for the resources panel.
       * @type {oj-module.config}
       */
      this.resourcesPanelConfig = {
          viewModel: new ResourcesPanel(this),
          view: utils.parseTemplate(RESOURCE_PANEL_TEMPLATE)
      };

  };

  Endeca.prototype = Object.create(Page.prototype);
  Endeca.prototype.constructor = Endeca;

  return Endeca;
});