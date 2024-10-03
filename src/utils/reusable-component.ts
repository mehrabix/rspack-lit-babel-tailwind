import { LitElement } from 'lit';

export function ReusableComponent<T extends { new (...args: any[]): LitElement }>(target: T) {
  if (!(target.prototype instanceof LitElement)) {
    Object.setPrototypeOf(target.prototype, LitElement.prototype);
  }

  target.prototype.createRenderRoot = function () {
    return this;
  };

  const connectedCallback = target.prototype.connectedCallback;
  target.prototype.connectedCallback = function () {
    connectedCallback && connectedCallback.call(this);
    console.log(`Reusable component ${target.name} connected`);
  };

  return target;
}
