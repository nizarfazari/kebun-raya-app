import axios, { AxiosRequestHeaders } from 'axios';

export async function getData(url: string, headers?: AxiosRequestHeaders) {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ?? [];
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}

export async function updateData(url: string, data: any, headers?: AxiosRequestHeaders) {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    try {
        const response = await axios.patch(`http://127.0.0.1:8000/api${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ?? [];
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}

export async function postData(url: string, data: any, headers?: AxiosRequestHeaders) {
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
 
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api${url}`, data, {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ?? [];
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}
