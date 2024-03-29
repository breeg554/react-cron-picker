import type { Meta, StoryObj } from '@storybook/react';
import { CronPickerComponent } from './CronPicker.tsx';

const meta = {
  title: 'Example/CronPicker',
  component: CronPickerComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CronPickerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sample: Story = {};
