let events = JSON.parse(localStorage.getItem("events") || "[]");

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function renderAllEvents() {
    events = JSON.parse(localStorage.getItem("events") || "[]");

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

function deleteEvent(i) {
    events.splice(i, 1);
    saveEvents();
    renderAllEvents();
}

renderAllEvents();



