export const isValidCron = (expression: string) => {
  const parts = expression.split(' ');

  if (parts.length !== 5) {
    return false;
  }

  const minutePattern = /^(?:\*|[0-5]?\d)$/;
  const hourPattern = /^(?:\*|[01]?\d|2[0-3])$/;
  const monthPattern =
    /^(?:\*|0?[1-9]|1[0-2]|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
  const dayOfWeekPattern =
    /^(?:\*|[0-6]|SUN|MON|TUE|WED|THU|FRI|SAT|[0-6]L|[0-6]#[1-5])$/;
  const dayOfMonthPattern = /^(?:\*|0?[1-9]|[12]\d|3[01]|[1-9]?[0-9]W?|LW?|W)$/;

  if (!minutePattern.test(parts[0])) return false;
  if (!hourPattern.test(parts[1])) return false;
  if (!dayOfMonthPattern.test(parts[2])) return false;
  if (!monthPattern.test(parts[3])) return false;
  if (!dayOfWeekPattern.test(parts[4])) return false;

  return true;
};

export const extractDateFromCron = (expression: string) => {
  const hoursString = expression.split(' ')[1];
  const minutesString = expression.split(' ')[0];

  const hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date;
};

export const updateDateInCron = (expression: string, date: Date) => {
  const parts = [...expression.split(' ')];

  parts[1] = date.getHours().toString();
  parts[0] = date.getMinutes().toString();

  return parts.join(' ');
};
