import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../redux/userThunk.js";
import PublicRoute from "./PublicRoute.jsx";




const AppRoutes = () => {


     let dispatch = useDispatch()

     useEffect(() => {
        dispatch(getCurrentUser())
     },[dispatch])


   const router = createBrowserRouter([
    {
        element:<PublicRoute />,
        children:[
            {
               path: "/",
              element: <Login />
            }
        ]

    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path:"/home",
                element: <HomePage />
            }
        ]
    }
]);

   return <RouterProvider router={router} />

   
}

export default AppRoutes