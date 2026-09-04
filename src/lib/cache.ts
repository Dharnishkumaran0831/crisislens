/**
 * In-Memory & Storage Caching Utility with Time-To-Live (TTL) Support
 */

interface CacheItem<T> {
  value: T;
  expiry: number;
}

class CacheManager {
  private memoryCache = new Map<string, CacheItem<unknown>>();

  /**
   * Set cache item with optional TTL in milliseconds (default: 5 minutes).
   */
  set<T>(key: string, value: T, ttlMs: number = 300000): void {
    const expiry = Date.now() + ttlMs;
    this.memoryCache.set(key, { value, expiry });
  }

  /**
   * Get cached item if valid and not expired.
   */
  get<T>(key: string): T | null {
    const item = this.memoryCache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.memoryCache.delete(key);
      return null;
    }

    return item.value as T;
  }

  /**
   * Clear item or purge all cached memory entries.
   */
  clear(key?: string): void {
    if (key) {
      this.memoryCache.delete(key);
    } else {
      this.memoryCache.clear();
    }
  }
}

export const appCache = new CacheManager();
