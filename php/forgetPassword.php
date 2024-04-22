<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if($_POST["type"] == 'checkUN'){

        $username = $_POST["username"];
        $userRole = $_POST['userRole'];
        setcookie('userRole', $userRole, time() + 3600, '/');

        if($userRole == 'patient'){
            $query = "SELECT eMail,id FROM patients_info_tbl WHERE username = '$username'";
        }
        else if($userRole == 'doctor'){
            $query = "SELECT eMail,id FROM doctors_info_tbl WHERE username = '$username'";
        }
        
        $result = mysqli_query($conn, $query);
        
        if (mysqli_num_rows($result) == 1) {
            if ($row = mysqli_fetch_assoc($result)) {
                $email = $row['eMail'];
                setcookie('id2rs', $row['id'], time() + 3600, '/');
        
            } else {
                echo ("Invalid");
            }
        
            echo ($email);
        
        } else {
            echo ("Invalid");
        }
    }
}

//send OTP to email
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["type"] == "resetEmail") {

    $id = $_COOKIE['id2rs'];
    $userRole = $_COOKIE['userRole'];
    $email = $_POST["email"];
    $randomNumber = rand(100000, 999999);
    $otp = (string)$randomNumber;

    $logoUrl = 'https://drive.google.com/uc?id=1kSd3KL8BniolKSE7MpLZ9xAo1xxXd_93';

    // SQL INSERT statement
    $sql = "INSERT INTO pw_reset_tbl (id, userRole, email, OTP, status1) VALUES ('$id', '$userRole', '$email', '$otp', 'alive')";

    if ($conn->query($sql) === TRUE) {
        $success = true;
    
    } else {
        $errorMessage = "Please provide valid data.";
    }

    $recipient = $_POST['email'];
    $subject = "Account Activation";

    $message = "
            <html>
            <head>
                <style>
                    /* Add any additional styles here */
                    body {
                        font-family: 'Arial', sans-serif;
                    }
                    .logo {
                        max-width: 200px;
                    }
                    .bodyText{
                        font-size: 20px;
                        font-weight: 500;
                    }
                    .otp {
                        font-size: 40px; 
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <img src='{$logoUrl}' alt='Company Logo' class='logo'>
                <h2>Hello, This is from Brainstorm.</h2>
                <p class='bodyText'>This is your OTP to reset password:</p>
                <p class='otp'>{$otp}</p>
            
            </body>
            </html>
    ";
             
    // Additional headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Brainstorm009@gmail.com";

    mail($recipient, $subject, $message, $headers);
    echo "success";
}

//check OTP is matching or not
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $email = $_GET["email"];
    $otp = $_GET["otp"];
    $status = "alive";

    $sql = "SELECT sendTime FROM pw_reset_tbl WHERE email = ? AND OTP = ? AND status1 = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $email, $otp, $status);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        if ($row = $result->fetch_assoc()) {
            echo ("Valid");
        }
    } else {
        echo ("Invalid");
    }
}

//reset the password
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["type"] == "resetPassword") {

    $id = $_COOKIE['id2rs'];
    $userRole = $_COOKIE['userRole'];
    $password = $_POST['password'];

    if($userRole == 'patient'){
        $query = "UPDATE patients_info_tbl SET password = '$password' WHERE id = '$id'";
    }
    else if($userRole == 'doctor'){
        $query = "UPDATE doctors_info_tbl SET password = '$password' WHERE id = '$id'";
    }

    if ($conn->query($query) === TRUE) {
        echo "success";
    
    } else {
        $errorMessage = "Please provide valid data.";
    }
}