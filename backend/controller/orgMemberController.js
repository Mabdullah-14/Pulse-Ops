const {
    addMember,
    getUserOrganization,
    verifyMembershipBySlug,
    organizationMembers,
    getMemberdetails,
    changeRole,
} = require('../services/orgMemberServices');

// 1. Add a member to an organization by email
const handleAddMember = async (req, res) => {
    try {
        const { orgId } = req.tenant;
        const { email, roleId } = req.body;
        const actorId = req.user?.id;

        const newMember = await addMember({
            organizationsId: orgId,
            email,
            roleId,
            actorId,
        });

        return res.status(201).json({
            success: true,
            message: 'Member added successfully',
            data: newMember,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

// 2. Get all organizations of the logged-in user
const handleGetUserOrgnaizations = async (req, res) => {
    try {
        const userId = req.user?.id;
        const organizations = await getUserOrganization(userId);

        return res.status(200).json({
            success: true,
            data: organizations,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 3. Verify if logged-in user is a member of an organization using slug
const handleVerifyMembershipBySlug = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { slug } = req.params;

        const membership = await verifyMembershipBySlug(slug, userId);
        if (!membership) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: You are not a member of this organization',
            });
        }

        return res.status(200).json({
            success: true,
            data: membership,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 4. List all organization members
const handleOrganizationMembers = async (req, res) => {
    try {
        const { orgId } = req.tenant;

        const members = await organizationMembers(orgId);
        return res.status(200).json({
            success: true,
            data: members,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 5. Get single member details
const handleGetMembersDetails = async (req, res) => {
    try {
        const { orgId } = req.tenant;
        const { userId } = req.params;

        const member = await getMemberdetails(orgId, userId);
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found in this organization',
            });
        }

        return res.status(200).json({
            success: true,
            data: member,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// 6. Change role of an existing member
const handleChangeRole = async (req, res) => {
    try {
        const { orgId } = req.tenant;
        const { userId: targetUserId } = req.params;
        const { roleId } = req.body;
        const actorId = req.user?.id;

        if (targetUserId === actorId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change your own role',
            });
        }

        const updatedMember = await changeRole(orgId, targetUserId, roleId, actorId);

        return res.status(200).json({
            success: true,
            message: 'Member role updated successfully',
            data: updatedMember,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    handleAddMember,
    handleGetUserOrgnaizations,
    handleVerifyMembershipBySlug,
    handleOrganizationMembers,
    handleGetMembersDetails,
    handleChangeRole,
};
