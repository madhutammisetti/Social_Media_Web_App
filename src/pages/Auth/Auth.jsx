import React from 'react';
import "./Auth.css";
import Logo from '../../img/instagram (1).png'
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { logIn, signUp } from '../../actions/AuthAction.js';

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)

  const [isSignUp, setIsSignUp] = useState(true);

  

  const [data, setData] = useState({firstname:"", lastname:"", username:"", password:"", confirmpass:""})

  const [confirmPass, setConfirmPass]= useState(true)

  const handleChange=(e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(isSignUp){
     data.password === data.confirmpass ? dispatch(signUp(data)): setConfirmPass(false);
    }else{
      dispatch(logIn(data))
    }
  }


  const resetForm=()=>{
    setConfirmPass(true);
    setData({
      firstname:"", lastname:"", username:"", password:"", confirmpass:""
    })
  }

  return (
    <div className='Auth'>
        {/* left Side */}
        <div className='a-left'>
            <img src={Logo} alt='logoimg'/>
            <div className='Webname'>
                <h1>WECLUS</h1>
                <h6>Try This New Social Media Platfrom..</h6>
            </div>
        </div>
        {/* Right Side  */}
        <div className='a-right'>
            <form action='' className='infoForm authForm' onSubmit={handleSubmit}>

                <h3>{isSignUp?"Sign Up":"Log In"}</h3>
               
                  {isSignUp &&  <div> <input className='infoInput' type="text" placeholder='First Name' name='firstname' onChange={handleChange} value={data.firstname} />
                    <input className='infoInput' type="text" placeholder='Last Name' name='lastname' onChange={handleChange}  value={data.lastname}/>
                </div>}
                    
                <div><input className='infoInput' type="text" placeholder='User Name' name='username' onChange={handleChange}  value={data.username}/></div>
                <div>
                    <input className='infoInput' type="password" placeholder='Password' name='password' onChange={handleChange}  value={data.password}/>
                    {isSignUp &&  (<input className='infoInput' type="password" placeholder='Confirm Password' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>)}   
                </div>
                  <span style={{display: confirmPass? "none":"block", color:"red", fontSize:"12px", alignSelf:"flex-end", marginRight:"5px"}}>
                    * Passwords are not same !
                  </span>
                <div>
                    <span style={{fontSize:"12px", cursor:"pointer"}} onClick = {()=>{setIsSignUp((prev)=>!prev); resetForm()}} >
                    {isSignUp?"Already Have An Account. Login":"Don't Have Account? Sign Up!!"}</span>
                </div>
                <button className='button infoButton' type='submit' disabled={loading}>
                {loading ? "Loading..." :  isSignUp ? "SignUp" : "LogIn"}
                </button>
            </form>
        </div>
    </div>
  )
}




export default Auth