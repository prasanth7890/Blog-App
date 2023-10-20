import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/post").then(response=>{
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, []);

    return(
        <>
        {posts.length && posts.map(post =>(
            <Post {...post}/> //passing all properites from post simply using ...post
        ))}
        </>
    )
}