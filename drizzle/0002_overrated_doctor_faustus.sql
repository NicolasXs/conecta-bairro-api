ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatar_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cover_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "description" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "contact_links" jsonb;