import { logger } from "../utils/logger.js";
import { SampleError } from "../utils/errors.js";

const LOG_SOURCE = "sampleService";

export const testAction = () => {
  try {
    logger.info("testAtion finished", { source: LOG_SOURCE, method: "GET" });
    return {
      status: 200,
    };
  } catch (e) {
    throw new SampleError({ logSource: LOG_SOURCE, message: e.message });
  }
};
