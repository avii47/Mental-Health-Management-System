<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $id = $_POST["id"];
    $firstName = $_POST["first_name"];
    $lastName = $_POST["last_name"];
    $birthday = $_POST["datepicker"];
    $age = $_POST["age"];
    $gender = $_POST["gender"];
    $address = $_POST["address"];
    $email = $_POST["email"];
    $contact1 = $_POST["contact1"];
    $contact2 = $_POST["contact2"];
    $userName = $_POST["username"];
    $password = $_POST["password"];

    // Handle image upload
    if (!empty($_FILES["user_image"]["name"])) {
        $targetDirectory = "uploads/"; // Create a folder to store uploaded images
        $targetFile = $targetDirectory . basename($_FILES["user_image"]["name"]);

        if (move_uploaded_file($_FILES["user_image"]["tmp_name"], $targetFile)) {
            $imagePath = $targetFile; // Store the image path in the database
        } else {
            echo "Error uploading image.";
            exit;
        }
    } else {
        $sql = "SELECT userImage FROM doctors_info_tbl WHERE id = $id";
         $result = $conn->query($sql);
    
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $imagePath = $row["userImage"];
            }
        }
    }

    $sql = "UPDATE patients_info_tbl SET firstName = ?, lastName = ?, birthday = ?, age = ?, gender = ?, address = ?, eMail = ?, contactNo1 = ?, contactNo2 = ?, username = ?, password = ?, userImage = ? WHERE id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssssssi", $firstName, $lastName, $birthday, $age, $gender, $address, $email, $contact1, $contact2, $userName, $password, $imagePath, $id);

    if ($stmt->execute()) {
        echo "Update successful";
    } else {
        echo "Error updating record: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

?>