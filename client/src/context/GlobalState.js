import React ,{useState,useEffect,createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import AuthReducer from './AuthReducer'
import {nanoid} from 'nanoid'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
const ObjectID = require('mongodb').ObjectID

const initialState={
    posts:[],
    comments:[],
    //commentcount:[],
    user:[],
    token:localStorage.getItem("token"),
    //token:" "
    users:[],
    msg:" ",
    searchOn:false

};



export const GlobalContext= createContext(initialState);

export const GlobalProvider =({children})=>{
    
    const[state,dispatch]=useReducer(AppReducer,initialState);
    //const[state,dispatch]= useReducer(AuthReducer,initialState2)

    async function addUser(newUser){
        try {
            //console.log(state.user)
            //console.log(newUser);
            const userr= await axios.post("/users/register",newUser)
            if(userr.data.data === "username,email exists"){
                dispatch({
                    type:'ADD_USER_ERROR',
                    payload:userr.data.data 
            })
            }
            else{
            dispatch({
                type:"ADD_USER",
               // payload1:userr.data.data,
                //payload2:userr.data.token
            })
        }
            //console.log(userr);
        } catch (error) {
            dispatch({
                type:'ADD_USER_ERROR',
                payload:error.data
        })
        }
    }
    async function checkUserexists(tryingUser){//login
        try {
            //console.log(state.user)
            //console.log(newUser);
            /* check if user already logged in*/
            

            const userr= await axios.post("/users/login",tryingUser)
            //if(userr.data.token)localStorage.setItem("token", JSON.stringify(userr.data.token));


            dispatch({
                type:"LOGIN_USER",
                payload1:userr.data.data,
                payload2:userr.data.token
            })
            //console.log(userr);
        } catch (error) {
            dispatch({
                type:'LOGIN_USER_ERROR',
                payload:error.data
        })
        }
    }

    async function updateUser(upUser){
        try {
            //console.log(state.user)
            console.log(...upUser);
            console.log(upUser.get('profile_image'));
            //loadUser();
            //const newPost= await axios.post('/posts',post,config);

            //console.log(upUser);
            const user=  await axios.post("/updateUser",upUser);
            console.log("updated user");
            console.log(user.data.data);
            //localStorage.setItem("user", JSON.stringify(user.data.data))


          /*  if(user.data.data === "username,email exists"){
                dispatch({
                    type:'ADD_USER_ERROR',
                    payload:userr.data.data 
            })
            }
            else{
            dispatch({
                type:"ADD_USER",
               // payload1:userr.data.data,
                //payload2:userr.data.token
            })
        }*/
            //console.log(userr);
        } catch (error) {
           /* dispatch({
                type:'ADD_USER_ERROR',
                payload:error.data
        })*/
        }
    }
    function makeheader(token){
        const config={
            headers:{}
        }
        config.headers['x-auth-token']=token;   
        return config; 
    }
    async function loadUser(){
        const token =state.token;
        //console.log ("inside globalstate loaduser "+ token)
        if(token === null )
        {
            dispatch({
                type:"USER_LOADING_ERROR"
            })
        }
        
        
        else{
        const config= makeheader(token);
        const currentUser= await axios.get('/users/user',config);
            if(currentUser.data.data === "invalid token")
            {
                dispatch({
                    type:"USER_LOADING_ERROR"
                })
            }
        //console.log(currentUser.data.data);
            else{
                dispatch({
                    type:"USER_LOADED",
                    payload:currentUser.data.data
        
                })
            }
         
    
    }

        /*
        let token=localStorage.getItem("token");
        if(token===null)
        {
             localStorage.setItem("token"," ");
             token=" ";
        }
        const tokenResult= await axios.post("/users/tokenIsValid",null,{headers: {'x-auth-token': token}})
        if(tokenResult.data){
            const currentUser= await axios.get('/users/user',{headers: {'x-auth-token': token}});
            console.log ("inside globalstate loaduser "+currentUser.data.data + "token" +token)
        }
        */
        
    }
    async function getUsers(){
        //const post_creator_name= await axios.get("/users/allUsers");
        try {
            const allUsers= await axios.get("/users/allUsers");
            console.log(allUsers.data.data)
            dispatch({
                type:"GET_USERS",
                payload:allUsers.data.data
            })
            //console.log(currentPosts)
            
        } catch (error) {
            dispatch({
                type:'USER_FETCH_ERROR',
                payload:"ERROR FETCHING USERS"
        })
        
    }

    }

     function logout(){
        dispatch({
            type:"LOGOUT_SUCCESS",
            //payload:user
        })
    }

    async function getPosts(){
        try {
            const currentPosts= await axios.get("/posts");
            dispatch({
                type:"GET_POSTS",
                payload:currentPosts.data.data
            })
            //console.log(currentPosts)
            
        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA1"
        })
        
    }
}
    async  function getSinglePost(id){
        try {
            console.log('this from globalstate1 '+id);
            const singlePost= await axios.get(`/posts/post/${id}`);
            console.log(singlePost.data.data)
            const {testComments,_id}=singlePost.data.data;
            console.log(typeof(_id))
            console.log(testComments);
            //state.comments=[...testComments]
            let commentidArray=[testComments.length];
            for(let i=0;i<testComments.length;i++){
            commentidArray[i]=testComments[i]._id
            }
            testComments.map(comment=>{
                if(comment.pid !== null){
                   
                   let ssa=commentidArray.indexOf(comment.pid);
                   //console.log(ssa);
                   //console.log(testComments.indexOf(comment));
                   let copycomment=comment;
                   for(let i=testComments.indexOf(comment);i>ssa;i--){
                       testComments[i]=testComments[i-1];
                       commentidArray[i]=commentidArray[i-1];
                        if(testComments[i-1].pid===comment.pid){
                            ssa=i-1;
                            break;
                         }
                 }
                   testComments[ssa+1]=copycomment;
                   commentidArray[ssa+1]=comment._id;
                   //console.log(testComments.findIndex(x=>x._id === comment.pid));
        
               }
               
            })
            

            //console.log('this from globalstate '+ comments,post_body,title,testComments);
           dispatch({
                type:"SINGLE_POST",
                payload1:_id,
                payload2:testComments
            })
            //console.log('this from globalstate2 '+id);
           // console.log(singlePost)
            
        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA1"
        })
        
    }
}


    async function addPost(post){
        const config= makeheader(state.token);
        try {
            console.log(...post);
            console.log(post.get('post_image'));
            //loadUser();
            const newPost= await axios.post('/posts',post,config);
            //console.log(newPost.data.data);
           /* dispatch({
                type:"ADD_POST",
                payload:newPost.data.data
            })*/

        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA"
        })
            
        }
        
    }

    /*async function editPost(id){
        try {
            const editablePost= await axios.get(`/posts/${id}`);
            //updatePost(editablePost);

        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA"
        })
            
        }

    }*/
    async function addComment(comment){
        const config= makeheader(state.token);
        try {
            const newComment= await axios.post('/posts/post/comment',comment,config);
            console.log(newComment.data.data);
            dispatch({
                type:"ADD_COMMENT",
                payload:newComment.data.data
            })

        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA"
        })
            
        }
        
    }

    async function updatePost(id,post){
        const config= makeheader(state.token);
        try {
                console.log(id);
                console.log(post);
                const res= await axios.post(`/posts/edit/${id}`,post,config);
                console.log (res.data.data)
                getPosts();
        } catch (error) {
            
        }

    }
     async function deletePost(id){
        const config= makeheader(state.token);
        try {
            console.log("this globalstate "+id);
            const deletablePost= await axios.delete(`/posts/${id}`,config);
            //await axios.delete
            console.log("deletable post returned  ");
            console.log(deletablePost.data.data);
            
            dispatch({
                type:'DELETE_POST',
                payload:id
            })
            
        } catch (error) {
            dispatch({
                type:'POST_FETCH_ERROR',
                payload:"ERROR FETCHING DATA"
        })
        }
    }

    async function getComments(){
        try {
            const comments= await axios.get("/posts/comments");
            //console.log(comments.data.data)
            dispatch({
                type:"GET_COMMENTS",
                payload:comments.data.data
            })

            
        } catch (error) {
            
        }
    }
    function getsetmessage(msg){
        dispatch({
            type:"SET_MESSAGE",
            payload:msg
        })
    }
    function getSearchedPosts(serachText){
        dispatch({
            type:"GET_SEARCHED_POSTS",
            payload:serachText
        })
    }

    function getPostsOfCategory(category){
        //const allPostsOfCategory= await get(`/posts/${category}`);
        console.log("it is called");
        console.log(category);
        dispatch({
            type:"GET_POSTS_OF_A_CATEGORY",
            //payload:allPostsOfCategory.data.data
            payload:category
        })
        //console.log(allPostsOfCategory.data.data);

    }


    return (
        <GlobalContext.Provider
         value={{msg:state.msg,users:state.users,token:state.token, posts:state.posts,
                comments:state.comments,user:state.user,searchOn:state.searchOn,
                updateUser,getsetmessage,getUsers,logout,loadUser,checkUserexists, addUser,getPostsOfCategory,
                getSinglePost,getSearchedPosts,getPosts,addPost,deletePost,updatePost,addComment,getComments}}>
            {children}
        </GlobalContext.Provider>
    )
}
