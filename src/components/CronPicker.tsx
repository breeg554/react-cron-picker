import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { CronPickerContextProps, CronPickerProps } from './types.ts';
import {
  extractDateFromCron,
  isValidCron,
  updateDateInCron,
  updateDayOfMonthInCron,
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
  const [checked, setChecked] = useState(value);

  const onCheck = useCallback(
    (value: string) => {
      setChecked(value);

      onChange?.(updateDateInCron(value, date));
    },
    [value, date],
  );

  const onDayOfMonthChange = useCallback(
    (value: string, day: string) => {
      setChecked(value);

      onChange?.(
        updateDayOfMonthInCron(updateDateInCron(value, date), Number(day)),
      );
    },
    [date],
  );

  const onDateChange = useCallback(
    (date: Date) => {
      setDate(date);

      onChange?.(updateDateInCron(value, date));
    },
    [value],
  );

  const contextValue = useMemo(
    () => ({
      name,
      checked,
      onCheck,
      onDayOfMonthChange,
      onDateChange,
      date,
    }),
    [checked, date, name, onCheck, onDateChange, onDayOfMonthChange],
  );

  return (
    <CronPickerContext.Provider value={contextValue}>
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
