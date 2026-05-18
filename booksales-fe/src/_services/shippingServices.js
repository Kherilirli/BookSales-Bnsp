import { API } from "../_api";

export const getShippingServices = async (
    courierId = null,
) => {
    try {
        let url = "/shipping-services";

        if (courierId) {
            url += `?courier_id=${courierId}`;
        }

        const { data } = await API.get(url, {
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