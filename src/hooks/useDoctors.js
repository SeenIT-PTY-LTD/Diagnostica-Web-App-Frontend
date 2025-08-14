import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/features/doctor/doctorApiSlice";

const useDoctors = (page = 1, size = 5, search = "", searchCriteria = "") => {
  const dispatch = useDispatch();
  const doctorState = useSelector((state) => state.doctors);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchDoctors({ page, size, search, searchCriteria, signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, page, size, search, searchCriteria]);

  return doctorState;
};

export default useDoctors;
