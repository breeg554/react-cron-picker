import { RenderResult, fireEvent } from '~tests/test-utils';

export class SelectHandler {
  constructor(private element: HTMLSelectElement) {}

  static fromRole(name: string, container: RenderResult) {
    return new SelectHandler(
      container.getByRole('combobox', { name }) as HTMLSelectElement,
    );
  }

  get value() {
    return this.element.value;
  }

  select(value: string) {
    fireEvent.change(this.element, { target: { value } });
  }
}
