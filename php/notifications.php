<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['type'] == 'view') {
    // Fetch notifications from the database
    $sql = "SELECT * FROM notifications_tbl";
    $result = $conn->query($sql);

    // Check if any notifications were found
    if ($result->num_rows > 0) {
        // Store notifications in an array
        $notifications = array();
        while ($row = $result->fetch_assoc()) {
            $notifications[] = array(
                'id' => $row['id'],
                'title' => $row['title'],
                'message' => $row['message'],
                'type' => $row['type']
            );
        }

        echo json_encode($notifications);
    } else {
        // No notifications found
        echo "[]"; // Output an empty array if no notifications found
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['type'] == 'delete') { 

    $id = $_POST['id'];

    // Fetch notifications from the database
    $sql = "DELETE FROM notifications_tbl WHERE id = '$id'";
    
    if ($conn->query($sql) === TRUE) {
        $data = 'success';
    } else {
        $errorMessage = "Please provide valid data.";
    }
    echo $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST['type'] == 'add') {

    $title = $_POST['title']; 
    $message = $_POST['message'];
    $type = $_POST['ntype']; 

    // Fetch notifications from the database
    $sql2 = "INSERT INTO notifications_tbl(title,message,type) VALUES ('$title', '$message', '$type')";
    
    if ($conn->query($sql2) === TRUE) {
        $data = 'success';
    } else {
        $errorMessage = "Please provide valid data.";
    }
    echo $data;
}

// Close connection
$conn->close();
