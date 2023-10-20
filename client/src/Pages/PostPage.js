import {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom';
import {formatISO9075} from "date-fns";
import { UserContext } from '../UserContext';
import {Link} from "react-router-dom";
import "../PostPage.css";

export default function PostPage() {
    const {userInfo} = useContext(UserContext);
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    
    useEffect(()=>{
        
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            }
        );
    }, []);

    if(!postInfo) return '';

    const link = postInfo.cover.split('\\')  
    const path = "http://localhost:4000/" + link[0] + '/' + link[1]; 

    return(
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by {postInfo.author.username}</div>

            {
                userInfo.id === postInfo.author._id && 
                
                <div className='edit-row'>
                    <Link className='edit' to={`/edit/${postInfo._id}`}>Edit this page</Link>
                </div>

            }

            <div className='image'>
                <img src={path} alt="cover img" />
            </div>
            <div dangerouslySetInnerHTML={
                {__html: postInfo.content}
            }></div>
        </div>
    );
}