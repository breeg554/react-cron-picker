import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import { CronPicker } from '../CronPicker';
import { CronPickerObject } from './CronPicker.object';
import { InvalidCronExpression } from '~utils/errors';
import {
  CronPickerHoursSelect,
  CronPickerMinutesSelect,
} from '~components/CronPickerTime';
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

  describe('with time selectors', () => {
    const onChangeMock = vi.fn();

    afterEach(() => {
      onChangeMock.mockReset();
    });

    test('should update cron hours', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="* 2 * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="* 2 * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerHoursSelect />
        </CronPicker>,
      );

      expect(picker.hoursSelect.value).toBe('2');

      picker.hoursSelect.select('12');
      expect(picker.hoursSelect.value).toBe('12');

      expect(onChangeMock).toHaveBeenCalledOnce();
      expect(onChangeMock).toHaveBeenCalledWith('* 12 * * *');
    });

    test('should allows select * as hour', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="* 3 * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="* 3 * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerHoursSelect withAny />
        </CronPicker>,
      );

      expect(picker.hoursSelect.value).toBe('3');

      picker.hoursSelect.select('*');

      expect(onChangeMock).toHaveBeenCalledWith('* * * * *');
    });

    test('should update hours with minus timezone offset', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="* 3 * * *"
          onChange={onChangeMock}
          offset={-120}
        >
          <CronPickerLabel defaultValue="* 3 * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerHoursSelect />
        </CronPicker>,
      );

      expect(picker.hoursSelect.value).toBe('5');

      picker.hoursSelect.select('10');
      expect(onChangeMock).toHaveBeenLastCalledWith('* 8 * * *');

      picker.hoursSelect.select('1');
      expect(onChangeMock).toHaveBeenLastCalledWith('* 23 * * *');
    });

    test('should update hours with positive timezone offset', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="* 3 * * *"
          onChange={onChangeMock}
          offset={120}
        >
          <CronPickerLabel defaultValue="* 3 * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerHoursSelect />
        </CronPicker>,
      );

      expect(picker.hoursSelect.value).toBe('1');

      picker.hoursSelect.select('23');
      expect(onChangeMock).toHaveBeenLastCalledWith('* 1 * * *');
    });

    test('should update cron minutes', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="3 * * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="3 * * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerMinutesSelect />
        </CronPicker>,
      );

      expect(picker.minutesSelect.value).toBe('3');

      picker.minutesSelect.select('59');
      expect(picker.minutesSelect.value).toBe('59');

      expect(onChangeMock).toHaveBeenCalledOnce();
      expect(onChangeMock).toHaveBeenCalledWith('59 * * * *');
    });

    test('should allows select * as minutes', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="3 * * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="3 * * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerMinutesSelect withAny />
        </CronPicker>,
      );

      expect(picker.minutesSelect.value).toBe('3');

      picker.minutesSelect.select('*');

      expect(onChangeMock).toHaveBeenCalledWith('* * * * *');
    });

    test('should allow passing custom option', () => {
      const picker = CronPickerObject.render(
        <CronPicker
          name="cron"
          defaultValue="3 3 * * *"
          onChange={onChangeMock}
        >
          <CronPickerLabel defaultValue="3 3 * * *" label="1">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerHoursSelect
            renderOption={(option) => (
              <option value={option.value}>TEST</option>
            )}
          />
          <CronPickerMinutesSelect
            renderOption={(option) => (
              <option value={option.value}>TEST</option>
            )}
          />
        </CronPicker>,
      );
      picker.hoursSelect.select('22');
      picker.minutesSelect.select('59');

      expect(picker.minutesSelect.value).toBe('59');
      expect(picker.hoursSelect.value).toBe('22');
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
