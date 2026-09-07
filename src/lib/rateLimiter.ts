/**
 * Client-Side Rate Limiter Utility for Form Submissions and API Requests
 */

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

class ClientRateLimiter {
  private trackers = new Map<string, RateLimitTracker>();

  /**
   * Checks if an action key has exceeded max allowed requests within a time window.
   */
  isAllowed(actionKey: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const tracker = this.trackers.get(actionKey);

    if (!tracker || now > tracker.resetTime) {
      this.trackers.set(actionKey, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (tracker.count >= maxRequests) {
      return false;
    }

    tracker.count += 1;
    return true;
  }

  /**
   * Resets rate limit tracker for a given action key.
   */
  reset(actionKey: string): void {
    this.trackers.delete(actionKey);
  }
}

export const rateLimiter = new ClientRateLimiter();
