// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcZJaZZ84P-Ikm-mLRjyjEK2DG0ceZIHY",
  authDomain: "dipadvisor.firebaseapp.com",
  projectId: "dipadvisor",
  storageBucket: "dipadvisor.appspot.com",
  messagingSenderId: "604941638311",
  appId: "1:604941638311:web:c2dd8698804c1f0d3d5982"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth }