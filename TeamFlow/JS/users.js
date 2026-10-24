// ================= LOGIN CHECK =================

const user = JSON.parse(localStorage.getItem("user"));
if (user.role !== "admin") {

    alert("Access Denied");

    window.location.href = "dashboard.html";

}

if (!user) {
    window.location.href = "../index.html";
}

// ================= LOGOUT =================

document.getElementById("logout").onclick = function () {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
};

// ================= MODAL =================

const modal = document.getElementById("userModal");

document.getElementById("addUserBtn").onclick = function () {

    document.getElementById("userId").value = "";
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("role").value = "employee";

    document.getElementById("saveUser").innerText = "Save User";

    modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// ================= LOAD USERS =================

loadUsers();

async function loadUsers() {

    try {

        const response = await fetch("http://localhost:5678/webhook/users");
        const users = await response.json();

        const table = document.getElementById("usersTable");

        table.innerHTML = "";

        users.forEach(user => {

            table.innerHTML += `
            <tr>

                <td>${user.id}</td>

                <td>${user.full_name}</td>

                <td>${user.email}</td>

                <td>${user.role}</td>

                <td>

                    <button class="edit-btn"
                    onclick='editUser(${user.id}, ${JSON.stringify(user.full_name)}, ${JSON.stringify(user.email)}, ${JSON.stringify(user.role)})'>
                        Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteUser(${user.id})">
                        Delete
                    </button>

                </td>

            </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load users.");

    }

}

// ================= EDIT USER =================

function editUser(id, full_name, email, role) {

    document.getElementById("userId").value = id;
    document.getElementById("full_name").value = full_name;
    document.getElementById("email").value = email;
    document.getElementById("password").value = "";
    document.getElementById("role").value = role;

    document.getElementById("saveUser").innerText = "Update User";

    modal.style.display = "flex";

}

// ================= SAVE / UPDATE =================

document.getElementById("saveUser").onclick = saveUser;

async function saveUser() {

    const id = document.getElementById("userId").value;
    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!full_name || !email) {
        alert("Please fill all required fields.");
        return;
    }

    if (!id && !password) {
        alert("Password is required for a new user.");
        return;
    }

    const url = id
        ? "http://localhost:5678/webhook/update-user"
        : "http://localhost:5678/webhook/create user";

    const body = id
        ? {
            id: Number(id),
            full_name: full_name,
            email: email,
            role: role
        }
        : {
            full_name: full_name,
            email: email,
            password: password,
            role: role
        };

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

        const result = await response.json();

        alert(result.message || "Success!");

        modal.style.display = "none";

        // Reset Form
        document.getElementById("userId").value = "";
        document.getElementById("full_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("role").value = "employee";

        document.getElementById("saveUser").innerText = "Save User";

        loadUsers();

    } catch (error) {

        console.error(error);

        alert("Unable to save user.");

    }

}

// ================= DELETE USER =================

async function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {

        const response = await fetch("http://localhost:5678/webhook/delete-user", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: id
            })

        });

        const result = await response.json();

        alert(result.message || "User deleted successfully.");

        loadUsers();

    } catch (error) {

        console.error(error);

        alert("Unable to delete user.");

    }

}