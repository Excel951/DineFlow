import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children, allowedRoles = []}) {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    const isLoggedIn = auth?.isLoggedIn;
    const userRole = auth?.user?.role;

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/foodmenu" replace />;
    }

    return children;
}