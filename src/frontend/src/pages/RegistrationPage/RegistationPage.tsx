import React from "react";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registrationValidationSchema } from "../../validations/registration.schema";
import { apiClient } from "../../app/appClient";
import { register } from "../../app/registration";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		fullName: "",
		userName: "",
		password: "",
		confirmPassword: "",
	};

	const registration = async (values) => {
		const { email, userName, password, fullName } = values;

		const token = await register({ email, userName, password, fullName });

		if (token) {
			navigate("/");
		} else {
			console.error("Registration failed");
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Registration
				</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={registrationValidationSchema}
					onSubmit={registration}>
					{(formik) => (
						<Form className='w-10/12 m-auto p-2 flex flex-col'>
							<Field
								id='fullName'
								type='text'
								inputName='fullName'
								name='fullName'
								label='Full Name'
								placeholder='Enter your email'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='fullName'
								component='span'
							/>
							<Field
								id='email'
								type='text'
								inputName='email'
								name='email'
								label='Email'
								placeholder='Enter your email'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='email'
								component='span'
							/>
							<Field
								id='userName'
								type='text'
								inputName='userName'
								name='userName'
								label='User name'
								placeholder='Enter your User name'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='userName'
								component='span'
							/>
							<Field
								id='password'
								type='password'
								inputName='password'
								name='password'
								label='Password'
								placeholder='Enter your password'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='password'
								component='span'
							/>
							<Field
								id='confirmPassword'
								type='password'
								inputName='confirmPassword'
								name='confirmPassword'
								label='Confirm password'
								placeholder='Enter your confirmPassword'
								as={InputField}
							/>
							<ErrorMessage
								className='text-red-600 text-xs'
								name='confirmPassword'
								component='span'
							/>
							<Button type='submit' className='w-full mt-4'>
								Register
							</Button>
						</Form>
					)}
				</Formik>
				<p className='text-center text-sm text-gray-600 mt-4'>
					Already have an account?{" "}
					<Link
						to='/login'
						className='text-blue-500 hover:text-blue-700'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegistrationPage;
