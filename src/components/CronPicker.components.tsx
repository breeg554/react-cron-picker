import React, { PropsWithChildren } from 'react';
import { CronPickerInputProps, CronPickerLabelProps } from './types.ts';
import { useCronPicker } from './CronPicker.tsx';
import { updateDateInCron } from './CronPicker.helpers.ts';

export const CronPickerInput: React.FC<CronPickerInputProps> = ({
  defaultValue,
  onChange,
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
      {...rest}
    />
  );
};

export const CronPickerLabel: React.FC<
  PropsWithChildren<CronPickerLabelProps>
> = ({ children, label, ...rest }) => {
  return (
    <label {...rest}>
      {label}

      {children}
    </label>
  );
};
