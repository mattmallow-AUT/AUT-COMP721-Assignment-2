/*
 * Author: Matthew Fan
 * Student ID: 18040157
 * 
 * Description of file:
 * This file provides direct access from the admin.html to the php server.
 * According to the Admin function, the javascript will handle user input information
 * and send it to the php server, then get the corresponding respond from the 
 * server, then convert the returned information to HTML elements.
 * 
 * Functions: Function description will be written before the function definition
 */

/**
 * This will handle the assign driver request from the admin.html
 * It will get the reference number and an assign request to the server using POST method
 * @param {bookingRefNo} Input from admin.html form
 */
function assignDriver(bookingRefNo) {
    const xhr = createRequest();
    if(xhr){
		var obj = document.getElementById("assignConfirmOutput");

		var requestbody = "referenceNumber="+encodeURIComponent(bookingRefNo);
		xhr.open("POST", "./admin.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                obj.innerHTML = xhr.responseText;
                searchBooking("");
            }
		}//end anonymous call-back function
		xhr.send(requestbody);
	}
}

/**
 * This function will get a 2D array from the server, and create a HTML table based on it.
 * @param {*} bookingList An array of bookings from the server
 */
function appendBookingTable(bookingList) {
    const table = document.getElementById("tableBody");
    table.innerHTML = "";

    if(bookingList.length === 0) {
        const eachRow = document.createElement("tr");
        eachRow.appendChild(createTableColumn("No Booking Result match your input"));
        table.appendChild(eachRow);
    } else {
        bookingList.forEach(element => {
            const eachRow = document.createElement("tr");
    
            eachRow.appendChild(createTableColumn(element.bookingRefNo));
            eachRow.appendChild(createTableColumn(element.customerName));
            eachRow.appendChild(createTableColumn(element.phoneNumber));
            eachRow.appendChild(createTableColumn(element.suburb));
            eachRow.appendChild(createTableColumn(element.destinationSuburb));
            
            dateTime = element.pickUpDate + " / " + element.pickUpTime;
            eachRow.appendChild(createTableColumn(dateTime));
            eachRow.appendChild(createTableColumn(element.status));
            eachRow.appendChild(createAssignButton(element.bookingRefNo, element.status));
            
            table.appendChild(eachRow);
        });
    }
}

/**
 * Create the columne of the generated table
 * @param {*} element 
 * @returns 
 */
function createTableColumn(element) {
    const column = document.createElement("td");
    column.appendChild(document.createTextNode(element));
    return column;
}

/**
 * Create the assign driver button for each row in the table
 * @param {*} element 
 * @returns 
 */
function createAssignButton(referenceNumber, status) {
    const column = document.createElement("td");
    const button = document.createElement("input");
    button.className = "button is-rounded is large";
    button.name = "assign";
    button.type="button";
    button.value="assign taxi";
    //prevent assign button to be clicable for taken
    if(status=="assigned") {
        button.disabled="true"
    }
    button.addEventListener("click", () => assignDriver(referenceNumber), false);
    column.appendChild(button);
    return column;
}

/**
 * Fetch the data from the input form in admin.html, and send it to the server
 * This will use the search keywork from the input form
 * 
 * After get the response from the server, the function will generate a table
 * based on the information list returned from the server.
 * @param {*} requestKeyword 
 */
function searchBooking(requestKeyword) {
    const xhr = createRequest();
    let bookingList = [];
    if(xhr) {
        var obj = document.getElementById("targetDiv");
        var url = "admin.php?requestKeyword="+requestKeyword;
        xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                bookingList = JSON.parse(xhr.responseText);
                appendBookingTable(bookingList);
            }
        }
        xhr.send(null);
    }
}

/**
 * Initialize XML 
 * @returns XML object
 */
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