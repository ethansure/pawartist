// Simple logging utility for debugging
// Logs are visible in Vercel Functions logs

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  tool: string;
  action: string;
  data?: Record<string, unknown>;
  error?: string;
  stack?: string;
  duration?: number;
}

class Logger {
  private tool: string;
  private startTime: number;

  constructor(tool: string) {
    this.tool = tool;
    this.startTime = Date.now();
  }

  private format(level: LogLevel, action: string, data?: Record<string, unknown>, error?: Error): string {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      tool: this.tool,
      action,
      duration: Date.now() - this.startTime,
    };

    if (data) {
      // Sanitize sensitive data
      entry.data = this.sanitize(data);
    }

    if (error) {
      entry.error = error.message;
      entry.stack = error.stack;
    }

    return JSON.stringify(entry);
  }

  private sanitize(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized = { ...data };
    
    // Remove or truncate sensitive/large fields
    if (sanitized.image && typeof sanitized.image === "string") {
      sanitized.image = sanitized.image.substring(0, 50) + "...[truncated]";
    }
    if (sanitized.dataUrl && typeof sanitized.dataUrl === "string") {
      sanitized.dataUrl = sanitized.dataUrl.substring(0, 50) + "...[truncated]";
    }
    
    return sanitized;
  }

  info(action: string, data?: Record<string, unknown>) {
    console.log(this.format("info", action, data));
  }

  warn(action: string, data?: Record<string, unknown>) {
    console.warn(this.format("warn", action, data));
  }

  error(action: string, error: Error, data?: Record<string, unknown>) {
    console.error(this.format("error", action, data, error));
  }

  debug(action: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.log(this.format("debug", action, data));
    }
  }

  // Log API request start
  start(data?: Record<string, unknown>) {
    this.startTime = Date.now();
    this.info("request_start", data);
  }

  // Log API request end
  end(success: boolean, data?: Record<string, unknown>) {
    this.info("request_end", { success, ...data });
  }
}

export function createLogger(tool: string): Logger {
  return new Logger(tool);
}

// Wrapper for async operations with timing
export async function withLogging<T>(
  logger: Logger,
  action: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  logger.info(`${action}_start`);
  
  try {
    const result = await fn();
    logger.info(`${action}_complete`, { duration: Date.now() - start });
    return result;
  } catch (error) {
    logger.error(`${action}_failed`, error as Error, { duration: Date.now() - start });
    throw error;
  }
}
