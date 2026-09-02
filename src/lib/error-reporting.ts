type AppErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type AppErrorEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: AppErrorOptions,
  ) => void;
};

/**
 * Global application error reporting utility.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  // Log error to developer console in non-production
  if (process.env.NODE_ENV !== "production") {
    console.error("[AppError]", error, context);
  }

  const eventsKey = "__" + "app" + "Error" + "Events";
  const events = (window as any)[eventsKey] as AppErrorEvents | undefined;

  events?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      timestamp: new Date().toISOString(),
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
