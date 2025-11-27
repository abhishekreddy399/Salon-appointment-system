/* ---------------- MOCK SERVICE DATA ---------------- */
const services = [
    { id: 1, name: "Haircut & Styling", price: 200, duration: "30 minutes", icon: "fas fa-cut" },
    { id: 2, name: "Facial Treatment", price: 500, duration: "45 minutes", icon: "fas fa-spa" },
    { id: 3, name: "Massage Therapy", price: 1200, duration: "60 minutes", icon: "fas fa-hands" },
    { id: 4, name: "Manicure & Pedicure", price: 600, duration: "45 minutes", icon: "fas fa-hand-sparkles" },
    { id: 5, name: "Hair Coloring", price: 800, duration: "90 minutes", icon: "fas fa-palette" },
    { id: 6, name: "Skin Care", price: 700, duration: "50 minutes", icon: "fas fa-leaf" }
];

const bookings = [];
let selectedService = null;
let selectedDate = null;
let selectedTime = null;

/* ---------------- SCREEN SWITCHER ---------------- */
function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    
    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    document.querySelector(`.nav-link[onclick="showScreen('${id}')"]`).classList.add("active");
    
    // Load specific screen data
    if (id === 'customerDashboard') {
        loadServices();
    } else if (id === 'adminDashboard') {
        loadAdminBookings();
        updateAdminStats();
    }
}

/* ---------------- TOAST ---------------- */
function toast(msg, type = 'info') {
    let t = document.getElementById("toast");
    t.innerHTML = msg;
    t.classList.add("show");
    
    // Set different colors based on type
    if (type === 'success') {
        t.style.background = '#2ecc71';
    } else if (type === 'error') {
        t.style.background = '#e74c3c';
    } else if (type === 'warning') {
        t.style.background = '#f39c12';
    } else {
        t.style.background = '#34495e';
    }
    
    setTimeout(() => t.classList.remove("show"), 3000);
}

/* ---------------- LOGIN MOCK ---------------- */
function fakeLogin() {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
    
    if (!email || !password) {
        toast("Please enter both email and password", "error");
        return;
    }
    
    toast("Login Successful!", "success");
    showScreen("customerDashboard");
}

/* ---------------- LOAD SERVICES ---------------- */
function loadServices() {
    let list = document.getElementById("services");
    list.innerHTML = "";

    services.forEach(s => {
        list.innerHTML += `
            <div class="service-card" onclick="selectService(${s.id})">
                <div class="service-icon">
                    <i class="${s.icon}"></i>
                </div>
                <div class="service-name">${s.name}</div>
                <div class="service-price">₹${s.price}</div>
                <div class="service-duration">${s.duration}</div>
            </div>
        `;
    });
}

/* ---------------- SELECT SERVICE ---------------- */
function selectService(id) {
    // Remove selected class from all service cards
    document.querySelectorAll(".service-card").forEach(card => {
        card.classList.remove("selected");
    });
    
    // Add selected class to clicked card
    event.currentTarget.classList.add("selected");
    
    selectedService = services.find(s => s.id === id);
    document.getElementById("selectedServiceName").textContent = selectedService.name;
    document.getElementById("selectedServicePrice").textContent = selectedService.price;
    document.getElementById("selectedServiceDuration").textContent = selectedService.duration;
    
    // Show booking form
    document.getElementById("bookingCard").classList.add("active");
    
    // Generate calendar and time slots
    generateCalendar();
    generateTimeSlots();
    
    toast("Service Selected! Now choose date and time.", "success");
}

