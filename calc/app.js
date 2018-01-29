string lastOp = "";
float secondNum = 0;
float lastNum = 0;
int numLength = 0;

function clearDisplay(all) {
	var display = document.getElementById("display");

	if(all == 0) {
		display.innerHTML = 0;
		lastOp = "";
		secondNum = false;
		lastNum = 0;
	} else {
		display.innerHTML = 0;
	}
}

function setNumber(x) {
	var display = document.getElementById("display");
	var oldText = display.innerHTML;
	
	if(secondNum > 0) {
		nextOp(x);
	} else if(oldText == 0 && x != 0) {
		display.innerHTML = x;
		numLength++;
	} else if(oldText.length > 14) {
		//do nothing
	} else {
		display.innerHTML += x;
		numLength++;
	}
}
	
function operation(id) {
	var display = document.getElementById("display");
	var result = 0;
	
	if(secondNum > 1) {
		//if (id == "op-equal")
		if(lastOp == "t") {
			result = lastNum * display.innerHTML;
			document.getElementById("display").innerHTML = result;
		} else if(lastOp == "d") {
			result = lastNum / display.innerHTML;
			document.getElementById("display").innerHTML = result;
		} else if(lastOp == "p") {
			result = parseInt(lastNum) + parseInt(display.innerHTML);
			document.getElementById("display").innerHTML = result;
		} else if(lastOp == "m") {
			result = lastNum - display.innerHTML;
			document.getElementById("display").innerHTML = result;
		}
	//} else if(secondNum > 1) {
		//case for each operand if not selecting equals
	} else if(id == "op-times") {
		lastOp = "t";
		lastNum = display.innerHTML;
	} else if(id == "op-divide") {
		lastOp = "d";
		lastNum = display.innerHTML;
	} else if(id == "op-plus") {
		lastOp = "p";
		lastNum = display.innerHTML;
	} else if(id == "op-minus") {
		lastOp = "m";
		lastNum = display.innerHTML;
	}
	secondNum = 1;
//			alert(lastNum);
//			alert(display.innerHTML);
//			alert(secondNum);
}

function nextOp(y) {
	var display = document.getElementById("display");
	var oldText = display.innerHTML;
	
	if(secondNum <= 1) {
		lastNum = oldText;
		display.innerHTML = y;
		secondNum++;
	} else if(oldText.length > 14) {
		//do nothing
	} else {
		display.innerHTML += y;
	}
	numLength = 0;
}