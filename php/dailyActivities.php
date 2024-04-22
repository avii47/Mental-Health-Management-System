<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    function generateUncommonNumbers($count) {
        if ($count > 100) {
            return "Count should not exceed 100 for a range of 1-100.";
        }
    
        $uncommonNumbers = [];
        while (count($uncommonNumbers) < $count) {
            $randomNumber = mt_rand(1, 100); 
            if (!in_array($randomNumber, $uncommonNumbers)) {
                $uncommonNumbers[] = $randomNumber;
            }
        }
        return $uncommonNumbers;
    }
    
    $tableData = array();
    $uncommonNumbers = generateUncommonNumbers(5);
    
    foreach($uncommonNumbers as $uncommonNumber) {
        $sql = "SELECT * FROM daily_activities_tbl WHERE id = $uncommonNumber";
        $result = $conn->query($sql);
    
        while ($row = $result->fetch_assoc()) {
            $tableData[] = $row;
        }
    }

    echo json_encode($tableData);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $pid = $_POST['pid'];
    $dailyActScore = $_POST['actScore'];
    $question = $_POST['question'];
    $dateToCheck = date('m/d/Y'); 

    switch ($question) {
        case 'Q1': 
            $col = 'question1';
            break;
        case 'Q2': 
            $col = 'question2';
            break;
        case 'Q3': 
            $col = 'question3';
            break; 
        case 'Q4': 
            $col = 'question4';
            break; 
        case 'Q5': 
            $col = 'question5';
            break;  
    }

    $sql = "SELECT * FROM activity_scores_tbl WHERE date = '$dateToCheck' AND pid = '$pid'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Date exists; perform an update
        $updateSql = "UPDATE activity_scores_tbl SET daily_score = '$dailyActScore', $col = 'done' WHERE date = '$dateToCheck'";
        if ($conn->query($updateSql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        // Date doesn't exist; perform an insert
        $insertSql = "INSERT INTO activity_scores_tbl (date, pid, daily_score, $col) VALUES ('$dateToCheck', '$pid', '$dailyActScore', 'done')";
        if ($conn->query($insertSql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error inserting record: " . $conn->error;
        }
    }
}

$conn->close();
?>