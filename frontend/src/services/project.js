import { API } from "./api";
import { handleApiError } from "./auth";

export const createProject = async ({ orgSlug }, data) => {
    try {
        const res = await API.post(`/projects/${orgSlug}/create-project`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getProjects = async ({ orgSlug }) => {
    try {
        const res = await API.get(`/projects/${orgSlug}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const getProjectById = async ({ orgSlug, projectId }) => {
    try {
        const res = await API.get(`/projects/${orgSlug}/${projectId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateProject = async ({ orgSlug, projectId }, data) => {
    try {
        const res = await API.patch(`/projects/${orgSlug}/update-project/${projectId}`, data);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteProject = async ({ orgSlug, projectId }) => {
    try {
        const res = await API.delete(`/projects/${orgSlug}/delete-project/${projectId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};
