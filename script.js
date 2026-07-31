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

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventDescription").value = "";
}

function renderEvents() {
    const list = document.getElementById("eventList");
    if (!list) return;

    list.innerHTML = events.map((e, i) => `
        <li class="event-card">
            <strong>${e.name}</strong> — ${e.date}<br>
            <em>${e.description || "No description"}</em><br>
            <button onclick="deleteEvent(${i})">Delete</button>
        </li>
    `).join("");
}

function deleteEvent(i) {
    events.splice(i, 1);
    saveEvents();
    renderEvents();
    updateSummary();
}

function updateSummary() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const today = new Date().toISOString().split("T")[0];

    const currentBookings = bookings.filter(b => b.date >= today);
    const totalBookingsEl = document.getElementById("totalBookings");
    const totalEventsEl = document.getElementById("totalEvents");

    if (totalBookingsEl) {
        totalBookingsEl.textContent = "Total Current Bookings: " + currentBookings.length;
    }

    if (totalEventsEl) {
        totalEventsEl.textContent = "Total Events: " + events.length;
    }
}

renderEvents();
updateSummary();

