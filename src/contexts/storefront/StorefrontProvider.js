import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { StorefrontContext } from './StorefrontContext';
import { observables } from '@utils';

// hardcoded
function waitForAnalyticsFile() {
  return fetch('/oe-files/analytics/main.json')
    .then(res => (!res.ok ? {} : res.json()));
}

function waitForMasterViewModel() {
  return new Promise(resolve => {
    const checkIfMasterViewModelIsAvailable = () => {
      try {
        const ko = __non_webpack_require__('knockout');
        const context = ko.contextFor(document.body);
        const masterViewModel = context.$masterViewModel;

        if (!masterViewModel) {
          throw "$masterViewModel still not loaded";
        }

        resolve(masterViewModel);
      } catch(e) {
        setTimeout(checkIfMasterViewModelIsAvailable, 500);
      }
    }

    checkIfMasterViewModelIsAvailable();
  })
}

function getWidgetData(masterViewModel) {
  const widgets = {};
  const viewModelRegions = masterViewModel && masterViewModel.regions || [];

  const extractWidgets = regions => {
    const _regions = observables.unwrap(regions);

    _regions.forEach(region => {
      const regionWidgets = observables.unwrap(region.widgets);
      const regionRegions = observables.unwrap(region.regions);

      if (Array.isArray(regionWidgets) && regionWidgets.length) {
        regionWidgets.forEach(widget => {
          const widgetName = observables.unwrap(widget.typeId).replace(/_v\d+$/, '');
          widgets[widgetName] = widget;
        });
      }

      // Recursive approach
      if (Array.isArray(regionRegions) && regionRegions.length) {
        extractWidgets(regionRegions);
      }
    });
  }

  extractWidgets(viewModelRegions);

  return widgets;
}

function getLayoutData(masterViewModel) {
  const widgets = getWidgetData(masterViewModel);

  return { widgets };
}

export function StorefrontProvider({ children }) {
  const [configs, setConfigs] = useState(window._occDebugger);
  const [loading, setLoading] = useState(true);
  
  // data
  const [layout, setLayout] = useState(null);
  const [tagging, setTagging] = useState(null);

  useEffect(async () => {
    let subscription;

    setLoading(true);

    const loadData = async () => {
      const viewModel = await waitForMasterViewModel();
      const taggingData = await waitForAnalyticsFile();

      // Updating layout data
      subscription = viewModel.regions.subscribe(() => {
        setLayout(getLayoutData(viewModel));
      });

      // First layout udpate
      setLayout(getLayoutData(viewModel));
      setTagging(taggingData);
      setLoading(false);
    }

    try {
      loadData();
    } catch(e) {
      setLoading(false);
      console.log("[OCC Debugger - Analytics] Failed initializing...");
    }

    // Clean subscription on unmount
    return subscription && subscription.dispatch();
  }, []);

  return (
    <StorefrontContext.Provider value={{ loading, configs, layout, tagging }}>
      {children}
    </StorefrontContext.Provider>
  )
}