import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/ui/Card";
import { DynamicDropdown } from "../../components/ui/DynacmicDropdown";
import { toast } from "react-toastify";
import { emailValidation, validateFildWith50Length, validateMobile } from "../../utils/validators";
import { API } from "../../host";
import { DropdownWithSearch } from "../../components/ui/DropDownWithSearch";
import LoaderCircle from "../../components/Loader-circle";

const Referrals = () => {

  // states
  const [ fullName , setFullName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');

  const [ deliveryMethod, setDeliveryMethod ] = useState({
    sms: false,
    email: false,
    both: false,
  });
 
  const [ referredBy , setReferredBy ] = useState('')
  const [ errors, setErrors ] = useState([])
  const [ part , setPart] = useState('')
  const [ bodyPartsOptions, setBodyPartsOptions ] = useState(["Head", "Shoulders", "Knees", "Toes"]);
  const [ doctorList , setDoctorList ] = useState([]);
  const [ selectedDoctor , setSelectedDoctor ] = useState({});
  const [ isLoader , setIsLoader ] = useState(false)


  /***     handle changes  */
  // set fullname
  const handleChangeFullName = (e) =>{
    setFullName(e.target.value)
  }

  // set phone number
  const handleChangePhoneNumber = (e) => {
    const value = e.target.value;
    // Allow only digits, +, space, hyphen
    
    if (/^[+\d\s-]*$/.test(value)) {
      setPhone(value);
    }
  };

  // set email
  const handleChangeEmail = (e) =>{
    setEmail(e.target.value)
  }

  const handleReferByChange = (e) =>{
    setReferredBy(e.target.value)
  }

  const handleNotificationChange = (e) => {

    const { name, checked } = e.target;
    setDeliveryMethod((prev) => {
      const updated = { ...prev, [name]: checked };
      if (name === "both") {
        updated.sms = checked;
        updated.email = checked;
      } else {
        updated.both = updated.sms && updated.email;
      }
      return updated;
    });
   
  };


  /*** api calls  */
  const handleSubmit = async (e) => {

    e.preventDefault();

    const validateFullName = validateFildWith50Length(fullName, "Patient Full Name");
    if(!validateFullName['isSuccess']) return toast.error(validateFullName['message'])

    const validatePhoneNumber = validateMobile(phone , "Phone Number");
    if(!validatePhoneNumber['isSuccess']) return toast.error(validatePhoneNumber['message'])

    const emailValidate = emailValidation(email);
    if(!emailValidate['isSuccess']) return toast.error(emailValidate['message']);

    if(!selectedDoctor)
      return toast.error("Referred Doctor is required")

    if(Object.keys(selectedDoctor).length == 0 && !selectedDoctor['value'] )
      return toast.error("Referred Doctor is required")
    
   

    if(!part.trim().length){
      return toast.error('Please select a Body Part')
    }
     
    if(!deliveryMethod.email && !deliveryMethod.sms && !deliveryMethod.both ){
      return toast.error("Please select Delivery Method")
    }

    const payload = {
      fullName : fullName.trim(),
      mobile : phone.trim(),
      email : email.trim(),
      doctorName : selectedDoctor.label,
      doctorId : selectedDoctor.value,
      bodyPart : part,
      deliveryMethod : deliveryMethod
    }

    try {
      setIsLoader(true)
      const response = await axios.post(`${API}/referral`, payload);
     
      if( response.status == 200){
        setIsLoader(false)
        return toast.success("Referral added successfully")
      }else{
        setIsLoader(false)
        let message = 'Something went wroung'
        if(response.data['message']){
          message = response.data.message
        }
        return toast.error(message)
      }
      
      // optionally reset or navigate
    } catch (err) {
       console.log(err)
       setIsLoader(false)
       return toast.error(err.message)
    }
  };


  // fetch body parts
  const fetchBodyParts = async() =>{
  
    let response = await axios.get(`${API}/body-part`);
    return response
  }

  useEffect(() =>{
    (async function(){
    
      let result = await fetchBodyParts();

      if( result.status == 200){
        let data = result.data.result;
        let bodyParts = data.map((part) => part.name)
        setBodyPartsOptions(bodyParts)
      }


    })()
  },[])

  // fetch doctors
  const fetchDoctors = async() =>{
    let response = await axios.get(`${API}/get-doctors`);
    return response
  }

  useEffect(() =>{
    (async function(){
      let result = await fetchDoctors();

      if( result.status == 200){
        if(result.data.length){
          let doctors = result.data.map((doc) =>{
            let obj = {}
            obj['label'] = doc.firstname + " " + doc.lastname;
            obj['value'] = doc._id
            return obj
          })

          setDoctorList(doctors)
        }
        
      }
     
    })()
  },[])

  return (<>

    {
      isLoader ? 
        <LoaderCircle/>
      :  <Card title="Referrals">

      <form className="space-y-4" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul className="text-red-600">
            {errors.map((e, i) => (
              <li key={i}>• {e}</li>
            ))}
          </ul>
        )}
       
        <div>
          <label className="block font-medium">Patient Full Name</label>
          <input
            name="fullName"
            value={fullName}
            onChange={handleChangeFullName}
            placeholder="Patient Full Name"
            className="form-control w-full py-2 border rounded"
            
          />
        </div>

        
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            name="phoneNumber"
            value={phone}
            onChange={handleChangePhoneNumber}
            placeholder="+911111111111"
            className="form-control w-full py-2 border rounded"
          />
        </div>


        <div>
          <label className="block font-medium">Email</label>
          <input
            name="email"
          
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
            className="form-control w-full py-2 border rounded"
            
          />
        </div>

        {/* Referred By */}
        <div>
          <label className="block font-medium">Referred By</label>
          <DropdownWithSearch options={doctorList} selectedValue={selectedDoctor} onSelect={setSelectedDoctor}/>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Body Parts</label>
          <DynamicDropdown options={bodyPartsOptions} onSelect={setPart}/>
        </div>

        <fieldset className="space-y-2">
          <label className="font-medium">Delivery Method</label>
          {Object.entries(deliveryMethod).map(([key, val]) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={key}
                checked={val}
                onChange={handleNotificationChange}
                className="w-7 h-7 border rounded "
              />
              <span className="capitalize w-40 py-1 flex justify-center border rounded-sm" style={{backgroundColor : "#F1EEEf"}}>{key}</span>
            </div>
          ))}
        </fieldset>
       
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white  rounded"
        >
          <b>Refer</b>
        </button>
      </form>
    </Card>
    }
  </>
   
  );
};

export default Referrals;
