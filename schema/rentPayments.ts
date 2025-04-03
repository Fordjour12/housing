import {
	pgTable,
	serial,
	timestamp,
	date,
	numeric,
	pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { property } from "./property";

/** Enum for payment status */
export const paymentStatusEnum = pgEnum("payment_status", [
	"pending",
	"paid",
	"late",
]);

/** Rent payments table for tracking property rent payments */
export const rentPayments = pgTable("rent_payments", {
	id: serial("id").primaryKey(),
	tenantId: serial("tenant_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	propertyId: serial("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
	dueDate: date("due_date").notNull(),
	paymentDate: date("payment_date"),
	status: paymentStatusEnum("status").default("pending").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Relations for the rent payments table */
export const rentPaymentsRelations = relations(rentPayments, ({ one }) => ({
	tenant: one(user, {
		fields: [rentPayments.tenantId],
		references: [user.id],
	}),
	property: one(property, {
		fields: [rentPayments.propertyId],
		references: [property.id],
	}),
}));

/** Type for selecting rent payments */
export type SelectRentPayment = typeof rentPayments.$inferSelect;

/** Type for inserting rent payments */
export type InsertRentPayment = typeof rentPayments.$inferInsert;
