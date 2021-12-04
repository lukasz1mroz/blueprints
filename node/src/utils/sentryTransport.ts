import { addBreadcrumb } from '@sentry/node';
import Transport, { TransportStreamOptions } from 'winston-transport';
import { LogCallback } from 'winston';

export class SentryTransport extends Transport {
  public name: string;

  constructor(options?: TransportStreamOptions) {
    super(options);
    this.name = 'SentryTransport';
    this.silent = options?.silent || false;
  }

  log(logData: any, callback: LogCallback): NodeJS.Immediate {
    const { level, message, ...meta } = logData;
    const touchCallback = (result: string) => () => callback && callback(null, result);

    if (this.silent) {
      return setImmediate(touchCallback('skip: SentryTransport silenced'));
    }

    addBreadcrumb({
      category: meta.logSource || 'na',
      data: meta,
      message,
    });

    return setImmediate(touchCallback('accepted: SentryTransport breadCrumb added'));
  }
}
