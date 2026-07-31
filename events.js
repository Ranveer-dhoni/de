document.addEventListener("DOMContentLoaded", () => {

    function getEvents() {
        return JSON.parse(localStorage.getItem("events") || "[]");
    }

    function saveEvents(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    function renderAllEvents() {
        const events = getEvents();
        const list = document.getElementById("eventsList");
        if (!list) return;

        list.innerHTML = events.map((e, i) => `
            <li class="event-card">
                <strong>${e.name}</strong> — ${e.date}<br>
                <em>${e.description || "No description"}</em><br>
                <button onclick="deleteEvent(${i})">Delete</button>
            </li>
        `).join("");
    }

    window.deleteEvent = function (i) {
        const events = getEvents();
        events.splice(i, 1);
        saveEvents(events);
        renderAllEvents();
    };

    renderAllEvents();
});





