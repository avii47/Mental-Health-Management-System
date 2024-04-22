<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_POST['pid'])) {

        $pid = $_POST['pid'];
    
        $sql = "SELECT * FROM monthly_progress_tbl WHERE pid = $pid";
    
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

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET['pid'])) {

        $pid = $_GET['pid'];
        
        $sql = "SELECT * FROM activity_scores_tbl WHERE pid = $pid";
    
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

$conn->close();

?>