<!--booking.php -->
<?php
	//check to see if the input field are assigned
    
    //get mysqli connection to the databse
	require_once("../../conf/settings.php");
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
        or die("<p>Unable to connect to database and server</p>");
    
    // get name and password passed from client
    $cname = $_POST['cname'];
	$phone = $_POST['phone'];
	$unumber = $_POST['unumber'];
	$snumber = $_POST['snumber'];
	$stname = $_POST['stname'];
	$sbname = $_POST['sbname'];
	$dsbname = $_POST['dsbname'];
	$date = $_POST['date'];
	$time = $_POST['time'];

	$sql_table = "A2db";

	
	//connect to table
    
    echo("Successfully connect to database");

    //fetching from the database, then generate an unique reference number
	$searchQuery = "SELECT * FROM $sql_table ORDER BY bookingRefNo DESC LIMIT 1";
	$searchResult = @mysqli_query($conn, $searchQuery);

	if($searchResult->num_rows === 0)
	{
		echo("There are no data in the database at the moment!");
	}
	else{
        echo("Reference Number:1");
    }

	mysqli_close($conn);
	// write back the password concatenated to end of the name
?>
