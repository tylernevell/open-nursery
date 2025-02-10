import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const caregiversTable = pgTable(
  "caregivers",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    fullName: t.varchar("full_name", { length: 256 }).notNull(),
    email: t.varchar().notNull(),
    relationship: t
      .varchar("relationship", {
        enum: ["mother", "father", "grandparent", "nanny", "other"],
      })
      .notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)],
).enableRLS();

export const caregiversRelations = relations(caregiversTable, ({ many }) => ({
  babies: many(babyToCaregiversTable),
}));

export const babiesTable = pgTable("babies", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar("name", { length: 256 }).notNull(),
  dateOfBirth: t.timestamp("date_of_birth").notNull(),
  birthWeight: t.integer("birth_weight"), // in grams
  birthLength: t.integer("birth_length"), // in millimeters
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();

export const babyToCaregiversTable = pgTable(
  "baby_to_caregivers",
  {
    babyId: t
      .integer("baby_id")
      .references(() => babiesTable.id)
      .notNull(),
    caregiverId: t
      .integer("caregiver_id")
      .references(() => caregiversTable.id)
      .notNull(),
    role: t
      .varchar("role", {
        enum: ["primary", "secondary", "support"],
      })
      .notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [t.primaryKey({ columns: [table.babyId, table.caregiverId] })],
).enableRLS();
