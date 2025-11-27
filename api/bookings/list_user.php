<?php
header("Content-Type: application/json");
require "../../config/db.php";

$user_id = $_GET["user_id"];

$q = $conn->prepare(
"SELECT b.id, s.name, b.booking_date, b.status 
 FROM bookings b 
 JOIN services s ON b.service_id = s.id 
 WHERE user_id=?"
);

$q->bind_param("i", $user_id);
$q->execute();
$result = $q->get_result();

$data = [];
while($row = $result->fetch_assoc()) { $data[] = $row; }

echo json_encode($data);
?>
