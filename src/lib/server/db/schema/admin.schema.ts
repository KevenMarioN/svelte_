import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const post = pgTable('post', {
    id: uuid().defaultRandom().primaryKey(),
    title: text().notNull(),
    slug: text().notNull(),
    content: text().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
    authorID: text('author_id').references(() => user.id, { onDelete: 'cascade' })
});