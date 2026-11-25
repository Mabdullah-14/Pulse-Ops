const projectService = require('../services/projectServices');

const createProject = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const project = await projectService.createProject(organizationId, userId, req.body);

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (err) {
    console.error('CREATE PROJECT ERROR:', err);

    if (err.message === 'DUPLICATE_KEY') {
      return res.status(409).json({
        success: false,
        message: 'A project with this key already exists in this organization.',
      });
    }
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const projects = await projectService.getProjects(organizationId);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const { projectId } = req.params;

    const project = await projectService.getProjectById(organizationId, projectId);

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const { projectId } = req.params;

    const updated = await projectService.updateProject(
      organizationId,
      userId,
      projectId,
      req.body
    );

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    if (err.message === 'DUPLICATE_KEY') {
      return res.status(409).json({
        success: false,
        message: 'A project with this key already exists in this organization.',
      });
    }
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const organizationId = req.tenant.orgId;
    const userId = req.user.id;
    const { projectId } = req.params;

    await projectService.deleteProject(organizationId, userId, projectId);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (err) {
    if (err.message === 'NOT_FOUND') {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
