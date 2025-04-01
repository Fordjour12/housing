CREATE TYPE "public"."listing_status" AS ENUM('active', 'pending', 'inactive');--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"square_feet" integer NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"images" jsonb DEFAULT '[]'::jsonb,
	"amenities" jsonb DEFAULT '[]'::jsonb,
	"status" "listing_status" DEFAULT 'pending' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"property_manager_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "listings" ADD CONSTRAINT "listings_property_manager_id_user_id_fk" FOREIGN KEY ("property_manager_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;