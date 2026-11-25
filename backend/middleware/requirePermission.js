const requirePermission = (requiredPermission) => {
    return (req, res, next) => {
        const permissions = req.tenant?.permissions;

        if (!permissions || !Array.isArray(permissions)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: No permissions found for this organization',
            });
        }

        if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Missing '${requiredPermission}' permission`,
            });
        }

        next();
    };
};

module.exports = {
    requirePermission,
};
