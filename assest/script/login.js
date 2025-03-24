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

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    const dbRef = ref(database, "users");

    get(child(dbRef, "/")).then((snapshot) => {
        if (snapshot.exists()) {
            let users = snapshot.val();
            let foundUser = null;

            Object.values(users).forEach(user => {
                if (user.email === email && user.password === password) {
                    foundUser = user;
                }
            });

            if (foundUser) {
                // Store email in session storage
                sessionStorage.setItem("loggedInEmail", foundUser.email);

                alert("Login Successful!");
                window.location.href = "./landing.html";
            } else {
                alert("Invalid email or password.");
            }
        } else {
            alert("No users found in database.");
        }
    }).catch(error => {
        console.error("Error fetching data:", error);
        alert("Error connecting to database.");
    });
});
