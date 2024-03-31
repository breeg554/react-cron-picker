import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { CronExpression } from '~utils/CronExpression.ts';
import { CronPickerContextProps, CronPickerProps } from './types.ts';

const CronPickerContext = React.createContext<CronPickerContextProps>(
  undefined!,
);

export const CronPicker: React.FC<PropsWithChildren<CronPickerProps>> = ({
  children,
  name,
  onChange,
  className,
  value: propsValue,
  defaultValue: propsDefaultValue,
  offset: propsOffset = 0,
  ...rest
}) => {
  const isFirstRender = useRef(false);
  const [value, setValue] = useState(propsValue ?? propsDefaultValue ?? '');
  const [checked, setChecked] = useState(propsValue ?? propsDefaultValue ?? '');

  const offset = useMemo(() => {
    return parseInt(Number(propsOffset / 60).toFixed(0));
  }, [propsOffset]);

  const onCheck = useCallback(
    (defaultValue: string) => {
      setChecked(defaultValue);
      setValue(CronExpression.fromExpression(defaultValue).value);
    },
    [value, offset],
  );

  const onDayOfMonthChange = useCallback(
    (defaultValue: string, day: string) => {
      setChecked(defaultValue);
      setValue(CronExpression.fromExpression(value, { dayOfMonth: day }).value);
    },
    [value, offset],
  );

  const onHoursChange = useCallback(
    (hours: string) => {
      setValue(
        CronExpression.fromExpression(value, { hours, offset }).valueWithOffset,
      );
    },
    [value, offset],
  );

  const onMinutesChange = useCallback(
    (minutes: string) => {
      setValue(CronExpression.fromExpression(value, { minutes }).value);
    },
    [value, offset],
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true;
    } else {
      onChange?.(CronExpression.fromExpression(value).value);
    }
  }, [value]);

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
