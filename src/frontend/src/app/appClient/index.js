import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["x-auth-token"] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
