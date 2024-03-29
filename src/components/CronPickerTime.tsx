import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { useCronPicker } from './CronPicker.tsx';
import {
  CronPickerTimeOptionProps,
  CronPickerTimeProps,
  CronPickerTimeWrapperProps,
} from './types.ts';

export const CronPickerTimeOption: React.FC<CronPickerTimeOptionProps> = ({
  value,
  label,
  className,
  ...rest
}) => {
  return (
    <option
      value={value}
      className={clsx('cron-picker-time-option', className)}
      {...rest}
    >
      {label}
    </option>
  );
};

export const CronPickerHoursSelect: React.FC<CronPickerTimeProps> = ({
  renderOption = CronPickerTimeOption,
  className,
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
      className={clsx('cron-picker-time-select', className)}
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

export const CronPickerMinutesSelect: React.FC<CronPickerTimeProps> = ({
  renderOption = CronPickerTimeOption,
  className,
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
      className={clsx('cron-picker-time-select', className)}
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

export const CronPickerTimeWrapper: React.FC<CronPickerTimeWrapperProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('cron-picker-time-wrapper', className)} {...rest}>
      <span>at</span>
      {children}
    </div>
  );
};
