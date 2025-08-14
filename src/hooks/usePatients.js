// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDashboardCount,
//   fetchPatients,
// } from "../redux/features/patient/patientApiSlice";

// const usePatients = (page = 1, size = 5) => {
//   const dispatch = useDispatch();
//   const doctorState = useSelector((state) => state.patients);

//   useEffect(() => {
//     dispatch(fetchDashboardCount());
//     dispatch(fetchPatients({ page, size }));
//   }, [dispatch, page, size]);

//   return doctorState;
// };

// export default usePatients;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardCount,
  fetchPatients,
} from "../redux/features/patient/patientApiSlice";

const usePatients = (page = 1, size = 5, search = "", searchCriteria = "") => {
  const dispatch = useDispatch();
  const doctorState = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchDashboardCount());
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchPatients({ page, size, search, searchCriteria, signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, page, size, search, searchCriteria]);

  return doctorState;
};

export default usePatients;
