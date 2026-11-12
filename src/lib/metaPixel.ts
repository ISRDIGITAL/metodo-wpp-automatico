declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  type: "track" | "trackCustom" = "track",
) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    if (params) window.fbq(type, eventName, params);
    else window.fbq(type, eventName);
  } catch (err) {
    console.warn("Meta Pixel event failed:", err);
  }
};

export const trackLead = (source?: string) =>
  trackEvent("Lead", source ? { source } : undefined);

export const trackContact = (source?: string) =>
  trackEvent("Contact", source ? { source } : undefined);

export const trackSubmit = (source?: string) =>
  trackEvent("SubmitApplication", source ? { source } : undefined);

export {};