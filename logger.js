const { createLogger, format, transports } = require('winston');
const path = require('path');
const PostgresTransport = require('@pauleliet/winston-pg-native');

// Create a logs directory if it doesn't exist
const logDir = 'logs';
const fs = require('fs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'affirm-integration' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(logDir, 'combined.log') }),
        new PostgresTransport({
            connectionString: 'postgres://username:password@localhost:5432/database_name',
            tableName: 'logs', // optional, defaults to 'logs'
            level: 'info', // optional, defaults to 'info'
            maxsize: 10000000, // optional, max size of the log table
            maxFiles: 10 // optional, max number of log tables to maintain
        })
    ]
});

module.exports = logger;
