import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as t from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

/**
 * Caregivers
 */
export const caregiversTable = t.pgTable(
  "caregivers",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: t.text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    name: t.varchar("name", { length: 256 }).notNull(),
    email: t.varchar().notNull(),
    relationship: t
      .varchar("relationship", {
        enum: ["parent"],
      })
      .notNull(),
    createdAt: t.timestamp("created_at").defaultNow().notNull(),
    updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [t.uniqueIndex("email_idx").on(table.email)],
).enableRLS();

export const insertCaregiverSchema = createInsertSchema(caregiversTable);
export const selectCaregiverSchema = createSelectSchema(caregiversTable);
export type Caregiver = InferSelectModel<typeof caregiversTable>;
export type NewCaregiver = InferInsertModel<typeof caregiversTable>;

/**
 * Babies
 */
export const babiesTable = t.pgTable("babies", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar("name", { length: 256 }).notNull(),
  dateOfBirth: t.timestamp("date_of_birth").notNull(),
  birthWeight: t.integer("birth_weight"), // in grams
  birthLength: t.integer("birth_length"), // in millimeters
  gender: t.varchar("gender", {
    enum: ["male", "female", "other"]
  }),
  notes: t.text("notes"),
  currentWeight: t.integer("current_weight"), // in grams
  currentLength: t.integer("current_length"), // in millimeters
  status: t.varchar("status", {
    enum: ["active", "archived"]
  }).default("active").notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
}).enableRLS();

export const insertBabySchema = createInsertSchema(babiesTable);
export const selectBabySchema = createSelectSchema(babiesTable);
export type Baby = InferSelectModel<typeof babiesTable>;
export type NewBaby = InferInsertModel<typeof babiesTable>;

/**
 * Baby to Caregivers Relationship
 */
export const babyToCaregiversTable = t.pgTable(
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

export const insertBabyToCaregiverSchema = createInsertSchema(babyToCaregiversTable);
export const selectBabyToCaregiverSchema = createSelectSchema(babyToCaregiversTable);
export type BabyToCaregiver = InferSelectModel<typeof babyToCaregiversTable>;
export type NewBabyToCaregiver = InferInsertModel<typeof babyToCaregiversTable>;

/**
 * Relations
 */
export const caregiversRelations = relations(caregiversTable, ({ many }) => ({
  babies: many(babyToCaregiversTable),
}));

export const babiesRelations = relations(babiesTable, ({ many }) => ({
  caregivers: many(babyToCaregiversTable),
}));

/**
 * Extended Types with Relations
 */
export type CaregiverWithBabies = Caregiver & {
  babies: Array<{
    baby: Baby;
    role: BabyToCaregiver["role"];
  }>;
};

export type BabyWithCaregivers = Baby & {
  caregivers: Array<{
    caregiver: Caregiver;
    role: BabyToCaregiver["role"];
  }>;
};

/**
 * API Response Types
 */
export type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: {
    message: string;
    code?: string;
  };
};
