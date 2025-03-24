import {
	pgTable,
	text,
	integer,
	timestamp,
	boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { role, userRole } from "./role-schema";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	role: text("role"), // Reference to the role.id
	onboardingCompleted: boolean("onboarding_completed").default(false),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const userRelations = relations(user, ({ many, one }) => ({
	sessions: many(session),
	accounts: many(account),
	userRoles: many(userRole),
	// For direct role reference in user table
	primaryRole: one(role, {
		fields: [user.role],
		references: [role.id],
	}),
	// properties: many(property),
	// favorites: many(favorite),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

// export const property = pgTable("property", {
// 	id: text("id").primaryKey(),
// 	title: text("title").notNull(),
// 	description: text("description"),
// 	address: text("address").notNull(),
// 	price: integer("price").notNull(),
// 	bedrooms: integer("bedrooms"),
// 	bathrooms: integer("bathrooms"),
// 	squareFeet: integer("square_feet"),
// 	isAvailable: boolean("is_available").notNull().default(true),
// 	ownerId: text("owner_id")
// 		.notNull()
// 		.references(() => user.id, { onDelete: "cascade" }),
// 	createdAt: timestamp("created_at").notNull().defaultNow(),
// 	updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// export const propertyRelations = relations(property, ({ one, many }) => ({
// 	owner: one(user, {
// 		fields: [property.ownerId],
// 		references: [user.id],
// 	}),
// 	favorites: many(favorite),
// }));

// export const favorite = pgTable("favorite", {
// 	id: text("id").primaryKey(),
// 	userId: text("user_id")
// 		.notNull()
// 		.references(() => user.id, { onDelete: "cascade" }),
// 	propertyId: text("property_id")
// 		.notNull()
// 		.references(() => property.id, { onDelete: "cascade" }),
// 	createdAt: timestamp("created_at").notNull().defaultNow(),
// });

// export const favoriteRelations = relations(favorite, ({ one }) => ({
// 	user: one(user, {
// 		fields: [favorite.userId],
// 		references: [user.id],
// 	}),
// 	property: one(property, {
// 		fields: [favorite.propertyId],
// 		references: [property.id],
// 	}),
// }));

type User = typeof user.$inferSelect;
type Session = typeof session.$inferSelect;
type Account = typeof account.$inferSelect;
type Verification = typeof verification.$inferSelect;
// type Property = typeof property.$inferSelect;
// type Favorite = typeof favorite.$inferSelect;

export type { User, Session, Account, Verification };
