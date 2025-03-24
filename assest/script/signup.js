
// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

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

// Form submission event listener
document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;
    const checkbox = document.getElementById("checkbox").checked;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters long, contain a capital letter, a small letter, a number, and a special character.");
    return;
}


    // Check if passwords match
    if (password !== rePassword) {
        alert("Passwords do not match!");
        return;
    }

    // Checkbox validation
    if (!checkbox) {
        alert("You must agree to the Terms and Conditions!");
        return;
    }

    // Store user data in Firebase Realtime Database
    const usersRef = ref(database, "users/");
    const newUserRef = push(usersRef);  // Creates a unique ID for each user
    set(newUserRef, {
        username: name,
        email: email,
        password: password  // Storing plaintext password is not secure; consider hashing it
    })
    .then(() => {
        alert("Account created successfully!");
        window.location.href = "./index.html";  // Redirect to landing page
    })
    .catch((error) => {
        alert("Error: " + error.message);
    });
});
