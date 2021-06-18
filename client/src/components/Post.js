import React,{useState,useContext,useEffect} from 'react';
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState';

export  const Post = (props) => {

    const{getUsers,users}=useContext(GlobalContext);
    useEffect(()=>{
        getUsers()
    },[])

    function username(id){
        const user=users.filter(user=>(
            user._id === id
                 
         ))
         console.log(user)
         return user[0].name

    }
    if(users.length === 0) return(<div>LOADING DATA.....</div>)
    //  <Link to={`/posts/post/${props.post._id}`}>
    return (
        <div >
            <div className="card border-info m-3" > 
            {(props.post.image_url === null || props.post.image_url === undefined)?
            <img src="/uploads/error.jpg" className="card-img" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"600px"}}/>:
            <img src={`/uploads/${props.post.image_url}`} className="card-img" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"200px",maxWidth:"600px"}} />            
            }
            <div className="card-img-overlay"  style={{display:"flex",flexDirection: "column",justifyContent:"space-between"}}>
            <Link to={`/posts/post/${props.post._id}`} style={{textAlign:"center"}}>{props.post.title}</Link>
                    <div className="card-body">
                        <div className="card-text" style={{textDecorationColor:"yellow"}}>{props.post.post_body.length>180 ? props.post.post_body.substring(0, 80)+"...":props.post.post_body}</div>
                        {/* <div className="card-text">{props.post.comments}</div><br/> */}
                        
                    </div>
                    {/* <div className="card-footer" style={{textAlign:"center"}}>Footer</div> */}
                    <div style={{margin:"auto"}}>posted by <Link to={`/posts/post/${props.post._id}`} ><i>{username(props.post.creator_id)}</i></Link> in <Link to={`/posts/category/${props.post.category}/1`}>{props.post.category}</Link> category 
            </div></div>
            </div> 
        </div>
        
    )
}



//overFlow: "hidden",textOverflow: "ellipsis",display:"box",lineClamp: "2", boxOrient:"vertical
