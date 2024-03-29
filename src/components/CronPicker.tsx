import React, { PropsWithChildren, useState } from 'react';
import { clsx } from 'clsx';
import { CronPickerContextProps, CronPickerProps } from './types.ts';
import {
  extractDateFromCron,
  isValidCron,
  updateDateInCron,
} from './CronPicker.helpers.ts';

const CronPickerContext = React.createContext<CronPickerContextProps>(
  undefined!,
);

export const CronPicker: React.FC<PropsWithChildren<CronPickerProps>> = ({
  children,
  name,
  value,
  onChange,
  className,
  ...rest
}) => {
  if (!isValidCron(value)) throw new Error(`Invalid cron expression: ${value}`);

  const [date, setDate] = useState(extractDateFromCron(value));

  const onCheck = (value: string) => {
    onChange?.(updateDateInCron(value, date));
  };

  const onDateChange = (date: Date) => {
    setDate(date);

    onChange?.(updateDateInCron(value, date));
  };

  return (
    <CronPickerContext.Provider
      value={{
        name,
        checked: updateDateInCron(value, date),
        onCheck,
        onDateChange,
        date,
      }}
    >
      <div className={clsx('cron-picker', className)} {...rest}>
        {children}
      </div>
    </CronPickerContext.Provider>
  );
};

export const useCronPicker = () => {
  const ctx = React.useContext(CronPickerContext);

  if (!ctx) {
    throw new Error('useCronPicker can be used only inside CronPicker');
  }

  return ctx;
};
