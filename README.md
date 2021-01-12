<p align="center">
  <img src="https://raw.githubusercontent.com/williammustaffa/occ-debugger/master/src/assets/icons/icon128.png" />
</p>
<h1 align="center">OCC Debugger - Chrome Extension</h1>

An extension to help occ developers to debug the plarform.

### Development
Install all packages
```
npm install
```
And run the dev server.
```
npm start
```
This will generate a dev `dist` folder on the project root. Upload the folder on `chrome://extensions` through `Load unpacked` option. _This option only displays when **developer mode** is enabled_.
 

Webpack is configured with [Webpack Extension Reloaded](https://github.com/rubenspgcavalcante/webpack-extension-reloader) Plugin, so you don't need to reload the extension every time you change the files while running the server.


### Build
Considering all packages are installed as per development section, run:
```
npm run build
```
This command will generate the unpacked version of the extension in the `dist` folder.


Popup is built using [Preact](https://preactjs.com/) and [Photon](http://photonkit.com/).

## Features

### Devtools
A panel is available in devtools called "OCC debugger". This will provide information regarding the inspected element.

### Popup
#### Enabled 
Enable OCC debugger to run on current site.

#### Topics
Enable topics debugging. Listen to "pubsub.topicNames" adding a log in console when any is triggered.

#### Spinner
Enable spinner debugging. Listen to spinner create and destroy methods, adding a log in console.

#### Serialize
Enable data serialization in devtools. Serialize data(`$context.data`) for inspected element.

**Note:** _when this option is enabled, context will be prefixed with a "*"_
