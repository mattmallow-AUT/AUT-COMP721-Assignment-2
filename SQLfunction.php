<?php
    require_once("../../conf/settings.php");

    function checkReferenceFunction($conn, $sql_table) {
        $searchQuery = "SELECT * FROM $sql_table ORDER BY bookingRefNo DESC LIMIT 1";
        $result = @mysqli_query($conn, $searchQuery);
        return $result;
    }

    function getReference($conn, $sql_table) {
        $searchQuery = "SELECT bookingRefNo FROM $sql_table ORDER BY bookingRefNo DESC LIMIT 1";
        $result = @mysqli_query($conn, $searchQuery);
        
        while($row = $result->fetch_assoc())
        {
            return $row['bookingRefNo'];
        }
    }

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
?>