import { getCookie } from "./getCookie";

export const getRecipes = async (page) => {
    const token = getCookie('token') || '';

    const response = await fetch(`http://rec-staging.recemed.cl/api/patients/prescriptions?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const { data } = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Error fetching data');
    }

    return data;
};