import Transport from 'winston-transport';
import { Point } from '@influxdata/influxdb-client';
import { influxClient } from './influxClient';
import { logger } from './logger';
import { LogData } from '../types/logData';
import { LogCallback } from 'winston';
import { config } from '../../config';

const org = config.influx.org;
const bucket = config.influx.bucket;
const LOG_SOURCE = 'influxTransport';

const sendMetricsToInflux = async (point: Point) => {
  const writeApi = influxClient.getWriteApi(org, bucket);
  try {
    await writeApi.writePoint(point);
    writeApi
      .close()
      .then(() => console.log('Influx data sending successful'))
      .catch((e) => console.error('Influx data sending error: ', e));
  } catch (e) {
    logger.error(e as string, { logSource: LOG_SOURCE });
  }
};

export const extractInfluxPointFromMessage = (logData: LogData): Point => {
  const point = new Point();
  const responseTime = logData?.meta?.responseTime || 0;

  point
    .measurement('response_time')
    .tag('endpoint', logData?.meta?.req?.url || 'naInfluxData')
    .tag('method', logData?.meta?.req?.method?.toLowerCase())
    .tag('statusCode', String(logData?.meta?.res?.statusCode) || 'naHttp')
    .timestamp(new Date())
    .intField('responseTime', responseTime);

  return point;
};

export class InfluxTransport extends Transport {
  log(logData: LogData, callback: LogCallback): NodeJS.Immediate {
    const touchCallback = (result: string) => () => callback && callback(null, result);
    const influxData = extractInfluxPointFromMessage(logData);

    sendMetricsToInflux(influxData);

    return setImmediate(touchCallback('accepted: logs sent'));
  }
}
