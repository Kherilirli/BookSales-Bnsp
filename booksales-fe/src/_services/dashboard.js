import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getDashboardData = async () => {
    const { data } = await API.get("/dashboard", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return data.data;
};