/* eslint-disable react/prop-types */
// components/ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  return state.token ? children : <Navigate to="/login" replace />;
};

export const LoginProtected = ({ children }) => {
  const { state } = useContext(AuthContext);
  return state.token ? <Navigate to="/user" replace /> : children;
};
