import { API } from "../_api";

const getToken = () => localStorage.getItem("accessToken");

export const createConversation = async () => {
    const { data } = await API.post(
        "/chat/conversation",
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );

    return data.data;
};

export const getConversations = async () => {
    const { data } = await API.get("/admin/chat/conversations", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    return data.data;
};

export const getMessages = async (conversationId) => {
    const { data } = await API.get(
        `/chat/messages/${conversationId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );

    return data.data;
};

export const getAdminMessages = async (conversationId) => {
    const { data } = await API.get(
        `/admin/chat/messages/${conversationId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );

    return data.data;
};

export const sendMessage = async (payload) => {
    const { data } = await API.post(
        "/chat/send",
        payload,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );

    return data.data;
};

export const sendAdminMessage = async (payload) => {
    const { data } = await API.post(
        "/admin/chat/send",
        payload,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        },
    );

    return data.data;
};