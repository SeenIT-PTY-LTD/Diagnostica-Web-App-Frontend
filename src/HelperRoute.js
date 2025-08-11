import { useEffect } from "react";
import { fetchDoctorInfo } from "./redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const HelperRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchDoctorInfo());
    }
  }, [dispatch, token]); 

  return null; 
};

export default HelperRoute;
