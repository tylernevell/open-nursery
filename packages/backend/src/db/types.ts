import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { eventsTable, sleepEventsTable, feedingEventsTable, diaperEventsTable } from '~/schema/events';

// Base event schemas
export const insertEventSchema = createInsertSchema(eventsTable);
export const selectEventSchema = createSelectSchema(eventsTable);

// Event type specific schemas
export const insertSleepSchema = createInsertSchema(sleepEventsTable);
export const selectSleepSchema = createSelectSchema(sleepEventsTable);

export const insertFeedingSchema = createInsertSchema(feedingEventsTable);
export const selectFeedingSchema = createSelectSchema(feedingEventsTable);

export const insertDiaperSchema = createInsertSchema(diaperEventsTable);
export const selectDiaperSchema = createSelectSchema(diaperEventsTable);

// Combined schemas for API payloads
export const createEventSchema = z.discriminatedUnion('type', [
  z.object({
    ...insertEventSchema.shape,
    type: z.literal('sleep'),
    sleep: insertSleepSchema
  }),
  z.object({
    ...insertEventSchema.shape,
    type: z.literal('feeding'),
    feeding: insertFeedingSchema
  }),
  z.object({
    ...insertEventSchema.shape,
    type: z.literal('diaper'),
    diaper: insertDiaperSchema
  })
]);

export type CreateEventPayload = z.infer<typeof createEventSchema>;

export type SleepEventPayload = Extract<CreateEventPayload, { type: 'sleep' }>;
export type FeedingEventPayload = Extract<CreateEventPayload, { type: 'feeding' }>;
export type DiaperEventPayload = Extract<CreateEventPayload, { type: 'diaper' }>;
