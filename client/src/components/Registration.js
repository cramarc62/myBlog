import React, {useRef,useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'

import { useHistory } from 'react-router-dom'

export const Registration = () => {
    let history = useHistory();

    //const[post,setPost]=useState({});
    const [error,setError]=useState('Welcome to Registration Page');
    const[name,setName]=useState('');
    const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const{addUser,user,loadUser,msg,getsetmessage}=useContext(GlobalContext);
    
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
        const newUser={
            name,
            userName,
            email,
            password
        }
        
        
         addUser(newUser);
        //addNewUser()
        
        //console.log(user)
        
        setName('');
        setUserName('');
        setEmail('');
        setPassword('');
       // if(user===undefined||user.length===0){setError('try new email or username');history.push(`/users/register`)}
       // else {setError(''); history.push(`/users/register`)}
        
}
        function userhandler(){
            if(user.includes("username,email exists")){setError('this email or username already in use.Try new email or username');user.length=0;history.push(`/users/register`)}
            else {setError('');getsetmessage("Registration is successful");user.length=0;history.push(`/users/login`)}
        }
        
        useEffect(()=>{
            console.log(user);
            if(user.length === 0) {
                history.push(`/users/register`)
            }
            //console.log("this is first useeffect "+firstRender)
            //if(user===undefined||user.length===0)
            else {userhandler()};
        },[user])




    return (
        <div className="row">
            <div className='col-md-3'>
            </div>
            <form onSubmit={onSubmit} className="col-md-6">
                {error}
                
                <div className="form-group">
                    <label >Name</label>
                    <input value={name} type="text" className="form-control" id="name"  placeholder="Name" onChange={(e)=>setName(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input value={userName} type="text" className="form-control" id="username"  placeholder="Username" onChange={(e)=>setUserName(e.target.value)} required />
                </div>
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
                    <button className="btn btn-primary"   >Register</button>
                </div> 
            </form>
            <div className='col-md-3'>
            </div>
        </div>
    )
}
