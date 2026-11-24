const issueService = require('../services/issuesServices');

const createIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId } = req.params;

        const issue = await issueService.createIssue(organizationId, projectId, req.body);

        return res.status(201).json({
            success: true,
            data: issue,
        });
    } catch (err) {
          console.error('CREATE ISSUE ERROR:', err);
        if (err.message === 'PROJECT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        if (err.message === 'STATUS_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Status column not found' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getIssues = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId } = req.params;


        const filters ={
             statusId: req.query.statusId || null,
            priority: req.query.priority || null,
            assigneeId: req.query.assigneeId || null,
            search: req.query.search ? req.query.search.trim() : null,
        }

        const limit =parseInt(req.query.limit,10) || 10
        const cursor=req.query.cursor || null

        const issues = await issueService.getIssues(organizationId, projectId,limit,cursor);

        return res.status(200).json({
            success: true,
            data: issues,
            filters,
            limit,
            cursor
        });
    } catch (err) {
        if (err.message === 'PROJECT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getIssueById = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId, issueId } = req.params;

        const issue = await issueService.getIssueById(organizationId, projectId, issueId);

        return res.status(200).json({
            success: true,
            data: issue,
        });
    } catch (err) {
        if (err.message === 'PROJECT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        if (err.message === 'ISSUE_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Issue not found' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const updateIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId, issueId } = req.params;

        const updated = await issueService.updateIssue(
            organizationId,
            projectId,
            issueId,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: updated,
        });
    } catch (err) {
        if (err.message === 'PROJECT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        if (err.message === 'STATUS_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Status column not found' });
        }
        if (err.message === 'ISSUE_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Issue not found' });
        }
        if (err.message === 'VERSION_CONFLICT') {
            return res.status(409).json({
                success: false,
                message: 'Conflict: This issue was updated by another user.',
                data: err.latestIssue,
            });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const organizationId = req.tenant.orgId;
        const { projectId, issueId } = req.params;

        await issueService.deleteIssue(organizationId, projectId, issueId);

        return res.status(200).json({
            success: true,
            message: 'Issue deleted successfully',
        });
    } catch (err) {
        if (err.message === 'PROJECT_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        if (err.message === 'ISSUE_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Issue not found' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    createIssue,
    getIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
};
