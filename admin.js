function assignDriver(bookingRefNo) {
    const xhr = createRequest();

    if(xhr){
        //fetch the data from form
		var obj = document.getElementById("tableBody");

		var requestbody = "referenceNumber="+encodeURIComponent(bookingRefNo);
		xhr.open("POST", "./admin.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
				//obj.innerHTML = xhr.responseText;
                bookingList = xhr.responseText
                appendBookingTable(bookingList);
            }
		}//end anonymous call-back function
		xhr.send(requestbody)
	}
}

function appendBookingTable(bookingList) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    if(bookingList.length === 0) {
        const eachRow = document.createElement("tr");
        eachRow.appendChild(createColumn("No Booking Result"));
        table.appendChild(eachRow);
    } else {
        bookingList.forEach((bookingList) => {
            const eachRow = document.createElement("tr");

            eachRow.appendChild(createColumn(bookingList.bookingRefNo));
            eachRow.appendChild(createColumn(bookingList.customerName));
            eachRow.appendChild(createColumn(bookingList.phoneNumber));
            eachRow.appendChild(createColumn(bookingList.suburb));
            eachRow.appendChild(createColumn(bookingList.destinationSuburb));
            eachRow.appendChild(createColumn(bookingList.pickUpDate));
            eachRow.appendChild(createColumn(bookingList.pickUpTime));
            eachRow.appendChild(createColumn(bookingList.suburb));
        })
    }
}

function assignButton() {
    
}

function searchBooking(requestKeyword) {
    const xhr = createRequest();
    //let bookings = [];
    if(xhr) {
        var target = document.getElementById("tableBody");
        var url = "admin.php?requestKeyword="+requestKeyword;
        xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            //alert(xhr.readyState);
            if (xhr.readyState == 4 && xhr.status == 200) {
                //target.innerHTML = "It is working!";
                target.innerHTML = xhr.responseText;
                //displayData(bookings);
            }
        }
        xhr.send(null);
    }
}

function createRequest() {
    var xhr = false;  
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
} // end function createRequest()