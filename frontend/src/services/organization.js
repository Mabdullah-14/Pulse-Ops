import { API } from "./api";
import { handleApiError } from "./auth";

export const createOrganization = async (data) => {
    try {
        const res = await API.post('/org/create-org', data)
        return res.data
    } catch (error) {
        handleApiError(error)
    }
}

export const getUserOrganizations = async () => {
    try {
        const res = await API.get('/org/get-org')
        return res.data

    } catch (error) {
        handleApiError(error)
    }
}
