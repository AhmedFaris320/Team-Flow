// ================= LOGIN CHECK =================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "../index.html";
}

// ================= LOGOUT =================

document.getElementById("logout").onclick = function () {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
};

// ================= MODAL =================

const modal = document.getElementById("taskModal");
let allTasks = [];
document.getElementById("addTaskBtn").onclick = function () {

    clearForm();

    document.getElementById("saveTask").innerText = "Save Task";

    modal.style.display = "flex";

};

document.getElementById("closeTaskModal").onclick = function () {

    modal.style.display = "none";

};

window.onclick = function (event) {

    if (event.target === modal) {

        modal.style.display = "none";

    }

};

// ================= INITIAL LOAD =================

loadUsers();
loadTasks();
document.getElementById("saveTask").onclick = saveTask;
// ================= LOAD USERS =================

async function loadUsers() {

    try {

        const response = await fetch("http://localhost:5678/webhook/users");

        const users = await response.json();

        const select = document.getElementById("assigned_to");

        select.innerHTML = "";

        users.forEach(user => {

            select.innerHTML += `
                <option value="${user.id}">
                    ${user.full_name}
                </option>
            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ================= LOAD TASKS =================

async function loadTasks() {

    try {

        const response = await fetch("http://localhost:5678/webhook/tasks");

        allTasks = await response.json();

        const tasks = allTasks;

        const table = document.getElementById("tasksTable");

        table.innerHTML = "";

        tasks.forEach(task => {

            table.innerHTML += `

            <tr>

                <td>${task.title}</td>

                <td>${task.assigned_to}</td>

                <td>${task.priority}</td>

                <td>${task.deadline}</td>

                <td>${task.status}</td>
            <td>
${user.role === "admin"
? `
    <button class="edit-btn"
    onclick='editTask(
        ${task.id},
        ${JSON.stringify(task.title)},
        ${JSON.stringify(task.description)},
        ${task.assigned_to},
        ${JSON.stringify(task.deadline)},
        ${JSON.stringify(task.priority)},
        ${JSON.stringify(task.status)}
    )'>
        Edit
    </button>

    <button class="delete-btn"
    onclick="deleteTask(${task.id})">
        Delete
    </button>
`
: `
    <button class="edit-btn"
    onclick="updateStatus(${task.id}, '${task.status}')">
        Update Status
    </button>
`
}
</td>
            </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load tasks.");

    }

}

// ================= CLEAR FORM =================

function clearForm() {

    document.getElementById("taskId").value = "";

    document.getElementById("title").value = "";

    document.getElementById("description").value = "";

    document.getElementById("assigned_to").selectedIndex = 0;

    document.getElementById("deadline").value = "";

    document.getElementById("priority").value = "High";

    document.getElementById("status").value = "Pending";

    document.getElementById("saveTask").innerText = "Save Task";

}
// ================= PLACEHOLDERS =================

// These will be implemented next
function editTask(id, title, description, assigned_to, deadline, priority, status) {

    document.getElementById("taskId").value = id;

    document.getElementById("title").value = title;

    document.getElementById("description").value = description;

    document.getElementById("assigned_to").value = assigned_to;

    document.getElementById("deadline").value = deadline;

    document.getElementById("priority").value = priority;

    document.getElementById("status").value = status;

    document.getElementById("saveTask").innerText = "Update Task";

    modal.style.display = "flex";

}
async function deleteTask(id) {

    if (!confirm("Are you sure you want to delete this task?")) {

        return;

    }

    try {

        const response = await fetch("http://localhost:5678/webhook/delete-task", {

            method: "DELETE",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                id: id

            })

        });

        const result = await response.json();

        alert(result.message || "Task deleted successfully.");
        
        loadTasks();

    }

    catch(error){

        console.error(error);

        alert("Unable to delete task.");

    }

}
// ================= SAVE TASK =================

async function saveTask() {

    const id = document.getElementById("taskId").value;

    const title = document.getElementById("title").value.trim();

    const description = document.getElementById("description").value.trim();

    const assigned_to = Number(document.getElementById("assigned_to").value);

    const deadline = document.getElementById("deadline").value;

    const priority = document.getElementById("priority").value;
    const status = document.getElementById("status").value;
    
    const assigned_by = user.id;

    if (!title || !description || !deadline) {

        alert("Please fill all fields.");

        return;

    }

    const url = id
        ? "http://localhost:5678/webhook/update-task"
        : "http://localhost:5678/webhook/create-task";

    const body = id
        ? {

            id: Number(id),

            title,

            description,

            assigned_to,

            assigned_by,

            deadline,

            priority,

            status: status

        }
        : {

            title,

            description,

            assigned_to,

            assigned_by,

            deadline,

            priority

        };

    try {

        const response = await fetch(url, {

            method: id ? "PUT" : "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(body)

        });

        const result = await response.json();

        alert(result.message || "Success!");
        

        modal.style.display = "none";

        clearForm();

        loadTasks();

    }

    catch(error){

        console.error(error);

        alert("Unable to save task.");

    }

}
const statusModal = document.getElementById("statusModal");
document.getElementById("saveStatus").onclick = saveStatus;

document.getElementById("closeStatusModal").onclick = function () {

    statusModal.style.display = "none";

};

// function updateStatus(id, currentStatus) {

//     document.getElementById("statusTaskId").value = id;

//     document.getElementById("newStatus").value = currentStatus;

//     statusModal.style.display = "flex";
// }
           
function updateStatus(id, currentStatus) {

    alert("updateStatus called");

    document.getElementById("statusTaskId").value = id;

    document.getElementById("newStatus").value = currentStatus;

    statusModal.style.display = "flex";

}
     
document.getElementById("saveStatus").onclick = saveStatus;

async function saveStatus() {

    const id = Number(document.getElementById("statusTaskId").value);

    const status = document.getElementById("newStatus").value;

    const task = allTasks.find(t => t.id === id);

    if (!task) {

        alert("Task not found.");

        return;

    }

    try {

        const response = await fetch("http://localhost:5678/webhook/update-task", {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                id: task.id,
                title: task.title,
                description: task.description,
                assigned_to: task.assigned_to,
                assigned_by: task.assigned_by,
                deadline: task.deadline,
                priority: task.priority,
                status: status

            })

        });

        const result = await response.json();

        alert(result.message);

        statusModal.style.display = "none";

        loadTasks();

    }
    catch (error) {

        console.error(error);

        alert("Unable to update status.");

    }

}