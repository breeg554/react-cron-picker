import React, { useMemo } from 'react';
import { useCronPicker } from '~components/CronPicker.tsx';
import {
  CronPickerTimeOptionProps,
  CronPickerTimeProps,
} from '~components/types.ts';

export const CronPickerTimeOption: React.FC<CronPickerTimeOptionProps> = ({
  value,
  label,
  ...rest
}) => {
  return (
    <option value={value} {...rest}>
      {label}
    </option>
  );
};

export const CronPickerHoursSelector: React.FC<CronPickerTimeProps> = ({
  renderOption = CronPickerTimeOption,
  ...rest
}) => {
  const { onDateChange, date } = useCronPicker();

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(e.target.value));
  };

  const dates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date();
      hourDate.setHours(i, date.getMinutes(), 0, 0);
      dates.push(hourDate);
    }

    return dates;
  }, [date]);

  return (
    <select
      name="hours"
      value={date.toISOString()}
      onChange={handleOnHoursChange}
      {...rest}
    >
      {dates.map((date) => (
        <React.Fragment key={date.getTime()}>
          {renderOption({
            value: date.toISOString(),
            label: date.getHours().toString().padStart(2, '0'),
          })}
        </React.Fragment>
      ))}
    </select>
  );
};

export const CronPickerMinutesSelector: React.FC<CronPickerTimeProps> = ({
  renderOption = CronPickerTimeOption,
  ...rest
}) => {
  const { onDateChange, date } = useCronPicker();

  const handleOnMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(e.target.value));
  };

  const dates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 60; i++) {
      const hourDate = new Date();
      hourDate.setHours(date.getHours(), i, 0, 0);
      dates.push(hourDate);
    }

    return dates;
  }, [date]);

  return (
    <select
      name="minutes"
      value={date.toISOString()}
      onChange={handleOnMinutesChange}
      {...rest}
    >
      {dates.map((date) => (
        <React.Fragment key={date.getTime()}>
          {renderOption({
            value: date.toISOString(),
            label: date.getMinutes().toString().padStart(2, '0'),
          })}
        </React.Fragment>
      ))}
    </select>
  );
};
