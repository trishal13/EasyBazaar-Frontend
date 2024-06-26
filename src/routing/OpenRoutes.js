import { Navigate } from "react-router-dom";

export const OpenRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
    return !getTokenFromLocalStorage?.token ? children : <Navigate to="/" replace={true}></Navigate>
}