/* ---------------- GENERATE CALENDAR ---------------- */
function generateCalendar() {
    const calendar = document.getElementById("datePicker");
    calendar.innerHTML = "";
    
    // Add calendar headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        calendar.innerHTML += `<div class="calendar-header">${day}</div>`;
    });
    
    // Get current date
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div class="calendar-day disabled"></div>`;
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = i === today.getDate() && currentMonth === today.getMonth();
        const isPast = date < today && !isToday;
        
        calendar.innerHTML += `
            <div class="calendar-day ${isPast ? 'disabled' : ''} ${isToday ? 'selected' : ''}" 
                 onclick="${isPast ? '' : `selectDate(${i})`}">
                ${i} ${isToday ? '<br><small>Today</small>' : ''}
            </div>
        `;
    }
    
    // Set today as default selected date
    if (selectedDate === null) {
        selectedDate = today.getDate();
    }
}

/* ---------------- SELECT DATE ---------------- */
function selectDate(day) {
    // Remove selected class from all days
    document.querySelectorAll(".calendar-day").forEach(dayEl => {
        dayEl.classList.remove("selected");
    });
    
    // Add selected class to clicked day
    event.currentTarget.classList.add("selected");
    
    selectedDate = day;
    
    // Regenerate time slots for the selected date
    generateTimeSlots();
    
    toast(`Date selected: ${getFormattedDate(day)}`, "success");
}

/* ---------------- GENERATE TIME SLOTS ---------------- */
function generateTimeSlots() {
    const timeSlots = document.getElementById("timeSlots");
    timeSlots.innerHTML = "";
    
    // Generate time slots from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
        // Only show full hours
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.innerHTML += `
            <div class="time-slot" onclick="selectTime('${timeString}')">
                ${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}
            </div>
        `;
    }
    
    selectedTime = null;
}

/* ---------------- SELECT TIME ---------------- */
function selectTime(time) {
    // Remove selected class from all time slots
    document.querySelectorAll(".time-slot").forEach(slot => {
        slot.classList.remove("selected");
    });
    
    // Add selected class to clicked time slot
    event.currentTarget.classList.add("selected");
    
    selectedTime = time;
    toast(`Time selected: ${time}`, "success");
}

/* ---------------- GET FORMATTED DATE ---------------- */
function getFormattedDate(day) {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/* ---------------- CONFIRM BOOKING ---------------- */
function confirmBooking() {
    if (!selectedService) {
        toast("Please select a service first", "error");
        return;
    }
    
    if (!selectedDate) {
        toast("Please select a date", "error");
        return;
    }
    
    if (!selectedTime) {
        toast("Please select a time", "error");
        return;
    }
    
    const specialRequests = document.getElementById("specialRequests").value;
    
    // Create booking object
    const booking = {
        id: bookings.length + 1,
        service: selectedService.name,
        price: selectedService.price,
        date: getFormattedDate(selectedDate),
        time: selectedTime,
        customer: "John Doe", // In a real app, this would come from user data
        specialRequests: specialRequests,
        status: "confirmed",
        bookingDate: new Date().toLocaleString()
    };
    
    bookings.push(booking);
    
    // Reset form
    document.getElementById("bookingCard").classList.remove("active");
    document.querySelectorAll(".service-card").forEach(card => {
        card.classList.remove("selected");
    });
    document.getElementById("specialRequests").value = "";
    selectedService = null;
    selectedDate = null;
    selectedTime = null;
    
    toast("Appointment Booked Successfully!", "success");
    
    // Update admin dashboard if needed
    if (document.getElementById("adminDashboard").classList.contains("active")) {
        loadAdminBookings();
        updateAdminStats();
    }
}

/* ---------------- ADMIN BOOKINGS LIST ---------------- */
function loadAdminBookings() {
    let box = document.getElementById("adminBookings");
    box.innerHTML = "";

    if (bookings.length === 0) {
        box.innerHTML = "<p style='text-align: center; padding: 20px;'>No bookings yet.</p>";
        return;
    }

    bookings.forEach(b => {
        const statusClass = `status-${b.status}`;
        box.innerHTML += `
            <div class="booking-item">
                <div class="booking-info">
                    <h4>${b.service}</h4>
                    <p class="booking-meta">
                        <strong>${b.customer}</strong> • ${b.date} at ${b.time} • ₹${b.price}
                    </p>
                    ${b.specialRequests ? `<p><small>Special Requests: ${b.specialRequests}</small></p>` : ''}
                    <p><small>Booked on: ${b.bookingDate}</small></p>
                </div>
                <div class="booking-actions">
                    <span class="status-badge ${statusClass}">${b.status}</span>
                    <button class="btn btn-outline" onclick="editBooking(${b.id})">Edit</button>
                    <button class="btn" onclick="cancelBooking(${b.id})">Cancel</button>
                </div>
            </div>
        `;
    });
}

/* ---------------- UPDATE ADMIN STATS ---------------- */
function updateAdminStats() {
    document.getElementById("totalBookings").textContent = bookings.length;
    
    const confirmed = bookings.filter(b => b.status === "confirmed").length;
    document.getElementById("confirmedBookings").textContent = confirmed;
    
    const pending = bookings.filter(b => b.status === "pending").length;
    document.getElementById("pendingBookings").textContent = pending;
    
    const revenue = bookings.reduce((total, b) => total + b.price, 0);
    document.getElementById("revenue").textContent = `₹${revenue}`;
}

/* ---------------- EDIT BOOKING ---------------- */
function editBooking(id) {
    toast(`Editing booking #${id}`, "warning");
    // In a real app, this would open a modal with the booking details
}

/* ---------------- CANCEL BOOKING ---------------- */
function cancelBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
        booking.status = "cancelled";
        loadAdminBookings();
        updateAdminStats();
        toast(`Booking #${id} has been cancelled`, "success");
    }
}

// Initialize the app
window.onload = function() {
    loadServices();
    // Add some sample bookings for demo
    bookings.push({
        id: 1,
        service: "Haircut & Styling",
        price: 200,
        date: "June 15, 2023",
        time: "10:00",
        customer: "Jane Smith",
        specialRequests: "Short bob cut",
        status: "confirmed",
        bookingDate: "June 10, 2023, 2:30 PM"
    });
    
    bookings.push({
        id: 2,
        service: "Facial Treatment",
        price: 500,
        date: "June 18, 2023",
        time: "14:00",
        customer: "Robert Johnson",
        specialRequests: "",
        status: "pending",
        bookingDate: "June 12, 2023, 10:15 AM"
    });
};
