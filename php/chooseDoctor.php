<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    if ($_GET['type'] == 'docList') {

        $sql = "SELECT * FROM doctors_info_tbl";
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

    if ($_GET['type'] == 'docData') {

        $id = $_GET['docId'];

        $sql = "SELECT * FROM doctors_info_tbl WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {

            while ($row = $result->fetch_assoc()) {

                $name1 = $row["firstName"];
                $name2 = $row["lastName"];
                $dob = $row["birthday"];
                $age = $row["age"];
                $gender = $row["gender"];
                $address = $row["address"];
                $email = $row["email"];
                $contactno = $row["contactNo"];
                $img = $row["userImage"];
                $jobTitle = $row["jobTitle"];
                $hostpital = $row["hostpital"];
                $career = $row["career"];
                $experience = $row["experience"];
            }
        } else {
            echo "No results found for ID: " . $id;
        }

        $responseData = array(
            'id' => $id,
            'name1' => $name1,
            'name2' => $name2,
            'dob' => $dob,
            'age' => $age,
            'gender' => $gender,
            'address' => $address,
            'email' => $email,
            'contactno' => $contactno,
            'img' => $img,
            'jobTitle' => $jobTitle,
            'hostpital' => $hostpital,
            'career' => $career,
            'experience' => $experience
        );

        $response = json_encode($responseData);
        header('Content-Type: application/json');
        echo $response;

        $stmt->close();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($_POST['type'] == 'docRequest') {

        $pid = $_POST['pid'];
        $docId = $_POST['docId'];

        $sql = "INSERT INTO patient_requests_tbl (pid, docId) VALUES ('$pid', '$docId')";

        if ($conn->query($sql) === TRUE) {
            $data = 'success';
        } else {
            $errorMessage = "Please provide valid data.";
        }
        echo json_encode($data);
    }
}
