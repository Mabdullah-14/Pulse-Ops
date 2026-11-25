import { API } from "./api";
import { handleApiError } from "./auth";

export const getAuditLogs = async (orgSlug) => {
    try {

        const res = await api.get(`/audit-logs/${orgSlug}/get-audit-logs`)
        return res.data

    } catch (error) {
        handleApiError(error)
    }
}

export const getEntityAuditLogs = async ({ orgSlug, entityType, entityId }) => {
    try {
        const res = await api.get(`/audit-logs/${orgSlug}/${entityType}/${entityId}`)
        return res.data
    } catch (error) {
        handleApiError(error)
    }
}