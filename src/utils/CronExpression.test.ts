import { test, describe, expect } from 'vitest';
import { CronExpression } from '~utils/CronExpression';

describe('CronExpression', () => {
  const expression = '* * * * *';

  test('should return cron expressions', () => {
    expect(CronExpression.fromExpression(expression).value).toBe(expression);
    expect(
      CronExpression.fromExpression(expression, { hours: '2' }).value,
    ).toBe('* 2 * * *');
    expect(
      CronExpression.fromExpression(expression, { minutes: '2' }).value,
    ).toBe('2 * * * *');
    expect(
      CronExpression.fromExpression(expression, { dayOfWeek: '2', month: '1' })
        .value,
    ).toBe('* * * 1 2');
    expect(
      CronExpression.fromExpression(expression, {
        minutes: '2',
        dayOfMonth: '5',
      }).value,
    ).toBe('2 * 5 * *');
  });

  test('should return hours with offset', () => {
    expect(CronExpression.fromExpression('0 3 * * *').hoursWithOffset).toBe(
      '3',
    );
    expect(CronExpression.fromExpression('0 * * * *').hoursWithOffset).toBe(
      '*',
    );
    expect(
      () => CronExpression.fromExpression('0 */5 * * *').hoursWithOffset,
    ).toThrowError(/Invalid cron expression:/i);
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
