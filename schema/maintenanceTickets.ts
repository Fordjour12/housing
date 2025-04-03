import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { property } from "./property";
import { user } from "./user";

/** Enum for maintenance ticket status */
export const maintenanceStatusEnum = pgEnum("maintenance_status", [
	"open",
	"in_progress",
	"resolved",
]);

/** Maintenance tickets table for tracking property maintenance issues */
export const maintenanceTickets = pgTable("maintenance_tickets", {
	id: serial("id").primaryKey(),
	propertyId: serial("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	tenantId: serial("tenant_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	issueDescription: text("issue_description").notNull(),
	status: maintenanceStatusEnum("status").default("open").notNull(),
	resolution: text("resolution"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the maintenance tickets table */
export const maintenanceTicketsRelations = relations(
	maintenanceTickets,
	({ one }) => ({
		property: one(property, {
			fields: [maintenanceTickets.propertyId],
			references: [property.id],
		}),
		tenant: one(user, {
			fields: [maintenanceTickets.tenantId],
			references: [user.id],
		}),
	}),
);

/** Type for selecting maintenance tickets */
export type SelectMaintenanceTicket = typeof maintenanceTickets.$inferSelect;

/** Type for inserting maintenance tickets */
export type InsertMaintenanceTicket = typeof maintenanceTickets.$inferInsert;
