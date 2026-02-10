import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div className="flex h-screen items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
