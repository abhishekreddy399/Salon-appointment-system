const user = JSON.parse(localStorage.getItem("user"));

fetch("../api/services/list.php")
.then(res => res.json())
.then(data => {
    let html = "<h3>Services</h3>";
    data.forEach(s => {
        html += `<div>
            <strong>${s.name}</strong> — Rs.${s.price}
            <button onclick="selectService(${s.id})">Select</button>
        </div>`;
    });
    document.getElementById("services").innerHTML = html;
});

let selectedService = null;

function selectService(id) {
    selectedService = id;
    alert("Service selected!");
}

function book() {
    fetch("../api/bookings/create.php", {
        method: "POST",
        body: JSON.stringify({
            user_id: user.id,
            service_id: selectedService,
            booking_date: document.getElementById("date").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}
