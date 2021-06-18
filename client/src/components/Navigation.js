import React,{useState,useContext,useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState'
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'


export const Navigation = () => {
    let history = useHistory();
    const[searchText,setSearchText]=useState('');
    const{token,logout,posts,getSearchedPosts,getPosts,searchOn,users,user,loadUser}=useContext(GlobalContext);
    
    //console.log(user[0]._id)
    function logoutt(){
        history.push(`/users/login`);
        logout();
        
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(searchText+' is searched');
        getSearchedPosts(searchText);
        history.push(`/posts/searchedPosts`);

        setSearchText('');

    }
    function reloadPosts() {
        getPosts();
    }
    useEffect(()=>{
        if(token===null ){
            history.push('/users/login')
        }

        else {
            loadUser();
        };

    },[])
    /*const onSubmit=(e)=>{
        e.preventDefault();
        logout();
        history.push(`/users/login`);
    }*/
    //token: undefined;
    //console.log("this is from navigation "+ user )
    if(token===null||token === undefined){
    //if(user.length===0||user.includes("no token, authorization denied")||user.includes("user does not exist")|| user.includes("invalid credentials")){
    return (
        <Navbar bg="dark" variant="dark" className="mb-4 nav nav-tabs" expand="lg">
            <Navbar.Brand >MyBlog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/" className="mr-3" >Home</Link>
                <Link to="/about" className="mr-3" >About</Link>
                <Link to="/posts" className="mr-3" onClick={reloadPosts}>Posts</Link>
                <Link to={`/users/register`} className="mr-3">Register</Link>
                <Link to={`/users/login`}>Login</Link>


            </Nav>
            

            <form inline="true" onSubmit={onSubmit}>
                <input type="text" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button className="btn btn-success ml-2">Search</button>
            </form>
            </Navbar.Collapse>
       </Navbar>
    )
    }
    else{
        return(

            <>
            <Navbar bg="dark" variant="dark" className="mb-4" expand="lg">
            <Navbar.Brand >
                {console.log(users)}
                 <img src={`/uploads/${user[0].image_url}`} 
                style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"40px",maxWidth:"40px",borderRadius:"50%"}}
                /> 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="mr-3" >Home</Link>
                    <Link to="/about" className="mr-3" >About</Link>
                    <Link to="/posts" className="mr-3" onClick={reloadPosts}>Posts</Link>
                    <Link to={`/posts/create`} className="mr-3">Create Post</Link>
                    <Link to={`/users/dashboard`} className="mr-3">Dashboard</Link>
                    <Link onClick={logoutt}>Logout</Link>
                </Nav>
            
                <form inline="true" onSubmit={onSubmit}>
                <input type="text" placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                <button className="btn btn-success ml-2">Search</button>
            </form>
            
            </Navbar.Collapse>
       </Navbar>
    

       
            </>
       
        )
    }
}
