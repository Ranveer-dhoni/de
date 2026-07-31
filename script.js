document.addEventListener("DOMContentLoaded", () => {

    function getEvents() {
        return JSON.parse(localStorage.getItem("events") || "[]");
    }

    function saveEvents(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderEvents() {
        const events = getEvents();
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

    window.createEvent = function () {
        const name = document.getElementById("eventName").value.trim();
        const date = document.getElementById("eventDate").value.trim();
        const description = document.getElementById("eventDescription").value.trim();

        if (!name || !date) {
            alert("Please fill in event name and date");
            return;
        }

        const events = getEvents();
        events.push({ name, date, description });
        saveEvents(events);

        renderEvents();
        updateSummary();

        document.getElementById("eventName").value = "";
        document.getElementById("eventDate").value = "";
        document.getElementById("eventDescription").value = "";
    };

    window.deleteEvent = function (i) {
        const events = getEvents();
        events.splice(i, 1);
        saveEvents(events);
        renderEvents();
        updateSummary();
    };

    function updateSummary() {
        const events = getEvents();
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const today = new Date().toISOString().split("T")[0];
        const currentBookings = bookings.filter(b => b.date >= today);

        const totalBookingsEl = document.getElementById("totalBookings");
        const totalEventsEl = document.getElementById("totalEvents");

        if (totalBookingsEl) totalBookingsEl.textContent = "Total Current Bookings: " + currentBookings.length;
        if (totalEventsEl) totalEventsEl.textContent = "Total Events: " + events.length;
    }

    renderEvents();
    updateSummary();
});

