const { relations } = require('drizzle-orm')
const { organizations } = require('./organization')
const { organizationMembers } = require('./organization_members')
const {organizationRoles} =require('./orgnization_roles')
const { user } = require('./users')
const {projects} =require('./projects')

const organizationRelations = relations(organizations, ({ many }) => ({
    members: many(organizationMembers),
    projects:many(projects)
}))

const userRelations = relations(user, ({ many }) => ({
    memberships: many(organizationMembers)
}))


const organizationRolesRelations = relations(organizationRoles, ({ one, many }) => ({
    organization: one(organizations, {
        fields: [organizationRoles.organizationsId],
        references: [organizations.id],
    }),
    members: many(organizationMembers),
}));

const organizationMembersRelations = relations(organizationMembers, ({ one }) => ({
    organization: one(organizations, {
        fields: [organizationMembers.organizationsId],
        references: [organizations.id]
    }),
    user: one(user, {
        fields: [organizationMembers.userId],
        references: [user.id],
    }),
    role:one(organizationRoles,{
        fields:[organizationMembers.roleId],
        references:[organizationRoles.id]
    })
}))

module.exports = {
    organizationRelations,
    userRelations,
    organizationRolesRelations,
    organizationMembersRelations
}