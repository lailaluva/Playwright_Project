import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs folder exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configure logger
const logger = createLogger({
  level: 'info', // Minimum level to log: info, warn, error, debug
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Add error stack traces
    format.splat(), // Enables string interpolation
    format.json(), // Log in JSON format for better parsing
    format.printf(({ timestamp, level, message, stack }) => {
      // Check if the message contains an error indicator
      const isError = typeof message === 'string' && 
        (message.includes('error') || message.includes('failed') || message.includes('Wrong password'));
      
      // Override level to ERROR if message indicates an error
      const displayLevel = isError ? 'ERROR' : level.toUpperCase();
      
      // Include stack trace for errors if available
      const stackInfo = stack ? `\n${stack}` : '';
      return `${timestamp} [${displayLevel}]: ${message}${stackInfo}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }), // Add colors in console
        format.printf(({ timestamp, level, message, stack }) => {
          const isError = typeof message === 'string' && 
            (message.includes('error') || message.includes('failed') || message.includes('Wrong password'));
          const displayLevel = isError ? 'ERROR' : level.toUpperCase();
          const stackInfo = stack ? `\n${stack}` : '';
          return `${timestamp} [${displayLevel}]: ${message}${stackInfo}`;
        })
      )
    }),
    new transports.File({ 
      filename: path.join(logDir, 'test.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 5 // Keep 5 files
    })
  ],
});

export default logger;
