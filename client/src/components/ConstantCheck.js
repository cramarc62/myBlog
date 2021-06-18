import React, {useState,useEffect,useContext} from 'react';
//import {Index} from './components/Index'
import {GlobalContext} from '../context/GlobalState'

export const ConstantCheck = () => {
  const{user,checkUserexists,token,loadUser}=useContext(GlobalContext);
    
  console.log(user);
  console.log("this is is inside constatnt check loaduser ");
  //console.log(loadUser().config);
  useEffect(()=>{
      loadUser();
  },[])
  //console.log("this is current user after loaduser"+user);
  return (
      <div>
         
      </div>
  )
}




