import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { CronPickerContextProps, CronPickerProps } from './types.ts';
import { isValidCron } from './CronPicker.helpers.ts';
import { CronExpression } from '~utils/CronExpression.ts';

const CronPickerContext = React.createContext<CronPickerContextProps>(
  undefined!,
);

export const CronPicker: React.FC<PropsWithChildren<CronPickerProps>> = ({
  children,
  name,
  value,
  onChange,
  className,
  offset: propsOffset = 0,
  ...rest
}) => {
  if (!isValidCron(value)) throw new Error(`Invalid cron expression: ${value}`);

  const [checked, setChecked] = useState(value);

  const offset = useMemo(() => {
    return parseFloat(Number(propsOffset / 60).toFixed(0));
  }, [propsOffset]);

  const onCheck = useCallback(
    (value: string) => {
      setChecked(value);

      onChange?.(CronExpression.fromExpression(value, { offset }).value);
    },
    [value, offset],
  );

  const onDayOfMonthChange = useCallback(
    (value: string, day: string) => {
      setChecked(value);

      const expression = CronExpression.fromExpression(value, { offset });
      expression.setDayOfMonth(day);

      onChange?.(expression.value);
    },
    [value, offset],
  );

  const onHoursChange = useCallback(
    (hours: string) => {
      onChange?.(CronExpression.fromHours(value, hours, { offset }).value);
    },
    [value, offset],
  );

  const onMinutesChange = useCallback(
    (minutes: string) => {
      onChange?.(CronExpression.fromMinutes(value, minutes, { offset }).value);
    },
    [value, offset],
  );

  const contextValue = useMemo(
    () => ({
      name,
      checked,
      onCheck,
      onDayOfMonthChange,
      onHoursChange,
      onMinutesChange,
      hours: CronExpression.fromExpression(value, { offset }).hoursWithOffset,
      minutes: CronExpression.fromExpression(value).minutes,
    }),
    [
      offset,
      checked,
      name,
      onCheck,
      onHoursChange,
      onMinutesChange,
      onDayOfMonthChange,
    ],
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
