import React, { HTMLProps, ReactNode } from 'react';

export interface CronPickerProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange' | 'name'> {
  name: string;
  value: string;
  onChange?: (cron: string) => void;
}

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
  date: Date;
  onCheck: (value: string) => void;
  onDayOfMonthChange: (value: string, day: string) => void;
  onDateChange: (date: Date) => void;
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
