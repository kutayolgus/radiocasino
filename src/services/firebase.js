import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
var firebaseConfig = {
  apiKey: "AIzaSyC0DX-Lbz4Uq8Zcn1-aM1kLiB3PmYlFCxY",
  authDomain: "kutay-1ac16.firebaseapp.com",
  databaseURL: "https://kutay-1ac16.firebaseio.com",
  projectId: "kutay-1ac16",
  storageBucket: "kutay-1ac16.appspot.com",
  messagingSenderId: "167112867",
  appId: "1:167112867:web:2fc59074a3b36daba20f16"
};
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

const usersCollection = db.collection('users')

export {
    db,
    auth,
    currentUser,
    usersCollection
}
