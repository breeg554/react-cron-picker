import React, { PropsWithChildren, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { CronExpression } from '~utils/CronExpression.ts';
import {
  CronPickerInputProps,
  CronPickerInputWrapperProps,
  CronPickerLabelContextProps,
  CronPickerLabelProps,
  CronPickerMonthDayInputProps,
} from './types.ts';
import { useCronPicker } from './CronPicker.tsx';

const CronPickerInputContext = React.createContext<CronPickerLabelContextProps>(
  undefined!,
);

export const useCronPickerLabel = () => {
  const ctx = React.useContext(CronPickerInputContext);

  if (!ctx) {
    throw new Error(
      'useCronPickerLabel can be used only inside CronPickerLabel',
    );
  }

  return ctx;
};

export const CronPickerInput: React.FC<CronPickerInputProps> = ({
  onChange,
  className,
  ...rest
}) => {
  const { defaultValue, isActive } = useCronPickerLabel();
  const { name, onCheck } = useCronPicker();

  const handleOnCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(defaultValue);
    onChange?.(e);
  };

  return (
    <input
      type="radio"
      name={name}
      data-active={isActive}
      checked={isActive}
      onChange={handleOnCheck}
      className={clsx('cron-picker-input', className)}
      {...rest}
    />
  );
};

const DAY_OF_MONTH_MIN = 1;
const DAY_OF_MONTH_MAX = 31;

export const CronPickerMonthDayInput: React.FC<
  CronPickerMonthDayInputProps
> = ({ onChange, className, disabled, ...rest }) => {
  const { onDayOfMonthChange } = useCronPicker();
  const { defaultValue, isActive } = useCronPickerLabel();
  const [value, setValue] = useState(
    CronExpression.fromExpression(defaultValue).dayOfMonth,
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (
      isNaN(e.target.valueAsNumber) ||
      e.target.valueAsNumber < DAY_OF_MONTH_MIN
    ) {
      return setValue(`${DAY_OF_MONTH_MIN}`);
    }
    if (e.target.valueAsNumber > DAY_OF_MONTH_MAX) return;

    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(CronExpression.fromExpression(defaultValue).dayOfMonth);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;
    onDayOfMonthChange(defaultValue, value);
  }, [value]);

  return (
    <input
      type="number"
      title="Months day input"
      className={clsx('cron-picker-month-day-input', className)}
      disabled={!isActive || disabled}
      max={DAY_OF_MONTH_MAX}
      min={DAY_OF_MONTH_MIN}
      value={value}
      onChange={handleOnChange}
      {...rest}
    />
  );
};

export const CronPickerLabel: React.FC<
  PropsWithChildren<CronPickerLabelProps>
> = ({ children, className, label, defaultValue, ...rest }) => {
  const { checked } = useCronPicker();

  const isActive = checked === defaultValue;

  return (
    <CronPickerInputContext.Provider value={{ defaultValue, isActive }}>
      <label className={clsx('cron-picker-label', className)} {...rest}>
        {children}

        {label}
      </label>
    </CronPickerInputContext.Provider>
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
