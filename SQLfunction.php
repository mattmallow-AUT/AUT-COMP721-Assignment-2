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

    function appendBookingList($bookingList, $result) {
        while($row = $result->fetch_assoc()) {
            $bookingList = $row;
            // $reference = "'".$row["bookingRefNo"]."'";
            // echo "<tbody>";
            // echo "<tr>";
            // echo "<th>" . $reference . "</th>";
            // echo "<th>" . $row["customerName"] . "</th>";
            // echo "<th>" . $row["phoneNumber"] . "</th>";
            // echo "<th>" . $row["suburb"] . "</th>";
            // echo "<th>" . $row["destinationSuburb"] . "</th>";
            // echo "<th>" . $row["pickUpDate"] . "</th>";
            // echo "<th>" . $row["pickUpTime"] . "</th>";
            // echo "<th><input class=\"button is-rounded is-large\" name=\"assign\" type=\"button\" value=\"assign taxi\" onclick=\"assignDriver($reference)\"/></th>";
            // echo "</tr>";
            // echo "</tbody>";
        }
    }

    /** 
     * 
     * This function is returing the list of bookings made within 2 hours
     * from the current time. 
     * **/
    function getBookingList($conn, $sql_table) {
        $searchQuery = "SELECT * FROM $sql_table WHERE STATUS = 'unassigned' AND (pickUpTime <= (CURRENT_TIME() + INTERVAL 2 HOUR) AND pickUpTime >= CURRENT_TIME())";

        $result = $conn->query($searchQuery);

        $bookingList = [];
        if($result->num_rows >= 1){
            //append booking list
            //$bookingList = appendBookingList($bookingList, $result);
            while($row = mysqli_fetch_assoc($result)) {
                $bookingList[] = $row;
            }
        }
        //echo '<pre>'; print_r($bookingList); echo '</pre>';
        return json_encode($bookingList);
    }

    function getSpecifiedBooking($conn, $sql_table, $requestKeyword) {
        $searchQuery = "SELECT * FROM $sql_table WHERE bookingRefNo = $requestKeyword";
        $result = mysqli_query($conn, $searchQuery);

        $bookingList = [];
        if(mysqli_num_rows($result) == 1) {
            //append booking list
            //$bookingList = appendBookingList($bookingList, $result);
            while($row = mysqli_fetch_assoc($result)) {
                $bookingList[] = $row;
            }
        }
        return json_encode($bookingList);
    }

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