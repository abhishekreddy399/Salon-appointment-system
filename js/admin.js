fetch("../api/bookings/list_admin.php")
.then(res => res.json())
.then(data => {
    let html = "<h3>All Bookings</h3>";
    data.forEach(b => {
        html += `<div>
            ${b.customer} booked ${b.service} on ${b.booking_date} — ${b.status}
        </div>`;
    });
    document.getElementById("bookings").innerHTML = html;
});
