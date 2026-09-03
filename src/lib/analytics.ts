/**
 * Analytics and Telemetry Tracking Utility
 */

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
}

/**
 * Tracks custom user interactions and analytics events.
 */
export function trackEvent({ action, category, label, value, params }: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics Event]`, { action, category, label, value, params });
  }

  // Integration hook for Google Analytics / Vercel Analytics / Custom Telemetry
  if ((window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
}

/**
 * Tracks page view navigation events.
 */
export function trackPageView(url: string, title?: string): void {
  trackEvent({
    action: 'page_view',
    category: 'Navigation',
    label: title || url,
    params: { page_path: url, page_title: title },
  });
}
