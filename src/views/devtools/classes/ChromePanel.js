import extension from '@api/extension';

export default class ChromePanel {
  loaded = false;
  sidebar = null;
  error = null;

  constructor({ id, name, expression, onStart, onTabChange, onElementSeclection, enabled = true }) {
    this.id = id;
    this.name = name;
    this.expression = expression;
    this.enabled = enabled;

    // Callbacks
    this.onTabChange = onTabChange;
    this.onElementSeclection = onElementSeclection;
    this.onStart = onStart;

    // Startup
    this.start();
  }

  async start() {
    try {
      this.sidebar = await extension.createDevtoolsSideBarPane(this.name);
      this.loaded = true;

      if (typeof this.onStart === 'function') {
        await this.onStart.call(this);
      }

      if (typeof this.onElementSeclection === 'function') {
        extension.onDevtoolsElementSelectionChange(this.onElementSeclection.bind(this));
      }

      if (typeof this.onTabChange === 'function') {
        extension.onTabChange((tabId, changeInfo) => {
          const currentTabId = extension.getDevtoolsTabId();

          if (tabId === currentTabId) {
            this.onTabChange.call(this, tabId, changeInfo);
          }
        });
      }
    } catch({ message }) {
      this.error = message;
    }

    return this;
  }

  update() {
    this.validate();

    try {
      // States
      if (this.error) {
        throw new Error(this.error);
      }

      if (!this.enabled) {
        throw new Error('OCC Debugger is disabled for current site')
      }

      if (!this.loaded) {
        throw new Error('Loading panel...')
      }

      if (this.expression) {
        this.sidebar.setExpression(this.expression);
      }
    } catch({ message }) {
      this.setMessage(message);
    }
  }

  setMessage(message) {
    this.sidebar.setObject({ message, __proto__: null });
    return this;
  }

  setExpression(expression) {
    this.expression = expression;
    return this;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    return this;
  }

  setError(error) {
    this.error = error;
    return this;
  }

  setLoaded(loaded) {
    this.loaded = loaded;
    return this;
  }

  validate() {
    if (!this.sidebar) {
      throw new Error('Panel unavailable. Please make sure to execute .start method first');
    }
  }
}