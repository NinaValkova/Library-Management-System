CREATE TABLE "borrow_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"book_title" varchar(255) NOT NULL,
	"status" varchar(30) DEFAULT 'borrowed' NOT NULL,
	"borrowed_at" timestamp DEFAULT now() NOT NULL,
	"due_at" timestamp NOT NULL,
	"returned_at" timestamp,
	"fine_amount" numeric DEFAULT '0' NOT NULL,
	"fine_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
