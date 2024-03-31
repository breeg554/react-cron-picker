import { afterAll, describe, expect, test, vi } from 'vitest';
import { CronPicker } from '../CronPicker';
import { CronPickerObject } from './CronPicker.object';
import { InvalidCronExpression } from '~utils/errors';
import { CronPickerMinutesSelect } from '~components/CronPickerTime';
import { CronPickerInput } from '~components/CronPickerInputs';

describe(CronPicker.name, () => {
  describe('errors', () => {
    const consoleMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    afterAll(() => {
      consoleMock.mockReset();
    });

    test('should throw an error if value is incorrect', () => {
      expect(() =>
        CronPickerObject.render(<CronPicker name="test" value="*" />),
      ).toThrowError(InvalidCronExpression);
    });

    test('should throw an error if defaultValue is incorrect', () => {
      expect(() =>
        CronPickerObject.render(<CronPicker name="test" defaultValue="*" />),
      ).toThrowError(InvalidCronExpression);
    });

    test('should throw an error if usePicker is used without provider', () => {
      expect(() =>
        CronPickerObject.render(
          <CronPickerMinutesSelect renderOption={() => <></>} />,
        ),
      ).toThrowError(/useCronPicker can be used only inside CronPicker/i);
    });

    test('should throw an error if useCronPickerLabel is used without provider', () => {
      expect(() => CronPickerObject.render(<CronPickerInput />)).toThrowError(
        /useCronPickerLabel can be used only inside CronPicker/i,
      );
    });
  });
});
