import { SampleErrorProps } from "../types/errors";

export class SampleError extends Error {
  logSource: string;
  message: string;

  constructor({ logSource, message }: SampleErrorProps) {
    super();
    this.logSource = logSource;
    this.message = message;
  }
}
