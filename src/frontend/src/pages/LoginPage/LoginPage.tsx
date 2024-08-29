import React from "react";

import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../validations/login.schema";
import { login } from "../../app/login/login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
	};

	const handleLogin = async (values) => {
		const token = await login(values);

		if (token) {
			navigate("/");
		} else {
			console.error("Registration failed");
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={loginValidationSchema}
					onSubmit={handleLogin}>
					{(formik) => (
						<Form className='w-10/12 m-auto p-2 flex flex-col'>
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
							<Button type='submit' className='w-full mt-4'>
								Login
							</Button>
						</Form>
					)}
				</Formik>

				<p className='text-center text-sm text-gray-600 mt-4'>
					Don't have an account?{" "}
					<Link
						to='/register'
						className='text-blue-500 hover:text-blue-700'>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
