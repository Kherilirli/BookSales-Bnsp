import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const checkoutBuyNow = async (payload) => {
    try {
        const response = await API.post(
            "/checkout/buy-now",
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

export const checkoutCart = async (payload) => {
    try {
        const response = await API.post(
            "/checkout/cart",
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