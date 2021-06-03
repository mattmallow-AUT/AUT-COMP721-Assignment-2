<?php
    /**
     * Author: Matthew Fan
     * Student ID: 18040157
     * 
     * Description of File:
     * This file will create database connection, and check the request type from admin.js
     * If the request is Get, meaning to get the booking information for the database, it will call the getBooking list from the SQLfunction.php
     *
     * If the request is Post, meaning to update specific reference's status (Assign driver). 
     */

    //require login
    require_once("../../conf/settings.php");
	//require SQL funciton file
    require_once("./SQLfunction.php");
	
	$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db)
		or die("<p>Unable to connect to database and server</p>");

    $sql_table = "A2db";

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            $requestKeyword = $_GET['requestKeyword'];

            if(empty($requestKeyword)) {
                echo getBookingList($conn, $sql_table);
            } else {
                echo getSpecifiedBooking($conn, $sql_table, $requestKeyword);
            }
            break;

        case 'POST':
            $referenceNumber = $_POST['referenceNumber'];

            if (!isset($referenceNumber)) {
                echo("<p>A reference number is needed here</p>");
            } else {
                assignDriver($conn, $sql_table ,$referenceNumber);
                getBookingList($conn, $sql_table);
            }
            break;
        default:
            echo("Invalid HTTP REQUEST");
            break;
    }
?>