import type { UserRole } from "@/types/user";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { account } from "./account";
import { favorite } from "./favorite";
import { leaseAgreements } from "./leaseAgreements";
import { notificationPreferences } from "./notificationPreferences";
import { property } from "./property";
import { propertyManagerFirm } from "./propertyManagerFirm";
import { rentPayments } from "./rentPayments";
import { renterPreferences } from "./renterPreferences";
import { savedSearches } from "./savedSearches";
import { searchHistory } from "./searchHistory";
import { securityLogs } from "./securityLogs";
import { session } from "./session";
import { teamMember } from "./teamMember";
import { tenantFeedback } from "./tenantFeedback";
import { usageAnalytics } from "./usageAnalytics";
import { userRole } from "./userRole";

/** User table for storing user information */
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	role: text("role").$type<UserRole>(),
	onboardingCompleted: boolean("onboarding_completed").default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Relations for the user table */
export const userRelations = relations(user, ({ many, one }) => ({
	accounts: many(account),
	sessions: many(session),
	roles: many(userRole),
	properties: many(property, { relationName: "owner" }),
	managedProperties: many(property, { relationName: "property_manager" }),
	favorites: many(favorite),
	searchHistory: many(searchHistory),
	savedSearches: many(savedSearches),
	leaseAgreements: many(leaseAgreements),
	tenantFeedback: many(tenantFeedback),
	rentPayments: many(rentPayments),
	// sentMessages: many(messages, { relationName: "sender" }),
	// receivedMessages: many(messages, { relationName: "receiver" }),
	notificationPreferences: many(notificationPreferences),
	usageAnalytics: many(usageAnalytics),
	securityLogs: many(securityLogs),
	teamMembers: many(teamMember),
	propertyManagerFirms: many(propertyManagerFirm),
	renterPreferences: one(renterPreferences),
}));

/** Type for selecting users */
export type SelectUser = typeof user.$inferSelect;

/** Type for inserting users */
export type InsertUser = typeof user.$inferInsert;
