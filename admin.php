<?php
    require_once("../../conf/settings.php");
	require_once("./SQLfunction.php");
	
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
		or die("<p>Unable to connect to database and server</p>");

    switch($_SERVER['request_method']){
        case 'GET':
            $requestKeyword = $_GET['requestKeyword'];

            if(empty($requestKeyword)) {
                //echo("The request body is empty");
                getBookingList($conn, $requestKeyword);
            } else {
                //echo("There are something in the body!");
                getSpecifiedBooking($conn, $requestKeyword);
            }
            break;
        case 'PATCH':
            //when the driver wants to book 
            
    }
?>