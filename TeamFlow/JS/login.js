// const password=document.getElementById("password");

// const toggle=document.getElementById("togglePassword");

// toggle.onclick=function(){

//     if(password.type==="password"){

//         password.type="text";

//         toggle.innerHTML="🙈";

//     }

//     else{

//         password.type="password";

//         toggle.innerHTML="👁";

//     }

// }

// document.getElementById("loginForm")
// .addEventListener("submit",function(e){

//     e.preventDefault();

//     alert("Ready to connect Login API");

// });

const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.onclick = function () {

    if (password.type === "password") {
        password.type = "text";
        toggle.innerHTML = "🙈";
    } else {
        password.type = "password";
        toggle.innerHTML = "👁";
    }

};

document.getElementById("loginForm").addEventListener("submit", loginUser);

async function loginUser(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginBtn = document.getElementById("loginBtn");

    loginBtn.innerHTML = "Logging in...";
    loginBtn.disabled = true;

    try {

        const response = await fetch("http://localhost:5678/webhook/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        console.log(data);

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect
        window.location.href = "pages/dashboard.html";

    }
    catch (error) {

        alert("Unable to connect to server.");

    }

    loginBtn.innerHTML = "Login";
    loginBtn.disabled = false;

}