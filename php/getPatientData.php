<?php
include('connection.php');

//get patient information
if (isset($_POST['myData'])) {
    
    $id = $_POST['myData'];

    $sql1 = "SELECT * FROM patients_info_tbl WHERE id = ?";
    $sql2 = "SELECT * FROM user_disorder_tbl WHERE pid = ?";

    $stmt1 = $conn->prepare($sql1);
    $stmt1->bind_param("i", $id); 
    $stmt1->execute();
    $result1 = $stmt1->get_result();

    if ($result1->num_rows == 1) {
        // Loop through the rows of data
        while ($row = $result1->fetch_assoc()) {
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

    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $id); 
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows == 1) {
        // Loop through the rows of data
        while ($row = $result2->fetch_assoc()) {
            // Retrieve data from the database
            $disorderList = $row['disorderList'];
            $primaryConcern = $row['primaryConcern'];
            $diagnosis = $row['diagnosis'];
            $symptoms = $row['symptoms'];
            $treatmentPlan = $row['treatmentPlan'];
            $additionalNotes = $row['additionalNotes'];
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
        'disorderList' => $disorderList,
        'primaryConcern' => $primaryConcern,
        'diagnosis' => $diagnosis,
        'symptoms' => $symptoms,
        'treatmentPlan' => $treatmentPlan,
        'additionalNotes' => $additionalNotes
    );

    $response = json_encode($responseData);
    header('Content-Type: application/json');
    echo $response;

    $stmt1->close();
    $stmt2->close();

} else {
    // Handle the case where 'myData' key is not found in POST data
    //echo "Data not found in POST request.";
}

//update patient medical information
if (isset($_POST['pid'])) {
    
    $pid = $_POST['pid'];
    $disorderList = $_POST['disorderList'];
    $primaryConcern = $_POST['primaryConcern'];
    $diagnosis = $_POST['diagnosis'];
    $symptoms = $_POST['symptoms'];
    $treatmentPlan = $_POST['treatmentPlan'];
    $additionalNotes = $_POST['additionalNotes'];

    $sql = "SELECT * FROM user_disorder_tbl WHERE pid = '$pid'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Date exists; perform an update
        $updateSql = "UPDATE user_disorder_tbl SET disorderList = '$disorderList', primaryConcern = '$primaryConcern', diagnosis = '$diagnosis', symptoms = '$symptoms', treatmentPlan = '$treatmentPlan', additionalNotes = '$additionalNotes' WHERE pid = '$pid'";
        if ($conn->query($updateSql) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        // Date doesn't exist; perform an insert
        $insertSql = "INSERT INTO user_disorder_tbl (pid, disorderList, primaryConcern, diagnosis, symptoms, treatmentPlan, additionalNotes) VALUES ('$pid', '$disorderList', '$primaryConcern', '$diagnosis', '$symptoms', '$treatmentPlan', '$additionalNotes')";
        if ($conn->query($insertSql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error inserting record: " . $conn->error;
        }
    }
}

$conn->close();
?>

