import { pgTable, serial, text, timestamp, numeric } from "drizzle-orm/pg-core";

/** Currency support table for managing currency exchange rates */
export const currencySupport = pgTable("currency_support", {
	id: serial("id").primaryKey(),
	currencyCode: text("currency_code").notNull(),
	exchangeRate: numeric("exchange_rate", { precision: 10, scale: 4 }).notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/** Type for selecting currency support */
export type SelectCurrencySupport = typeof currencySupport.$inferSelect;

/** Type for inserting currency support */
export type InsertCurrencySupport = typeof currencySupport.$inferInsert;
