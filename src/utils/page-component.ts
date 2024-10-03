import { LitElement } from 'lit';

export function PageComponent<T extends { new (...args: any[]): LitElement }>(target: T) {
  if (!(target.prototype instanceof LitElement)) {
    Object.setPrototypeOf(target.prototype, LitElement.prototype);
  }

  target.prototype.createRenderRoot = function () {
    return this;
  };

  return target;
}
