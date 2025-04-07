import { pgTable, text, timestamp, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { property } from "./property";
import { user } from "./user";

/** Lease agreements table for storing property lease agreements */
export const leaseAgreements = pgTable("lease_agreements", {
	id: text("id").primaryKey(),
	propertyId: text("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	tenantId: text("tenant_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	terms: text("terms").notNull(),
	documentPath: text("document_path"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the lease agreements table */
export const leaseAgreementsRelations = relations(
	leaseAgreements,
	({ one }) => ({
		property: one(property, {
			fields: [leaseAgreements.propertyId],
			references: [property.id],
		}),
		tenant: one(user, {
			fields: [leaseAgreements.tenantId],
			references: [user.id],
		}),
	}),
);

/** Type for selecting lease agreements */
export type SelectLeaseAgreement = typeof leaseAgreements.$inferSelect;

/** Type for inserting lease agreements */
export type InsertLeaseAgreement = typeof leaseAgreements.$inferInsert;
