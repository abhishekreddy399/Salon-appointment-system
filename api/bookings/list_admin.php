<?php
header("Content-Type: application/json");
require "../../config/db.php";

$q = $conn->query(
"SELECT b.id, u.name AS customer, s.name AS service, b.booking_date, b.status
 FROM bookings b
 JOIN users u ON b.user_id = u.id
 JOIN services s ON b.service_id = s.id"
);

$data = [];
while($row = $q->fetch_assoc()) { $data[] = $row; }

echo json_encode($data);
?>
