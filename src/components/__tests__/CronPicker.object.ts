import { ReactElement } from 'react';
import { RenderResult, render } from '~tests/test-utils';

export class CronPickerObject {
  constructor(private wrapper: RenderResult) {}

  static render(component: ReactElement) {
    return new CronPickerObject(render(component));
  }

  get container() {
    return this.wrapper;
  }
}
