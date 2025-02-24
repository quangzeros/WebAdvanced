import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import { Navigate, Outlet } from "react-router-dom";

function AuthRoutes() {
  const { user } = useContext(AppContext);

  return user.email ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
