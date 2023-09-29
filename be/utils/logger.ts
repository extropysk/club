import pino from "pino";
import { LokiOptions } from "pino-loki";

const buildStream = () => {
  if (process.env.LOKI_HOST && process.env.LOKI_CREDENTIALS) {
    const credentials = process.env.LOKI_CREDENTIALS.split(":");
    if (credentials.length === 2) {
      return pino.transport<LokiOptions>({
        target: "pino-loki",
        options: {
          batching: true,
          interval: 5,

          host: process.env.LOKI_HOST,
          labels: { app: "club", env: process.env.NODE_ENV },
          basicAuth: {
            username: credentials[0],
            password: credentials[1],
          },
        },
      });
    }
  }

  return pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  });
};

export const logger = pino(
  {
    level: "info",
  },
  buildStream()
);
