import winston from "winston";
import { Environment } from "../constants/environment";
import dotenv from "./env";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = dotenv.NODE_ENV || Environment.Development;
    const isDevelopment = env === Environment.Development;
    return isDevelopment ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

// File and API response format (no colors)
const apiFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.json()
);

const transports = [
    new winston.transports.Console({
        format: consoleFormat,
    }),
    new winston.transports.File({
        filename: "log/error.log",
        level: "error",
        format: consoleFormat, // Use plain format for file logs
    }),
    new winston.transports.File({
        filename: "log/all.log",
        format: consoleFormat, // Use plain format for file logs
    }),
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});

export default Logger;
