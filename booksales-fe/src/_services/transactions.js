import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getTransactions = async () => {
    const { data } = await API.get("/transactions", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return data.data;
};

export const createTransaction = async (payload) => {
    try {
        const response = await API.post(
            "/transactions",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};

export const showTransaction = async (id) => {
    try {
        const { data } = await API.get(`/transactions/${id}`, {
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

export const updateTransaction = async (id, payload) => {
    try {
        const response = await API.put(
            `/transactions/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);

        throw error;
    }
};