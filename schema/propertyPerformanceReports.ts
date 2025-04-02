import { pgTable, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { property } from "./property";

/** Property performance reports table for storing property performance data */
export const propertyPerformanceReports = pgTable(
	"property_performance_reports",
	{
		id: serial("id").primaryKey(),
		propertyId: serial("property_id")
			.notNull()
			.references(() => property.id, { onDelete: "cascade" }),
		reportData: jsonb("report_data").notNull(),
		generatedAt: timestamp("generated_at").defaultNow().notNull(),
	},
);

/** Relations for the property performance reports table */
export const propertyPerformanceReportsRelations = relations(
	propertyPerformanceReports,
	({ one }) => ({
		property: one(property, {
			fields: [propertyPerformanceReports.propertyId],
			references: [property.id],
		}),
	}),
);

/** Type for selecting property performance reports */
export type SelectPropertyPerformanceReport =
	typeof propertyPerformanceReports.$inferSelect;

/** Type for inserting property performance reports */
export type InsertPropertyPerformanceReport =
	typeof propertyPerformanceReports.$inferInsert;
