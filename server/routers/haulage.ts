import { desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { blogPosts, contactMessages, faqs, leads, leadStatuses, serviceContent, serviceNames, testimonials, truckTypeNames, truckTypes } from "../../drizzle/schema";
import { getDb } from "../db";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { sendLeadSubmissionEmail } from "../_core/email";
import { contactSubmissionSchema, leadSubmissionSchema } from "../haulage-validation";

const contentInput = z.object({ id: z.number().int().optional(), title: z.string().trim().min(2).max(240), slug: z.string().trim().min(2).max(240), excerpt: z.string().trim().max(2000).optional(), content: z.string().max(50000).optional(), category: z.string().trim().max(120).optional(), tags: z.string().trim().max(500).optional(), seoTitle: z.string().trim().max(240).optional(), seoDescription: z.string().trim().max(500).optional(), published: z.boolean().default(false) });

async function database() { const db = await getDb(); if (!db) throw new Error("Database connection is unavailable."); return db; }

async function insertAndReturnId(db: Awaited<ReturnType<typeof database>>, table: any, values: Record<string, unknown>) {
  const insertQuery = db.insert(table).values(values);
  if (typeof insertQuery.returning === "function") {
    const [result] = await insertQuery.returning({ id: table.id });
    return Number((result as { id?: number | string } | undefined)?.id ?? 0);
  }

  const result = await insertQuery;
  const insertedRow = Array.isArray(result) ? result[0] : result;
  const legacyRow = insertedRow as { insertId?: number | string; id?: number | string } | undefined;
  return Number(legacyRow?.insertId ?? legacyRow?.id ?? 0);
}

export const haulageRouter = router({
  lead: router({
    submit: publicProcedure.input(leadSubmissionSchema).mutation(async ({ input }) => {
      const db = await database();
      const id = await insertAndReturnId(db, leads, input);
      await sendLeadSubmissionEmail({
        fullName: input.fullName,
        company: input.company,
        email: input.email,
        phone: input.phone,
        truckType: input.truckType,
        truckCount: input.truckCount,
        location: input.location,
        message: input.message,
      });
      return { id, success: true };
    }),
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(leads).orderBy(desc(leads.createdAt)); }),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int(), status: z.enum(leadStatuses), notes: z.string().max(5000).optional() })).mutation(async ({ input }) => { const db = await database(); await db.update(leads).set({ status: input.status, notes: input.notes }).where(eq(leads.id, input.id)); return { success: true }; }),
    metrics: adminProcedure.query(async () => { const db = await database(); const totals = await db.select({ total: sql<number>`count(*)`, qualified: sql<number>`sum(case when ${leads.status} in ('Qualified', 'Converted') then 1 else 0 end)`, converted: sql<number>`sum(case when ${leads.status} = 'Converted' then 1 else 0 end)` }).from(leads); return { total: Number(totals[0]?.total ?? 0), qualified: Number(totals[0]?.qualified ?? 0), converted: Number(totals[0]?.converted ?? 0) }; }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(leads).where(eq(leads.id, input.id)); return { success: true }; }),
  }),
  contact: router({
    submit: publicProcedure.input(contactSubmissionSchema).mutation(async ({ input }) => {
      const db = await database();
      const id = await insertAndReturnId(db, contactMessages, input);
      return { id, success: true };
    }),
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)); }),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int(), status: z.enum(["New", "Read", "Closed"]) })).mutation(async ({ input }) => { const db = await database(); await db.update(contactMessages).set({ status: input.status }).where(eq(contactMessages.id, input.id)); return { success: true }; }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(contactMessages).where(eq(contactMessages.id, input.id)); return { success: true }; }),
  }),
  blog: router({
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(blogPosts).orderBy(desc(blogPosts.updatedAt)); }),
    save: adminProcedure.input(contentInput).mutation(async ({ input }) => {
      const db = await database();
      const values = { ...input, publishedAt: input.published ? new Date() : null };
      if (input.id !== undefined) {
        const { id, ...update } = values;
        await db.update(blogPosts).set(update).where(eq(blogPosts.id, input.id));
        return { id: input.id };
      }
      const id = await insertAndReturnId(db, blogPosts, values);
      return { id };
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(blogPosts).where(eq(blogPosts.id, input.id)); return { success: true }; }),
  }),
  faq: router({
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(faqs).orderBy(faqs.sortOrder); }),
    save: adminProcedure.input(z.object({ id: z.number().int().optional(), question: z.string().min(3).max(500), answer: z.string().min(3), category: z.string().max(120).optional(), sortOrder: z.number().int().min(0).default(0), published: z.boolean().default(false) })).mutation(async ({ input }) => {
      const db = await database();
      if (input.id !== undefined) {
        const { id, ...update } = input;
        await db.update(faqs).set(update).where(eq(faqs.id, input.id));
        return { id: input.id };
      }
      const id = await insertAndReturnId(db, faqs, input);
      return { id };
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(faqs).where(eq(faqs.id, input.id)); return { success: true }; }),
  }),
  service: router({
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(serviceContent); }),
    save: adminProcedure.input(z.object({ id: z.number().int().optional(), name: z.enum(serviceNames), slug: z.string().min(2).max(160), description: z.string().min(3), content: z.string().optional(), image: z.string().url().optional(), published: z.boolean().default(false) })).mutation(async ({ input }) => {
      const db = await database();
      if (input.id !== undefined) {
        const { id, ...update } = input;
        await db.update(serviceContent).set(update).where(eq(serviceContent.id, input.id));
        return { id: input.id };
      }
      const id = await insertAndReturnId(db, serviceContent, input);
      return { id };
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(serviceContent).where(eq(serviceContent.id, input.id)); return { success: true }; }),
  }),
  truckType: router({
    list: adminProcedure.query(async () => { const db = await database(); return db.select().from(truckTypes); }),
    save: adminProcedure.input(z.object({ id: z.number().int().optional(), name: z.enum(truckTypeNames), slug: z.string().min(2).max(160), description: z.string().min(3), image: z.string().url().optional(), benefits: z.string().optional(), published: z.boolean().default(false) })).mutation(async ({ input }) => {
      const db = await database();
      if (input.id !== undefined) {
        const { id, ...update } = input;
        await db.update(truckTypes).set(update).where(eq(truckTypes.id, input.id));
        return { id: input.id };
      }
      const id = await insertAndReturnId(db, truckTypes, input);
      return { id };
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ input }) => { const db = await database(); await db.delete(truckTypes).where(eq(truckTypes.id, input.id)); return { success: true }; }),
  }),
  testimonial: router({ list: adminProcedure.query(async () => { const db = await database(); return db.select().from(testimonials).orderBy(desc(testimonials.createdAt)); }) }),
});
