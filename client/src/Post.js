import {formatISO9075} from 'date-fns';
import {Link} from "react-router-dom";

export default function Post({_id, title, summary, cover, content, createdAt, author}) {
  const link = cover.split('\\')  
  const path = "http://localhost:4000/" + link[0] + '/' + link[1]; 
  
    return(
        <div className="post">
            <div className="image">
              <Link to={`/post/${_id}`}>
                <img src={path} alt="image" />
              </Link>
            </div>

            <div className="texts">
              <Link to={`/post/${_id}`}>
                <h2>{title}</h2>
              </Link>
              <p className='info'>
                <a className="author">{author.username}</a>
                <time>{formatISO9075(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
              </p>
              <p className='summary'>{summary}
              </p>
            </div>
        </div>
    )
}