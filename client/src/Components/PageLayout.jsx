import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../Constants/Constants";
import { UserContext } from "./UserContext/UserContext";


export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to='/login' />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login');
    }

    return (
        <div>
            <div>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <Outlet />
        </div>
    )
};