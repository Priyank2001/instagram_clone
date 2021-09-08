import React , { useState , useEffect } from 'react';
import './App.css';
import Post from './Components/Post'
import { auth, db } from './firebase.js';
import Modal from '@material-ui/core/Modal';
import {makeStyles } from '@material-ui/core/styles'
import { Button,Input} from '@material-ui/core'
import ImageUpload  from './Components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  /*const [posts,setPosts ] =  useState([
    {
      username:"priyank_2k" ,
      caption:"Wow it works" ,
      ImageUrl:"https://archziner.com/wp-content/uploads/2020/07/air-jordan-hoodie-worn-by-man-wearing-purge-mask-with-neon-lights-super-cool-wallpapers-holding-pink-smoke-bomb.jpg"
    },
    {
      username:"curiousUjjwal" ,
      caption:"lets go",
       ImageUrl:"https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      username:"vaibhavnandan",
      caption:"Keeping moving",
      ImageUrl:"https://wow.zamimg.com/uploads/blog/images/20516-afterlives-ardenweald-4k-desktop-wallpapers.jpg"
    },
    {
      username:"sukrit", 
      caption:"Gloomy Sunday",
      ImageUrl:"https://c4.wallpaperflare.com/wallpaper/147/939/790/digital-art-anime-naruto-shippuuden-hatake-kakashi-wallpaper-preview.jpg"
    }
  ])*/
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle());
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false );
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [user,setUser] = useState(null);
  const [openSignIn,setOpenSignIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser)
      {
        //User has logged in
        setUser(authUser);
        console.log(authUser);
      }
      

      else{
        // User has logged out
        setUser(null);
      }

    })
  },[user ,username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map( doc => ({
          id: doc.id,
         post:doc.data()}) ));
    })
  },[]);
  const signUp = (event) => {
    event.preventDefault();
    
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName:username,
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }
  
  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      
      <Modal 
        open={open}
        onclose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img  src=
        // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" 
        "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        className="app__headerImage"
        />
        </center>
        <Input 
        placeholder="E-mail"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <Input 
        placeholder="Password"
        type="password"
        
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp} disabled={username==''} >Sign Up</Button>
        </form >
    </div>
        </Modal>
        <Modal 
        open={openSignIn}
        onclose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img  src=
        // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" 
        "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        className="app__headerImage"
        />
        </center>
        <Input 
        placeholder="E-mail"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn} >Sign In</Button>
        </form >
    </div>
        </Modal>
        
      <div className="app__header">
        <img  src=
        // "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" 
        "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        className="app__headerImage"
        />
        {
      user ? 
      <div>
      <Button onClick={() => auth.signOut()} >Sign Out</Button>
      
      </div>
      :
      <div>
      <Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
      <Button onClick={() => setOpen(true)} >Sign Up</Button>
      </div>
      }
      </div>
      
      
      {/* <h1>Hey guys lets make instagram clone</h1> */}
      <div className="app__posts">
      {
        posts.map(({id , post})  => 
          <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} ImageUrl={post.ImageUrl} />
      )}

      
      </div>
      <InstagramEmbed
      url='https://www.instagram.com/p/CTfG1x_jTsR/'
      clientAccessToken='123|456'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
      />    
      {user ? (<ImageUpload username={user.displayName} />): (
        <h3>Login to Upload</h3>
      ) }

    </div>
  );
}

export default App;
