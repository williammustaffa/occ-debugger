const fs = require('fs');
const chromeWebstoreUploda = require('chrome-webstore-upload');
const pkg = require('../package.json');

const webStore = chromeWebstoreUploda({
  extensionId: process.env.EXTENSION_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
});

function getError(response) {
  const errors = response && response.itemError;

  return (
    Array.isArray(errors) &&
    errors.length &&
    errors.map(e => e.error_detail).join(' and ')
  );
}

async function upload(token) {
  const myZipFile = fs.createReadStream(`./occ-debugger-v${pkg.version}.zip`);

  return await webStore.uploadExisting(myZipFile, token).then(response => {
    const error = getError(response);

    if (error) {
      throw new Error(error);
    }

    return response;
  });
}

async function publish(token) {
  const target = 'default';

  return await webStore.publish(target, token).then(response => {
    const error = getError(response);

    if (error) {
      throw new Error(error);
    }

    return response;
  });
}

webStore.fetchToken().then(async token => {
  try {
    await upload(token);
    await publish(token);
    console.log('Extension published successfully!');
  } catch(e) {
    console.error('Error publishing extension:', e.message);
  }
});

