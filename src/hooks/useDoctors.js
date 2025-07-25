import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../redux/features/doctor/doctorApiSlice";

const useDoctors = (page = 1, size = 5) => {
    const dispatch = useDispatch();
    const doctorState = useSelector((state) => state.doctors);

    useEffect(() => {
        dispatch(fetchDoctors({ page, size }));
    }, [dispatch, page, size]);

    return doctorState;
};

export default useDoctors;
