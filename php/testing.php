<?php
include('connection.php');

$sql = "SELECT * FROM testings";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $tableData = array();

    while ($row = $result->fetch_assoc()) {
        $tableData[] = $row;
    }

    $conn->close();

    echo json_encode($tableData);
    
} else {
    echo "No data found.";
}

?>
