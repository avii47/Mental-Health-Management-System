<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['pid']) && isset($_POST['date']) && isset($_POST['time']) && isset($_POST['title']) && isset($_POST['description'])){
        
        $pid = $_POST['pid'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql1 = "INSERT INTO patient_events_tbl (pid, date, time, title, description) VALUES ('$pid', '$date', '$time', '$title', '$description')";
        if (mysqli_query($conn, $sql1)) {
            echo "Event added successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    } 
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $pid = $_GET['pid'];

    $sql2 = "SELECT * FROM patient_events_tbl WHERE pid = '$pid'";

    $result = $conn->query($sql2);
    
    while ($row = $result->fetch_assoc()) {
        $tableData[] = $row;
    }

    echo json_encode($tableData);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['eid']) && isset($_POST['del'])) {

        $eid = $_POST['eid'];

        $sql3 = "DELETE FROM patient_events_tbl WHERE event_id = '$eid'";

        if ($conn->query($sql3) === TRUE) {
            echo "Record deleted successfully";
        } else {
            echo "Error deleting record: " . $conn->error;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['eid']) && isset($_POST['date']) && isset($_POST['time']) && isset($_POST['title']) && isset($_POST['description'])) {

        $eid = $_POST['eid'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "UPDATE patient_events_tbl SET date = ?, time = ?, title = ?, description = ? WHERE event_id = ?";
        $stmt = $conn->prepare($sql);

        $stmt->bind_param("ssssi", $date, $time, $title, $description, $eid);

        if ($stmt->execute()) {
            echo "Record updated successfully";
        } else {
            echo "Error: " . $stmt->error;
        }
    }
}
mysqli_close($conn);

?>