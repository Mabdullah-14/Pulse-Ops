const { createOrganization, getUserOrganizations } = require('../services/orgServices');

const handleCreateOrganization = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Name and slug are mandatory',
      });
    }

    const createOrg = await createOrganization({ userId, name, slug });

    return res.status(201).json({
      success: true,
      data: createOrg,
      message: 'Organization created successfully',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleGetUserOrganizations = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orgs = await getUserOrganizations(userId);

    return res.status(200).json({
      success: true,
      data: orgs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleCreateOrganization,
  handleGetUserOrganizations,
};
