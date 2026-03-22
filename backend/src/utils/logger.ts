const formatMessage = (level: string, message: string) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}]: ${message}`;
};

export const logger = {
  info: (message: string) => console.log(formatMessage('INFO', message)),
  warn: (message: string) => console.warn(formatMessage('WARN', message)),
  error: (message: string, trace?: any) => {
    console.error(formatMessage('ERROR', message));
    if (trace) console.error(trace);
  },
  debug: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('DEBUG', message));
    }
  }
};