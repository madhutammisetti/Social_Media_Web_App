import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import User from '../User/User';
import { getAllUser } from '../../api/UserRequest';
import{useSelector} from "react-redux";

const FollowersCard = () => {
   const [persons, setPersons] = useState([])
   const {user} = useSelector((state)=>state.authReducer.authData)

  useEffect(()=>{
    const fetchPersons = async()=>{
      const {data} = await getAllUser();
      setPersons(data)
      console.log(data)
    };
    fetchPersons()
  },[]);
  return (
    <div className='FollowersCard'>
        <h3>People You May Know</h3>
        {persons.map((person, id)=>{
          if(person._id !== user._id){
            return (
               <User person={person} key={id}/>
            )
          }            
        })}
    </div>
  )
}

export default FollowersCard