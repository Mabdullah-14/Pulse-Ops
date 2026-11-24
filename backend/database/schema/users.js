const { pgTable, uuid, text, timestamp } = require('drizzle-orm/pg-core');

const user=pgTable('users',{
    id:uuid('id').primaryKey().defaultRandom(),
    email:text('email').notNull(),
    password:text('hashed_password').notNull(),
    name:text('user_name').notNull(),
    refreshToken:text('refresh_token'),
    createdAt:timestamp('created_at').defaultNow()
})

module.exports={user}