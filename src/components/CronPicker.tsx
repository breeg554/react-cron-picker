import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { CronPickerContextProps, CronPickerProps } from './types.ts';
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
  const [checked, setChecked] = useState(value);

  const offset = useMemo(() => {
    return parseFloat(Number(propsOffset / 60).toFixed(0));
  }, [propsOffset]);

  const onCheck = useCallback(
    (value: string) => {
      setChecked(value);

      onChange?.(CronExpression.fromExpression(value).value);
    },
    [value, offset],
  );

  const onDayOfMonthChange = useCallback(
    (value: string, day: string) => {
      setChecked(value);

      onChange?.(
        CronExpression.fromExpression(value, { dayOfMonth: day }).value,
      );
    },
    [value, offset],
  );

  const onHoursChange = useCallback(
    (hours: string) => {
      onChange?.(
        CronExpression.fromExpression(value, { hours, offset }).valueWithOffset,
      );
    },
    [value, offset],
  );

  const onMinutesChange = useCallback(
    (minutes: string) => {
      onChange?.(CronExpression.fromExpression(value, { minutes }).value);
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
      hours: CronExpression.fromExpression(value, { offset }).hoursMinusOffset,
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
