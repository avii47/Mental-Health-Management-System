<?php
include('connection.php');
date_default_timezone_set('Asia/Colombo');
// Calculate two minutes ago
$twoMinutesAgo = date('Y-m-d H:i:s', strtotime('-2 minutes'));

// Update records where insertionTime is older than two minutes   WHERE sendTime <= '$twoMinutesAgo'
$updateSql = "UPDATE users SET status2 = 'dead'";
$conn->query($updateSql); 

// Close the database connection
$conn->close();
?>