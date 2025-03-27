import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { property } from "./property-schema";

export const propertyManagerFirm = pgTable("property_manager_firm", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  businessName: text("business_name").notNull(),
  streetAddress: text("street_address").notNull(),
  unitNumber: text("unit_number"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  phoneNumber: text("phone_number").notNull(),
  website: text("website"),
  propertiesCount: text("properties_count"),
  defaultContactEmail: text("default_contact_email").notNull(),
  defaultContactPhone: text("default_contact_phone").notNull(),
  notifyNewInquiries: text("notify_new_inquiries").notNull().default("true"),
  notifyMaintenanceRequests: text("notify_maintenance_requests").notNull().default("true"),
  notifyRentReminders: text("notify_rent_reminders").notNull().default("true"),
  notifyLeaseExpirations: text("notify_lease_expirations").notNull().default("true"),
  applicationProcess: text("application_process").notNull(),
  screeningCreditCheck: text("screening_credit_check").notNull().default("true"),
  screeningBackgroundCheck: text("screening_background_check").notNull().default("true"),
  screeningIncomeVerification: text("screening_income_verification").notNull().default("true"),
  leaseSigningPreference: text("lease_signing_preference").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const propertyManagerFirmRelations = relations(propertyManagerFirm, ({ one, many }) => ({
  owner: one(user, {
    fields: [propertyManagerFirm.userId],
    references: [user.id],
  }),
  teamMembers: many(teamMember),
}));

export const teamMember = pgTable("team_member", {
  id: text("id").primaryKey(),
  firmId: text("firm_id")
    .notNull()
    .references(() => propertyManagerFirm.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // Administrator, PropertyManager, LeasingAgent, MaintenanceTechnician
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
  firm: one(propertyManagerFirm, {
    fields: [teamMember.firmId],
    references: [propertyManagerFirm.id],
  }),
  user: one(user, {
    fields: [teamMember.userId],
    references: [user.id],
  }),
  assignedProperties: many(propertyAssignment),
}));

export const propertyAssignment = pgTable("property_assignment", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => property.id, { onDelete: "cascade" }),
  teamMemberId: text("team_member_id")
    .notNull()
    .references(() => teamMember.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export const propertyAssignmentRelations = relations(propertyAssignment, ({ one }) => ({
  property: one(property, {
    fields: [propertyAssignment.propertyId],
    references: [property.id],
  }),
  teamMember: one(teamMember, {
    fields: [propertyAssignment.teamMemberId],
    references: [teamMember.id],
  }),
}));

export type PropertyManagerFirm = typeof propertyManagerFirm.$inferSelect;
export type TeamMember = typeof teamMember.$inferSelect;
export type PropertyAssignment = typeof propertyAssignment.$inferSelect; 