function searchBooking(requestKeyword) {
    const xhr = createRequest();
    //define the output array for retrieved data from database 
    let bookings = [];

    if(xhr) {
        // Request Bookings
        var targetLocation = document.getElementById("targetDiv");
        var url = "admin.php?requestKeyword"+getElementById("bsearch").value;
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                bookings = request.responseText;
                displayData(bookings);
            }
        }
        request.send();
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