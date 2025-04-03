import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userRole } from "./userRole";

/** Role table for storing user roles and permissions */
export const role = pgTable("role", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	canCreateListings: boolean("can_create_listings").default(false).notNull(),
	canEditListings: boolean("can_edit_listings").default(false).notNull(),
	canApplyForRentals: boolean("can_apply_for_rentals").default(false).notNull(),
	canManageUsers: boolean("can_manage_users").default(false).notNull(),
	canManageMultipleProperties: boolean("can_manage_multiple_properties")
		.default(false)
		.notNull(),
	canViewReports: boolean("can_view_reports").default(false).notNull(),
	canViewAnalytics: boolean("can_view_analytics").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the role table */
export const roleRelations = relations(role, ({ many }) => ({
	users: many(userRole),
}));

/** Type for selecting roles */
export type SelectRole = typeof role.$inferSelect;

/** Type for inserting roles */
export type InsertRole = typeof role.$inferInsert;
