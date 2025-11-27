<?php
header("Content-Type: application/json");
require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$service_id = $data["service_id"];
$booking_date = $data["booking_date"];

$stmt = $conn->prepare("INSERT INTO bookings(user_id,service_id,booking_date) VALUES (?,?,?)");
$stmt->bind_param("iis", $user_id, $service_id, $booking_date);

if ($stmt->execute()) {
    echo json_encode(["message" => "Booking created"]);
} else {
    echo json_encode(["error" => "Failed to book"]);
}
?>
