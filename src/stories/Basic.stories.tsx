import type { Meta, StoryObj } from '@storybook/react';
import { CronPickerComponent } from './CronPicker.tsx';
import '../main.css';

const meta = {
  title: 'CronPicker',
  component: CronPickerComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CronPickerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
