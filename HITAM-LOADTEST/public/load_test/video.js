import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_MVJry1gDFJbd_sLw-WZk4cwwF0kDrKA",
    authDomain: "skarr-3a4a5.firebaseapp.com",
    projectId: "skarr-3a4a5",
    storageBucket: "skarr-3a4a5.appspot.com",
    messagingSenderId: "1040437409550",
    appId: "1:1040437409550:web:8187021b427c113ab1895f",
    measurementId: "G-DG6H3K2CTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication
const auth = getAuth();

// Initialize firestore
const db = getFirestore();

const start = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id="
const paste = "https://www.youtube.com/embed/"

// Get document refernce
const docRef = doc(db, 'Video_Id', "COME1");

getDoc(docRef)
    .then((doc) => {
        // console.log(doc.data(), doc.id);

        const data_id = doc.data().id;
        var url = start.concat(data_id).concat("&key=AIzaSyAwV-ZILe45AFhNwWcQ44p9h-42roXTnfg");
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then((data1) => {
                if (data1.items[0].snippet.liveBroadcastContent == "live") {
                    document.getElementById('str').src = paste.concat(data_id).concat("?autoplay=1");
                    // document.getElementById('live2').src = paste.concat(data_id).concat("?autoplay=1");
                } else {
                    fetch("https://youtube.googleapis.com/youtube/v3/search?channelId=UCOnjZcWuWP5gVdfbak1FJqw&eventType=live&type=video&key=AIzaSyAwV-ZILe45AFhNwWcQ44p9h-42roXTnfg")
                        .then(response => response.json())
                        .then((data2) => {
                            const id = data2.items[0].id.videoId;
                            document.getElementById('str').src = paste.concat(id).concat("?autoplay=1");
                            // document.getElementById('live2').src = paste.concat(id).concat("?autoplay=1");
                            
                            updateDoc(docRef, {
                                id: id
                            })
                        })
                }
            })


    })