const issueService = require('../services/issuesServices');

const createIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const userId = req.user.id;
        const { projectId } = req.params;

        const issue = await issueService.createIssue(
            organizationId,
            userId,
            projectId,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: issue,
        });
    } catch (err) {
        console.error('CREATE ISSUE ERROR:', err);
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

const getIssues = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId } = req.params;

        const filters = {
            statusId: req.query.statusId || null,
            priority: req.query.priority || null,
            assigneeId: req.query.assigneeId || null,
            search: req.query.search ? req.query.search.trim() : null,
        };

        const limit = parseInt(req.query.limit, 10) || 10;
        const cursor = req.query.cursor || null;

        const result = await issueService.getProjectIssues(
            organizationId,
            projectId,
            filters,
            limit,
            cursor
        );

        return res.status(200).json({
            success: true,
            data: result.issues,
            nextCursor: result.nextCursor,
            filters,
            limit,
            cursor,
        });
    } catch (err) {
        console.error('GET ISSUES ERROR:', err);
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

const getIssueById = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId, issueId } = req.params;

        const issue = await issueService.getSingleIssue(
            organizationId,
            projectId,
            issueId
        );

        return res.status(200).json({
            success: true,
            data: issue,
        });
    } catch (err) {
        console.error('GET ISSUE BY ID ERROR:', err);
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

const updateIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const userId = req.user.id;
        const { projectId, issueId } = req.params;
        const { version, ...updateData } = req.body;

        const updated = await issueService.updateIssue(
            organizationId,
            userId,
            projectId,
            issueId,
            version,
            updateData
        );

        return res.status(200).json({
            success: true,
            data: updated,
        });
    } catch (err) {
        console.error('UPDATE ISSUE ERROR:', err);
        if (err.statusCode === 409) {
            return res.status(409).json({
                success: false,
                message: err.message,
                latestVersion: err.latestVersion,
            });
        }
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const userId = req.user.id;
        const { projectId, issueId } = req.params;

        await issueService.deleteIssue(
            organizationId,
            userId,
            projectId,
            issueId
        );

        return res.status(200).json({
            success: true,
            message: 'Issue deleted successfully',
        });
    } catch (err) {
        console.error('DELETE ISSUE ERROR:', err);
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || 'Internal server error',
        });
    }
};

module.exports = {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
};
