<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
 
    if (isset($_POST['sender']) && isset($_POST['pid'])) {
        $sender = $_POST['sender'];
        $pid = $_POST['pid'];
        $docId = $_POST['docId'];
        $content = $_POST['content'];

        if($sender == 'patient'){
            $sql = "INSERT INTO patient_doc_msg_tbl(pid, docId, patientMsg) VALUES ('$pid', '$docId', '$content')";
        }
        else if($sender == 'doctor'){
            $sql = "INSERT INTO patient_doc_msg_tbl(pid, docId, docMsg) VALUES ('$pid', '$docId', '$content')";
        }
        
        if ($conn->query($sql) === TRUE) {
            echo "Message sent";
        } else {
            $errorMessage = "Please provide valid data.";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
 
    if (isset($_GET['receiver']) && isset($_GET['pid'])) { 

        $receiver = $_GET['receiver'];
        $pid = $_GET['pid'];
        $docId = $_GET['docId'];

        if($receiver == 'patient'){
            $sql = "SELECT * FROM patient_doc_msg_tbl WHERE pid = '$pid' AND docId = '$docId'";
        }
        else if($receiver == 'doctor'){
            $sql = "SELECT * FROM patient_doc_msg_tbl WHERE pid = '$pid' AND docId = '$docId'";
        }
        
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

