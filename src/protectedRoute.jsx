import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, user }) => {
    console.log("cek1")
    if (!user) {
        console.log("cek2")
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.role)) {
        console.log("cek")
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;