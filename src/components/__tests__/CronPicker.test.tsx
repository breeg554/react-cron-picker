import { afterAll, describe, expect, test, vi } from 'vitest';
import { CronPicker } from '../CronPicker';
import { CronPickerObject } from './CronPicker.object';
import { InvalidCronExpression } from '~utils/errors';

describe(CronPicker.name, () => {
  describe('validations', () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    afterAll(() => {
      consoleMock.mockReset();
    });

    test('should throw an error if expressions is incorrect', () => {
      expect(() =>
        CronPickerObject.render(
          <CronPicker name="test" value="*">
            <p>A</p>
          </CronPicker>,
        ),
      ).toThrowError(InvalidCronExpression);
    });
  });
});
