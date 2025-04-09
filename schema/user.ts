import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { account } from "./account";
import { session } from "./session";
import { userRole } from "./userRole";
import { property } from "./property";
import { favorite } from "./favorite";
import { searchHistory } from "./searchHistory";
import { savedSearches } from "./savedSearches";
import { leaseAgreements } from "./leaseAgreements";
import { tenantFeedback } from "./tenantFeedback";
import { rentPayments } from "./rentPayments";
import { messages } from "./messages";
import { notificationPreferences } from "./notificationPreferences";
import { usageAnalytics } from "./usageAnalytics";
import { securityLogs } from "./securityLogs";
import { teamMember } from "./teamMember";
import { propertyManagerFirm } from "./propertyManagerFirm";
import { renterPreferences } from "./renterPreferences";
import type { UserRole } from "@/types/user";

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
export const userRelations = relations(user, ({ many }) => ({
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
	renterPreferences: many(renterPreferences),
}));

/** Type for selecting users */
export type SelectUser = typeof user.$inferSelect;

/** Type for inserting users */
export type InsertUser = typeof user.$inferInsert;
