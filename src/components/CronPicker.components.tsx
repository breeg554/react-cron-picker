import React, { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import {
  CronPickerInputProps,
  CronPickerInputWrapperProps,
  CronPickerLabelProps,
} from './types.ts';
import { updateDateInCron } from './CronPicker.helpers.ts';
import { useCronPicker } from './CronPicker.tsx';

export const CronPickerInput: React.FC<CronPickerInputProps> = ({
  defaultValue,
  onChange,
  className,
  ...rest
}) => {
  const { name, checked, onCheck, date } = useCronPicker();

  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(defaultValue);
    onChange?.(e);
  };

  const isChecked = checked === updateDateInCron(defaultValue, date);

  return (
    <input
      type="radio"
      name={name}
      checked={isChecked}
      onChange={handleOnCheck}
      className={clsx('cron-picker-input', className)}
      {...rest}
    />
  );
};

export const CronPickerLabel: React.FC<
  PropsWithChildren<CronPickerLabelProps>
> = ({ children, className, label, ...rest }) => {
  return (
    <label className={clsx('cron-picker-label', className)} {...rest}>
      {children}

      {label}
    </label>
  );
};

export const CronPickerInputWrapper: React.FC<CronPickerInputWrapperProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('cron-picker-input-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};
