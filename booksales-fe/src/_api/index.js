import axios from "axios";

const url = "http://127.0.0.1:8000";

export const API = axios.create({
    // baseURL: "https://akmal-bc.karyakreasi.id/api",
    baseURL: `${url}/api`
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const token = localStorage.getItem("accessToken");

                const response = await axios.post(
                    `${url}/api/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const newToken = response.data.access_token;

                localStorage.setItem("accessToken", newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return API(originalRequest);
            } catch {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userInfo");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    },
);

export const bookImageStorage = `${url}/storage/books`;