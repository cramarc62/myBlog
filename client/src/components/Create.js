import React, {useState,useContext,useEffect}from 'react'
import {GlobalContext} from '../context/GlobalState'
import {Form} from 'react-bootstrap'
import {nanoid} from 'nanoid'
import { Redirect,useHistory } from 'react-router-dom'
//import { getPosts } from '../../../controller/posts_controller'
export const Create = () => {
    let history = useHistory();

    //const[post,setPost]=useState({});
    const[file,setFile]=useState('error.jpg');
    const[fileName,setFileName]=useState('')
    const[title,setTitle]=useState('');
    const[body,setBody]=useState('');
    const[category,setCategory]=useState('');

    const{posts,addPost,getPosts,user,token}=useContext(GlobalContext);
    
    
    //const[pposts,setpposts]=useState(posts)
    const countPosts=posts.length;
    const destinationPage=Math.floor(countPosts/6)+1

    useEffect(() => {
        if(token === null ){
            history.push(`/posts`)
        }
    },[])

    const onSubmit=(e)=>{
        e.preventDefault();
        //console.log(file)
        const formData=new FormData();
        formData.append("title",title);
        formData.append("post_body",body);
        formData.append("category",category);
        formData.append("creator_id",user[0]._id);
        formData.append("post_image",file);

        /*const newPost={
           // _id:nanoid(),
            title:title,
            post_body:body,
            creator_id:user[0]._id,
            formData
        }*/
        addPost(formData);
        //console.log(posts);
        setBody('');
        setTitle('');
        setCategory('');
        //getPosts();
        //Redirect("/posts");
        //console.log(posts)
        history.push(`/posts/${destinationPage}`)
}

    return (
        
        <div className="row">
            <form onSubmit={onSubmit} className="col-md-12" encType="multipart/form-data" >
                
                <div className="form-group">
                    <label >Post Title</label>
                    <input value={title} type="text" className="form-control" id="title"  placeholder="Title Of Your Post" onChange={(e)=>setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Post Body</label>
                    <textarea  value={body} className="form-control" id="body" cols="30" rows="8" placeholder="Post Content" onChange={(e)=>setBody(e.target.value)} required/>
                </div>
                
                 
            
                <div className="form-group">
                    <input type="file" name="customFile" id="imageFile" onChange={(e)=>{setFile(e.target.files[0]);setFileName(e.target.files[0].name)}}style={{color:"blue"}} />
                    
                </div>
                {/* <input type="submit"/> */}
                <div className="form-group">
                    <label >Select Category</label>
                        <select className="form-control" id="exampleFormControlSelect1" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                            <option>Business</option>
                            <option>Entertainment</option>
                            <option>Education</option>
                            <option>Sports</option>
                            <option>Religion</option>
                            <option>Politics</option>
                            <option>Others</option>
                    </select>
                </div>
                <div className="col-md-6" >
                    <button className="btn btn-primary float-right" >Submit</button>
                </div>
            </form>
            
        </div>

      
    )
}
