import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOJRXpVmq-6CQvmDA2VRfgXrEeCig-utA",
    authDomain: "her-975f3.firebaseapp.com",
    databaseURL: "https://her-6d883-default-rtdb.firebaseio.com",
    projectId: "her-975f3",
    storageBucket: "her-975f3.firebasestorage.app",
    messagingSenderId: "941568685726",
    appId: "1:941568685726:web:71c6b346c5e34dba356d8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fetch logged-in user email from session storage
const loggedInEmail = sessionStorage.getItem("loggedInEmail");

if (loggedInEmail) {
    const dbRef = ref(db, "users");

    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            let users = snapshot.val();
            let foundUser = null;

            // Loop through users to find matching email
            Object.values(users).forEach(user => {
                if (user.email === loggedInEmail) {
                    foundUser = user;
                }
            });

            if (foundUser) {
                document.getElementById("userName").innerText = ` ${foundUser.username}!`;
            } else {
                document.getElementById("userName").innerText = "Hello, User!";
            }
        }
    }).catch((error) => {
        console.error("Error fetching user:", error);
    });
} else {
    window.location.href = "./login.html"; // Redirect if not logged in
}
