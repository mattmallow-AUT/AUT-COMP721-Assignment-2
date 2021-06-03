<?php
    /**
     * Author: Matthew Fan
     * Student ID: 18040157
     * Description of File:
     * This file provides all the functionalities to interact with the database. 
     * Keeping all the file here for reusability of the code, as well as security.
     */

    //require credential for database
    require_once("../../conf/settings.php");

    /**
     * check for unique reference number in database.
     * using the input '$referenceNumber' as key and search across database.
     */
    function checkReference($conn, $sql_table, $referenceNumber) {
        $searchQuery = "SELECT * FROM $sql_table WHERE bookingRefNo = '$referenceNumber'";
        return mysqli_query($conn, $searchQuery)->num_rows === 0;
    }

    /**
     * Requst a booking.
     * This will send the booking information to the database, and store as an entry in the table
     * return true if this action is success otherwise return false
     */
    function book($conn, $sql_table, $referenceNumber, $customerName, $phoneNumber,$unitNumber, $streetNumber,$streetName,$suburb,$destinationSuburb,$pickUpDate,$pickUpTime,$status) {
        $insertQuery = "INSERT INTO $sql_table (
            bookingRefNo,
            customerName,
            phoneNumber,
            unitNumber,
            streetNumber,
            streetName,
            suburb,
            destinationSuburb,
            pickUpDate,
            pickUpTime,
            status
          ) VALUES (
            '$referenceNumber',
            '$customerName',
            '$phoneNumber',
            '$unitNumber',
            '$streetNumber',
            '$streetName',
            '$suburb',
            '$destinationSuburb',
            '$pickUpDate',
            '$pickUpTime',
            '$status'
          )";

        mysqli_query($conn, $insertQuery)
            or die("<p>Something wrong with query</p>");

        $checkQuery = "SELECT * FROM $sql_table WHERE bookingRefNo LIKE \"$referenceNumber\"";
        $checkResult = mysqli_query($conn, $checkQuery);

        if(mysqli_num_rows($checkResult) >= 1) {
            return true;
        } else {
            return false;
        }
    }

    /** 
     * 
     * This function will retur the list of booking information made with a pick up time within the next 2 hours
     * from the current machine time. 
     * 
     * **/
    function getBookingList($conn, $sql_table) {
        $searchQuery = "SELECT * FROM $sql_table WHERE STATUS = 'unassigned' AND (pickUpTime <= (CURRENT_TIME() + INTERVAL 2 HOUR) AND pickUpTime >= CURRENT_TIME()) AND pickUpDate = CURDATE()";

        $result = $conn->query($searchQuery);

        $bookingList = [];
        if($result->num_rows >= 1){
            while($row = mysqli_fetch_assoc($result)) {
                $bookingList[] = $row;
            }
        }
        return json_encode($bookingList);
    }

    /**
     * This function takes in a specific reference number,
     * and go through the database to find a corresponding entry with the input reference number
     * then return it to the caller
     */
    function getSpecifiedBooking($conn, $sql_table, $requestKeyword) {
        $searchQuery = "SELECT * FROM $sql_table WHERE bookingRefNo = $requestKeyword";
        $result = mysqli_query($conn, $searchQuery);

        $bookingList = [];
        if(mysqli_num_rows($result) == 1) {
            while($row = mysqli_fetch_assoc($result)) {
                $bookingList[] = $row;
            }
        }
        return json_encode($bookingList);
    }

    /**
     * This function takes in a reference number,
     * and change the status of the booking entry to assigned
     */
    function assignDriver($conn, $sql_table, $referenceNumber) {
        $searchQuery = "UPDATE $sql_table SET status = 'assigned' WHERE bookingRefNo = $referenceNumber";
        $result = mysqli_query($conn, $searchQuery);

        if ($result === true) {
            echo("Booking $referenceNumber assigned.");
        } else {
            echo("Booking for $referenceNumber FAILED.");
        }
    }
?>