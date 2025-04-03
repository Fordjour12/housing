import { pgTable, text, timestamp, integer, check } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { property } from "./property";
import { sql } from "drizzle-orm";

/** Tenant feedback table for storing tenant property feedback */
export const tenantFeedback = pgTable(
	"tenant_feedback",
	{
		id: text("id").primaryKey(),
		tenantId: text("tenant_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		propertyId: text("property_id")
			.notNull()
			.references(() => property.id, { onDelete: "cascade" }),
		feedback: text("feedback").notNull(),
		rating: integer("rating").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [check("rating_check", sql`rating >= 1 AND rating <= 5`)],
);

/** Relations for the tenant feedback table */
export const tenantFeedbackRelations = relations(tenantFeedback, ({ one }) => ({
	tenant: one(user, {
		fields: [tenantFeedback.tenantId],
		references: [user.id],
	}),
	property: one(property, {
		fields: [tenantFeedback.propertyId],
		references: [property.id],
	}),
}));

/** Type for selecting tenant feedback */
export type SelectTenantFeedback = typeof tenantFeedback.$inferSelect;

/** Type for inserting tenant feedback */
export type InsertTenantFeedback = typeof tenantFeedback.$inferInsert;
