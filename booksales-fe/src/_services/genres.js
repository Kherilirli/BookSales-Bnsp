import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getGenres = async () => {
    const { data } = await API.get("/genres", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return data.data;
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data, {
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

export const showGenre = async (id) => {
    try {
        const { data } = await API.get(`/genres/${id}`, {
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

export const updateGenre = async (id, data) => {
    try {
        const response = await API.post(`/genres/${id}`, data, {
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

export const deleteGenre = async (id) => {
    try {
        await API.delete(`/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};