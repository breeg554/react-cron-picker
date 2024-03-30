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

  public static fromExpression(expression: string, args = { offset: 0 }) {
    const parts = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }

    return new CronExpression(...(parts as CronTouple), args.offset);
  }

  public static fromDayOfMonth(
    expression: string,
    dayOfMonth: string,
    args = { offset: 0 },
  ) {
    const parts: string[] = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }

    parts[2] = dayOfMonth;

    return new CronExpression(...(parts as CronTouple), args.offset);
  }

  public static fromHours(
    expression: string,
    hours: string,
    args = { offset: 0 },
  ) {
    const parts: string[] = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }

    parts[1] = hours;

    return new CronExpression(...(parts as CronTouple), args.offset);
  }

  public static fromMinutes(
    expression: string,
    minutes: string,
    args = { offset: 0 },
  ) {
    const parts: string[] = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }

    parts[0] = minutes;

    return new CronExpression(...(parts as CronTouple), args.offset);
  }

  public static fromDate(expression: string, date: Date, args = { offset: 0 }) {
    const parts: string[] = [...expression.split(' ')];

    if (parts.length != 5) {
      throw new Error(`Invalid cron length: ${expression}`);
    }

    parts[1] = date.getUTCHours().toString();
    parts[0] = date.getUTCMinutes().toString();

    return new CronExpression(...(parts as CronTouple), args.offset);
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
    return this.hours;
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
}
