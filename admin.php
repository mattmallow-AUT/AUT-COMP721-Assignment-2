<?php
    require_once("../../conf/settings.php");
	require_once("./SQLfunction.php");
	
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
		or die("<p>Unable to connect to database and server</p>");

	$customerName = $_GET[''];
	$phoneNumber = $_POST['phoneNumber'];
?>