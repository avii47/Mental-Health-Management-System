<?php 

$role = $_POST['role'];

if($role == 'patient') {

    session_start();
    // Destroy the session
    session_destroy();

    echo json_encode("session_destroyed");
}
else if($role == 'doctor') {
    
    session_start();
    // Destroy the session
    session_destroy();

    echo json_encode("session_destroyed");
}

exit();
?>