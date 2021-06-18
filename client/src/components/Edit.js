import React,{useState,useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {useHistory} from 'react-router-dom'

export const Edit = (props) => {

    let history=useHistory();
    const{posts,updatePost}=useContext(GlobalContext);
    const p= posts.filter(pst=>((pst._id)===(props.match.params.id)))
    //console.log(props.match.params.id)

    const [title,setTitle]=useState(p[0].title);
    const [body,setBody]=useState(p[0].post_body);

    const onSubmit=(e)=>{
        e.preventDefault();
        
        const newPost={
            _id:p[0]._id,
            title:title,
            post_body:body
        }
        console.log(newPost.title);
        console.log(newPost.post_body);
        console.log(newPost._id);
        updatePost(props.match.params.id,newPost);
        setBody('');
        setTitle('');
        //Redirect("/posts");
        //console.log(posts)
        history.push("/posts");
        


    }




    return (
        <div className="row">
            <form onSubmit={onSubmit} className="col-md-12">
                
                <div className="form-group">
                    <label >Post Title</label>
                    <input value={title} type="text" className="form-control" id="title"  placeholder="Title Of Your Post" onChange={(e)=>setTitle(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Post Body</label>
                    <textarea  value={body} className="form-control" id="body" cols="30" rows="8" placeholder="Post Content" onChange={(e)=>setBody(e.target.value)} required/>
                </div>
                
                <div className="col-md-6" >
                    <button className="btn btn-primary float-right" >Submit</button>
                </div> 
            </form>
        </div>
    )
}
