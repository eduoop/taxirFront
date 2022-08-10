import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  const token = localStorage.getItem('authToken')

  if (!auth.user && !token) {
    return <Navigate to="/login" />;
   }

    return children;
};
