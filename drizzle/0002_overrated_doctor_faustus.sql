ALTER TABLE "services" ADD COLUMN "price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cover_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "contact_links" jsonb;