import { fireEvent } from '~tests/test-utils.ts';

export class InputHandler {
  constructor(private inputElement: HTMLInputElement) {}

  static fromElement(element: HTMLInputElement) {
    return new InputHandler(element);
  }

  get element() {
    return this.inputElement;
  }

  get isDisabled() {
    return this.inputElement.hasAttribute('disabled');
  }

  get value() {
    return this.inputElement.value;
  }

  setValue(value: string) {
    fireEvent.change(this.element, { target: { value } });
  }
}
