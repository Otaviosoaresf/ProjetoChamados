import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
    const { usuario } = useAuth();

    if(!usuario) {
        return <Navigate to="/" />;
    }

    return children;
}