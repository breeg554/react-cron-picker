import { CronPicker } from '~components/CronPicker.tsx';
import {
  CronPickerInput,
  CronPickerLabel,
} from '~components/CronPicker.components.tsx';
import { useState } from 'react';
import {
  CronPickerHoursSelector,
  CronPickerMinutesSelector,
} from '~components/CronPickerTime.tsx';

function App() {
  const [current, setCurrent] = useState('2 3 * 6 5#3');

  return (
    <div>
      <CronPicker name="cron" value={current} onChange={setCurrent}>
        <CronPickerLabel label="First">
          <CronPickerInput defaultValue="2 2 * 2 *" />
        </CronPickerLabel>

        <CronPickerLabel label="Second">
          <CronPickerInput defaultValue="2 3 * 5 *" />
        </CronPickerLabel>

        <CronPickerLabel label="Third">
          <CronPickerInput defaultValue="2 4 * 6 5#3" />
        </CronPickerLabel>

        <div>
          at
          <CronPickerHoursSelector />
          <CronPickerMinutesSelector />
        </div>
      </CronPicker>

      <p>CURRENT: {current}</p>
    </div>
  );
}

export default App;
