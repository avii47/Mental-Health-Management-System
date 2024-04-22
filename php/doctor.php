<?php
include('connection.php');

if (isset($_POST['docId']) && isset($_POST['type'])) {

    if($_POST['type'] == 'docAccess'){

        session_start();
        if (!isset($_SESSION['doctor'])) {
            echo ('logout');
            exit();
        }
        $id = $_SESSION['doctor'];
    }
    elseif ($_POST['type'] == 'patintAccess'){
        $id = $_POST['docId'];
    }
    
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
            $un = $row["username"];
            $pw = $row["password"];
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
        'username' => $un,
        'password' => $pw,
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

} else {
    // Handle the case where 'myData' key is not found in POST data
    //echo "Data not found in POST request.";
}
$conn->close();
?>