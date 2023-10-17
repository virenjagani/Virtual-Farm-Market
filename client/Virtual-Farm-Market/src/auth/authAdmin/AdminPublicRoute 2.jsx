import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminPublicRoute({ children }) {
  const adminReducer = useSelector((state) => state.adminReducer);
  return (
    <>{adminReducer.adminId ? <Navigate to="/admin/dashboard" /> : children}</>
  );
}

export default AdminPublicRoute;
