import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bairro: text("bairro"),
  cep: text("cep"),
  cidade: text("cidade"),
  description: text("description"),
  contactLinks: jsonb("contact_links").$type<Array<{ label: string; value: string }>>(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  workerId: text("worker_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  bairro: text("bairro").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ratings = pgTable("ratings", {
  id: text("id").primaryKey(),
  workerId: text("worker_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  clientId: text("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const mediaPhotos = pgTable("media_photos", {
  id: text("id").primaryKey(),
  workerId: text("worker_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
