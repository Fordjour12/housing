import { relations } from "drizzle-orm";
import { boolean, jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { userRole } from "./userRole";


// Define enum values as const arrays for TypeScript inference
const permissionValues = ['create', 'read', 'update', 'delete'] as const;
const resourceValues = ['listings', 'users', 'reports', 'analytics', 'maintenance', 'payments', 'tenants'] as const;

// Define enums using pgEnum
export const permissionEnum = pgEnum('permission', permissionValues);
export const resourceEnum = pgEnum('resource', resourceValues);

// Define permissions type explicitly
export type Permissions = {
  [K in typeof resourceValues[number]]: typeof permissionValues[number][];
};


/** Role table for storing user roles and permissions */
export const role = pgTable("role", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description"),
	permissions: jsonb("permissions").notNull().$type<Permissions>(), // e.g., { "listings": ["create", "read"], "tenants": ["read"] }
	isSystem: boolean("is_system").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


/** Role hierarchy table for storing parent-child relationships between roles */
export const roleHierarchy = pgTable("role_hierarchy", {
		parentRoleId: text("parent_role_id")
			.notNull()
			.references(() => role.id, { onDelete: "cascade" }),
		childRoleId: text("child_role_id")
			.notNull()
			.references(() => role.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
})

/** Role audit log table for storing audit logs for role changes */
export const roleAuditLog = pgTable("role_audit_log", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    roleId: text("role_id")
        .notNull()
        .references(() => role.id, { onDelete: "cascade" }),
    action: text("action").notNull(), // "assigned" or "removed"
    performedBy: text("performed_by")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
});


/** Relations for the role table */
export const roleRelations = relations(role, ({ many }) => ({
	users: many(userRole),
}));

/** Type for selecting roles */
export type SelectRole = typeof role.$inferSelect;
export type SelectRoleAuditLog = typeof roleAuditLog.$inferSelect;
export type SelectRoleHierarchy = typeof roleHierarchy.$inferSelect;

/** Type for inserting roles */
export type InsertRole = typeof role.$inferInsert;
export type InsertRoleAuditLog = typeof roleAuditLog.$inferInsert;
export type InsertRoleHierarchy = typeof roleHierarchy.$inferInsert;





