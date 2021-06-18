import React,{ useState,useContext } from 'react'
import bootstrap from 'react-bootstrap'
import { Link } from "react-router-dom";


export const Pagination = (props) => {
    if(props.category === undefined){
        return (
            
            <nav className="text-center col-md-6">
                <ul className='pagination'>
                    {props.pageNumbers.map( number=>(
                    <li key={ number } className = 'page-item'>
                        <Link to={`/posts/${number}`}onClick={ ()=>props.paginate(number) }  className='page-link' >{number}</Link>
                    </li>   
                    ))}

                </ul>
            
            </nav>
    )
    }
    else{
        return (
            
            <nav className="text-center col-md-6">
                <ul className='pagination'>
                    {props.pageNumbers.map( number=>(
                    <li key={ number } className = 'page-item'>
                        <Link to={`/posts/category/${props.category}/${number}`}onClick={ ()=>props.paginate(number) }  className='page-link' >{number}</Link>
                    </li>   
                    ))}

                </ul>
            
            </nav>
    )
    }
    
}
