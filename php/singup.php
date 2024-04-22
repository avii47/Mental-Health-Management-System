
<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $firstName = $_POST["first_name"];
    $lastName = $_POST["last_name"];
    $birthday = $_POST["dob"];
    $age = $_POST["age"];
    $gender = $_POST["gender"];
    $email = $_POST["email"];
    $contact1 = $_POST["contact1"];
    $userName = $_POST["username"];
    $password = $_POST["password"];
    $defaultImg = "uploads/default user icon.png";
    $userRole = $_POST["userRole"];

    if($userRole == "patient") {
        $sql1 = "SELECT id FROM patients_info_tbl WHERE username = '$userName' AND password = '$password'";
    }
    elseif($userRole == "doctor") {
        $sql1 = "SELECT id FROM doctors_info_tbl WHERE username = '$userName' AND password = '$password'";
    }

    // SQL Check statement
    

    $result1 = mysqli_query($conn, $sql1);

    if (mysqli_num_rows($result1) == 0) {

        if($userRole == "patient") { $data = 'success';
            $sql = "INSERT INTO patients_info_tbl (firstName, lastName, birthday, age, gender, eMail, contactNo1, username, password, userImage, docId)
            VALUES ('$firstName', '$lastName', '$birthday', $age, '$gender', '$email', '$contact1', '$userName', '$password', '$defaultImg', 0)";
        }
        elseif($userRole == "doctor") {
            $sql = "INSERT INTO doctors_info_tbl (firstName, lastName, birthday, age, gender, email, contactNo, username, password, userImage)
            VALUES ('$firstName', '$lastName', '$birthday', $age, '$gender', '$email', '$contact1', '$userName', '$password', '$defaultImg')";
        }

        if ($conn->query($sql) === TRUE) {
            $data = 'success';
        } else {
            $errorMessage = "Please provide valid data.";
        }
        echo json_encode($data);
    }
    else{
        $data = 'used';
        echo json_encode($data);
    }
    
    //$sql = "INSERT INTO patients_info_tbl (firstName, lastName, birthday, age, gender, address, eMail, contactNo1, contactNo2, username, password, userImage)
           // VALUES ('$firstName', '$lastName', '$birthday', $age, '$gender', '$address', '$email', '$contact1', '$contact2', '$userName', '$password', '$defaultImg')";

    
}
mysqli_close($conn);

?>




