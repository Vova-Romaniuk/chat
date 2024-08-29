import React from "react";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Dialog from "../Dialog/Dialog";
import { addChatValidationSchema } from "../../validations/addChat.schema";
import { apiClient } from "../../app/appClient";

interface AddChatState {
	onClick: () => void;
}
const AddChat = ({ onClick }: AddChatState) => {
	const initialValues = {
		name: "",
		imageUrl: "",
	};

	const addChat = async (values) => {
		await apiClient.post("chat/chats", values);
		window.location.reload();
		onClick();
	};

	return (
		<Dialog onClick={onClick} className=''>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Add new chat
				</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={addChatValidationSchema}
					onSubmit={addChat}>
					{(formik) => (
						<Form className='w-10/12 m-auto p-2 flex flex-col'>
							<Field
								id='name'
								type='text'
								inputName='name'
								name='name'
								label='Name'
								placeholder='Enter your name'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='name'
								component='span'
							/>
							<Field
								id='imageUrl'
								type='text'
								inputName='imageUrl'
								name='imageUrl'
								label='Image url'
								placeholder='Enter your image url'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='imageUrl'
								component='span'
							/>
							<Button type='submit' className='w-full mt-4'>
								Add
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Dialog>
	);
};

export default AddChat;
