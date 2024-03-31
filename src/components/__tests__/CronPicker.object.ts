import { ReactElement } from 'react';
import { RadioHandler } from '~tests/handlers/RadioHandler';
import { RenderResult, render } from '~tests/test-utils';

export class CronPickerObject {
  constructor(private wrapper: RenderResult) {}

  static render(component: ReactElement) {
    return new CronPickerObject(render(component));
  }

  get container() {
    return this.wrapper;
  }

  get inputs() {
    return this.container.getAllByRole('radio');
  }

  getOption(name: string) {
    return RadioHandler.fromRole(name, this.container);
  }
}
