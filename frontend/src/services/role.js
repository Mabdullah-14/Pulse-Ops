import { API } from "./api";
import { handleApiError } from "./auth";

export const createRole = async ({ orgSlug, data }) => {
    try {
        const res = await API.post(`/roles/${orgSlug}/create-role`, data)
        return res.data
    } catch (error) {
        handleApiError(error)
    }
}

export const getRoles = async ({ orgSlug }) => {
    try {
        const res = await API.get(`/roles/${orgSlug}/get-roles`)
        return res.data
    } catch (error) {
        handleApiError(error)
    }
}


export const updateRole = async ({ orgSlug, roleId, data }) => {
    try {
        const res = await API.patch(`/roles/${orgSlug}/update-role/${roleId}`, data)
        return res.data
    } catch (error) {
        handleApiError(error)
    }
}

export const deleteRole = async ({ orgSlug, roleId }) => {
    try {
        const res = await API.delete(`/roles/${orgSlug}/delete-role/${roleId}`)
        return res.data

    } catch (error) {
        handleApiError(error)
    }
}