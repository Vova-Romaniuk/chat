import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute: React.FC = () => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};

export default AuthRoute;
