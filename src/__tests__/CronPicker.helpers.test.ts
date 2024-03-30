import { test, describe, expect } from 'vitest';
import { extractDateFromCron } from '~components/CronPicker.helpers';
import { CustomDate } from '~utils/CustomDate';
import { CronExpression } from '~utils/CronExpression';

// describe('extractDateFromCron', () => {
//   test('should extract date from simple expression', () => {
//     expect(extractDateFromCron('22 2 * * *')).toStrictEqual(
//       CustomDate.fromHours(2, 22),
//     );
//   });
// });

describe('CronExpression', () => {
  const expression = '* * * * *';

  test('should return cron expressions', () => {
    expect(CronExpression.fromExpression(expression).value).toBe(expression);
    expect(CronExpression.fromDayOfMonth(expression, '3').value).toBe(
      '* * 3 * *',
    );
    expect(CronExpression.fromHours(expression, '2').value).toBe('* 2 * * *');
    expect(CronExpression.fromMinutes(expression, '2').value).toBe('2 * * * *');
    expect(
      CronExpression.fromDate(expression, new Date('2024-03-30T12:46:12.000Z'))
        .value,
    ).toBe('46 12 * * *');
  });

  test('should return hours witho offset', () => {
    expect(CronExpression.fromExpression('0 3 * * *').hoursWithOffset).toBe(
      '3',
    );
    expect(CronExpression.fromExpression('0 * * * *').hoursWithOffset).toBe(
      '*',
    );
    expect(CronExpression.fromExpression('0 */5 * * *').hoursWithOffset).toBe(
      '*/5',
    );
    expect(
      CronExpression.fromExpression('0 3 * * *', { offset: 2 }).hoursWithOffset,
    ).toBe('5');
    expect(
      CronExpression.fromExpression('0 3 * * *', { offset: -6 })
        .hoursWithOffset,
    ).toBe('21');
    expect(
      CronExpression.fromExpression('0 23 * * *', { offset: 6 })
        .hoursWithOffset,
    ).toBe('5');
  });
});
