const { verifyMembershipBySlug } = require('../services/orgMemberServices')

const tenantMiddleware = async (req, res, next) => {
    try {
        const { orgSlug } = req.params
        const userId = req.user?.id

        if (!orgSlug) {
            return res.status(400).json({
                success: false,
                message: 'Organization slug is required in URL'
            })
        }

        const membership = await verifyMembershipBySlug(orgSlug, userId)
        if (!membership) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You are not be a member of this organization'
            })
        }

        req.tenant = {
            orgId: membership.orgId,
            orgName: membership.orgName,
            roleId:membership.roleId,
            role: membership.role,
            permissions:membership.permissions
        };
        next()



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    tenantMiddleware
}