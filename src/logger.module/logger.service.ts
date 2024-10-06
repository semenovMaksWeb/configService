import { createLogger, format, transports } from "winston"

export const loggerService = createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp(),
                format.printf(({ timestamp, level, message, metadata }) => {
                    return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
                        metadata
                    )}`;
                })
            ),
        }),
        new transports.File({
            dirname: ".log",
            filename: "log.json",
            format: format.combine(format.json()),
        }),
    ],
    format: format.combine(format.timestamp(), format.metadata()),
});