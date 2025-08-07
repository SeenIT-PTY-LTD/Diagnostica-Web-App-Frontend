import React, { useEffect } from 'react'
import { fetchDoctorInfo } from './redux/features/auth/authSlice'
import { useDispatch } from 'react-redux';

const HelperRoute = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDoctorInfo())
    }, [dispatch])
    return (
        <div>

        </div>
    )
}

export default HelperRoute
