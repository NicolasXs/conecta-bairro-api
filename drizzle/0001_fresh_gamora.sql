ALTER TABLE "users" ADD COLUMN "cep" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cidade" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "role";--> statement-breakpoint
DROP TYPE "public"."user_role";