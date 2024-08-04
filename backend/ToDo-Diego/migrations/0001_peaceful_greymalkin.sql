ALTER TABLE "todos" ALTER COLUMN "project" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "project" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;