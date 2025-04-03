import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { propertyManagerFirm } from "./propertyManagerFirm";
import { user } from "./user";
import { propertyAssignment } from "./propertyAssignment";

/** Team member table for storing property management team members */
export const teamMember = pgTable("team_member", {
	id: text("id").primaryKey(),
	firmId: text("firm_id")
		.notNull()
		.references(() => propertyManagerFirm.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the team member table */
export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
	firm: one(propertyManagerFirm, {
		fields: [teamMember.firmId],
		references: [propertyManagerFirm.id],
	}),
	user: one(user, {
		fields: [teamMember.userId],
		references: [user.id],
	}),
	propertyAssignments: many(propertyAssignment),
}));

/** Type for selecting team members */
export type SelectTeamMember = typeof teamMember.$inferSelect;

/** Type for inserting team members */
export type InsertTeamMember = typeof teamMember.$inferInsert;
