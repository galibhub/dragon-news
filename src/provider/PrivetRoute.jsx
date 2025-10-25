import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";
import Loading from "../pages/Loading";

const PrivetRoute = ({ children }) => {
  const { user,loading } = use(AuthContext);  //step-2
  console.log(user);
  
  //step-3
  if(loading){
    return <Loading></Loading>;

  }

//step-1
  if (user && user?.email) {
    return children;
  }
  else
  {
    return <Navigate to='/auth/login'></Navigate>
  }
};

export default PrivetRoute;
