function assignDriver(bookingRefNo) {
    const xhr = createRequest();

    if(xhr){
        //fetch the data from form
		var obj = document.getElementById("assignConfirmOutput");

		var requestbody = "referenceNumber="+encodeURIComponent(bookingRefNo);
		xhr.open("POST", "./admin.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
				//obj.appendChild(document.createTextNode(xhr.responseText));
                obj.innerHTML = xhr.responseText;
                searchBooking("");
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
            eachRow.appendChild(createTableColumn(element.pickUpDate));
            eachRow.appendChild(createTableColumn(element.pickUpTime));
            eachRow.appendChild(createAssignButton(element.bookingRefNo));
            
            table.appendChild(eachRow);
        });
    }
}

function createTableColumn(element) {
    const column = document.createElement("td");
    column.appendChild(document.createTextNode(element));
    return column;
}

function createAssignButton(referenceNumber) {
    const column = document.createElement("td");
    const button = document.createElement("input");
    button.className = "button is-rounded is large";
    button.name = "assign";
    button.type="button";
    button.value="assign taxi";
    button.addEventListener("click", () => assignDriver(referenceNumber), false);
    //button.onclick="assignDriver("+referenceNumber+")";
    column.appendChild(button);
    return column;
}

function searchBooking(requestKeyword) {
    const xhr = createRequest();
    let bookingList = [];
    if(xhr) {
        var obj = document.getElementById("targetDiv");
        var url = "admin.php?requestKeyword="+requestKeyword;
        xhr.open("GET", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            //alert(xhr.readyState);
            if (xhr.readyState == 4 && xhr.status == 200) {
                //obj.innerHTML = xhr.responseText;
                bookingList = JSON.parse(xhr.responseText);
                appendBookingTable(bookingList);
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