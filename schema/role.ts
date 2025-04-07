import { pgTable, text, timestamp, boolean, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { userRole } from './userRole';
import { permissionValues, resourceValues } from './enums';

export type Permissions = {
  [K in typeof resourceValues[number]]: typeof permissionValues[number][];
};

/** Role table for RBAC (web RSC and mobile API) */
export const role = pgTable('role', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  permissions: jsonb('permissions').notNull().$type<Permissions>(),
  isSystem: boolean('is_system').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/** Relations for the role table */
export const roleRelations = relations(role, ({ many }) => ({
  userRoles: many(userRole),
}));


/** Type for selecting roles */
export type SelectRole = typeof role.$inferSelect;

/** Type for inserting roles */
export type InsertRole = typeof role.$inferInsert;
