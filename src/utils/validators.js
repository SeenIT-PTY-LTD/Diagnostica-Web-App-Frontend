export const emailValidation = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(email.trim().length == 0){
    
        return { isSuccess : false , message : "Email is required" }
    }
    
    if(!regex.test(email)){
        return { isSuccess : false , message : "Enter a valid email address" }
    }

    return { isSuccess : true }

}

export const validateFildWith50Length = ( value, fildName ) =>{
  
   
    if(value.trim().length == 0) {
        return { isSuccess : false , message :  `${fildName} is required`}
    }
    
    if(value.trim().length > 50){
        return { isSuccess : false , message : `${fildName} must be less than 50 characters` }
    }

    return { isSuccess : true }

}


export const validateMobile = (mobile, fildName) => {

    if(mobile.trim().length == 0) return { isSuccess : false , message : `${fildName} is required` }

    if(!(/^\+\d{1,4}\d{10,12}$/.test(mobile))) return { isSuccess : false , message : `Enter  a valid ${fildName}` }
    

    return { isSuccess : true}
}