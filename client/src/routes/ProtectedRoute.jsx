import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Skeleton from "../components/Skeleton.jsx";


function ProtectedRoute() {

    const { user, isLoading } = useSelector((state) => state.user);

    if (isLoading) {
        return <Skeleton />
        
    }

    if (!user) {
        return <Navigate to="/"  />;
    }

    return <Outlet />;
}
export default ProtectedRoute