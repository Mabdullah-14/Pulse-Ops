const { eq } = require('drizzle-orm')
const { db } = require('../config/db')
const { organizations } = require('../database/schema/organization')

// Find an organization by its unique slug
const findOrgBySlug = async (slug) => {
  return await db.query.organizations.findFirst({
    where: eq(organizations.slug, slug),
  })
}

// Insert a new organization (supports database transactions)
const insertOrg = async ({ name, slug }, tx = db) => {
  const [newOrg] = await tx
    .insert(organizations)
    .values({ name, slug })
    .returning()
  return newOrg
}

module.exports = {
  findOrgBySlug,
  insertOrg,
}
