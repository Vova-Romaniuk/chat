import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {
	AuthRoute,
	MainWrapper,
	LoginPage,
	RegistrationPage,
} from "./elements/elements";

const routes = [
	{
		path: "/",
		element: <AuthRoute />,
		children: [
			{
				path: "/",
				element: <MainWrapper />,
			},
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegistrationPage />,
	},
];

const router = createBrowserRouter(routes);

export default router;
