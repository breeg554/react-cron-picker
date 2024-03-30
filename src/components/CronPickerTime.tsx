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
  const { onHoursChange, hours } = useCronPicker();

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onHoursChange(e.target.value);
  };

  const selectHours = useMemo(() => {
    const values: string[] = [];
    for (let i = 0; i < 24; i++) {
      values.push(`${i}`);
    }

    return values;
  }, []);

  return (
    <select
      name="hours"
      value={hours}
      onChange={handleOnHoursChange}
      className={clsx('cron-picker-time-select', className)}
      {...rest}
    >
      {selectHours.map((hour) => (
        <React.Fragment key={hour}>
          {renderOption({
            value: hour,
            label: hour.padStart(2, '0'),
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
  const { onMinutesChange, minutes } = useCronPicker();

  const handleOnMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMinutesChange(e.target.value);
  };

  const selectMinutes = useMemo(() => {
    const values: string[] = [];
    for (let i = 0; i < 60; i++) {
      values.push(`${i}`);
    }

    return values;
  }, []);

  return (
    <select
      name="minutes"
      value={minutes}
      onChange={handleOnMinutesChange}
      className={clsx('cron-picker-time-select', className)}
      {...rest}
    >
      {selectMinutes.map((minute) => (
        <React.Fragment key={minute}>
          {renderOption({
            value: minute,
            label: minute.padStart(2, '0'),
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
