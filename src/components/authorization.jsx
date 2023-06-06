import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";
import { Navigate, useLocation } from "react-router";

export const Authorization = ({ children }) => {
  const { checkLogin } = useContext(AuthContext);
  const location = useLocation();
  
  return checkLogin() ? children : <Navigate to="/login" state={location} />;
};