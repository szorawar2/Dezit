import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context";

function ProtectedRoute({ children }) {
  const { token } = useContext(Context);

  // return token ? children : <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
