const pino = require("pino");
const pretty = require("pino-pretty");
const stream = pretty({
  colorize: true,
  timestampKey: "time",
  translateTime: true,
});
const logger = pino(stream);

module.exports = logger;
