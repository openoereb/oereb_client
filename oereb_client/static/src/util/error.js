export class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoDataError";
  }
}
