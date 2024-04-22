<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {  

    $pid = $_POST['pid'];
    $emotionalMarks = $_POST['emotionalMarks'];
    $interactionalMarks = $_POST['interactionalMarks'];
    $physicalMarks = $_POST['physicalMarks'];
    $medicalMarks = $_POST['medicalMarks'];
    $outsideMarks = $_POST['outsideMarks'];
    $dateToCheck = date('m/d/Y'); 
        
    $insertSql = "INSERT INTO annual_checkup_tbl (pid, date, emotionalMarks, interactionalMarks, physicalMarks, medicalMarks, outsideMarks) VALUES ('$pid', '$dateToCheck', '$emotionalMarks', '$interactionalMarks', '$physicalMarks', '$medicalMarks', '$outsideMarks')";
    if ($conn->query($insertSql) === TRUE) {
        echo "success";
    } else {
        echo "Error inserting record: " . $conn->error;
    }
    
}

$conn->close();
?>