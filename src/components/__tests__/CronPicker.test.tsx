import { afterAll, describe, expect, test, vi } from 'vitest';
import { CronPicker } from '../CronPicker';
import { CronPickerObject } from './CronPicker.object';
import { InvalidCronExpression } from '~utils/errors';
import { CronPickerMinutesSelect } from '~components/CronPickerTime';
import { CronPickerInput, CronPickerLabel } from '~components/CronPickerInputs';

describe(CronPicker.name, () => {
  describe('simple', () => {
    test('should change active element after click', () => {
      const picker = CronPickerObject.render(
        <CronPicker name="cron" value="* * * * *">
          <CronPickerLabel defaultValue="* * * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerLabel defaultValue="20 * * * 5#3" label="2">
            <CronPickerInput />
          </CronPickerLabel>
        </CronPicker>,
      );

      const option1 = picker.getOption('1');
      const option2 = picker.getOption('2');

      expect(option1.isActive).toBe(true);
      expect(option2.isActive).toBe(false);

      option2.click();

      expect(option1.isActive).toBe(false);
      expect(option2.isActive).toBe(true);
    });

    test('should fire onChange after click', () => {
      const onChangeMock = vi.fn();

      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="* * * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="* * * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerLabel defaultValue="20 * * * 5#3" label="2">
            <CronPickerInput />
          </CronPickerLabel>
        </CronPicker>,
      );

      const option = picker.getOption('2');
      option.click();

      expect(onChangeMock).toHaveBeenCalledOnce();
      expect(onChangeMock).toHaveBeenCalledWith('20 * * * 5#3');
    });
  });

  describe('throws', () => {
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
