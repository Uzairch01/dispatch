import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const leadStatuses = ["New", "Contacted", "Qualified", "Follow-up", "Converted", "Not Qualified", "Closed"] as const;
export const truckTypeNames = ["Dry Van", "Reefer", "Flatbed", "Step Deck", "Hotshot", "Box Truck", "Power Only", "Conestoga"] as const;
export const serviceNames = ["Truck Dispatching", "Rate Negotiation", "Load Planning", "Document Management", "Billing Support", "Compliance Support"] as const;

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const leadStatusEnum = pgEnum("lead_status", leadStatuses);
export const contactStatusEnum = pgEnum("contact_status", ["New", "Read", "Closed"]);
export const truckTypeEnum = pgEnum("truck_type", truckTypeNames);
export const serviceNameEnum = pgEnum("service_name", serviceNames);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  truckType: truckTypeEnum("truckType").notNull(),
  truckCount: integer("truckCount"),
  location: varchar("location", { length: 180 }),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  status: leadStatusEnum("status").notNull().default("New"),
  notes: text("notes"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable("contactMessages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  subject: varchar("subject", { length: 240 }).notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum("status").notNull().default("New"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export const blogPosts = pgTable("blogPosts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 240 }).notNull(),
  slug: varchar("slug", { length: 240 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImage: varchar("featuredImage", { length: 1024 }),
  category: varchar("category", { length: 120 }),
  tags: text("tags"),
  seoTitle: varchar("seoTitle", { length: 240 }),
  seoDescription: varchar("seoDescription", { length: 500 }),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("publishedAt", { withTimezone: true }),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  truckType: truckTypeEnum("truckType"),
  location: varchar("location", { length: 180 }),
  rating: integer("rating"),
  content: text("content").notNull(),
  image: varchar("image", { length: 1024 }),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 120 }),
  sortOrder: integer("sortOrder").notNull().default(0),
  published: boolean("published").notNull().default(false),
});

export const serviceContent = pgTable("serviceContent", {
  id: serial("id").primaryKey(),
  name: serviceNameEnum("name").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  content: text("content"),
  image: varchar("image", { length: 1024 }),
  published: boolean("published").notNull().default(false),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export const truckTypes = pgTable("truckTypes", {
  id: serial("id").primaryKey(),
  name: truckTypeEnum("name").notNull(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  description: text("description").notNull(),
  image: varchar("image", { length: 1024 }),
  benefits: text("benefits"),
  published: boolean("published").notNull().default(false),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
