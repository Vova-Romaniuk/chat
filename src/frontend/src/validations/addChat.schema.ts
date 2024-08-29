import * as Yup from "yup";

export const addChatValidationSchema = Yup.object({
	name: Yup.string().required("Name is a required field"),

	imageUrl: Yup.string().required("imageUrl is a required field"),
});
