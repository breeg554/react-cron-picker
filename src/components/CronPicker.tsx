import React, { PropsWithChildren, useState } from 'react';
import { CronPickerContextProps, CronPickerProps } from './types.ts';
import {
  extractDateFromCron,
  isValidCron,
  updateDateInCron,
} from '~components/CronPicker.helpers.ts';

const CronPickerContext = React.createContext<CronPickerContextProps>(
  undefined!,
);

export const CronPicker: React.FC<PropsWithChildren<CronPickerProps>> = ({
  children,
  name,
  value,
  onChange,
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
      <div {...rest}>{children}</div>
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
