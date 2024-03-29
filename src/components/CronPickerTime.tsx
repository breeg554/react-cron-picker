import React, { useMemo } from 'react';
import { useCronPicker } from '~components/CronPicker.tsx';
import { CronPickerTimeProps } from '~components/types.ts';

export const CronPickerHoursSelector: React.FC<CronPickerTimeProps> = (
  props,
) => {
  const { onDateChange, date } = useCronPicker();

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(e.target.value));
  };

  const dates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 24; i++) {
      const hourDate = new Date();
      hourDate.setHours(i, date.getMinutes(), 0, 0);
      dates.push(hourDate);
    }

    return dates;
  }, [date]);

  return (
    <select
      name="hours"
      value={date.toISOString()}
      onChange={handleOnHoursChange}
      {...props}
    >
      {dates.map((date) => (
        <option key={date.getTime()} value={date.toISOString()}>
          {date.getHours().toString().padStart(2, '0')}
        </option>
      ))}
    </select>
  );
};

export const CronPickerMinutesSelector: React.FC<CronPickerTimeProps> = (
  props,
) => {
  const { onDateChange, date } = useCronPicker();

  const handleOnMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(e.target.value));
  };

  const dates = useMemo(() => {
    const dates: Date[] = [];
    for (let i = 0; i < 60; i++) {
      const hourDate = new Date();
      hourDate.setHours(date.getHours(), i, 0, 0);
      dates.push(hourDate);
    }

    return dates;
  }, [date]);

  return (
    <select
      name="minutes"
      value={date.toISOString()}
      onChange={handleOnMinutesChange}
      {...props}
    >
      {dates.map((date) => (
        <option key={date.getTime()} value={date.toISOString()}>
          {date.getMinutes().toString().padStart(2, '0')}
        </option>
      ))}
    </select>
  );
};
