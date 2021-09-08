// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// import firebase from "firebase";


// const firebaseApp = firebase.intializeApp({
//   apiKey: "AIzaSyCRK4AKMJI011BPt6pTyhEVXw_o1Q1KM3w",
//   authDomain: "instagram-clone-9860f.firebaseapp.com",
//   projectId: "instagram-clone-9860f",
//   storageBucket: "instagram-clone-9860f.appspot.com",
//   messagingSenderId: "473231795746",
//   appId: "1:473231795746:web:aa063f686a70659a2f8c7b",
//   measurementId: "G-VZNTY1MEV9"
// });

// const db = firebaseApp.firestore();
// const auth=firebase.auth();
// const storage=firebase.storage();

// export {db , auth , storage };

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCRK4AKMJI011BPt6pTyhEVXw_o1Q1KM3w",
  authDomain: "instagram-clone-9860f.firebaseapp.com",
  projectId: "instagram-clone-9860f",
  storageBucket: "instagram-clone-9860f.appspot.com",
  messagingSenderId: "473231795746",
  appId: "1:473231795746:web:aa063f686a70659a2f8c7b",
  measurementId: "G-VZNTY1MEV9"  
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };