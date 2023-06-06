import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authSvc from "../pages/auth/auth.service";
import AppConstants from "../config/constant";
import LoadingComponent from "../component/loading/loading.component";
import { useDispatch } from "react-redux";
import { setDetail } from "../reducer/auth.reducer";

const PrivateRoutes = ({ children, toCheck }) => {
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
 //let token = localStorage.getItem(AppConstants.AUTH_KEY); // null
  /*  let loggedInUser = localStorage.getItem(AppConstants.AUTH_USER_KEY) ?? null
 if(loggedInUser && typeof loggedInUser === 'string') {
    loggedInUser = JSON.parse(loggedInUser)
 } */

  const getUser = useCallback(
    async () => {
      try {
        let response = await authSvc.getLoggedInUser();
        if (response.result.role === toCheck) {
          dispatch(setDetail(response.result))
          setLoading(false);
        } else {
          toast.warning("You do not have previlige to access this dashboard");
          navigate("/" + response.result.role);
        }
      } catch (err) {
        console.log(err);
      }
    },[toCheck, navigate, dispatch]
  )


  
  useEffect(() => {
    let token = localStorage.getItem(AppConstants.AUTH_KEY);
    if(!token){
      toast.warning("Please login first")
      navigate('/login');
    
    }else{
      getUser();
    }
  }, [getUser, navigate]);
  //TODO: Api Calls
  //setLoading(false);
  // use login

  return loading ? <LoadingComponent/> : children;
};

export default PrivateRoutes;
