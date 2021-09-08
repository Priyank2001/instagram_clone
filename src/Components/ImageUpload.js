import React,{ useState } from 'react'
import { Input , Button } from '@material-ui/core'
import firebase from "firebase"
import { storage , db } from '../firebase'
import './ImageUpload.css'
function ImageUpload(props) {
    const [caption , setCaption] = useState('');
    const [image,setImage] = useState(null);
    const [progress , setProgress] = useState(0);
    const handleUpload = (event) =>{
        // event.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changed",
        
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);    
        },
        (error) => {
            console.log(error);
            alert(error.message);
        },
        () => {
            storage.ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    ImageUrl: url,
                    username: props.username
                })
            })
            setProgress(0);
            setCaption("");
            setImage(null);
        }
        )
    }
    const handleChange = (event) => {
        // event.preventDefault();
        if(event.target.files[0]){
            setImage(event.target.files[0]);
        }
    }
    return (
        <div className="imageUpload">
            <progress 
            className= "imageUpload__progress"
            value={progress} max="100" />
            <Input 
            type="text"
            placeholder="Enter a Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            />
            <Input 
            type="file"
            onChange={handleChange}
            />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
