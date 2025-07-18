import React, { useEffect } from 'react'
import { fetchDoctorInfo } from './redux/features/auth/authSlice'
import { useDispatch } from 'react-redux';
import { fetchDiagnostica } from './redux/features/diagnostica/Diagnostica';

const HelperRoute = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDoctorInfo())
        dispatch(fetchDiagnostica())
    }, [dispatch])
    return (
        <div>

        </div>
    )
}

export default HelperRoute
