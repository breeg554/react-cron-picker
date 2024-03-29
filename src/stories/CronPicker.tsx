import { useState } from 'react';
import {
  CronPicker,
  CronPickerInput,
  CronPickerLabel,
  CronPickerHoursSelect,
  CronPickerMinutesSelect,
  CronPickerTimeWrapper,
  CronPickerInputWrapper,
} from '../index.ts';

export const CronPickerComponent = () => {
  const [current, setCurrent] = useState('2 4 * * 5#3');

  return (
    <div style={{ minWidth: '200px', fontFamily: 'sans-serif' }}>
      <CronPicker name="cron" value={current} onChange={setCurrent}>
        <CronPickerInputWrapper>
          <CronPickerLabel label="Only on Friday">
            <CronPickerInput defaultValue="2 2 * * FRI" />
          </CronPickerLabel>

          <CronPickerLabel label="On day 1 of the month">
            <CronPickerInput defaultValue="0 0 1 * *" />
          </CronPickerLabel>

          <CronPickerLabel label="On the third Friday of the month">
            <CronPickerInput defaultValue="2 4 * * 5#3" />
          </CronPickerLabel>
        </CronPickerInputWrapper>

        <CronPickerTimeWrapper>
          <CronPickerHoursSelect />
          <CronPickerMinutesSelect />
        </CronPickerTimeWrapper>
      </CronPicker>

      <p>CURRENT: {current}</p>
    </div>
  );
};
