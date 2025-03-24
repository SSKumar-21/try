import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5xMzpAbzgvL6uNAv5uZluPqLR5iuLdSY",
    authDomain: "her-6d883.firebaseapp.com",
    databaseURL: "https://her-6d883-default-rtdb.firebaseio.com",
    projectId: "her-6d883",
    storageBucket: "her-6d883.firebasestorage.app",
    messagingSenderId: "660185862853",
    appId: "1:660185862853:web:9852b01191f0931dd016ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", async () => {
    const userNameElement = document.getElementById("userName");
    if (!userNameElement) return;

    let email = sessionStorage.getItem("loggedInEmail");
    
    if (!email) {
        window.location.href = "./login.html"; // Redirect if not logged in
        return;
    }

    const dbRef = ref(database, "users");

    try {
        const snapshot = await get(child(dbRef, "/"));
        if (snapshot.exists()) {
            let users = snapshot.val();
            let foundUser = null;

            Object.values(users).forEach(user => {
                if (user.email === email) {
                    foundUser = username;
                }
            });

            console.log("Found User:", foundUser);

            if (foundUser && foundUser.name) {
                userNameElement.innerText = `Welcome, ${foundUser.name}!`;
            } else {
                userNameElement.innerText = "Welcome, User!";
            }
        } else {
            console.log("No users found in database.");
            userNameElement.innerText = "Welcome, User!";
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        userNameElement.innerText = "Error loading user data!";
    }
});
