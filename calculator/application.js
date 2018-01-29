var inputNum,
    inputOps,
    showStr,
    show,
    show2,
    last,
    zero,
    n,
    useDecimal,
    indexDec,
    calc;

function update() {
    show2 = show;
    indexDec = 10 - show2.toString().indexOf('.');
//    $("#test").html(showStr + ", " + inputOps + ", ind:" + indexDec);

    if (showStr.length >10) {
        $(".show-nums").html("ERROR");
    } else {
        $(".show-nums").html(Math.round(show*(10**indexDec))/(10**indexDec));
        $(".show-eq").html(last);
        $(".show-op").html(inputOps);
    }
}

function clearScreen() {
    inputNum = 0;
    inputOps = "";
    showStr = "";
    show = 0;
    last = 0;
    n = 0;
    indexDec = 0;
    zero = "";
    indexDec = 0;
    useDecimal = true;
    calc = false;
    update();
}

function getNum(val) {
    if(n>0) {
        last = show;
        showStr = "";
        useDecimal = true;
        n = 0;
    }
    inputNum = val;
    showStr += inputNum.toString();
    show = parseFloat(showStr);
    update();
}

function getOp(sVal) {
    if (inputOps != "") {
        show = calculate(last, show, inputOps);
        update(); 
    }
    inputOps = sVal;
    n = 1;
    useDecimal = true;
    update();
}

function equals () {
    show = calculate(last, show, inputOps);
    update();
    inputOps = "";
}

function decimal() {   
    if(useDecimal) {
        useDecimal = false;
        showStr += ".";
        $("show-nums").html(showStr+".");
    }
}

function calculate(num1, num2, ops) {
    useDecimal = true;
           if (ops == "+"){
        return num1 + num2;
    } else if (ops == "-") {
        return num1 - num2;
    } else if (ops == "/") {
        return num1 / num2;
    } else if (ops == "x") {
        return num1 * num2;
    }
}

$(document).ready(function() {
    clearScreen();
});
