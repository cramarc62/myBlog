import React, {useRef,useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'

import { useHistory } from 'react-router-dom'

export const Login = () => {
    let history = useHistory();

    //const[post,setPost]=useState({});
    const [error,setError]=useState('Welcome to Login Page');
    //const[name,setName]=useState('');
    //const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const{user,checkUserexists,token,loadUser,msg,getsetmessage}=useContext(GlobalContext);
    
    //const[pposts,setpposts]=useState(posts)
    //const destinationPage=Math.floor(countPosts/3)+1
    //console.log(user)
    
   
console.log("first line ")

 function useFirstRender() {
    const firstRender = useRef(true);

    //console.log("inside custom hook start "+firstRender.current);
    //console.log(user);
    useEffect(() => {
        //console.log("inside useeffect "+firstRender.current)
        firstRender.current = false;
        //console.log(user);
        //console.log("inside useeffect end "+firstRender.current)
    }, []);
    //console.log("inside custom hook "+firstRender.current)

    return firstRender.current;
}
const firstRender = useFirstRender();
//console.log("inside main function  "+firstRender)
    const onSubmit=e=>{
        e.preventDefault();
        const tryingUser={
            //name,
            //userName,
            email,
            password
        }
        getsetmessage(" ");
        
        checkUserexists(tryingUser);

        
        
        //addNewUser()
        
        //console.log(user)
        
       // setName('');
        //setUserName('');
        setEmail('');
        setPassword('');
       // if(user===undefined||user.length===0){setError('try new email or username');history.push(`/users/register`)}
       // else {setError(''); history.push(`/users/register`)}
        
}
        function userhandler(){
            if(user.includes("user does not exist")|| user.includes("invalid credentials")){setError('Invalid Login Attempt. Try Again');user.length=0;history.push(`/users/login`)}
            else {setError(''); loadUser();history.push(`/users/dashboard`);}
        }
        
        useEffect(()=>{
            if(token === null ){
            //console.log(user);
            //console.log("this is first useeffect "+firstRender)
            //if(user===undefined||user.length===0)
           // if (!firstRender) {userhandler()};
            //userhandler();
            history.push(`/users/login`)
            }
            else {userhandler()}
        },[user])
    




    return (
        <div className="row">
            <div className='col-md-3'>
            </div>
            <form onSubmit={onSubmit} className="col-md-6">
                
                <p style={{color:"green"}}>{msg}</p>
                {error}
                

                <div className="form-group">
                    <label>Email</label>
                    <input value={email} type="email" className="form-control" id="email"  placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input value={password} type="password" className="form-control" id="password"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <br/>
                <br/>
                <div style={{margin:"auto" , width: "20%"}}>
                    <button className="btn btn-primary mr-auto"   >Login</button>
                </div> 
            </form>
            <div className='col-md-3'>
            </div>
        </div>
    )
}
