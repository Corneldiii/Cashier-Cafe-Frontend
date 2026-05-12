import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, user }) => {
    if (!user) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;