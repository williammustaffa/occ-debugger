import extension from '@api/extension';

export default class ChromePanel {
  loaded = false;
  sidebar = null;
  error = null;

  constructor({ id, name, triggers, update, expression }) {
    this.id = id;
    this.name = name;
    this.triggers = triggers;
    this.expression = expression;
  }

  async start() {
    try {
      this.sidebar = await extension.createDevtoolsSideBarPane(this.name);
      this.loaded = true;
    } catch({ message }) {
      this.loaded = false;
    }
  }

  update() {
    this.validate();

    try {
      // States
      if (this.error) {
        throw new Error(this.error);
      }

      if (!this.loaded) {
        throw new Error('Loading panel...')
      }

      if (this.expression) {
        this.setExpression(this.expression);
      }
    } catch({ message }) {
      this.setMessage({ message });
    }
  }

  setMessage(message) {
    this.validate();
    this.sidebar.setObject({ message, __proto__: null });
  }

  setExpression(expression) {
    this.validate();
    this.sidebar.setExpression(expression);
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setError(error) {
    this.error = error;
  }

  validate() {
    if (!this.sidebar) {
      throw new Error('Panel unavailable. Please make sure to execute .start method first');
    }
  }
}