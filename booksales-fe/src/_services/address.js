import { API } from "../_api";

export const getAddresses = async () => {
    try {
        const { data } = await API.get("/addresses", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "accessToken",
                )}`,
            },
        });

        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createAddress = async (payload) => {
    try {
        const response = await API.post(
            "/addresses",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken",
                    )}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAddress = async (id, payload) => {
    try {
        const response = await API.put(
            `/addresses/${id}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken",
                    )}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteAddress = async (id) => {
    try {
        const response = await API.delete(
            `/addresses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken",
                    )}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};