let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

function saveBookings() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function createBooking() {
    const room = document.getElementById("bookingRoom").value.trim();
    const date = document.getElementById("bookingDate").value.trim();
    const reason = document.getElementById("bookingReason").value.trim();

    if (!room || !date) {
        alert("Please fill in room and date");
        return;
    }

    bookings.push({ room, date, reason });
    saveBookings();
    renderBookings();
}

function renderBookings() {
    const list = document.getElementById("bookingList");
    if (!list) return;

    const today = new Date().toISOString().split("T")[0];

    const past = bookings.filter(b => b.date < today);
    const current = bookings.filter(b => b.date >= today);

    list.innerHTML = `
        <h3>Current Bookings</h3>
        ${current.map(b => `
            <li>
                <strong>${b.room}</strong> — ${b.date}<br>
                <em>${b.reason}</em>
            </li>
        `).join("")}

        <h3>Past Bookings</h3>
        ${past.map(b => `
            <li>
                <strong>${b.room}</strong> — ${b.date}<br>
                <em>${b.reason}</em>
            </li>
        `).join("")}
    `;
}

renderBookings();

