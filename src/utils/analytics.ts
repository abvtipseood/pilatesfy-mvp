export const trackEvent = (eventName: string, data?: any) => {
  console.log(`[Analytics] ${eventName}`, data || '');
  // In a real app, this would push to dataLayer, Meta Pixel, etc.
  // window.dataLayer = window.dataLayer || [];
  // window.dataLayer.push({ event: eventName, ...data });
};
