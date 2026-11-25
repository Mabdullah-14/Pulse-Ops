import { useOutletContext } from 'react-router-dom';

export const usePermission = () => {
    const { membership } = useOutletContext() || {};

    const permissions = membership?.role?.permissions || membership?.permissions || [];

    const hasPermission = (permission) => {
        if (!Array.isArray(permissions)) return false;
        return permissions.includes(permission);
    };

    return { hasPermission, permissions, membership };
};
