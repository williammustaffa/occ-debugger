function getResourceContent(resource) {
  return new Promise(resolve => {
    resource.getContent(content => {
      resolve(content);
    });
  });
}

function getResources() {
  return new Promise(resolve => {
    const result = [];

    chrome.devtools.inspectedWindow.getResources(async resources => {
      for (const resource of resources){
        const content = await getResourceContent(resource);
        result.push({ ...resource, content });
      }

      resolve(result);
    });
  })
}

function getHARLog() {
  return new Promise(resolve => {
    chrome.devtools.network.getHAR(harLog => {
      resolve(harLog && harLog.entries || []);
    })
  })
}

export const resources = {
  getResourceContent,
  getResources,
  getHARLog
};