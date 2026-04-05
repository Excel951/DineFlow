import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute({children, allowedRoles = []}) {
    const location = useLocation();
    localStorage.setItem("lastPath", location.pathname);
    const auth = useSelector((state) => state.auth);

    const isLoggedIn = auth?.isLoggedIn;
    const userRole = auth?.user?.role?.name.toLowerCase();

    console.log("ProtectedRoute - Status:", {isLoggedIn, userRole, allowedRoles});

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/foodmenu" replace />;
    }

    return children;
}