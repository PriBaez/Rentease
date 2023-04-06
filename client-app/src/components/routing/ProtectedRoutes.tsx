import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({isAllowed, children, redirectTo="/login"}:{isAllowed : boolean, children: any, redirectTo: string}) => {
    
    if(!isAllowed) {
        return <Navigate to ={redirectTo} />
    }

    return children? children: <Outlet/>;
}

export default ProtectedRoutes;