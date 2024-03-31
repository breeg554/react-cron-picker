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

const CronPickerComponent = () => {
  return (
    <CronPicker name="cron" defaultValue="20 * * * 5#3">
      <CronPickerInputWrapper>
        <CronPickerLabel defaultValue="* 4 * * 5#3" label="* 4 * * 5#3">
          <CronPickerInput />
        </CronPickerLabel>

        <CronPickerLabel defaultValue="20 * * * 5#3" label="20 * * * 5#3">
          <CronPickerInput />
        </CronPickerLabel>
      </CronPickerInputWrapper>

      <CronPickerTimeWrapper>
        <CronPickerHoursSelect />
        <CronPickerMinutesSelect />
      </CronPickerTimeWrapper>
    </CronPicker>
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

export const Simple: Story = {};
