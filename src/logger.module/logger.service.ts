import { createLogger, format, transports } from "winston"

export const loggerService = createLogger({
    transports: [
        new transports.File({
            dirname: ".log",
            filename: "log.json",
            format: format.combine(format.json()),
        }),
    ],
    format: format.combine(format.timestamp(), format.metadata()),
});