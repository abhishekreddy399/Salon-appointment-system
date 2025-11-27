<?php
header("Content-Type: application/json");
require "../../config/db.php";

$q = $conn->query("SELECT * FROM services");
$data = [];

while($row = $q->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
