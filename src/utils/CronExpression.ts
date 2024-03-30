// @todo handle better validation
const MINUTE_PATTERN = /^(?:\*|[0-5]?\d)$/;
const HOUR_PATTERN = /^(?:\*|[01]?\d|2[0-3])$/;
const MONTH_PATTERN =
  /^(?:\*|0?[1-9]|1[0-2]|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)$/;
const DAY_OF_WEEK_PATTERN =
  /^(?:\*|[0-6]|SUN|MON|TUE|WED|THU|FRI|SAT|[0-6]L|[0-6]#[1-5])$/;
const DAY_OF_MONTH_PATTERN =
  /^(?:\*|0?[1-9]|[12]\d|3[01]|[1-9]?[0-9]W?|LW?|W)$/;

type CronTouple = [string, string, string, string, string];

export class CronExpression {
  constructor(
    private cronMinutes: string,
    private cronHours: string,
    private cronDayOfMonth: string,
    private cronMonth: string,
    private cronDayOfWeek: string,
    private timeOffset = 0,
  ) {}

  public static fromExpression(
    expression: string,
    args?: {
      offset?: number;
      hours?: string;
      minutes?: string;
      dayOfMonth?: string;
      dayOfWeek?: string;
      month?: string;
    },
  ) {
    if (!CronExpression.isValid(expression)) {
      throw new Error(`Invalid cron expression: ${expression}`);
    }

    const parts = [...expression.split(' ')];

    if (args?.minutes) parts[0] = args.minutes;
    if (args?.hours) parts[1] = args.hours;
    if (args?.dayOfMonth) parts[2] = args.dayOfMonth;
    if (args?.month) parts[3] = args.month;
    if (args?.dayOfWeek) parts[4] = args.dayOfWeek;

    if (!CronExpression.isValid(parts.join(' '))) {
      throw new Error(`Invalid cron expression: ${parts.join(' ')}`);
    }

    return new CronExpression(...(parts as CronTouple), args?.offset ?? 0);
  }

  setDayOfMonth(dayOfMonth: string) {
    this.cronDayOfMonth = dayOfMonth;
  }

  get hours() {
    return this.cronHours;
  }

  get hoursWithOffset() {
    if (isNaN(parseInt(this.hours))) return this.hours;

    return ((parseInt(this.hours) + this.timeOffset + 24) % 24).toString();
  }

  get hoursMinusOffset() {
    if (isNaN(parseInt(this.hours))) return this.hours;

    const hours = parseInt(this.hours) - this.timeOffset;
    return (hours < 0 ? hours + 24 : hours).toString();
  }

  get minutes() {
    return this.cronMinutes;
  }

  get dayOfMonth() {
    return this.cronDayOfMonth;
  }
  get dayOfWeek() {
    return this.cronDayOfWeek;
  }
  get month() {
    return this.cronMonth;
  }

  get value() {
    return `${this.minutes} ${this.hours} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;
  }

  get valueWithOffset() {
    return `${this.minutes} ${this.hoursWithOffset} ${this.dayOfMonth} ${this.month} ${this.dayOfWeek}`;
  }

  static isValid(expression: string) {
    const parts = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }
    if (!MINUTE_PATTERN.test(parts[0])) return false;
    if (!HOUR_PATTERN.test(parts[1])) return false;
    if (!DAY_OF_MONTH_PATTERN.test(parts[2])) return false;
    if (!MONTH_PATTERN.test(parts[3])) return false;
    if (!DAY_OF_WEEK_PATTERN.test(parts[4])) return false;

    return true;
  }
}
