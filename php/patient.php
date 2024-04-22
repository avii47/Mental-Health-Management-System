<?php
include('connection.php');

//get patient information
if (isset($_POST['myData']) && !isset($_POST['date'])) {

    session_start();

    if (!isset($_SESSION['patient'])) {
        echo ('logout');
        exit();
    }
    
    $id = $_SESSION['patient'];

    // Create and execute the query
    $sql = "SELECT * FROM patients_info_tbl WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id); // "i" indicates an integer
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Loop through the rows of data
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
        'contactno1' => $contactno1,    
        'contactno2' => $contactno2,
        'username' => $un,
        'password' => $pw,
        'img' => $img,
        'docId' => $docId
    );

    $response = json_encode($responseData);
    header('Content-Type: application/json');
    echo $response;

    $stmt->close();

} else {
    // Handle the case where 'myData' key is not found in POST data
    //echo "Data not found in POST request.";
}

//get the daily scores
if (isset($_POST['date']) && isset($_POST['activity'])) {

    $pid = $_POST['pid'];
    $date = date('m/d/Y'); 

    $sql = "SELECT daily_score, question1, question2, question3, question4, question5 FROM activity_scores_tbl WHERE pid = '$pid' AND date = '$date'";
    $result = $conn->query($sql);
    
    while ($row = $result->fetch_assoc()) {
        $score = $row;
    }
    echo json_encode($score);
}

//get next therapy dates
if (isset($_POST['pid']) && isset($_POST['therapy'])) {

    $pid = $_POST['pid'];

    $sql = "SELECT * FROM therapy_sessions_tbl WHERE pid = '$pid'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1){
        while ($row = $result->fetch_assoc()) {
            $data = $row;
        }
        echo json_encode($data);
    }
    else{
        echo("notFound");
    }
    
    
}

$conn->close();
?>

