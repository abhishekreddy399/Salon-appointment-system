<?php
header("Content-Type: application/json");
require "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$password = password_hash($data["password"], PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO users(name,email,password) VALUES (?,?,?)");
$stmt->bind_param("sss", $name, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["message" => "Registration successful"]);
} else {
    echo json_encode(["error" => "Email already exists"]);
}
?>
