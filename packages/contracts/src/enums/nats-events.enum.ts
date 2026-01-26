export const NatsEvents = {
  MARKETING_FORWARDED: 'marketing.forwarded'
} as const;

export type NatsEventsType = typeof NatsEvents[keyof typeof NatsEvents];
