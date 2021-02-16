const zipFolder = require('zip-folder');
const pkg = require('../package.json');
const path = require('path')

zipFolder(
  path.resolve(__dirname, '../dist'),
  path.resolve(__dirname, `./occ-debugger-v${pkg.version}.zip`),
  function(err) {
    if(err) {
      console.log('Error compressing extension folder', err);
    }
    
    console.log('Extension has been compressed successfully!');
  }
);