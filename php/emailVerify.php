<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["type"] == "verifyEmail") {
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $randomNumber = rand(100000, 999999);
    $otp = (string)$randomNumber;
    date_default_timezone_set('Asia/Colombo');
    $currentTime = date('H:i:s'); 

    $logoUrl = 'https://drive.google.com/uc?id=1kSd3KL8BniolKSE7MpLZ9xAo1xxXd_93';

    // SQL Check statement
    $sql1 = "SELECT eMail FROM patients_info_tbl WHERE eMail = '$email'";

    $result1 = mysqli_query($conn, $sql1);

    if (mysqli_num_rows($result1) == 0) {
        
        // SQL INSERT statement
        $sql2 = "INSERT INTO emailVerifying (email, verification_code, status2) VALUES ('$email', '$otp', 'alive')";

        if ($conn->query($sql2) === TRUE) {
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
                    <h2>Hello, {$name} This is from Brainstorm.</h2>
                    <p class='bodyText'>Your account registration is successfully done! <br>Now activate your account with OTP:</p>
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

    } else {
        echo "used";
    } 
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {

    $email = $_GET["email"];
    $otp = $_GET["otp"];
    $status = "alive";

    $sql = "SELECT sendTime FROM emailVerifying WHERE email = ? AND verification_code = ? AND status2 = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $email, $otp, $status);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        if ($row = $result->fetch_assoc()) {
            echo json_encode("Valid");
        }
    } else {
        echo json_encode("Invalid");
    }
}

mysqli_close($conn);

?>
