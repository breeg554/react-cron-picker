import { RenderResult, fireEvent } from '~tests/test-utils';

export class RadioHandler {
  constructor(private element: HTMLElement) {}

  static fromRole(name: string, container: RenderResult) {
    return new RadioHandler(container.getByRole('radio', { name }));
  }

  get isActive() {
    return this.element.getAttribute('data-active') === 'true';
  }

  click() {
    fireEvent.click(this.element);
  }
}
