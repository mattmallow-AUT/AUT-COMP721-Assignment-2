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
    document.getElementById("displayTime").setAttribute("min", time);
}

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

		var obj = document.getElementsByName("reference");

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
