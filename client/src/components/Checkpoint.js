import React, {useRef,useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'
import { Dashboard} from './Dashboard'
import { Posts} from './Posts'
import {Link} from 'react-router-dom'


import { useHistory } from 'react-router-dom'

export const Checkpoint = (props) => {

    const whichComp= props.compname

    let history= useHistory();
    
    const {token}=useContext(GlobalContext);
    
    if(token === null){
        return(
            <>
                {history.push('/users/login')}
            </>
        )
    }
    else{
        switch (whichComp) {
            case "dashboard":
                return (
                    <>
                        <Dashboard />
                    </>
                )
        
            default:
                return (
                    <>
                        <Posts />
                    </>
                )
        }
    }
    
}
