import {Pool} from 'pg'
import { logger } from '../utils/logger';
import { config } from '../../config/index';

const pool = new Pool(config.db)

export const dbQuery = async (queryObj) => {
    const start = Date.now()
    const resp = await pool.query(queryObj)
    const duration = Date.now() - start

    logger.info('Executed DB query', {duration})

    return resp
}
