<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "appointment_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}
?>
