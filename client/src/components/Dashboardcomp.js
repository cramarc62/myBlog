import React from 'react'
import {Link} from 'react-router-dom'

export const Dashboardcomp = (props) => {
    return (
        <div>
            <Link to={`/posts/post/${props.postId}`} >{props.postTitle}</Link>
            {console.log(typeof(props.postId))}
        </div>
    )
}
