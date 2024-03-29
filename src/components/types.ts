import React, { ReactNode } from 'react';

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
  > {
  defaultValue: string;
}

export interface CronPickerLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: ReactNode;
}

export interface CronPickerContextProps {
  name: string;
  checked: string;
  date: Date;
  onCheck: (value: string) => void;
  onDateChange: (date: Date) => void;
}

export interface CronPickerTimeProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'name' | 'value' | 'onChange'
  > {}
