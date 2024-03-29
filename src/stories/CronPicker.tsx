import { useState } from 'react';
import {
  CronPicker,
  CronPickerInput,
  CronPickerLabel,
  CronPickerHoursSelect,
  CronPickerMinutesSelect,
  CronPickerTimeWrapper,
  CronPickerInputWrapper,
  CronPickerMonthDayInput,
} from '../index.ts';

export const CronPickerComponent = () => {
  const [current, setCurrent] = useState('2 4 * * 5#3');

  return (
    <div style={{ minWidth: '200px', fontFamily: 'sans-serif' }}>
      <CronPicker name="cron" value={current} onChange={setCurrent}>
        <CronPickerInputWrapper>
          <CronPickerLabel defaultValue="2 2 * * FRI" label="Only on Friday">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerLabel
            defaultValue="0 0 1 * *"
            label={
              <>
                On day <CronPickerMonthDayInput /> of the month
              </>
            }
          >
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerLabel
            defaultValue="2 4 * * 5#3"
            label="On the third Friday of the month"
          >
            <CronPickerInput />
          </CronPickerLabel>
        </CronPickerInputWrapper>

        <CronPickerTimeWrapper>
          <CronPickerHoursSelect />
          <CronPickerMinutesSelect />
        </CronPickerTimeWrapper>
      </CronPicker>

      <p>cron expression: {current}</p>
    </div>
  );
};
