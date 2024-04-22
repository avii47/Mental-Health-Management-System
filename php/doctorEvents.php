<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['docId']) && isset($_POST['date']) && isset($_POST['time']) && isset($_POST['title']) && isset($_POST['description'])){
        
        $docId = $_POST['docId'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql1 = "INSERT INTO doctor_events_tbl (docId, date, time, title, description) VALUES ('$docId', '$date', '$time', '$title', '$description')";
        if (mysqli_query($conn, $sql1)) {
            echo "Event added successfully.";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    } 
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $docId = $_GET['docId'];

    $sql2 = "SELECT * FROM doctor_events_tbl WHERE docId = '$docId'";

    $result = $conn->query($sql2);
    
    while ($row = $result->fetch_assoc()) {
        $tableData[] = $row;
    }

    echo json_encode($tableData);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['eid']) && isset($_POST['del'])) {

        $eid = $_POST['eid'];

        $sql3 = "DELETE FROM doctor_events_tbl WHERE event_id = '$eid'";

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

        $sql = "UPDATE doctor_events_tbl SET date = ?, time = ?, title = ?, description = ? WHERE event_id = ?";
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