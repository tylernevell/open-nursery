import {
  pgTable,
  integer,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { babiesTable, caregiversTable } from "./users";
import { relations } from "drizzle-orm";

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  babyId: integer()
    .references(() => babiesTable.id)
    .notNull(),
  caregiverId: integer()
    .references(() => caregiversTable.id)
    .notNull(),
  type: varchar("type", { enum: ["sleep", "feeding", "diaper"] }).notNull(),
  timestamp: timestamp("timestamp").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sleepEventsTable = pgTable("sleep_events", {
  eventId: integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  location: varchar("location", {
    enum: ["crib", "bassinet", "parent_bed", "stroller", "car_seat"],
  }).notNull(),
});

export const feedingEventsTable = pgTable("feeding_events", {
  eventId: integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),
  method: varchar("method", {
    enum: ["breast", "bottle", "solids"],
  }).notNull(),
  amount: integer("amount"), // in ml
  duration: integer("duration"), // in minutes
  side: varchar("side", { enum: ["left", "right"] }),
});

export const diaperEventsTable = pgTable("diaper_events", {
  eventId: integer()
    .primaryKey()
    .references(() => eventsTable.id, { onDelete: "cascade" }),

  content: varchar("content", {
    enum: ["wet", "dirty", "both"],
  }).notNull(),
});

export const eventsRelationsTable = relations(eventsTable, ({ one }) => ({
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
