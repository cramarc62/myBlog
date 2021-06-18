import React, {useRef,useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'

export const About = () => {
    const{user,checkUserexists,token,loadUser}=useContext(GlobalContext);
    
    console.log("this is current user "+user);
    console.log("this is is inside loaduser ");
    useEffect(()=>{
        loadUser();
    },[])
    //console.log("this is current user after loaduser"+user);
    return (
        <div>
            <h1>this is about page</h1>
        </div>
    )
}
