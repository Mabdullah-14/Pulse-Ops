const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: './database/schema/*.js',
  out: './database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
