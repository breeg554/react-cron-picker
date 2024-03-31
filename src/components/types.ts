import React, { HTMLProps, ReactNode } from 'react';
import { RequireAtLeastOne } from '~utils/ts-utils';

interface CronPickerBaseProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'name'> {
  onChange?: (cron: string) => void;
  offset?: number;
  value?: string;
  defaultValue?: string;
  name: string;
}

export type CronPickerProps = RequireAtLeastOne<
  CronPickerBaseProps,
  'value' | 'defaultValue'
>;

export interface CronPickerInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'value' | 'checked' | 'name' | 'type'
  > {}

export interface CronPickerLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode;
  defaultValue: string;
}

export interface CronPickerInputWrapperProps
  extends HTMLProps<HTMLDivElement> {}

export interface CronPickerMonthDayInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'defaultValue' | 'value' | 'max' | 'min' | 'type'
  > {}

export interface CronPickerContextProps {
  name: string;
  checked: string;
  // date: Date;
  hours: string;
  minutes: string;
  onCheck: (value: string) => void;
  onDayOfMonthChange: (value: string, day: string) => void;
  onHoursChange: (hours: string) => void;
  onMinutesChange: (minutes: string) => void;
}

export interface CronPickerLabelContextProps {
  defaultValue: string;
  isActive: boolean;
}

export type CronPickerTimeOptionArgs = {
  value: string;
  label: ReactNode;
};

export interface CronPickerTimeProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'name' | 'value' | 'onChange'
  > {
  renderOption?: (args: CronPickerTimeOptionArgs) => ReactNode;
}

export interface CronPickerTimeOptionProps
  extends CronPickerTimeOptionArgs,
    Omit<React.OptionHTMLAttributes<HTMLOptionElement>, 'value' | 'label'> {
  value: string;
  label: ReactNode;
}

export interface CronPickerTimeWrapperProps extends HTMLProps<HTMLDivElement> {}
