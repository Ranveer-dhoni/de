const events = JSON.parse(localStorage.getItem("events") || "[]");
const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

function renderCalendar() {
    const list = document.getElementById("calendarList");
    if (!list) return;

    const combined = [
        ...events.map(e => ({ type: "Event", name: e.name, date: e.date })),
        ...bookings.map(b => ({ type: "Booking", name: b.room, date: b.date }))
    ];

    combined.sort((a, b) => a.date.localeCompare(b.date));

    list.innerHTML = combined.map(item => `
        <li>
            <strong>${item.type}</strong>: ${item.name}<br>
            <em>${item.date}</em>
        </li>
    `).join("");
}

renderCalendar();

