import { API } from "./api";
import { handleApiError } from "./auth";

export const createIssue = async ({ orgSlug, projectId }, data) => {
    try {
        const res = await API.post(
            `/issues/${orgSlug}/${projectId}/create-issue`,
            data,
            {
                headers: {
                    'Idempotency-Key': crypto.randomUUID(),
                },
            }
        );
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getIssues = async ({ orgSlug, projectId, cursor = null, limit = 10, filters = {} }) => {
    try {
        const params = new URLSearchParams();

        if (limit) params.append('limit', limit);
        if (cursor) params.append('cursor', cursor);

        if (filters.statusId) params.append('statusId', filters.statusId);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.assigneeId) params.append('assigneeId', filters.assigneeId);
        if (filters.search) params.append('search', filters.search);

        const res = await API.get(`/issues/${orgSlug}/${projectId}?${params.toString()}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};


export const getIssueById = async ({ orgSlug, projectId, issueId }) => {
    try {
        const res = await API.get(`/issues/${orgSlug}/${projectId}/${issueId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);

    }
};

export const updateIssue = async ({ orgSlug, projectId, issueId }, data) => {
    try {
        const res = await API.patch(`/issues/${orgSlug}/${projectId}/update-issue/${issueId}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteIssue = async ({ orgSlug, projectId, issueId }) => {
    try {
        const res = await API.delete(`/issues/${orgSlug}/${projectId}/delete-issue/${issueId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};
