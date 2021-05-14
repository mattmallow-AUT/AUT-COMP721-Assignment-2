<?php
    require_once("../../conf/settings.php");

    function checkReference($conn, $sql_table, $referenceNumber) {
        $searchQuery = "SELECT * FROM $sql_table WHERE bookingRefNo = '$referenceNumber'";
        return mysqli_query($conn, $searchQuery)->num_rows === 0;
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

    function printTable() {

    }

    /** 
     * 
     * This function is returing the list of bookings made within 2 hours
     * from the current time. 
     * **/
    function getBookingList($conn, $sql_table) {
        $bookingList = [];

        $searchQuery = "SELECT * FROM $sql_table WHERE STATUS = 'unassigned' AND (pickUpTime <= (CURRENT_TIME() + INTERVAL 2 HOUR) AND pickUpTime >= CURRENT_TIME())";

        $result = mysqli_query($conn, $searchQuery);

        if(mysqli_num_rows($result) >= 1){
            echo "<table style=\"width:50%\">";
            echo "<tr>";
            echo "<th>Booking Reference Number</th>";
            echo "<th>Customer Name</th>";
            echo "<th>Phone Number</th>";
            echo "<th>Pick Up Subrub</th>";
            echo "<th>Destination Subrub</th>";
            echo "<th>Pick Up Date</th>";
            echo "<th>Pick Up Time</th>";
            echo "<th>Assign</th>";
            echo "<tr>";
            while($row = $result->fetch_assoc()) {
                $reference = "'".$row["bookingRefNo"]."'";
                echo "<tr>";
                echo "<th>" . $reference . "</th>";
                echo "<th>" . $row["customerName"] . "</th>";
                echo "<th>" . $row["phoneNumber"] . "</th>";
                echo "<th>" . $row["suburb"] . "</th>";
                echo "<th>" . $row["destinationSuburb"] . "</th>";
                echo "<th>" . $row["pickUpDate"] . "</th>";
                echo "<th>" . $row["pickUpTime"] . "</th>";
                echo "<th><input name=\"assign\" type=\"button\" value=\"assign taxi\" onclick=\"assignDriver($reference)\"/></th>";
                echo "<tr>";
            }
        } else if(mysqli_num_rows($result) == 0) {
            echo("No data match your query!");
        } else {
            echo("Something went wrong");
        }

        //return $bookingList;
    }

    function getSpecifiedBooking($conn, $sql_table, $requestKeyword) {

    }

    function assignDriver($conn, $sql_table, $referenceNumber) {
        $searchQuery = "UPDATE $sql_table SET status = 'assigned' WHERE bookingRefNo = $referenceNumber";
        $result = mysqli_query($conn, $searchQuery);

        // Return response
        if ($result === true) {
            echo("Booking $referenceNumber assigned.");
        } else {
            echo("Booking for $referenceNumber FAILED.");
        }
    }
?>