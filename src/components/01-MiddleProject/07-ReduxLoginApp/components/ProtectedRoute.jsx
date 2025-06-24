import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, requiredAdmin }) {
    const { user } = useAuth();
    const userRole = useSelector((state) => state.userRole.role); // Assuming userRole is the key in the Redux store

    if(!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredAdmin && userRole !== requiredAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}