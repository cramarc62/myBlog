import React,{useState,useContext,useEffect, useReducer,useRef} from 'react'
import {GlobalContext} from '../context/GlobalState'
import {useHistory,Link } from 'react-router-dom'
import {Reply} from './Reply'
import {CommentTree} from './CommentTree'
import { set } from 'mongoose'
const ObjectID = require('mongodb').ObjectID


export const ViewPost = (props)=> {
    //const [thisPost,setthisPost]=useState({});
    let history = useHistory();
    const[comment,setComment]=useState('');
    const {posts,comments,deletePost,getPosts,addComment,getComments,getSinglePost,token,user}=useContext(GlobalContext)
    
    let flagArray=[comments.length];
    let commentidArray=[comments.length];
    for(let i=0;i<comments.length;i++){
        flagArray[i]=false;
        commentidArray[i]=comments[i]._id

        //commentsShowarray[i]=comments[i];
    }
     
    console.log(flagArray)
    const[isHidden,setIsHidden]=useState(flagArray);
    console.log(isHidden);

    const toggleHidden =(index)=> {
    let comcount = [...isHidden];
    console.log (comcount)
    comcount[index] = !isHidden[index]
    setIsHidden(comcount);
    console.log(isHidden)
};

     //console.log(comments);
    let pixel=20;

    function pidfinder(comment){
        if(comments[comments.findIndex(x=>x._id===comment.pid)].pid === null)
        {
        pixel=20;
        return <CommentTree comment={comment} pixel={pixel} />
        
        }
        else{
        
        pidfinder(comments[comments.findIndex(x=>x._id===comment.pid)]);
        pixel=pixel+20;
        return <CommentTree comment={comment} pixel={pixel} />
        
        }
    }

    function ordercomments(){
        comments.map(comment=>{
        if(comment.pid !== null){
           
           let ssa=commentidArray.indexOf(comment.pid);
           //console.log(ssa);
           //console.log(comments.indexOf(comment));
           let copycomment=comment;
           for(let i=comments.indexOf(comment);i>ssa;i--){
               comments[i]=comments[i-1];
               commentidArray[i]=commentidArray[i-1];
                if(comments[i-1].pid===comment.pid){
                    ssa=i-1;
                    break;
                 }
         }
           comments[ssa+1]=copycomment;
           commentidArray[ssa+1]=comment._id;
           //console.log(testComments.findIndex(x=>x._id === comment.pid));

       }
       
    })
}
    // for(let i=0;i<comments.length;i++){
    // console.log(comments[i]);
    // //console.log(commentidArray[i]);
    // //commentsShowarray[i]=comments[i];
    // }
    // console.log(typeof(props.match.params.id))
    // function useFirstRender() {
    //     const firstRender = useRef(true);
    
    //     //console.log("inside custom hook start "+firstRender.current);
    //     //console.log(user);
    //     useEffect(() => {
    //         //console.log("inside useeffect "+firstRender.current)
    //         firstRender.current = false;
    //         //console.log(user);
    //         //console.log("inside useeffect end "+firstRender.current)
    //     }, []);
    //     //console.log("inside custom hook "+firstRender.current)
    
    //     return firstRender.current;
    // }
    //const firstRender = useFirstRender();
    
    
    const onSubmit=(e)=>{
        e.preventDefault();
        const newComment={
            body:comment,
            post_id:ObjectID(props.match.params.id),
            commentor_id:ObjectID(user[0]._id)
        }
        
        addComment(newComment);
        setComment('');


    }
    useEffect(()=>{
       // ordercomments();
        getSinglePost(props.match.params.id);
        
 
     },[])

    if(posts.length===0)return (<div> <h1>Loading data...</h1> </div>)

    else if(token === null){
        return(
        <>
        <div style={{marginBottom:"150px"}}>
                <div className="container-fluid">
                            <div>
                                
                            <div className="col-md-6">
                            {(posts[0].image_url === null || posts[0].image_url === undefined)?
                            <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}}/>:
                            <img src={`/uploads/${posts[0].image_url}`} className="img-fluid float-left mr-5 mb-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}} />            
                            } 
                                    {/* <img src={`/uploads/${posts[0].image_url}`}  */}
                                    {/* className="img-fluid float-left mr-5 mb-3"  */}
                                    {/* style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}} alt="" */}
                                    {/* /> */}
                            </div>
                                
                            <div className="col-md-12">
                                <h1>{posts[0].title}</h1>
                                <p>
                                {posts[0].post_body}
                                </p>
                            </div>
                            
                            </div>

                            
                </div>
            </div>

            <br/>
            <br/> 


        <div className="card">
        <ul className="card-body">
        {comments.map(comment=>(
            <li key={comment._id}> 
            {comment.body} 
            </li>
        ))} 
        </ul>     
        
        </div>
        </>
        )
    }
    else if(posts[0].creator_id !== user[0]._id){
        return(
        <>
        <div style={{marginBottom:"150px"}}>
                <div className="container-fluid">
                            <div>
                                
                            <div className="col-md-6">
                                     
                                    {(posts[0].image_url === null || posts[0].image_url === undefined)?
                                    <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}}/>:
                                    <img src={`/uploads/${posts[0].image_url}`} className="img-fluid float-left mr-5 mb-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}} />            
                                    } 
                            </div>
                                
                            <div className="col-md-12">
                                <h1>{posts[0].title}</h1>
                                <p>
                                {posts[0].post_body}
                                </p>
                            </div>
                            
                            </div>

                            
                </div>
                

            <br/>
            <br/>
        
        </div> 


        <div className="card">
        <ul className="card-body">
        {comments.map(comment=>(
            <li key={comment._id}> 
            {
                /* eslint-disable no-unused-expressions */
            comment.pid ? pidfinder(comment):comment.body
            }
             
                         <button className="btn btn-primary float-right ml-3" >Like</button>
                         <button className="btn btn-success float-right" onClick={()=>{console.log(comments.indexOf(comment));toggleHidden(comments.indexOf(comment))}}>Reply</button>
                        {isHidden[comments.indexOf(comment)] ?<Reply  postId={props.match.params.id} commentId={comment._id}toggleHidden={toggleHidden} index={comments.indexOf(comment)}/>:null}
            
                    <br/><br/>
             </li>
        ))} 
        </ul>     
        
        </div>
        <div className="mt-8"> 
        <form onSubmit={onSubmit} className="col-md-12">
                
                <div className="form-group">
                    <label>Post A Comment</label>
                    <textarea  value={comment} className="form-control" id="comment" cols="30" rows="5" placeholder="Comment Content..." onChange={(e)=>setComment(e.target.value)} required/>
                </div>
                
                <div className="col-md-6" >
                    <button className="btn btn-primary float-right" >Submit</button>
                </div> 
            </form>
        </div>

        
        </>
        )
    }
    
    else{
    return (
        <>
            {/* <div className="card">  */}
            {/* <h2 className="card-header">{posts[0].title} </h2> */}
            {/* <img class="card-img-top float-right" src={`/uploads/${posts[0].image_url}`}  alt=""style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}}></img> */}
                {/* <div className="card-body"> */}
                    {/* <div className="card-text">{posts[0].post_body}</div> */}
                    {/* <img src={require(`${posts[0].image_url}`)} alt=" " /> */}
                    {/* <img src={`/uploads/${posts[0].image_url}`} onerror="this.onerror=null; this.src='/uploads/tumpaksewuindonesia.jpg'" alt="" style={{display:"block", width: "100%" , height:"auto" }}/> */}
                {/* </div> */}
                
               <div style={{marginBottom:"150px"}}>
                <div className="container-fluid">
                            <div>
                                
                            <div className="col-md-6">
                                     
                                    {/* {(posts[0].image_url === null || posts[0].image_url === undefined)? */}
                                     {/* <img src="/uploads/error.jpg" className="img-fluid float-left mr-5 mb-3" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}}/>: */}
                                     {/* <img src={`/uploads/${posts[0].image_url}`} className="card-img" alt=" " style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}} />             */}
                                     {/* }  */}
                                     <img src={`/uploads/${posts[0].image_url}`} 
                                      className="img-fluid float-left mr-5 mb-3"  
                                     style={{width:"100%",height:"100%",objectFit:"cover",overflow:"hidden",maxHeight:"400px",maxWidth:"400px"}} alt="" 
                                     /> 
                            </div>
                                
                            <div className="col-md-12">
                                <h1>{posts[0].title}</h1>
                                <p>
                                {posts[0].post_body}
                                </p>
                            </div>
                            
                            </div>

                            
                </div>
                

            <br/>
            <br/>
            {/* width:"100%",height:"100%",object-fit:"cover",overflow:"hidden" */}
        </div>
            
        {/* </div>  */}
        <div className="container mt-5">
        <Link to={`/posts/edit/${props.match.params.id}`}><button className="btn btn-primary" /*onClick={()=>editPost(props.match.params.id)}*/>Edit</button></Link>
        <button className="btn btn-danger float-right" onClick={() =>{deletePost(props.match.params.id);history.push("/home")}}>Delete</button>
        <br/>
        <br/>
        
        {console.log(comments)}
    
        <div className="card">
           <ul className="card-body">
            {comments.map(comment=>(
               <li key={comment._id}> {comment.body} 
                    
                    <div>
                        <button className="btn btn-primary float-right ml-3" >Like</button>
                        <button className="btn btn-success float-right" onClick={()=>(toggleHidden(comments.indexOf(comment)))}>Reply</button>
                    
                        {/* {console.log(isHidden)} */}
                        {isHidden[comments.indexOf(comment)] ?<Reply postId={props.match.params.id} commentId={comment._id} toggleHidden={toggleHidden} index={comments.indexOf(comment)}/>:null}
                    </div>
                    <br/><br/>
                
               </li>
            ))} 
            
           </ul>     
            
        </div>
        </div>




        <div className="mt-8"> 
        <form onSubmit={onSubmit} className="col-md-12">
                
                <div className="form-group">
                    <label>Post A Comment</label>
                    <textarea  value={comment} className="form-control" id="comment" cols="30" rows="5" placeholder="Comment Content..." onChange={(e)=>setComment(e.target.value)} required/>
                </div>
                
                <div className="col-md-6" >
                    <button className="btn btn-primary float-right" >Submit</button>
                </div> 
            </form>
        </div>
        </>
        
    )
}
//}
}
