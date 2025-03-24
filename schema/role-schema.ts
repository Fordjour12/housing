import {
	pgTable,
	text,
	timestamp,
	boolean,
	primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

// Define role table for storing available roles and their permissions
export const role = pgTable("role", {
	id: text("id").primaryKey(), // e.g., "renter", "landlord", "property_manager"
	name: text("name").notNull(), // Display name e.g., "Renter", "Landlord", "Property Manager"
	description: text("description"),
	canCreateListings: boolean("can_create_listings").notNull().default(false),
	canEditListings: boolean("can_edit_listings").notNull().default(false),
	canApplyForRentals: boolean("can_apply_for_rentals").notNull().default(false),
	canManageUsers: boolean("can_manage_users").notNull().default(false),
	canManageMultipleProperties: boolean("can_manage_multiple_properties")
		.notNull()
		.default(false),
	canViewReports: boolean("can_view_reports").notNull().default(false),
	canViewAnalytics: boolean("can_view_analytics").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Define user_role for many-to-many relationship
export const userRole = pgTable(
	"user_role",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		roleId: text("role_id")
			.notNull()
			.references(() => role.id, { onDelete: "cascade" }),
		assignedAt: timestamp("assigned_at").notNull().defaultNow(),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.roleId] }),
		};
	},
);

// Define relations
export const roleRelations = relations(role, ({ many }) => ({
	users: many(userRole),
}));

export const userRoleRelations = relations(userRole, ({ one }) => ({
	user: one(user, {
		fields: [userRole.userId],
		references: [user.id],
	}),
	role: one(role, {
		fields: [userRole.roleId],
		references: [role.id],
	}),
}));

// Export types
type Role = typeof role.$inferSelect;
type UserRole = typeof userRole.$inferSelect;

export type { Role, UserRole };
