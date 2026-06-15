CREATE TABLE "token_blocklist" (
	"id" serial PRIMARY KEY NOT NULL,
	"jti" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
