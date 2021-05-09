var today = new Date();
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

function getTime(){
    var time = today.getHours() + ":" + today.getMinutes();
    document.getElementById("displayTime").value = time;
    document.getElementById("displayTime").setAttribute("min", time);
}

function PHW(divID){
    var obj = document.getElementById(divID);
    obj.innerHTML = "<p>Hello World</p>";
}

var xhr = createRequest();
function getData(dataSource, divID, aName, aPwd){
	if(xhr){
		var obj = document.getElementById(divID);
		var requestbody = "name="+encodeURIComponent(aName)+"&pwd="+encodeURIComponent(aPwd);
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function(){
			alert(xhr.readyState);//to let us see the state of the computation
			if(xhr.readyState == 4 && xhr.status == 200){
				obj.innerHTML = xhr.responseText;
			}//end if
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