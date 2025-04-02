import { pgTable, serial, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { role } from "./role";

/** User role junction table for managing user roles */
export const userRole = pgTable(
	"user_role",
	{
		userId: serial("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		roleId: serial("role_id")
			.notNull()
			.references(() => role.id, { onDelete: "cascade" }),
		assignedAt: timestamp("assigned_at").defaultNow().notNull(),
	},
	(table) => ({
		pk: primaryKey(table.userId, table.roleId),
	}),
);

/** Relations for the user role junction table */
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

/** Type for selecting user roles */
export type SelectUserRole = typeof userRole.$inferSelect;

/** Type for inserting user roles */
export type InsertUserRole = typeof userRole.$inferInsert;
