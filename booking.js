/*
 * Author: Matthew Fan
 * Student ID: 18040157
 * 
 * Description of file:
 * First task:
 * Display the current date and time information of the local machine
 * in the date and time input area.
 * Second task:
 * Send the user entered form to the server, and get corresponding response.
 *  
 * Functions: Function description will be written before the function definition
 */

/**
 * Initialize a local date variable for the date and time functions
 */
var today = new Date();
var date;
var time;

/**
 * This function will display the current machine date
 * in the HTML date input field
 */
function getDate(){
    var year = today.getFullYear();
    var month = '' + (today.getMonth()+1);
    var day = '' + today.getDate();
    if(month.length < 2){
        month = '0' + (today.getMonth()+1);
    }

    if(day.length < 2){
        day = '0' + today.getDate();
    }

    date = year + '-' + month + '-' + day;
    document.getElementById("displayDate").value = date;
    document.getElementById("displayDate").setAttribute("min",date);
}

/**
 * This function will display the current machine time 
 * in the HTML time input field.
 */
function getTime(){
    time = today.getHours() + ":" + today.getMinutes();
    document.getElementById("displayTime").value = time;
    //document.getElementById("displayTime").setAttribute("min", time);
}

/**
 * Creating a new booking request, and send to PHP server
 */
function requestBooking(){
	const xhr = createRequest();

    if(xhr){
        //fetch the data from form
        const customerName = document.getElementById("cname").value;
        const phoneNumber = document.getElementById("phone").value;
        const unitNumber = document.getElementById("unumber").value;
        const streetNumber = document.getElementById("snumber").value;
        const streetName = document.getElementById("stname").value;
        const suburb = document.getElementById("sbname").value;
        const destinationSuburb = document.getElementById("dsbname").value;
        const pickUpDate = document.getElementById("displayDate").value;
        const pickUpTime = document.getElementById("displayTime").value;

		var obj = document.getElementById("targetDiv");

        if(pickUpDate == date && pickUpTime < time) {
            obj.innerHTML = "Cannot book before current time!";
        } else {
            var requestbody = "customerName="+encodeURIComponent(customerName)
                +"&phoneNumber="+encodeURIComponent(phoneNumber)
                +"&unitNumber="+encodeURIComponent(unitNumber)
                +"&streetNumber="+encodeURIComponent(streetNumber)
                +"&streetName="+encodeURIComponent(streetName)
                +"&suburb="+encodeURIComponent(suburb) 
                +"&destinationSuburb="+encodeURIComponent(destinationSuburb)
                +"&pickUpDate="+encodeURIComponent(pickUpDate)
                +"&pickUpTime="+encodeURIComponent(pickUpTime);
            xhr.open("POST", "./booking.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    obj.innerHTML = xhr.responseText;
                }
            }//end anonymous call-back function
            xhr.send(requestbody)
        }
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
