import { LitElement } from 'lit';

export function PageComponent(elementName: string) {
  return function <T extends { new (...args: any[]): LitElement }>(target: T) {
    if (!(target.prototype instanceof LitElement)) {
      Object.setPrototypeOf(target.prototype, LitElement.prototype);
    }

    target.prototype.createRenderRoot = function () {
      return this;
    };

    const originalConnectedCallback = target.prototype.connectedCallback;
    target.prototype.connectedCallback = function () {
      if (originalConnectedCallback) {
        originalConnectedCallback.call(this);
      }
    };

    const originalDisconnectedCallback = target.prototype.disconnectedCallback;
    target.prototype.disconnectedCallback = function () {
      if (originalDisconnectedCallback) {
        originalDisconnectedCallback.call(this);
      }
    };

    const customElementName = elementName.toLowerCase() + '-page';

    if (!customElements.get(customElementName)) {
      customElements.define(customElementName, target);
    }

    return target;
  };
}
