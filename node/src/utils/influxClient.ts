import { InfluxDB } from '@influxdata/influxdb-client';
import { config } from '../../config';

const influxDbUrl = config.influx.dbUrl;
const influxToken = config.influx.token;

export const influxClient = new InfluxDB({ url: influxDbUrl, token: influxToken });
