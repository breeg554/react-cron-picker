export class InvalidCronExpression extends Error {
  constructor(expression: string) {
    super(`Invalid cron expression: ${expression}`);
  }
}
