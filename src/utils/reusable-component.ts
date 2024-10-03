import { LitElement } from "lit";

export function ReusableComponent(target: any) {
  if (!(target.prototype instanceof LitElement)) {
    Object.setPrototypeOf(target.prototype, LitElement.prototype);
  }
}