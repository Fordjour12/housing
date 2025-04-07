import { pgEnum } from "drizzle-orm/pg-core";

// Define permission values as a const array
export const permissionValues = ["create", "read", "update", "delete"] as const;

// Define resource values as a const array
export const resourceValues = [
	"listings",
	"users",
	"reports",
	"analytics",
	"maintenance",
	"payments",
	"tenants",
] as const;

// Define role values as a const array
export const roleValues = [
	"admin",
	"user",
	"landlord",
	"property_manager",
] as const;

// Define enums for PostgreSQL
export const permissionEnum = pgEnum("permission", permissionValues);
export const resourceEnum = pgEnum("resource", resourceValues);
export const roleEnum = pgEnum("role_value", roleValues);
