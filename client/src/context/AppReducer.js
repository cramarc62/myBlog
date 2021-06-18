export default(state,action)=> {
    switch(action.type){
        case "GET_POSTS":
            return{
                ...state,
                posts: action.payload
            }
        case "GET_SEARCHED_POSTS":
            return{
                ...state,
                searchOn:true,
                posts:state.posts.filter(post=>post.post_body.includes(action.payload))
            }
        case "GET_POSTS_OF_A_CATEGORY":
            return{
                ...state,
                posts:state.posts.filter(post=>post.category===action.payload)
            }
        case "SINGLE_POST":
            //console.log( typeof(ObjectID(action.payload1)));
           /* const post=state.posts.map(post=>{
                if(post._id === action.payload1)return post;
            });
            state.posts.map(post=>{
                console.log(post._id);
                console.log(typeof(post._id));
                console.log(action.payload1);
                console.log(typeof(action.payload1));
            })*/
            //console.log(action.payload2)
            return{
                ...state,
               // posts:[action.payload1],
               posts:state.posts.filter(post=>post._id === action.payload1),
               comments:action.payload2
            }
        case "GET_COMMENTS":
            return{
                ...state,
                comments:action.payload
            }
        case "ADD_POST":
            console.log("this is add post appreducer "+state.posts)
            return{
                ...state,
                posts:[...state.posts,action.payload]
            }
        case "ADD_COMMENT":
            return{
                ...state,
                comments:[...state.comments,action.payload]
            }
        /*case "UPDATE_POST":
            return{
                ...state,
                posts:state.posts.filter(post=>post._id!==action.payload)
            }*/
        case "DELETE_POST":
            return{
                ...state,
                posts:state.posts.filter(post=>post._id!==action.payload)
            }
        case "POST_FETCH_ERROR":
                return{
                    ...state,
                    posts:action.payload
                }
        case "ADD_USER":
            console.log("this is appreducer "+action.payload1);
            console.log(state.user);
            //localStorage.setItem("token",action.payload2)
            ///state.user=action.payload
            //console.log(state.user);
            return{
                ...state,
                user:[...state.user,action.payload1]
                //token:action.payload2
                
               // user:action.payload
            
            }
        case "LOGOUT_SUCCESS":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            //console.log("this is appreducer error "+action.payload)
            return{
                ...state,
                user:[],
                token:null
            }
        case "ADD_USER_ERROR":
            //localStorage.removeItem("token");
            console.log("this is appreducer error "+action.payload)
            return{
                ...state,
                user:[...state.user,action.payload]
                //token:null
            }
        case "LOGIN_USER":
            console.log("this is appreducer "+action.payload1)
            localStorage.setItem("token",action.payload2)
            localStorage.setItem("user", JSON.stringify( action.payload1))
            return{
                ...state,
                user:[...state.user,action.payload1],
                token:action.payload2,
            }
        case "LOGIN_USER_ERROR":
            console.log("this is appreducer error "+action.payload)
            //localStorage.removeItem("token");
            return{
                ...state,
                user:action.payload
                //token:null,
                
            }
        case "USER_LOADING_ERROR":

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return{
                ...state,
                user:[],
                token:null
            }
        case "USER_LOADED":
            return{
                ...state,
                user:[action.payload]
            }
        case "GET_USERS":
            console.log(action.payload)
            return{
                ...state,
                users:action.payload
            }
        case "SET_MESSAGE":
            console.log(action.payload)
            return{
                ...state,
                msg:action.payload
            }

        default:
            return state
    }
}