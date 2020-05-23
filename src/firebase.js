 import firebase from 'firebase';
 require("firebase/firestore");
 import 'firebase/storage';

 
 // Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBztKuFQaSZhgk9XsOKHE4wHfwEADp_k28",
    authDomain: "vue-ecomm-43ee0.firebaseapp.com",
    databaseURL: "https://vue-ecomm-43ee0.firebaseio.com",
    projectId: "vue-ecomm-43ee0",
    storageBucket: "vue-ecomm-43ee0.appspot.com",
    messagingSenderId: "590363467474",
    appId: "1:590363467474:web:dcf6ae8a6cd055fba4170b",
    measurementId: "G-J6YWPLJ2Y5"
  };
  // Initialize Firebase
  const fireb = firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export {fireb, db};
