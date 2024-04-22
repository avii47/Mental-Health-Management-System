<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET['type']) && isset($_GET['docId'])) {

        $docId = $_GET['docId'];
    
        $sql = "SELECT * FROM patients_info_tbl WHERE docId = '$docId'";
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

?>