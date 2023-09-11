import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { StorefrontContext } from './StorefrontContext';
import { observables, getDOMConfigs } from '@utils';

let ko, pubsub;

// hardcoded
function waitForAnalyticsFile() {
  return fetch('/oe-files/analytics/main.json')
    .then(res => (!res.ok ? {} : res.json()));
}

function waitForMasterViewModel() {
  return new Promise(resolve => {
    const checkIfMasterViewModelIsAvailable = () => {
      try {
        ko = require('knockout'), // __non_webpack_require__
        pubsub = require('pubsub'); // __non_webpack_require__

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

function getPageData(masterViewModel) {
  return masterViewModel?.data?.page;
}

export function StorefrontProvider({ children }) {
  const [configs, setConfigs] = useState(getDOMConfigs());
  const [loading, setLoading] = useState(true);
  
  // data
  const [page, setPage] = useState(null);
  const [widgets, setWidgets] = useState(null);
  const [events, setEvents] = useState([]);
  const [tagging, setTagging] = useState(null);

  useEffect(() => {
    const eventsListener = (event, data) =>  {
      if (!data) return;
      setEvents([ ...events, data]);
    };

    $(document).on('msiCustomDataTransfer.occDebugger', eventsListener);

    return () => {
      // Unsubscribe listener
      $(document).off('msiCustomDataTransfer.occDebugger', eventsListener);
    };
  }, [events]);

  useEffect(async () => {
    let widgetsSubscription, pageListener;

    setLoading(true);

    const loadData = async () => {
      const masterViewModel = await waitForMasterViewModel();
      const taggingData = await waitForAnalyticsFile();

      // Updating page data
      pageListener = updatedMasterViewModel => setPage(getPageData(updatedMasterViewModel));
      $.Topic(pubsub.topicNames.PAGE_LAYOUT_LOADED).subscribe(pageListener);

      // Updating widgets data
      widgetsSubscription = masterViewModel.regions.subscribe(() => {
        setWidgets(getWidgetData(masterViewModel));
      });

      // First layout udpate
      setWidgets(getWidgetData(masterViewModel));
      setPage(getPageData(masterViewModel));
      setTagging(taggingData);
      setLoading(false);
    }

    try {
      loadData();
    } catch(e) {
      setLoading(false);
    }

    // Clean subscription on unmount
    return () => {
      if (widgetsSubscription) widgetsSubscription.dispatch();
      if (pageListener) $.Topic(pubsub.topicNames.PAGE_LAYOUT_LOADED).unsubscribe(pageListener);
    }
  }, []);

  return (
    <StorefrontContext.Provider value={{ loading, configs, widgets, page, tagging, events }}>
      {children}
    </StorefrontContext.Provider>
  )
}