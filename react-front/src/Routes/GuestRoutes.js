import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import { Navigate, Outlet } from "react-router-dom";

function GuestRoutes() {
  const { user } = useContext(AppContext);

  // Check if User email is NOT true/exist then show the proper routes otherwise redirect to Dashboard page
  return !user.email ? <Outlet /> : <Navigate to="/" />;
}

export default GuestRoutes;
