// -------------------------------
// Global Variables
// -------------------------------
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let currentPage = 1;
const pageSize = 5;

// -------------------------------
// DOM Elements
// -------------------------------
const idField = document.getElementById("id");
const nameField = document.getElementById("name");
const phoneField = document.getElementById("phone");
const dateField = document.getElementById("date");
const timeField = document.getElementById("time");

const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetSearch = document.getElementById("resetSearch");

const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

const tableBody = document.querySelector("#appointmentTable tbody");

// -------------------------------
// Render Table With Pagination
// -------------------------------
function renderTable(data = appointments) {
    const start = (currentPage - 1) * pageSize;
    const paginatedData = data.slice(start, start + pageSize);

    tableBody.innerHTML = "";

    paginatedData.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editAppointment('${item.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteAppointment('${item.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    pageInfo.textContent = "Page: " + currentPage;
}

// -------------------------------
// Save Appointment (Add or Edit)
// -------------------------------
saveBtn.addEventListener("click", () => {
    const id = idField.value;
    const name = nameField.value.trim();
    const phone = phoneField.value.trim();
    const date = dateField.value;
    const time = timeField.value.trim();

    if (!name || !phone || !date || !time) {
        alert("Please fill all fields.");
        return;
    }

    if (id) {
        // Edit existing
        const index = appointments.findIndex((a) => a.id === id);
        appointments[index] = { id, name, phone, date, time };
    } else {
        // Add new
        appointments.push({
            id: Date.now().toString(),
            name,
            phone,
            date,
            time
        });
    }

    localStorage.setItem("appointments", JSON.stringify(appointments));
    clearForm();
    renderTable();
});

// -------------------------------
// Edit Appointment
// -------------------------------
function editAppointment(id) {
    const item = appointments.find((a) => a.id === id);

    idField.value = item.id;
    nameField.value = item.name;
    phoneField.value = item.phone;
    dateField.value = item.date;
    timeField.value = item.time;
}

// -------------------------------
// Delete Appointment
// -------------------------------
function deleteAppointment(id) {
    const confirmDelete = confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    appointments = appointments.filter((a) => a.id !== id);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    renderTable();
}

// -------------------------------
// Clear Form
// -------------------------------
clearBtn.addEventListener("click", clearForm);

function clearForm() {
    idField.value = "";
    nameField.value = "";
    phoneField.value = "";
    dateField.value = "";
    timeField.value = "";
}

// -------------------------------
// Search Function
// -------------------------------
searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = appointments.filter((a) =>
        a.name.toLowerCase().includes(keyword)
    );
    currentPage = 1;
    renderTable(filtered);
});

resetSearch.addEventListener("click", () => {
    searchInput.value = "";
    currentPage = 1;
    renderTable();
});

// -------------------------------
// Pagination Buttons
// -------------------------------
nextPage.addEventListener("click", () => {
    const maxPage = Math.ceil(appointments.length / pageSize);
    if (currentPage < maxPage) {
        currentPage++;
        renderTable();
    }
});

prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

// -------------------------------
// Initial Load
// -------------------------------
renderTable();

// -------------------------------
// Make functions global for buttons
// -------------------------------
window.editAppointment = editAppointment;
window.deleteAppointment = deleteAppointment;
