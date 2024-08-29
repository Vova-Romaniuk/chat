import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginValidationSchema = Yup.object({
	email: Yup.string()
		.matches(emailRegex, "Please enter a valid email address")
		.required("Email is a required field"),

	password: Yup.string()
		.required("Password is a required field")
		.min(5, "Your password is too short")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
});
