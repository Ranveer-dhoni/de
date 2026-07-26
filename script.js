let events = JSON.parse(localStorage.getItem("events") || "[]");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function createEvent() {
    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const description = document.getElementById("eventDescription").value.trim();

    if (!name || !date) {
        alert("Please fill in event name and date");
        return;
    }

    events.push({ name, date, description });
    saveEvents();
    renderEvents();
}

function renderEvents() {
    const list = document.getElementById("eventList");
    if (!list) return;

    list.innerHTML = events.map((e, i) => `
        <li>
            <strong>${e.name}</strong> — ${e.date}<br>
            <em>${e.description}</em><br>
            <button onclick="deleteEvent(${i})">Delete</button>
        </li>
    `).join("");
}

function deleteEvent(i) {
    events.splice(i, 1);
    saveEvents();
    renderEvents();
}

function updateSummary() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const total = bookings.length;

    const summary = document.getElementById("totalBookings");
    if (summary) summary.textContent = "Total Bookings: " + total;
}

renderEvents();
updateSummary();
