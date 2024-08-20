import { getCookie } from "./getCookie";

export const getPdf = async (rut, folio) => {
    const token = getCookie('token') || '';

    const response = await fetch(`http://rec-staging.recemed.cl/api/prescriptions/pdf?rut=${rut}&folio=${folio}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const { data } = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || 'Error fetching data');
    }

    return data.url;
};