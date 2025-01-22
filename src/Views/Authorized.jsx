import { Navigate, Outlet } from "react-router-dom";

export const Authorized = ({ children }) => {
  const cookistryUser = localStorage.getItem("cookistry_user");

  if (!cookistryUser && location.pathname !== "/register") {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default Authorized;
