import * as Yup from "yup";


export const patientSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required('Gender is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    patientCode: Yup.string().required('Patient Code is required'),
    medicareNumber: Yup.string().required('Medicare Number is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    postcode: Yup.string().required('Postcode is required'),
    height: Yup.number().typeError('Height must be a number').required('Height is required'),
    weight: Yup.number().typeError('Weight must be a number').required('Weight is required'),
});