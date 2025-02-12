import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { babiesTable, caregiversTable } from "./users";
import * as t from "drizzle-orm/pg-core";

/**
 * Base Events
 */
export const eventsTable = t.pgTable("events", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  babyId: t.integer()
    .references(() => babiesTable.id)
    .notNull(),
  caregiverId: t.integer()
    .references(() => caregiversTable.id)
    .notNull(),
  type: t.varchar("type", { enum: ["sleep", "feeding", "diaper"] }).notNull(),
  timestamp: t.timestamp("timestamp").notNull(),
  notes: t.text("notes"),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
});

export const insertEventSchema = createInsertSchema(eventsTable);
export const selectEventSchema = createSelectSchema(eventsTable);
export type Event = InferSelectModel<typeof eventsTable>;
export type NewEvent = InferInsertModel<typeof eventsTable>;

/**
 * Sleep Events
 */
export const sleepEventsTable = t.pgTable("sleep_events", {
  eventId: t.integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),
  startTime: t.timestamp("start_time").notNull(),
  endTime: t.timestamp("end_time"),
  location: t.varchar("location", {
    enum: ["crib", "bassinet", "parent_bed", "stroller", "car_seat"],
  }).notNull(),
});

export const insertSleepEventSchema = createInsertSchema(sleepEventsTable);
export const selectSleepEventSchema = createSelectSchema(sleepEventsTable);
export type SleepEvent = InferSelectModel<typeof sleepEventsTable>;
export type NewSleepEvent = InferInsertModel<typeof sleepEventsTable>;

/**
 * Feeding Events
 */
export const feedingEventsTable = t.pgTable("feeding_events", {
  eventId: t.integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),
  method: t.varchar("method", {
    enum: ["breast", "bottle", "solids"],
  }).notNull(),
  amount: t.integer("amount"), // in ml
  duration: t.integer("duration"), // in minutes
  side: t.varchar("side", { enum: ["left", "right"] }),
});

export const insertFeedingEventSchema = createInsertSchema(feedingEventsTable);
export const selectFeedingEventSchema = createSelectSchema(feedingEventsTable);
export type FeedingEvent = InferSelectModel<typeof feedingEventsTable>;
export type NewFeedingEvent = InferInsertModel<typeof feedingEventsTable>;

/**
 * Diaper Events
 */
export const diaperEventsTable = t.pgTable("diaper_events", {
  eventId: t.integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),
  content: t.varchar("content", {
    enum: ["wet", "dirty", "both"],
  }).notNull(),
});

export const insertDiaperEventSchema = createInsertSchema(diaperEventsTable);
export const selectDiaperEventSchema = createSelectSchema(diaperEventsTable);
export type DiaperEvent = InferSelectModel<typeof diaperEventsTable>;
export type NewDiaperEvent = InferInsertModel<typeof diaperEventsTable>;

/**
 * Relations
 */
export const eventsRelations = relations(eventsTable, ({ one }) => ({
  sleep: one(sleepEventsTable, {
    fields: [eventsTable.id],
    references: [sleepEventsTable.eventId],
  }),
  feeding: one(feedingEventsTable, {
    fields: [eventsTable.id],
    references: [feedingEventsTable.eventId],
  }),
  diaper: one(diaperEventsTable, {
    fields: [eventsTable.id],
    references: [diaperEventsTable.eventId],
  }),
}));

/**
 * Extended Types with Relations
 */
export type EventWithDetails = Event & {
  sleep?: SleepEvent;
  feeding?: FeedingEvent;
  diaper?: DiaperEvent;
};

/**
 * Combined Insert Types
 */
export type NewSleepEventWithDetails = NewEvent & {
  sleep: NewSleepEvent;
};

export type NewFeedingEventWithDetails = NewEvent & {
  feeding: NewFeedingEvent;
};

export type NewDiaperEventWithDetails = NewEvent & {
  diaper: NewDiaperEvent;
};

/**
 * Enum Types
 */
export type EventType = Event["type"];
export type SleepLocation = SleepEvent["location"];
export type FeedingMethod = FeedingEvent["method"];
export type DiaperContent = DiaperEvent["content"];
export type FeedingSide = NonNullable<FeedingEvent["side"]>;
