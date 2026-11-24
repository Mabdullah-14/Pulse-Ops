const projectRepo = require('../repositories/projectsrepo');
const { logActivity } = require('./auditLogsServices')
const { AUDIT_ACTIONS, ENTITY_TYPES } = require('../constants/auditAction');
const { db } = require('../config/db');


const createProject = async (organizationId, data) => {
    const rawKey = data.key
        ? data.key.trim()
        : 'PRJ';
    const normalizedKey = rawKey.toUpperCase();

    const existingProject = await projectRepo.getProjectByKey(organizationId, normalizedKey);
    if (existingProject) {
        throw new Error('DUPLICATE_KEY');
    }

    return await db.transaction(async (tx) => {
        const newProject = await projectRepo.createProject({
            organizationId,
            name: data.name.trim(),
            key: normalizedKey,
            description: data.description || null,
            category: data.category || null,
            budgetHours: data.budgetHours || null,
            deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        },
            tx
        );

        await logActivity({
            organizationId,
            userId,
            action: AUDIT_ACTIONS.PROJECT_CREATED,
            entityType: ENTITY_TYPES.PROJECT,
            entityId: newProject.id,
            metadata: {
                name: newProject.name,
                key: newProject.key,
            },
        },
            tx
        )
        return newProject
    })


};

const getProjects = async (organizationId) => {
    return await projectRepo.getProjectsByOrg(organizationId);
};

const getProjectById = async (organizationId, projectId) => {
    const project = await projectRepo.getProjectById(organizationId, projectId);
    if (!project) {
        throw new Error('NOT_FOUND');
    }
    return project;
};

const updateProject = async (organizationId, projectId, data) => {
    if (data.key) {
        const normalizedKey = data.key.trim().toUpperCase();
        const existing = await projectRepo.getProjectByKey(organizationId, normalizedKey);
        if (existing && existing.id !== projectId) {
            throw new Error('DUPLICATE_KEY');
        }
        data.key = normalizedKey;
    }

    if (data.deliveryDate) {
        data.deliveryDate = new Date(data.deliveryDate);
    }

    return await db.transaction(async (tx) => {
        const updated = await projectRepo.updateProject(organizationId, projectId, data);
        if (!updated) {
            throw new Error('NOT_FOUND');
        }

        await logActivity({
            organizationId,
            userId,
            action: AUDIT_ACTIONS.PROJECT_UPDATED,
            entityType: ENTITY_TYPES.PROJECT,
            entityId: updated.id,
            metadata: {
                name: updated.name,
                updatedFields: data,
            },
        },
            tx
        )
        return updated

    })

};

// 5. Delete Project
const deleteProject = async (organizationId, userId, projectId) => {
    const existingProject = await projectRepo.getProjectById(organizationId, projectId);
    if (!existingProject) {
        throw new Error('NOT_FOUND');
    }

    return await db.transaction(async (tx) => {
        const deleted = await projectRepo.deleteProject(organizationId, projectId, tx);
        if (!deleted) {
            throw new Error('NOT_FOUND');
        }

        await logActivity(
            {
                organizationId,
                userId,
                action: AUDIT_ACTIONS.PROJECT_DELETED,
                entityType: ENTITY_TYPES.PROJECT,
                entityId: projectId,
                metadata: {
                    deletedProjectName: existingProject.name,
                    key: existingProject.key,
                },
            },
            tx
        );

        return deleted;
    });
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
