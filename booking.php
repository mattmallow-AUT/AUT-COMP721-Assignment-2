<!--booking.php -->
<?php
	//check to see if the input field are assigned
    
    //get mysqli connection to the databse
	require_once("../../conf/settings.php");
	require_once("./SQLfunction.php");
	
	date_default_timezone_set("Pacific/Auckland");
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
		or die("<p>Unable to connect to database and server</p>");

	// get name and password passed from client
	$customerName = $_POST['customerName'];
	$phoneNumber = $_POST['phoneNumber'];
	$unitNumber = $_POST['unitNumber'];
	$streetNumber = $_POST['streetNumber'];
	$streetName = $_POST['streetName'];
	$suburb = $_POST['suburb'];
	$destinationSuburb = $_POST['destinationSuburb'];
	$pickUpDate = $_POST['pickUpDate'];
	$pickUpTime = $_POST['pickUpTime'];
	$status = 'unassigned';
	$referenceNumber;
	$sql_table = "A2db";
	
	//fetching from the database, then generate an unique reference number
	$chechReference = checkReferenceFunction($conn, $sql_table);

	//Generate Unique Reference Number
	if($chechReference->num_rows === 0) {
		$referenceNumber = 1;
		echo("Reference Number: $referenceNumber");
	} else {
		$referenceNumber = getReference($conn, $sql_table) + 1;
	}

	//format date and time to MySQL DATETIME
	$pickUpDate = date('Y-m-d', strtotime($pickUpDate));
	$pickUpTime = date('H:i:s', strtotime($pickUpTime));

	echo("<p>$pickUpDate and $pickUpTime</p>");

	if(book(
		$conn, 
		$sql_table, 
		$referenceNumber, 
		$customerName, 
		$phoneNumber,
		$unitNumber, 
		$streetNumber,
		$streetName,
		$suburb,
		$destinationSuburb,
		$pickUpDate,
		$pickUpTime,
		$status
	)) {
		echo("<p>Thank you! Your booking reference number is $referenceNumber.</p>");
		echo("<p>You will be picked up in front of your provided address at $pickUpTime on $pickUpDate</p>");
	} else {
		echo("<p>There is an issue with your booking. Please try again!");
	}
	
	mysqli_close($conn);
?>
