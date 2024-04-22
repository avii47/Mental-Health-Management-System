<?php
include('connection.php');

// Check if the user is already logged in, redirect if true
if (isset($_SESSION['user'])) {
    echo json_encode($id);
    exit();
}

$username = $_POST['username'];
$password = $_POST['password'];
$userRole = $_POST['userRole'];

if($userRole == 'patient'){
    $query = "SELECT id FROM patients_info_tbl WHERE username = '$username' AND password = '$password'";
}
else if($userRole == 'doctor'){
    $query = "SELECT id FROM doctors_info_tbl WHERE username = '$username' AND password = '$password'";
}

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) == 1) {
    if ($row = mysqli_fetch_assoc($result)) {
        $id = $row['id'];

    } else {
    }

    echo json_encode($id);

    if($userRole == 'patient'){
        session_start();
        $_SESSION['patient'] = $id;
    }
    else if($userRole == 'doctor'){
        session_start();
        $_SESSION['doctor'] = $id;
    }
    

} else {
    echo json_encode("Invalid");
}
mysqli_close($conn);
?>

