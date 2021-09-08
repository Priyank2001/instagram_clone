import React,{ useState , useEffect} from 'react'
import './Post.css'
import { Input , Button } from '@material-ui/core'
import { db } from "../firebase"
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase'
function  Post(props) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts")
        .doc(props.postId)
        .collection("comments")
        .add({
            text:comment,
            username:props.user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch((error)=>
            console.log(error.message)
        )
        console.log(comment , props.user.displayName );
        setComment('');

    } 
    useEffect(() => {
        let unsubscribe;
        if(props.postId)
        {
            unsubscribe = db
            .collection("posts")
            .doc(props.postId)
            .collection("comments")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>
                setComments(snapshot.docs.map((doc)=> doc.data()))
            )
        }
        //console.log(comments);
        return () => {
            unsubscribe();
        }
    },[props.postId])

    return (
        <div className="post">
            <div className="post__header">
            <Avatar 
            alt={props.username}
            src="/static/images/avatar/2.jpg" 
            className="post__avatar"
            />
            <h3>{props.username}</h3> 
            </div>
            {/* header -> avatar + class */}
            <img 
            // src="https://archziner.com/wp-content/uploads/2020/07/air-jordan-hoodie-worn-by-man-wearing-purge-mask-with-neon-lights-super-cool-wallpapers-holding-pink-smoke-bomb.jpg" 
            src={props.ImageUrl}
            alt="" 
            className="post__image"
            />
            {/*IMage */}
            {/* username  + caption */}
            <h4 className="post__text"> <strong>{props.username}:</strong> {props.caption} </h4>
            <div className="post__comments"> 
            {
                comments.map((item)=>
                    <div className="post__comment" > 
                    <p>
                    <strong>{item.username} :  </strong>
                    {item.text}</p>
                    </div>
                )
            }
            </div>  
            {props.user && 
                (
                    <form className="post__form"> 
            <input
            placeholder="Enter a comment"
            type="text"
            className="post__Input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <Button 
                type="submit"
                disabled={!comment}
                onClick={postComment}
                className="post__button"
                color="primary"
            >
                Post
            </Button>
            </form>
                )
            }
            
            </div>
    )
}

export default  Post;
