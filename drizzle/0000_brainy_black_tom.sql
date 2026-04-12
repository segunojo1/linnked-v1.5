CREATE TYPE "public"."email_event_type" AS ENUM('link_created', 'recipient_viewed', 'recipient_responded_yes', 'recipient_responded_no');--> statement-breakpoint
CREATE TYPE "public"."email_status" AS ENUM('queued', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."linnk_status" AS ENUM('draft', 'sent', 'viewed', 'responded_yes', 'responded_no');--> statement-breakpoint
CREATE TYPE "public"."response_choice" AS ENUM('yes', 'no');--> statement-breakpoint
CREATE TYPE "public"."template" AS ENUM('singlepage', 'new');--> statement-breakpoint
CREATE TABLE "email_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"linnk_id" uuid NOT NULL,
	"event_type" "email_event_type" NOT NULL,
	"recipient_email" text NOT NULL,
	"provider_message_id" text,
	"status" "email_status" DEFAULT 'queued' NOT NULL,
	"error_message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linnk_icons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"linnk_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"icon_src" text NOT NULL,
	"icon_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "linnk_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"linnk_id" uuid NOT NULL,
	"choice" "response_choice" NOT NULL,
	"responded_at" timestamp with time zone DEFAULT now() NOT NULL,
	"recipient_ip" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "linnks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" text NOT NULL,
	"sender_user_id" uuid NOT NULL,
	"recipient_name" text NOT NULL,
	"template" "template" NOT NULL,
	"message_title" text NOT NULL,
	"message_body" text NOT NULL,
	"signature_image_url" text,
	"background_image_url" text,
	"status" "linnk_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "email_events" ADD CONSTRAINT "email_events_linnk_id_linnks_id_fk" FOREIGN KEY ("linnk_id") REFERENCES "public"."linnks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linnk_icons" ADD CONSTRAINT "linnk_icons_linnk_id_linnks_id_fk" FOREIGN KEY ("linnk_id") REFERENCES "public"."linnks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linnk_responses" ADD CONSTRAINT "linnk_responses_linnk_id_linnks_id_fk" FOREIGN KEY ("linnk_id") REFERENCES "public"."linnks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "linnks" ADD CONSTRAINT "linnks_sender_user_id_users_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_events_linnk_id_idx" ON "email_events" USING btree ("linnk_id");--> statement-breakpoint
CREATE INDEX "linnk_icons_linnk_id_idx" ON "linnk_icons" USING btree ("linnk_id");--> statement-breakpoint
CREATE UNIQUE INDEX "linnk_icons_linnk_id_position_unique" ON "linnk_icons" USING btree ("linnk_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "linnk_responses_linnk_id_unique" ON "linnk_responses" USING btree ("linnk_id");--> statement-breakpoint
CREATE UNIQUE INDEX "linnks_link_id_unique" ON "linnks" USING btree ("link_id");--> statement-breakpoint
CREATE INDEX "linnks_sender_user_id_idx" ON "linnks" USING btree ("sender_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");