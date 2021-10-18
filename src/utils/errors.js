export class SampleError extends Error {
  code;
  isOperational;
  logSource;
  description;
  message;

  constructor({ code, isOperational, logSource, description, message }) {
    super(description);
    this.code = code;
    this.isOperational = isOperational;
    this.logSource = logSource;
    this.description = description;
    this.message = message;
  }
}
