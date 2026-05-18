import { API } from "../_api";

export const getCouriers = async () => {
    try {
        const { data } = await API.get("/couriers", {
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