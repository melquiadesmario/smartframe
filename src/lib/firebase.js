import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDI2xFq_BFXCxzUOjgnArAtN_TU4rAlpxY",
    authDomain: "smartframe-ade12.firebaseapp.com",
    databaseURL: "https://smartframe-ade12.firebaseio.com",
    projectId: "smartframe-ade12",
    storageBucket: "smartframe-ade12.appspot.com",
    messagingSenderId: "234168123195",
    appId: "1:234168123195:web:4a598b5a086386948cc11e"
}

firebase.initializeApp(firebaseConfig)

export default firebase
