import React,{useState,useContext,useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState'
import {Post} from './Post'
import {Pagination} from './Pagination'




export const SearchedPosts = (props) => {

    //console.log(props.match.params.id);

    const [isLoading, setLoading] = useState(true);
    const {posts,getPosts}=useContext(GlobalContext);
    useEffect(()=>{
        //getPosts();
        setLoading(false);
        console.log("inside useeffect ")
    },[])


    const [currentPage,setCurrentPage]=useState((props.match.params.id === undefined ) ?1 :props.match.params.id);
    if(currentPage !==1 && props.match.params.id === undefined )setCurrentPage(1)
    const [postsPerPage]=useState(6);
    
    const paginate= (number)=>setCurrentPage(number);
        //end pagination
    //end Pagination
    
     console.log(currentPage);

    
    if(isLoading)
    return(
        <div>
        <h1>Loading data...</h1>
        </div>
    )
    else{
        const pageNumbers=[];
        for(let i=1;i<=Math.ceil(posts.length/6);i++){pageNumbers.push(i);}
        const indexOfLastPost= currentPage * postsPerPage;
        const indexOfFirstPost =indexOfLastPost-postsPerPage;
        const currentPosts=posts.slice(indexOfFirstPost,indexOfLastPost);
        //console.log(posts);
        
        
    return (
        <>
        <div className=" row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
            
           
            {currentPosts.map(post=>(
                <Post key={post._id} post={post} />
            ))}
            
           
           
           
        </div>
        <div style={{margin:"auto" , width: "10%"}}>
            <Pagination pageNumbers={pageNumbers} paginate={paginate} />
        </div>
        </>

    )
    }
}
