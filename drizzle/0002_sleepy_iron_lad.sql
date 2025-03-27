CREATE TABLE "favorite" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"property_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"street_address" text NOT NULL,
	"unit_number" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"property_type" text NOT NULL,
	"bedrooms" text NOT NULL,
	"bathrooms" text NOT NULL,
	"square_feet" text,
	"year_built" text,
	"rent_amount" text NOT NULL,
	"security_deposit" text NOT NULL,
	"lease_durations" text[] NOT NULL,
	"availability_date" timestamp NOT NULL,
	"amenities" text[],
	"pet_policy" text,
	"pet_restrictions" text,
	"utilities_included" text[],
	"contact_display" text NOT NULL,
	"application_process" text NOT NULL,
	"screening_preferences" text[],
	"communication_preferences" text[],
	"lease_signing_preference" text NOT NULL,
	"photos" text[],
	"is_available" boolean DEFAULT true NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_assignment" (
	"id" text PRIMARY KEY NOT NULL,
	"property_id" text NOT NULL,
	"team_member_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_manager_firm" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"business_name" text NOT NULL,
	"street_address" text NOT NULL,
	"unit_number" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"phone_number" text NOT NULL,
	"website" text,
	"properties_count" text,
	"default_contact_email" text NOT NULL,
	"default_contact_phone" text NOT NULL,
	"notify_new_inquiries" text DEFAULT 'true' NOT NULL,
	"notify_maintenance_requests" text DEFAULT 'true' NOT NULL,
	"notify_rent_reminders" text DEFAULT 'true' NOT NULL,
	"notify_lease_expirations" text DEFAULT 'true' NOT NULL,
	"application_process" text NOT NULL,
	"screening_credit_check" text DEFAULT 'true' NOT NULL,
	"screening_background_check" text DEFAULT 'true' NOT NULL,
	"screening_income_verification" text DEFAULT 'true' NOT NULL,
	"lease_signing_preference" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_member" (
	"id" text PRIMARY KEY NOT NULL,
	"firm_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property" ADD CONSTRAINT "property_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_assignment" ADD CONSTRAINT "property_assignment_property_id_property_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."property"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_assignment" ADD CONSTRAINT "property_assignment_team_member_id_team_member_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."team_member"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_manager_firm" ADD CONSTRAINT "property_manager_firm_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_firm_id_property_manager_firm_id_fk" FOREIGN KEY ("firm_id") REFERENCES "public"."property_manager_firm"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;