import React, {useRef,useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'
import { Dashboardcomp} from './Dashboardcomp'
import {Link} from 'react-router-dom'


import { useHistory } from 'react-router-dom'

const ObjectID = require('mongodb').ObjectID

export const Dashboard = () => {
    
    let history= useHistory();
    const {token,user,getPosts,loadUser,posts,deletePost,updateUser}=useContext(GlobalContext);
    const [profile,setProfile]=useState(true);
    const [editProfile,setEditProfile]=useState(false);
    const[file,setFile]=useState('error.jpg');
    const[filePreview,setFilePreview]=useState('error.jpg');
    const[fileName,setFileName]=useState('Update Profile Photo');
    console.log(file);
    console.log(filePreview);
    
    
   /* const[name,setName]=useState((user.length === 0 ? " ":user[0].name));
    const[userName,setUserName]=useState((user.length === 0 ? " ":user[0].userName));
    const[email,setEmail]=useState((user.length === 0 ? " ":user[0].email));
    const[password,setPassword]=useState('');
    console.log(name,userName,email)*/
    
    /*const[name,setName]=useState('');
    const[userName,setUserName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');*/
    
    /*if(token===null ){
        history.push('/users/login');
    }*/
    
    const[name,setName]=useState(JSON.parse(localStorage.getItem('user')).name);
    const[userName,setUserName]=useState(JSON.parse(localStorage.getItem('user')).userName);
    const[email,setEmail]=useState(JSON.parse(localStorage.getItem('user')).email);
    const[password,setPassword]=useState('');
    
    
    const onSubmit=e=>{
        e.preventDefault();
        const formData=new FormData();
        if(password === ""){
            formData.append("user_id",user[0]._id);
            formData.append("name",name);
            formData.append("userName",userName);
            formData.append("email",email);
            formData.append("password"," ");
            formData.append("profile_image",file);
            updateUser(formData);
            history.push(`/users/dashboard`)
        }
        else{
            formData.append("user_id",user[0]._id);
            formData.append("name",name);
            formData.append("userName",userName);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("profile_image",file);
            updateUser(formData);
            history.push(`/users/dashboard`)
        }
        

        

        setName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setEditProfile(false);
        
}


    

    useEffect(()=>{
        if(token===null ){
            history.push('/users/login')
        }

        else {
            loadUser();
            getPosts();
            setProfile(true);
            /*setName(JSON.parse(localStorage.getItem('user')).name )  
            setUserName(JSON.parse(localStorage.getItem('user')).userName) 
            setEmail(JSON.parse(localStorage.getItem('user')).email) */
            

        };

    },[])

   
    if(user.length === 0){
        {loadUser()};
        return (
        <div>
            Loading...
        </div>
        ) 
    }
    else if(editProfile && !profile){
        

        return(
            <>
                {/* <div style={{margin:"auto", width:"20%"}}> */}
               {/* <button className="btn btn-primary mr-3" disabled>profile</button> */}
                {/* <h3>Welcome {user[0].name}</h3><br/> */}
                   
                  {console.log(user[0])}
                {/* </div> */}
                <div class="container">
                        <div class="row my-2 hocus">
                            <div class="col-lg-8 order-lg-2 col-xl-12">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a href="" onClick={(e)=>{e.preventDefault();setProfile(true);setEditProfile(false)}}  class="nav-link">Profile</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" onClick={(e)=>{e.preventDefault();setProfile(false);setEditProfile(false)}}   class="nav-link">Posts</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" class="nav-link active">Edit Profile</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-md-3'>
                              {fileName!=="Update Profile Photo" ?
                              <img src={filePreview} className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px",borderRadius:"50%"}}/>:
                              <img src={`/uploads/${user[0].image_url}`} className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px",borderRadius:"50%"}}/>
                              }
                              {/* <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px"}}/> */}
                              <form onSubmit={onSubmit} className="col-md-12" encType="multipart/form-data" >
                                <div className="form-group" >
                                    <label htmlFor="imageFile" className="btn" style={{borderBlockColor:"green"}} >{fileName}</label>
                                    <input type="file" name="customFile" id="imageFile" className="inputFile" onChange={(e)=>{setFilePreview(URL.createObjectURL(e.target.files[0]));setFile(e.target.files[0]);setFileName(e.target.files[0].name)}}style={{color:"blue",display:"none"}} />
                                </div>
                               </form>
                            </div>
                            
                            <form onSubmit={onSubmit} className="col-md-6">
                                {/* {error} */}
                                
                                <div className="form-group">
                                    <label >Name</label>
                                    <input value={name} type="text"  className="form-control" id="name"  placeholder="Name" onChange={(e)=>setName(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input value={userName} type="text"  className="form-control" id="username"  placeholder="Username" onChange={(e)=>setUserName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} type="email"  className="form-control" id="email"  placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} type="password"  className="form-control" id="password"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)}  />
                                </div>
                                <br/>
                                <br/>
                                <div style={{margin:"auto" , width: "20%"}}>
                                    <button className="btn btn-primary"  >Update</button>
                                </div> 
                            </form>
                            <div className='col-md-3'>
                            </div>
                        </div>
                </div>
                {/* <button className="btn btn-primary" onClick={()=>{setProfile(false)}} >posts</button> */}


            </>
            )

    }


    else if(profile && !editProfile){
        return(
            <>
                {/* <div style={{margin:"auto", width:"20%"}}> */}
               {/* <button className="btn btn-primary mr-3" disabled>profile</button> */}
                {/* <h3>Welcome {user[0].name}</h3><br/> */}
                   
                  
                {/* </div> */}
                <div class="container">
                        <div class="row my-2">
                            <div class="col-lg-8 order-lg-2 col-xl-12">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a href="" class="nav-link active">Profile</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" onClick={(e)=>{e.preventDefault();setProfile(false);setEditProfile(false)}}   class="nav-link">Posts</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" onClick={(e)=>{e.preventDefault();setProfile(false);setEditProfile(true)}}  class="nav-link">Edit Profile</a>
                                    </li>
                                </ul>
                                {/* <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px",borderRadius:"50%"}}/> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-md-3'>
                              <img src={`/uploads/${user[0].image_url}`} className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px",borderRadius:"50%"}}/>
                            </div>
                            <div className="card">
                            {/* <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3 mt-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"200px",borderRadius:"50%"}}/> */}
                                <h1>{user[0].name}</h1>
                                <p class="title">CEO & Founder, Example</p>
                                <p>Harvard University</p>
                                <div style={{margin: "24px 0"}}>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>&nbsp;&nbsp; 
                                    <a href="#"><i className="fa fa-twitter"></i></a>&nbsp;&nbsp;  
                                    <a href="#"><i className="fa fa-linkedin"></i></a>&nbsp;&nbsp;  
                                    <a href="#"><i className="fa fa-facebook"></i></a> 
                                </div>
                                <p><button>Contact</button></p>
                            </div>
                            
                            <div className='col-md-3'>
                            </div>
                        </div>

                </div>
                {/* <button className="btn btn-primary" onClick={()=>{setProfile(false)}} >posts</button> */}


            </>
            )
    }

    else{
        return (
        <div>
            {/* <div style={{margin:"auto", width:"20%"}}> */}
                {/* <h3 >Welcome {user[0].name}</h3><br/> */}
                {/* <button className="btn btn-primary mr-3" onClick={()=>{setProfile(true)}}>profile</button> */}
                {/* <button className="btn btn-primary" disabled>posts</button> */}
            {/* </div> */}

            
            {/* <p style={{textAlign: "center"}}>Whenever you post on forum, your posts will appear below. You can edit or delete your posts from here.</p> */}
            <div class="container">
                        <div class="row my-2">
                            <div class="col-lg-8 order-lg-2 col-xl-12">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a href="" onClick={(e)=>{e.preventDefault();setProfile(true);}} class="nav-link">Profile</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="" class="nav-link active">Posts</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href=""  onClick={(e)=>{e.preventDefault();setEditProfile(true);}} class="nav-link">Edit Profile</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div>

            
            <table className="tableStyle">
                <tbody>
                
            {posts.map(post=>((post.creator_id === user[0]._id)?
                <tr>
                <td><Dashboardcomp key={post._id} postId={post._id} postTitle={post.title}/> </td>
                <td className="editButton"> <Link to={`/posts/edit/${post._id}`} ><button className="btn btn-primary float-right" >Edit</button></Link> </td>
                
                <td> <button className="btn btn-danger" onClick={() =>{deletePost(post._id);history.push("/users/dashboard")}}>Delete</button> </td>
                </tr>
                    
            
             :<></>
           
                //if(post.creator_id === user[0]._id){
                     //<Dashboardcomp key={post._id} postTitle={post.title}/>
                //}
                
            
            ))}
            </tbody>

            


            </table>
            
        </div>
        )
    }
}
