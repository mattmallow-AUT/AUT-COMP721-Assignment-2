//create a global date variable
var today = new Date();

//display date to the input field
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

    var date = year + '-' + month + '-' + day;
    document.getElementById("displayDate").value = date;
    document.getElementById("displayDate").setAttribute("min",date);
}

//display time to the input field
function getTime(){
    var time = today.getHours() + ":" + today.getMinutes();
    document.getElementById("displayTime").value = time;
    //document.getElementById("displayTime").setAttribute("min", time);
}

function requestBooking(){
	const xhr = creatRequest();

    if(xhr){
        //fetch the data from form
        const customerName = document.getElementById("cname");
        const phoneNumber = document.getElementById("phone");
        const uniNumber = document.getElementById("unumber");
        const streetNumber = document.getElementById("snumber");
        const streetName = document.getElementById("stname");
        const suburb = document.getElementById("sbname");
        const destinationSuburb = document.getElementById("dsbname");
        const pickUpDate = document.getElementById("date");
        const pickUpTime = document.getElementById("time");
        //const status = document.getElementById("cname");

		var obj = document.getElementById("targetDiv");
		var requestbody = "&cname="+encodeURIComponent(customerName)
            +"&phone="+encodeURIComponent(phoneNumber)
            +"&unumber="+encodeURIComponent(uniNumber)
            +"&snumber="+encodeURIComponent(streetNumber)
            +"&stname="+encodeURIComponent(streetName)
            +"&sbname="+encodeURIComponent(suburb) 
            +"&dsbname="+encodeURIComponent(destinationSuburb)
            +"&date="+encodeURIComponent(pickUpDate)
            +"&time="+encodeURIComponent(pickUpTime);
		xhr.open("POST", "./booking.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			
            if(xhr.readyState == 4 && xhr.status == 200){
				obj.innerHTML = xhr.responseText;
                alert("Your booking has been accepted! Here is your reference number: ");
			} else {
                alert("We are unable to book your cab at the moment, please try again.");
            }
		}//end anonymous call-back function
		xhr.send(requestbody)
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
