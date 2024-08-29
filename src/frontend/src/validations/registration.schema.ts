import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registrationValidationSchema = Yup.object({
	fullName: Yup.string().required("Full name is a required field"),
	email: Yup.string()
		.matches(emailRegex, "Please enter a valid email address")
		.required("Email is a required field"),
	userName: Yup.string().required("Name is a required field"),
	password: Yup.string()
		.required("Password is a required field")
		.min(5, "Your password is too short")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
	confirmPassword: Yup.string()
		.required("Password confirmation is a required field")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});
