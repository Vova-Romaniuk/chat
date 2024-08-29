import axios from "axios";
import { apiClient } from "../appClient";

interface LoginValues {
	email: string;
	password: string;
}

export const login = async (values: LoginValues): Promise<string | null> => {
	try {
		const response = await apiClient.post("auth/login", values);

		const token = response.data.token;

		localStorage.setItem("token", token);
		return token;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error("Login failed:", error.response.data);
		} else {
			console.error("An unexpected error occurred:", error);
		}

		return null;
	}
};
