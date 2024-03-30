export class CustomDate {
  static fromTime(hours = 0, minutes = 0) {
    return new Date(new Date().setHours(hours, minutes, 0, 0));
  }
}
