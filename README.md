# react-cron-picker (BETA)
A highly customizable React component for selecting cron expressions.
With no built-in styles, it grants complete freedom to customize and theme the picker to fit any design requirements.

## Features

- 🕒 Time Selection: Intuitive selection of hours and minutes for precise scheduling.
- 📅 Day and Month Selection: Choose specific days of the month or weekdays with ease.
- 🚀 Customizable: Extensible to support different scheduling scenarios through a flexible API.
- 📦 No External Dependencies: Built with React context and hooks, requiring no external state management libraries.

## Installation

```bash
npm install react-cron-picker
```

## Getting Started

#### Basic usage - [See live example](https://breeg554.github.io/react-cron-picker)

```tsx
export const CronPickerComponent = () => {
  const [current, setCurrent] = useState('2 4 * * 5#3');

  return (
    <>
      <CronPicker name="cron" value={current} onChange={setCurrent} offset={new Date().getTimezoneOffset()}>
        <CronPickerInputWrapper>
          <CronPickerLabel defaultValue="2 2 * * FRI" label="Only on Friday">
            <CronPickerInput />
          </CronPickerLabel>

          <CronPickerLabel
            defaultValue="0 0 1 * *"
            label="On day 1 of the month"
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
    </>
  );
};
```

## TODO

- [ ] handling value ranges (np. 1-2)
- [ ] handling value lists (np. 1, 2, 3)
- [ ] handling step values (np. 2/3, */5)


## License
MIT