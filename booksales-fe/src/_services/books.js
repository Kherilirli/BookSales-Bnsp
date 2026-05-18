import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");
console.log(localStorage.getItem("accessToken"));

export const getBooks = async () => {
    const { data } = await API.get("/books", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return data.data;
};

export const createBook = async (data) => {
    try {
        const response = await API.post("/books", data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const showBook = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBook = async (id, data) => {
    try {
        const response = await API.post(`/books/${id}`, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        await API.delete(`/books/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};
