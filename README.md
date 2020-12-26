# OCC Debugger - Chrome Extension

TODO

### Build
Building the extension is really simple
```
npm run build
```
This command will generate the unpacked version of the extension in the `dist` folder.

### Development
```
npm install
```
Then `build` the application and import the generated `dist` folder on `chrome://extensions` through `Load unpacked` option.
**Note:** _This option will only appear if you turned the **Developer mode** on._

Popup id build using `preact` library.

### Settings
**Domain:** Domain you want to debug. Eg: _occsite.com_

**Topics:** Enable topics debugging

**Spinner:** Enable spinner debugging
