import logger from "../utils/Logger.js";

const routeLogger = (req, _res, next) => {
  const { url, method } = req;
  logger.info(`${method}: ${url} `);
  next();
};

export default routeLogger;
