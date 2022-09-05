import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ token, redirectPath = "/login" }) => {
	if (token) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};
