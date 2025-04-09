-- Add role field to user table if it doesn't exist
ALTER TABLE "user" 
ADD COLUMN IF NOT EXISTS "role" TEXT;

-- Add unique constraint to userId in renter_preferences if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'renter_preferences_user_id_key'
    ) THEN
        ALTER TABLE "renter_preferences" 
        ADD CONSTRAINT "renter_preferences_user_id_key" UNIQUE ("user_id");
    END IF;
END$$;

-- Add unique constraint to userId in notification_preferences if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'notification_preferences_user_id_key'
    ) THEN
        ALTER TABLE "notification_preferences" 
        ADD CONSTRAINT "notification_preferences_user_id_key" UNIQUE ("user_id");
    END IF;
END$$;

-- Ensure default roles exist in the role table
INSERT INTO "role" (id, name, description, permissions, is_system)
VALUES 
  ('renter_role', 'renter', 'Renter role', '{}', true),
  ('landlord_role', 'landlord', 'Landlord role', '{}', true),
  ('property_manager_role', 'property_manager', 'Property Manager role', '{}', true)
ON CONFLICT (name) DO NOTHING; 