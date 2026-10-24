// const user = JSON.parse(localStorage.getItem("user"));

// // Check if user is logged in
// if (!user) {
//     window.location.href = "../index.html";
// }

// // Welcome message
// document.getElementById("welcome").innerHTML =
//     "Welcome, " + user.full_name;

// // Logout
// document.getElementById("logout").onclick = function () {
//     localStorage.removeItem("user");
//     window.location.href = "../index.html";
// };

// // Load dashboard data
// loadDashboard();

// async function loadDashboard() {

//     try {

//         // Get all users
//         const usersResponse = await fetch("http://localhost:5678/webhook/users");
//         const users = await usersResponse.json();

//         // Get all tasks
//         const tasksResponse = await fetch("http://localhost:5678/webhook/tasks");
//         const tasks = await tasksResponse.json();

//         // Update dashboard cards
//         document.getElementById("totalUsers").innerText = users.length;
//         document.getElementById("totalTasks").innerText = tasks.length;

//         const pendingTasks = tasks.filter(task => task.status === "Pending");
//         const completedTasks = tasks.filter(task => task.status === "Completed");

//         document.getElementById("pendingTasks").innerText = pendingTasks.length;
//         document.getElementById("completedTasks").innerText = completedTasks.length;

//         // Fill Recent Tasks table
//         const table = document.getElementById("taskTable");
//         table.innerHTML = "";

//         tasks.slice(0, 5).forEach(task => {

//             table.innerHTML += `
//                 <tr>
//                     <td>${task.title}</td>
//                     <td>${task.assigned_to}</td>
//                     <td>${task.priority}</td>
//                     <td>${task.status}</td>
//                 </tr>
//             `;

//         });

//     } catch (error) {

//         console.error(error);
//         alert("Unable to load dashboard.");

//     }

// }
const user = JSON.parse(localStorage.getItem("user"));

// Check Login
if (!user) {
    window.location.href = "../index.html";
}

// Welcome Message
document.getElementById("welcome").innerHTML =
    "Welcome, " + user.full_name;

// Logout
document.getElementById("logout").onclick = function () {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
};

// Load Dashboard
loadDashboard();

async function loadDashboard() {

    try {

        // Get Users
        const usersResponse = await fetch("http://localhost:5678/webhook/users");
        const users = await usersResponse.json();

        // Get Tasks
        const tasksResponse = await fetch("http://localhost:5678/webhook/tasks");
        const tasks = await tasksResponse.json();

        // Dashboard Cards
        document.getElementById("totalUsers").innerText = users.length;
        document.getElementById("totalTasks").innerText = tasks.length;

        const pending = tasks.filter(task => task.status === "Pending");
        const completed = tasks.filter(task => task.status === "Completed");

        document.getElementById("pendingTasks").innerText = pending.length;
        document.getElementById("completedTasks").innerText = completed.length;

        // Recent Tasks Table
        const table = document.getElementById("taskTable");
        table.innerHTML = "";

        tasks.slice(0, 5).forEach(task => {

            table.innerHTML += `
                <tr>
                    <td>${task.title}</td>
                    <td>${task.assigned_to}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                </tr>
            `;

        });

    }
    catch (error) {

        console.error(error);
        alert("Unable to load dashboard.");

    }

}