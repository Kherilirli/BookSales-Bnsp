import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const getUsers = async () => {
    const { data } = await API.get("/users", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    return data.data;
};

export const showUser = async (id) => {
    const { data } = await API.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return data.data;
};