<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET['type']) && isset($_GET['docId'])) {

        $docId = $_GET['docId'];
        $pids = array();

        $sql = "SELECT pid FROM patient_requests_tbl WHERE docId = '$docId'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            
            while ($row = $result->fetch_assoc()) {
                $pids[] = $row['pid'];
            }

        } else {
            echo "No data found.";
        }

        // Filter out non-string elements and convert remaining elements to strings
        $filteredArray = array_filter($pids, 'is_string');
        $commaSeparatedValues = "'" . implode("','", $filteredArray) . "'";

        $sql2 = "SELECT * FROM patients_info_tbl WHERE id IN ($commaSeparatedValues) AND docId = 0";

        $result2 = $conn->query($sql2);

        if ($result2->num_rows > 0) {
            $tableData = array();
            $pids = array();

            while ($row = $result2->fetch_assoc()) {
                $tableData[] = $row; 
            }

            echo json_encode($tableData);
        } else {
            echo "No data found.";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (!isset($_POST['type']) && isset($_POST['pid'])) {

        $pid = $_POST['pid'];
    
        $sql = "SELECT * FROM patients_info_tbl WHERE id = '$pid' AND docId = 0";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Retrieve data from the database
                $name1 = $row["firstName"];
                $name2 = $row["lastName"];
                $dob = $row["birthday"];
                $age = $row["age"];
                $gender = $row["gender"];
                $address = $row["address"];
                $email = $row["eMail"];
                $contactno1 = $row["contactNo1"];
                $contactno2 = $row["contactNo2"];
                $un = $row["username"];
                $pw = $row["password"];
                $img = $row["userImage"];
                $docId = $row["docId"];
            }

        } else {
            echo "No data found.";
        }

        $responseData = array(
            'id' => $pid,
            'name1' => $name1,
            'name2' => $name2,
            'dob' => $dob,
            'age' => $age,
            'gender' => $gender,
            'address' => $address,
            'email' => $email,
            'contactno1' => $contactno1,    
            'contactno2' => $contactno2,
            'username' => $un,
            'password' => $pw,
            'img' => $img
        );
    
        $response = json_encode($responseData);
        header('Content-Type: application/json');
        echo $response;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if (isset($_GET['pid']) && isset($_GET['docId']) && !isset($_GET['type'])) {

        $pid = $_GET['pid'];
        $docId = $_GET['docId'];

        $sql1 = "UPDATE patients_info_tbl SET docId = '$docId' WHERE id = '$pid' AND docId = 0";
        $sql2 = "DELETE FROM patient_requests_tbl WHERE pid = '$pid'";
        
        if ($conn->query($sql1) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
        if ($conn->query($sql2) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    }
}
