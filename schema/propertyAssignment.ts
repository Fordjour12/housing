import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { property } from "./property";
import { teamMember } from "./teamMember";

/** Property assignment table for managing property assignments to team members */
export const propertyAssignment = pgTable("property_assignment", {
	id: text("id").primaryKey(),
	propertyId: text("property_id")
		.notNull()
		.references(() => property.id, { onDelete: "cascade" }),
	teamMemberId: text("team_member_id")
		.notNull()
		.references(() => teamMember.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the property assignment table */
export const propertyAssignmentRelations = relations(
	propertyAssignment,
	({ one }) => ({
		property: one(property, {
			fields: [propertyAssignment.propertyId],
			references: [property.id],
		}),
		teamMember: one(teamMember, {
			fields: [propertyAssignment.teamMemberId],
			references: [teamMember.id],
		}),
	}),
);

/** Type for selecting property assignments */
export type SelectPropertyAssignment = typeof propertyAssignment.$inferSelect;

/** Type for inserting property assignments */
export type InsertPropertyAssignment = typeof propertyAssignment.$inferInsert;
