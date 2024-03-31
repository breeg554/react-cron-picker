import { RenderResult, fireEvent } from '~tests/test-utils';

export class RadioHandler {
  constructor(private radioElement: HTMLElement) {}

  static fromRole(name: RegExp | string, container: RenderResult) {
    return new RadioHandler(container.getByRole('radio', { name: name }));
  }

  get isActive() {
    return this.radioElement.getAttribute('data-active') === 'true';
  }

  get element() {
    return this.radioElement;
  }

  click() {
    fireEvent.click(this.radioElement);
  }
}
