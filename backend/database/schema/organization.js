const { pgTable, uuid, text, timestamp } = require('drizzle-orm/pg-core');

const organizations=pgTable('organizations',{
    id:uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull(),
    slug:text('slug').unique().notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull()
})

module.exports={organizations}