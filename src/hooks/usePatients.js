import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../redux/features/patient/patientApiSlice";

const usePatients = (page = 1, size = 5) => {
    const dispatch = useDispatch();
    const patientsState = useSelector((state) => state.patients);

    useEffect(() => {
        dispatch(fetchPatients({ page, size }));
    }, [dispatch, page, size]);

    return patientsState;
};

export default usePatients;
