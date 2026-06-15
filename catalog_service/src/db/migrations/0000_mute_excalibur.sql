CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"isbn" varchar(50) NOT NULL,
	"published_year" integer NOT NULL,
	"description" varchar(1000),
	"category" varchar(100),
	"language" varchar(50),
	"is_borrowed" boolean DEFAULT false NOT NULL,
	"borrowed_by_user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);
