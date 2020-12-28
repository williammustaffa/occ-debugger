# OCC Debugger - Chrome Extension

An extension to help occ developers to debug the plarform.

### Development
Install all packages...
```
npm install
```
...and then run the dev server.
```
npm start
```
This will generate a dev `dist` folder on the project root. Upload the folder on `chrome://extensions` through `Load unpacked` option. _This option only displays when **Developer mode** is enabled_
 

Webpack is configured with [Webpack Extension Reloaded](https://github.com/rubenspgcavalcante/webpack-extension-reloader) Plugin, so you don't need to upload it every time you change the files while running the server.


### Build
Considering all packages are installed as per Development section, run:
```
npm run build
```
This command will generate the unpacked version of the extension in the `dist` folder.


Popup id build using `preact` library.

### Features

**Topics:** Enable topics debugging
**Spinner:** Enable spinner debugging
**ViewModels:** TODO
