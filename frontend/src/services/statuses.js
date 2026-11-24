import { API } from "./api";
import { handleApiError } from "./auth";

export const createStatus = async ({ orgSlug, projectId }, data) => {
    try {
        const res = await API.post(`/status/${orgSlug}/${projectId}/create-status`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getStatuses = async ({ orgSlug, projectId }) => {
    try {
        const res = await API.get(`/status/${orgSlug}/${projectId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateStatus = async ({ orgSlug, projectId, statusId }, data) => {
    try {
        const res = await API.patch(`/status/${orgSlug}/${projectId}/update-status/${statusId}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteStatus = async ({ orgSlug, projectId, statusId }) => {
    try {
        const res = await API.delete(`/status/${orgSlug}/${projectId}/delete-status/${statusId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};
