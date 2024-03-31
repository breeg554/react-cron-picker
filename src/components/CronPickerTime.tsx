import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { useCronPicker } from './CronPicker.tsx';
import {
  CronPickerTimeOptionArgs,
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
  withAny = false,
  ...rest
}) => {
  const { onHoursChange, hours } = useCronPicker();

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onHoursChange(e.target.value);
  };

  const selectHours = useMemo(() => {
    const values: CronPickerTimeOptionArgs[] = [];

    if (withAny) {
      values.push({ value: '*', label: 'Any' });
    }

    for (let i = 0; i < 24; i++) {
      values.push({ value: `${i}`, label: `${i}`.padStart(2, '0') });
    }

    return values;
  }, [withAny]);

  return (
    <select
      name="hours"
      title="hours"
      value={hours}
      onChange={handleOnHoursChange}
      className={clsx('cron-picker-time-select', className)}
      {...rest}
    >
      {selectHours.map((hour) => (
        <React.Fragment key={hour.value}>{renderOption(hour)}</React.Fragment>
      ))}
    </select>
  );
};

export const CronPickerMinutesSelect: React.FC<CronPickerTimeProps> = ({
  renderOption = CronPickerTimeOption,
  className,
  withAny = false,
  ...rest
}) => {
  const { onMinutesChange, minutes } = useCronPicker();

  const handleOnMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMinutesChange(e.target.value);
  };

  const selectMinutes = useMemo(() => {
    const values: CronPickerTimeOptionArgs[] = [];

    if (withAny) {
      values.push({ value: '*', label: 'Any' });
    }

    for (let i = 0; i < 60; i++) {
      values.push({ value: `${i}`, label: `${i}`.padStart(2, '0') });
    }

    return values;
  }, [withAny]);

  return (
    <select
      name="minutes"
      title="minutes"
      value={minutes}
      onChange={handleOnMinutesChange}
      className={clsx('cron-picker-time-select', className)}
      {...rest}
    >
      {selectMinutes.map((minute) => (
        <React.Fragment key={minute.value}>
          {renderOption(minute)}
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
