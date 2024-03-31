import { ReactElement } from 'react';
import { RadioHandler } from '~tests/handlers/RadioHandler';
import { RenderResult, render } from '~tests/test-utils';
import { SelectHandler } from '~tests/handlers/SelectHandler.ts';
import { InputHandler } from '~tests/handlers/InputHandler.ts';

export class CronPickerObject {
  constructor(private wrapper: RenderResult) {}

  static render(component: ReactElement) {
    return new CronPickerObject(render(component));
  }

  get container() {
    return this.wrapper;
  }

  getOption(name: RegExp | string) {
    return RadioHandler.fromRole(name, this.container);
  }

  getMonthDayInput(name: RegExp | string) {
    const parent = this.getOption(name).element.closest('label');
    const input = parent?.querySelector(
      'input[type="number"][title="Months day input"]',
    );

    if (!input) {
      throw new Error(`No month day input found with name: ${name}`);
    }

    return InputHandler.fromElement(input as HTMLInputElement);
  }

  get hoursSelect() {
    return SelectHandler.fromRole('hours', this.container);
  }

  get minutesSelect() {
    return SelectHandler.fromRole('minutes', this.container);
  }
}
