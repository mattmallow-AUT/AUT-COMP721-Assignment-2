<?php
    require_once("../../conf/settings.php");
	require_once("./SQLfunction.php");
	
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
		or die("<p>Unable to connect to database and server</p>");

    $sql_table = "A2db";

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            $requestKeyword = $_GET['requestKeyword'];

            if(empty($requestKeyword)) {
                //echo("The request body is empty");
                getBookingList($conn, $sql_table);
            } else {
                //echo("There are something in the body!");
                getSpecifiedBooking($conn, $sql_table, $requestKeyword);
            }
            break;

        case 'POST':
            $referenceNumber = $_POST['referenceNumber'];

            //Check if reference was supplied
            if (!isset($referenceNumber)) {
                echo("<p>A reference number is needed here</p>");
            } else {
                assignDriver($conn, $sql_table ,$referenceNumber);
                getBookingList($conn, $sql_table);
            }
            break;
        default:
            // Invalid HTTP Method
            echo("Invalid HTTP REQUEST");
            break;
    }
?>