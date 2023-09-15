const pkg = require('../package.json');
const { createCommonBundle } = require('./bundle');

// plugins
const copy = require('rollup-plugin-copy');
const json = require('@rollup/plugin-json');
const html = require('@rollup/plugin-html');

module.exports = [
  // Popup
  createCommonBundle({
    input: 'views/popup/index.js',
    plugins: [html({ title: 'OCC Extras - Settings', fileName: 'index.html' })]
  }),

  // Devtools panel
  createCommonBundle({
    input: 'views/devtools/index.js',
    plugins: [html({ title: 'OCC Extras - Debugger', fileName: 'index.html' })],
  }),

  // Background
  createCommonBundle({
    input: 'scripts/background.js'
  }),

  // Content Script
  createCommonBundle({
    input: 'scripts/loader.js',
    plugins: [
      copy({
        verbose: true,
        targets: [
          { src: 'src/assets/icons/**/*', dest: 'dist/assets/icons' },
          { src: 'src/views/ccadmin/pages/*', dest: 'dist/views/ccadmin/pages' },
          { src: 'src/manifest.json', dest: 'dist', transform: content => content.toString().replace(/__version__/g, pkg.version) },
        ],
      }),
    ]
  }),

  // Inject admin panel
  createCommonBundle({
    input: 'views/ccadmin/index.js',
  }),

  // Injected store panel
  createCommonBundle({
    input: 'views/ccstore/index.js',
  }),

  // Inject store occ script
  createCommonBundle({
    input: 'scripts/occDebugger.js'
  }),
];
