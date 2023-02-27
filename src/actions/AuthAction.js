import  * as AuthApi from '../api/AuthRequest.js'

export const logIn = (formData)=>async(dispatch)=>{
    dispatch({type: "AUTH_START"})
    try{
        const {data} = await AuthApi.logIn(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    }catch(err){
        console.log(err)
        dispatch({type: "AUTH_FAIL"})
    }
    
}

export const signUp = (formData)=>async(dispatch)=>{
    dispatch({type: "AUTH_START"})
    try{
        const {data} = await AuthApi.signUp(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
    }catch(error){
        console.log(error)
        dispatch({type: "AUTH_FAIL"})
    }
    
}

export const logout = ()=> async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
  }