import { API } from './api';
import { handleApiError } from './auth';

// 1. Add a member to an organization
export const addMemberToOrg = async ({ orgSlug, userId, role }) => {
    try {
        const res = await API.post(`/org-members/${orgSlug}/add-member`, { userId, role });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 2. Get all organizations of the logged-in user
export const getUserOrganizations = async () => {
    try {
        const res = await API.get('/org-members/user-org');
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 3. Verify if logged-in user is a member of an organization using slug
export const verifyMemberBySlug = async (slug) => {
    try {
        const res = await API.get(`/org-members/verify-member/${slug}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 4. Get all members of an organization
export const getOrganizationMembers = async (orgSlug) => {
    try {
        const res = await API.get(`/org-members/${orgSlug}/org-member-list`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 5. Get single member details
export const getMemberdetails = async ({ orgSlug, userId }) => {
    try {
        const res = await API.get(`/org-members/${orgSlug}/members-details/${userId}`);
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 6. Change role of a member
export const changeUserRole = async ({ orgSlug, userId, role }) => {
    try {
        const res = await API.patch(`/org-members/${orgSlug}/change-role/${userId}`, { role });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

