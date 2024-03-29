import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CronPicker } from '~components/CronPicker.tsx';
import {
  CronPickerInput,
  CronPickerInputWrapper,
  CronPickerLabel,
} from '~components/CronPickerInputs.tsx';
import {
  CronPickerHoursSelect,
  CronPickerMinutesSelect,
  CronPickerTimeWrapper,
} from '~components/CronPickerTime.tsx';
import '../main.css';

const CronPickerComponent = () => {
  const [current, setCurrent] = useState('2 4 * * 5#3');

  return (
    <>
      <CronPicker name="cron" value={current} onChange={setCurrent}>
        <CronPickerInputWrapper>
          <CronPickerLabel defaultValue="2 2 * * FRI" label="Only on Friday">
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
    </>
  );
};

const meta = {
  title: 'CronPicker',
  component: CronPickerComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CronPickerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBasicStyles: Story = {};
