<?php
// Database configuration
$hostname = "localhost"; // Replace with your database host name
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$database = "patientDB"; // Replace with your database name

// Establish a database connection
$conn = mysqli_connect($hostname, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>