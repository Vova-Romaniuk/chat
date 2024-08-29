import axios from "axios";
import { apiClient } from "../appClient";

interface RegistrationValues {
	fullName: string;
	email: string;
	password: string;
	userName: string;
}

export const register = async (
	values: RegistrationValues
): Promise<string | null> => {
	try {
		const response = await apiClient.post("auth/register", values);

		const token = response.data.token;

		localStorage.setItem("token", token);
		return token;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.error("Registration failed:", error.response.data);
		} else {
			console.error("An unexpected error occurred:", error);
		}

		return null;
	}
};
