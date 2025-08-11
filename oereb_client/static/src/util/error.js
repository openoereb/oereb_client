export class NoDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoDataError";
  }
}

export class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.name = "TooManyRequestsError";
  }
}
