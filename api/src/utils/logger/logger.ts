import { createLogger , format , LoggerOptions, transports} from "winston";
const DailyRotateFile = require("winston-daily-rotate-file");
require("dotenv").config();
import * as fs from "fs";
const defaultLevel = process.env.LOG_LEVEL;
const logsDir = "logs";

// We might want to do something on rotation?
// rotateTransport.on("rotate", (oldFilename, newFilename) => {
//     // do something fun
// });

if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
}

const { combine, timestamp, label, printf} = format;

const options: LoggerOptions = {
	exitOnError: false,
	level: defaultLevel,
	format: combine(
		// format.label({label:path.basename(caller)}),
		timestamp({
			format: "DD/MM/YYYY HH:mm:ss",
		}),
		label({ label: "API" }),
		// tslint:disable-next-line:no-shadowed-variable
		printf(({ level, message, label, timestamp }) => {
			return `${timestamp} ${level} [${label}] ${message}`;
		}),
		format.splat(),
		// format.json()
	) ,
	transports: [
		new DailyRotateFile({
			name: "info",
			filename: `${logsDir}/info.log`,
			// datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
			showLevel: true,
			level: "info", // info and below to rotate
		}),
		new DailyRotateFile({
			name: "error",
			filename: `${logsDir}/error.log`,
			// datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
			showLevel: true,
			level: "error", // error and below to rotate
		}),
		new DailyRotateFile({
			name: "silly",
			filename: `${logsDir}/silly.log`,
			// datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "1d",
			showLevel: true,
			level: "silly", // error and below to rotate
		}),
	],
};

const logger = createLogger(options);

if (process.env.NODE_ENV === "develop") {
	logger.add(new transports.Console({
		format: combine(
			timestamp(),
			label({ label: "DEV" }),
			format.colorize({ all: false }),
			// tslint:disable-next-line:no-shadowed-variable
			printf(({ level, message, label, timestamp }) => {
				return `${timestamp} ${level} [${label}] ${message}`;
			})),
		handleExceptions: true,
	}));
}

export class LoggerStream {
	public write(message: string) {
		logger.info(message.substring(0, message.lastIndexOf("\n")));
	}
}
export { logger };