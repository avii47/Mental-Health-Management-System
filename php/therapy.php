<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if(isset($_POST["pid"]) && isset($_POST["startTime"]) && $_POST["type"] == 'changeRequest'){

        $sid = $_POST["sid"];
        $pid = $_POST["pid"];
        $docId = $_POST["docId"];
        $date = $_POST['date'];
        $startTime = $_POST['startTime'];
        $endTime = $_POST['endTime'];

        $sql = "SELECT * FROM therapy_settings_tbl WHERE pid = '$pid' AND docId = '$docId' AND startTime = '$startTime' AND endTime = '$endTime'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo "already exists";

        } else {
        // Date doesn't exist; perform an insert
            $insertSql = "INSERT INTO therapy_settings_tbl (sid, pid, docId, date, startTime, endTime) VALUES ('$sid', '$pid', '$docId', '$date', '$startTime', '$endTime')";
            if ($conn->query($insertSql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error inserting record: " . $conn->error;
            }
        }  
    } 

    //update the therapy date by doctor
    if($_POST["type"] == 'changeDate'){
        
        $pid = $_POST["pid"];
        $docId = $_POST["docId"];
        $date = $_POST['date'];
        $startTime = $_POST['startTime'];
        $endTime = $_POST['endTime'];

        $sql = "UPDATE therapy_sessions_tbl SET date = '$date', startTime = '$startTime', endTime = '$endTime' WHERE docId = '$docId' AND pid = '$pid' AND status = 'pending'";
        if ($conn->query($sql) === TRUE) {
            echo "updated successfully";
        } else {
            echo "Error inserting record: " . $conn->error;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["pid"]) && isset($_GET["docId"])){

    $pid = $_GET["pid"]; 
    $docId = $_GET["docId"]; 

    $sql = "SELECT * FROM therapy_settings_tbl WHERE pid = '$pid' AND docId = '$docId'";

    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) { 

        $tableData = array();
        
        while ($row = $result->fetch_assoc()) {
            $tableData[] = $row;
        } 
        echo json_encode($tableData); 
    } else {
        echo "No data found.";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") { 
    if(isset($_GET["docId"]) && !isset($_GET["pid"])){

        $docId = $_GET["docId"];

        //$sql = "SELECT * FROM therapy_sessions_tbl WHERE docId = '$docId' AND status = 'pending'";
        $sql = "SELECT th.*, pi.firstName, pi.lastName, pi.userImage FROM therapy_sessions_tbl th LEFT JOIN patients_info_tbl pi ON th.pid = pi.id WHERE th.docId = '$docId' AND th.status = 'pending'";

        $result = $conn->query($sql);
    
        if ($result->num_rows > 0) { 

            $tableData = array();
        
            while ($row = $result->fetch_assoc()) {
                $tableData[] = $row;
            } 
            echo json_encode($tableData); 
        } else {
            echo "No data found.";
        }
    }
}

//get therapy data by session id 
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["sid"])){

    $sid = $_GET["sid"]; 

    $sql = "SELECT * FROM therapy_sessions_tbl WHERE sid = '$sid'";

    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) { 

        $tableData = array();
        
        while ($row = $result->fetch_assoc()) {
            $tableData[] = $row;
        } 
        echo json_encode($tableData); 
    } else {
        echo "No data found.";
    }
}

?>