import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

/** Renter preferences table for storing renter-specific information */
export const renterPreferences = pgTable("renter_preferences", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  phone: text("phone"),
  occupation: text("occupation"),
  moveInDate: timestamp("move_in_date"),
  budget: jsonb("budget").$type<{ min: number; max: number }>(),
  bedrooms: jsonb("bedrooms").$type<number[]>(),
  propertyTypes: jsonb("property_types").$type<string[]>(),
  amenities: jsonb("amenities").$type<string[]>(),
  petFriendly: boolean("pet_friendly").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the renter preferences table */
export const renterPreferencesRelations = relations(
  renterPreferences,
  ({ one }) => ({
    user: one(user, {
      fields: [renterPreferences.userId],
      references: [user.id],
    }),
  }),
);

/** Type for selecting renter preferences */
export type SelectRenterPreferences = typeof renterPreferences.$inferSelect;

/** Type for inserting renter preferences */
export type InsertRenterPreferences = typeof renterPreferences.$inferInsert;
