import { Validator } from 'jsonschema';

import { BadRequestError } from '../types/errors';

const LOG_SOURCE = 'tokenValidator';

export const validateJSONData = (data: any, schema: any) => {
  const validateJsonData = new Validator();
  if (validateJsonData.validate(data, schema).errors.length > 0) {
    throw new BadRequestError(LOG_SOURCE, 'JSON data missing');
  }
};
