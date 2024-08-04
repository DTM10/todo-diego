import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  done: boolean('done').notNull().default(false),
  project: integer('project')
    .references(() => projects.id)
    .notNull()
    .default(0),
  dueDate: timestamp('due_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

export type InsertTodo = typeof todos.$inferInsert;
export type SelectTodo = typeof todos.$inferSelect;
