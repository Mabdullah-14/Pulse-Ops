const { eq, and, asc, isNull } = require('drizzle-orm');
const { projects } = require('../database/schema/projects');
const { statuses } = require('../database/schema/status');
const { issues } = require('../database/schema/issues');
const { db } = require('../config/db');

const createProject = async (data, tx = db) => {
    const [newProject] = await db.insert(projects).values(data).returning();
    return newProject;
};

const getProjectByKey = async (organizationId, key) => {
    return await db.query.projects.findFirst({
        where: and(
            eq(projects.organizationId, organizationId),
            eq(projects.key, key)
        ),
    });
};

const getProjectsByOrg = async (organizationId) => {
    return await db.query.projects.findMany({
        where: eq(projects.organizationId, organizationId),
        orderBy: [asc(projects.createdAt)],
    });
};

const getProjectById = async (organizationId, projectId) => {
    return await db.query.projects.findFirst({
        where: and(
            eq(projects.id, projectId),
            eq(projects.organizationId, organizationId)
        ),
        with: {
            statuses: {
                orderBy: [asc(statuses.position)],
                with: {
                    issues: {
                        where: isNull(issues.deletedAt),
                        orderBy: [asc(issues.position)],
                    },
                },
            },
        },
    });
};

const updateProject = async (organizationId, projectId, data, tx = db) => {
    const [updated] = await db
        .update(projects)
        .set(data)
        .where(
            and(
                eq(projects.id, projectId),
                eq(projects.organizationId, organizationId)
            )
        )
        .returning();
    return updated;
};

const deleteProject = async (organizationId, projectId, tx = db) => {
    const [deleted] = await db
        .delete(projects)
        .where(
            and(
                eq(projects.id, projectId),
                eq(projects.organizationId, organizationId)
            )
        )
        .returning();
    return deleted;
};

module.exports = {
    createProject,
    getProjectsByOrg,
    getProjectById,
    getProjectByKey,
    updateProject,
    deleteProject,
};
