import React,{useState,useContext,useEffect, useReducer,useRef} from 'react'
import {GlobalContext} from '../context/GlobalState'
const ObjectID = require('mongodb').ObjectID


export const Reply = (props) => {

    const {addComment,user}=useContext(GlobalContext)
    const [reply,setReply]=useState('');
    //const[comment,setComment]=useState('');

    const onSubmit=(e)=>{
      e.preventDefault();
      const newComment={
        body:reply,
        pid:ObjectID(props.commentId),
        post_id:ObjectID(props.postId),
        commentor_id:ObjectID(user[0]._id)
    }

    
    //getComments();
    
    addComment(newComment);
    props.toggleHidden(props.index);
    
    
    //setNewComments(comment => [...comment, newComment]);
    
    setReply('');
   // history.push(`/posts/post/${props.match.params.id}`);

    }
    return (
        <div>
          <form onSubmit={onSubmit}>
            <textarea  value={reply} id="comment" cols="80" rows="2" placeholder=" Post reply..." onChange={(e)=>setReply(e.target.value)} required/>
            <button className="btn btn-primary" type="submit">post</button>
          </form>
        </div>
    )
}
