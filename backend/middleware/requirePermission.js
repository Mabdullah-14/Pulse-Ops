const requirePermission = (requiredPermission) => {
    return (req, res, next) => {
        const permission = req.tenant?.permissions;

        if (!permission || !Array.isArray(permissions)) {
            return res.status(403).json({
                sucsess: false,
                message: 'Forbidden: No permissions found for this organization',
            })
        }

        if (!permission.includes(requirePermission)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Missing '${requiredPermission}' permission`,
            });
        }
        next()
    }
}
module.exports = {
    requirePermission
}