ALTER TABLE "babies" ALTER COLUMN "date_of_birth" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "babies" ADD COLUMN "gender" varchar;--> statement-breakpoint
ALTER TABLE "babies" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "babies" ADD COLUMN "current_weight" integer;--> statement-breakpoint
ALTER TABLE "babies" ADD COLUMN "current_length" integer;--> statement-breakpoint
ALTER TABLE "babies" ADD COLUMN "status" varchar DEFAULT 'active' NOT NULL;