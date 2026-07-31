function checkAccess() {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    if (!role || !username) {
        location.href = "index.html";
        return;
    }

    // Hide teacher-only sections for students
    if (location.pathname.includes("dashboard.html")) {
        if (role === "student") {
            const eventSection = document.getElementById("teacherEventSection");
            if (eventSection) eventSection.style.display = "none";
        }
    }

    if (location.pathname.includes("bookings.html")) {
        if (role === "student") {
            const bookingSection = document.getElementById("teacherBookingSection");
            if (bookingSection) bookingSection.style.display = "none";
        }
    }
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    location.href = "index.html";
}


