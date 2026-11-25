import { API } from "./api";
import { handleApiError } from "./auth";

export const getAuditLogs = async ({orgSlug, cursor = null, limit=10}) => {
    try {
        const params= new URLSearchParams()
        if(limit){
            params.append("limit",limit)

        }
        if(cursor){
            params.append("cursor",cursor)
        }
        const res = await API.get(`/audit/${orgSlug}/get-audit-logs?${params.toString()}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getEntityAuditLogs = async ({ orgSlug, entityType, entityId }) => {
    try {
        const res = await API.get(`/audit/${orgSlug}/${entityType}/${entityId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};
