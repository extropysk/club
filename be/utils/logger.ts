import pino from "pino";
import loki from "pino-loki";
import pretty from "pino-pretty";

const buildStream = () => {
  if (process.env.LOKI_HOST && process.env.LOKI_CREDENTIALS) {
    const credentials = process.env.LOKI_CREDENTIALS.split(":");
    if (credentials.length === 2) {
      return loki({
        batching: true,
        interval: 5,

        host: process.env.LOKI_HOST,
        labels: {
          app: "club",
          env: process.env.NODE_ENV,
          version: process.env.VERCEL_GIT_COMMIT_SHA!,
        },
        basicAuth: {
          username: credentials[0],
          password: credentials[1],
        },
      });
    }
  }

  return pretty({
    colorize: true,
  });
};

export const logger = pino(
  {
    level: "info",
  },
  buildStream()
);
