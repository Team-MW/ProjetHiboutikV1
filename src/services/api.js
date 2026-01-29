import axios from 'axios';

export const createApiClient = (account, email, apiKey) => {
    // In development, use our local Vite proxy to avoid CORS
    // In production, use the direct URL (assuming the app is hosted appropriately or CORS is handled)
    const isDev = import.meta.env.DEV;

    const baseURL = isDev
        ? `/hiboutik-proxy/${account}`
        : `https://${account}.hiboutik.com/api`;

    const api = axios.create({
        baseURL,
        auth: {
            username: email,
            password: apiKey
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    return api;
};

export const testConnection = async (account, email, apiKey) => {
    try {
        const api = createApiClient(account, email, apiKey);
        // Requesting 'types' or 'products' as a lightweight verification
        // using /ws/ or depending on version. 
        // Usually /products or simply checking if root responds.
        // Let's try /products/?limit=1
        const response = await api.get('/products/', { params: { limit: 1 } });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API Connection Error:", error);
        return {
            success: false,
            error: error.response?.data?.message || error.message
        };
    }
};
