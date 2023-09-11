const pkg = require('../package.json');
const { createBundle } = require('./bundle');

// plugins
const html = require('@rollup/plugin-html');
const copy = require('rollup-plugin-copy');

module.exports = [
  createBundle({
    input: 'views/popup/index.js',
    plugins: [
      html({ title: 'OCC Debugger', fileName: 'index.html' }),
      copy({
        targets: [
          { src: 'src/assets/icons/**/*', dest: 'dist/assets/icons' },
          { src: 'src/views/ccadmin/pages/**/*', dest: 'dist/views/ccadmin/pages' },
          { src: 'src/manifest.json', dest: 'dist', transform: content => content.toString().replace(/__version__/g, pkg.version) },
        ],
      }),
    ],
  }),

  createBundle({
    input: 'views/devtools/index.js',
    plugins: [
      html({ title: 'OCC Debugger', fileName: 'index.html' }),
    ],
  }),

  createBundle({
    input: 'views/ccstore/index.js',
  }),

  createBundle({
    input: 'views/ccadmin/index.js',
  }),

  createBundle({
    input: 'scripts/loader.js',
  }),

  createBundle({
    input: 'scripts/background.js'
  }),

  createBundle({
    input: 'scripts/occDebugger.js'
  }),
];
