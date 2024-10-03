import { LitElement } from 'lit';

export function PageComponent<T extends { new (...args: any[]): LitElement }>(target: T) {
  if (!(target.prototype instanceof LitElement)) {
    Object.setPrototypeOf(target.prototype, LitElement.prototype);
  }

  target.prototype.createRenderRoot = function () {
    return this;
  };

  const connectedCallback = target.prototype.connectedCallback;
  target.prototype.connectedCallback = function () {
    connectedCallback && connectedCallback.call(this);
  };

  const disconnectedCallback = target.prototype.disconnectedCallback;
  target.prototype.disconnectedCallback = function () {
    disconnectedCallback && disconnectedCallback.call(this);
  };

  return target;
}
