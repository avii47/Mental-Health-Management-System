<?php
include('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
 
    if (isset($_GET['pid']) && !isset($_GET['docId'])) {

        $pid = $_GET['pid'];

        $sql1 = "SELECT * FROM patients_info_tbl WHERE id = $pid";
        $sql2 = "SELECT * FROM user_disorder_tbl WHERE pid = $pid";
    
        $result1 = $conn->query($sql1);
    
        if ($result1->num_rows > 0) {

            $tableData1 = array();
        
            while ($row = $result1->fetch_assoc()) {
                $tableData1[] = $row;
            }  
        } else {
            echo "No data found.";
        }

        $result2 = $conn->query($sql2);

        if ($result2->num_rows > 0) {

            $tableData2 = array();
        
            while ($row = $result2->fetch_assoc()) {
                $tableData2[] = $row;
            }
            
        } else {
            
        }

        if (!empty($tableData2)) {  
            
            $firstRow = $tableData2[0]; 
            $disorderList = $firstRow['disorderList']; 

            $disorders = explode(',', $disorderList);

            if (count($disorders) == 1) {
                $disorder1 = trim($disorders[0]); 
                $sql = "SELECT about FROM disorder_tbl WHERE disorder_name = '$disorder1'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $tableData3 = array();
                    $columnNames = ['about1'];
                    while ($row = $result->fetch_assoc()) {
                        $rowData = array_values($row);
                        $combinedRow = array_combine($columnNames, $rowData);
                        $tableData3[] = $combinedRow;
                    }  
                } else {
                    echo "No data found.";
                }
                $about[0] = $tableData3[0];
            }

            if (count($disorders) == 2) {
                $disorder1 = trim($disorders[0]);  
                $disorder2 = trim($disorders[1]); 
                $sql = "SELECT about FROM disorder_tbl WHERE disorder_name = '$disorder1' OR disorder_name = '$disorder2'";
                $result = $conn->query($sql); 

                if ($result->num_rows > 0) {
                    $tableData3 = array();
                    $columnNames = ['about1'];
                    while ($row = $result->fetch_assoc()) {
                        $rowData = array_values($row);
                        $combinedRow = array_combine($columnNames, $rowData);
                        $tableData3[] = $combinedRow;
                        $columnNames = ['about2'];
                    }  
                } else {
                    echo "No data found.";
                }
            }

            if (count($disorders) == 3) {
                $disorder1 = trim($disorders[0]); 
                $disorder2 = trim($disorders[1]);
                $disorder3 = trim($disorders[2]);
                $sql = "SELECT about FROM disorder_tbl WHERE disorder_name = '$disorder1' OR disorder_name = '$disorder2' OR disorder_name = '$disorder3'";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $tableData3 = array();
                    while ($row = $result->fetch_assoc()) {
                        $rowData = array_values($row);
                        $tableData3[] = $rowData;
                    }  
                } else {
                    echo "No data found.";
                }
                $about[0] = $tableData3[0];
                $about[1] = $tableData3[1];
                $about[2] = $tableData3[2];
            }
            
            $combinedData = array_merge(...$tableData1, ...$tableData2, ...$tableData3);
            echo json_encode($combinedData);

        } else {
            echo ("failed");
        }

        
    
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    if (isset($_POST['pid']) && isset($_POST['pName']) && !isset($_POST['approval'])) { 

        $pid = $_POST['pid'];
        $docId = $_POST['docId'];
        $pName = $_POST['pName'];
        $age = $_POST['age'];
        $gender = $_POST['gender'];
        $email = $_POST['email'];
        $userImg = $_POST['userImage'];
        $primaryConcern = $_POST['primaryConcern'];
        $diagnosis = $_POST['diagnosis'];
        $symptoms = $_POST['symptoms'];
        $treatmentPlan = $_POST['treatmentPlan'];
        $additionalNotes = $_POST['additionalNotes'];
        $disorder1 = $_POST['disorder1'];
        $disorder2 = $_POST['disorder2'];
        $about1 = $_POST['about1'];
        $about2 = $_POST['about2'];
        $approval = false;

        $sql = "INSERT INTO report_data_tbl (pid, docId, userName, age, gender, email, userImg, primaryConcern, diagnosis, symptoms, treatmentPlan, additionalNotes, disorder1, disorder2, about1, about2, approval) 
                VALUES('$pid', '$docId', '$pName', '$age', '$gender', '$email', '$userImg', '$primaryConcern', '$diagnosis', '$symptoms', '$treatmentPlan', '$additionalNotes', '$disorder1', '$disorder2', '$about1', '$about2', '$approval')";
        
        if ($conn->query($sql) == TRUE) {      
            $success = true;
            echo "success";
        } else {
            $errorMessage = "Please provide valid data.";
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
 
    //view patients report data for the doctor
    if (isset($_GET['pid']) && isset($_GET['docId']) && $_GET['type'] == 'viewReport') { 

        $pid = $_GET['pid'];
        $docId = $_GET['docId'];

        $sql = "SELECT * FROM report_data_tbl WHERE pid ='$pid' AND docId ='$docId'";

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

    //view patients list who requested to be approved
    if (isset($_GET['docId']) && $_GET['type'] == 'patientList') { 

        $docId = $_GET['docId']; 
    
        $sql = "SELECT * FROM report_data_tbl WHERE docId = '$docId' AND approval = 0";
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
}

// approve the patient report 
if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    if (isset($_POST['pid']) && isset($_POST['approval'])) { 

        $pid = $_POST['pid'];
        $docId = $_POST['docId'];
        $approval = true;

        $sql = "UPDATE report_data_tbl SET approval = '$approval' WHERE pid = '$pid' AND docId = '$docId'";

        if ($conn->query($sql) == TRUE) {      
            $success = true;
            echo "Record updated successfully";
        } else {
            $errorMessage = "Please provide valid data.";
        }
    }
}
$conn->close();

?>