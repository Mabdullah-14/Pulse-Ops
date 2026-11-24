import { API } from "./api";
import { handleApiError } from "./auth";

export const createIssue = async ({ orgSlug, projectId }, data) => {
    try {
        const res = await API.post(`/issues/${orgSlug}/${projectId}/create-issue`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getIssues = async ({ orgSlug, projectId }) => {
    try {
        const res = await API.get(`/issues/${orgSlug}/${projectId}`);
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
