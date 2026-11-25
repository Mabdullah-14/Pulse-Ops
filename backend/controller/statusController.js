const statusService = require('../services/statusService');

const createStatus = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const { projectId } = req.params;

    const status = await statusService.createStatus(organizationId, userId, projectId, req.body);

    return res.status(201).json({
      success: true,
      data: status,
    });
  } catch (err) {
    console.log('Status error:', err);
    if (err.message === 'PROJECT_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getStatuses = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const { projectId } = req.params;

    const statuses = await statusService.getStatuses(organizationId, projectId);

    return res.status(200).json({
      success: true,
      data: statuses,
    });
  } catch (err) {
    if (err.message === 'PROJECT_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const { projectId, statusId } = req.params;

    const updated = await statusService.updateStatus(
      organizationId,
      userId,
      projectId,
      statusId,
      req.body
    );

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    console.log('Update status error:', err);
    if (err.message === 'PROJECT_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    if (err.message === 'STATUS_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Column not found' });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteStatus = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const { projectId, statusId } = req.params;

    await statusService.deleteStatus(organizationId, userId, projectId, statusId);

    return res.status(200).json({
      success: true,
      message: 'Column deleted successfully',
    });
  } catch (err) {
    console.log('Delete status error:', err);
    if (err.message === 'PROJECT_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    if (err.message === 'STATUS_NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Column not found' });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  createStatus,
  getStatuses,
  updateStatus,
  deleteStatus,
};
