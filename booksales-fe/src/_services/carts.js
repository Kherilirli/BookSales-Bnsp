import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getCarts = async () => {
    try {
        const { data } = await API.get("/carts", {
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

export const addToCart = async (payload) => {
    try {
        const response = await API.post("/carts", payload, {
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

export const showCart = async (id) => {
    try {
        const { data } = await API.get(`/carts/${id}`, {
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

export const updateCart = async (id, payload) => {
    try {
        const response = await API.put(`/carts/${id}`, payload, {
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

export const deleteCart = async (id) => {
    try {
        await API.delete(`/carts/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};