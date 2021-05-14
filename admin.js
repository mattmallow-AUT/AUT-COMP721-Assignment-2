function assignDriver(bookingRefNo) {
    
}

function searchBooking(requestKeyword) {
    const xhr = createRequest();
    //let bookings = [];

    if(xhr) {
        var target = document.getElementById("targetDiv");
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