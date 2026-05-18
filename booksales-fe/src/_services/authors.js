import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getAuthors = async () => {
    const { data } = await API.get("/authors", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return data.data;
};

export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const showAuthor = async (id) => {
    try {
        const { data } = await API.get(`/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAuthor = async (id, data) => {
    try {
        const response = await API.post(`/authors/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteAuthor = async (id) => {
    try {
        await API.delete(`/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};