// clock creation 
var canvas = document.getElementById("mycanvas");
var c = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 400;
var radius = canvas.height / 2;
c.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(c, radius);
    drawNumbers(c, radius);
    drawTime(c, radius);
}

//clockface creation
function drawFace(c, radius) {
    var grad;
    c.beginPath();
    c.arc(0, 0, radius, 0, 2 * Math.PI);
    c.fillStyle = 'black';
    c.fill();
    grad = c.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0.5, 'white');

    c.strokeStyle = grad;
    c.lineWidth = radius * 0.1;
    c.stroke();
    c.beginPath();
    c.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    c.fillStyle = 'white';
    c.fill();
}

//clocknumbers creation
function drawNumbers(c, radius) {
    var ang;
    var num;
    c.font = radius * 0.15 + "px arial"; //font size 15% of the radius
    c.textBaseline = "middle"; // 
    c.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        c.rotate(ang);
        c.translate(0, -radius * 0.85);
        c.rotate(-ang);
        c.fillText(num.toString(), 0, 0);
        c.rotate(ang);
        c.translate(0, radius * 0.85);
        c.rotate(-ang);
    }
}


function drawTime(c, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12; //as hour is taken in 24 hr format from system 
    hour = (hour * Math.PI / 6) + //calculation of angle for the position of the hour hand
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(c, hour, radius * 0.5, radius * 0.06);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60)); //calculation of angle for the position for the minute hand
    drawHand(c, minute, radius * 0.8, radius * 0.04);
    // second
    second = (second * Math.PI / 30); //calculation of angle for the position for second hand
    drawHand(c, second, radius * 0.9, radius * 0.01);
}

//hands draw
function drawHand(c, pos, length, width) {
    c.beginPath();
    c.lineWidth = width;
    c.lineCap = "round";
    c.moveTo(0, 0);
    c.rotate(pos);
    c.lineTo(0, -length);
    c.stroke();
    c.rotate(-pos);
}


//enabling the alarm set window
function myset() {
    //if its 12hr format clock then alarm setting will be displayed accordingly
    if (document.getElementById("digiclock1").style.display == "block") {
        document.getElementById("houralarm").style.display = "block";
    }
    //alarm setting will be displayed according to 24hr
    else {
        document.getElementById("setalarm").style.visibility = "visible";
    }

}


//clock switch between analog to digital 
function switchclock() {

    var node = document.getElementById("mycanvas");
    var d1 = document.getElementById("digiclock1");
    var d2 = document.getElementById("digiclock2");
    var a = document.getElementById("setalarm");

    if (a.style.visibility === "visible") {
        a.style.visibility = "hidden";
    }

    if (window.getComputedStyle(node).display === "block") {


        node.style.display = "none";
        d1.style.display = "block";
        document.getElementById("a1").innerHTML = "Switch to Analog";
        document.getElementById("a2").style.visibility = "visible";

        function hour() {
            var date = new Date();
            var h = date.getHours(); // 0 - 23
            var m = date.getMinutes(); // 0 - 59
            var s = date.getSeconds(); // 0 - 59
            var session = "AM";

            if (h == 0) {
                h = 12;
            }

            if (h > 12) {
                h = h - 12;
                session = "PM";
            }

            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            var time = h + ":" + m + ":" + s + " " + session;
            d1.innerText = time;
            d1.textContent = time;


            setTimeout(hour, 1000);
        }
        hour();
    } else {

        d1.style.display = "none";
        d2.style.display = "none";
        node.style.display = "block";
        document.getElementById("a1").innerHTML = "Switch to Digital";
        document.getElementById("a2").style.visibility = "hidden";
        drawClock();

    }

}


//toggling the format of digital clock to 24hr format and 12hr format
function formatclock() {
    var c1 = document.getElementById("digiclock1");
    var c2 = document.getElementById("digiclock2");
    var node = document.getElementById("mycanvas");
    var a = document.getElementById("setalarm");
    var b = document.getElementById("houralarm");

    if (a.style.visibility === "visible") {
        a.style.visibility = "hidden";
    } else if (b.style.display === "block") {
        b.style.display = "none";
    }


    if (window.getComputedStyle(c1).display === "block") {

        c1.style.display = "none";
        c2.style.display = "block";


        document.getElementById("a2").innerHTML = "12 Hour Clock";

        function standard() {

            var date = new Date();
            var h = date.getHours(); // 0 - 23
            var m = date.getMinutes(); // 0 - 59
            var s = date.getSeconds(); // 0 - 59
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;
            var t = h + ":" + m + ":" + s;
            c2.innerText = t;
            c2.textContent = t;
            setTimeout(standard, 1000);
        }
        standard();


    } else {

        c2.style.display = "none";
        c1.style.display = "block";
        document.getElementById("a2").innerHTML = "24 Hour Clock";


    }




}



//function when alarm is set by the user 
function ring() {


    if (document.getElementById("digiclock1").style.display == "block") {

        var h = document.querySelector(".h").value;
        var m = document.querySelector(".m").value;
        var s = document.querySelector(".s").value;
        if (s == "PM") {
            h = 12 + Number(h);
            h = String(h);
        }
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        var t = h + ":" + m;
        let myalarm = h + ":" + m + s;

        document.getElementById("houralarm").style.display = "none";
        document.querySelector(".h").value = "";
        document.querySelector(".m").value = "";
        document.querySelector(".s").value = "";

        alert("Alarm is set for " + myalarm);


        var inter = setInterval(function(time) {
            check(time)
        }, 1000, t);

        document.getElementById("stop").onclick = function() {

            var x = document.getElementById("myAudio");

            x.pause();
            document.getElementById("stop").style.visibility = "hidden";
            clearInterval(inter); //interval deletion when stop alarm is clicked

            document.getElementById("houralarm").style.display = "none";

        }



    } else {
        var alarmtime = document.getElementById("t").value;

        document.getElementById("setalarm").style.visibility = "hidden";
        document.getElementById("t").value = "";

        alert("Alarm is set for " + alarmtime);

        //checks the time each second 
        var x1 = setInterval(function(time) {
            check(time)
        }, 1000, alarmtime);

        document.getElementById("stop").onclick = function() {

            var x = document.getElementById("myAudio");

            x.pause();
            document.getElementById("stop").style.visibility = "hidden";
            clearInterval(x1); //interval deletion when stop alarm is clicked

            document.getElementById("setalarm").style.disable = "none";

        }
    }
}

//function which checks the time with the input time each second
function check(alarmtime) {

    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes();
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    var t = h + ":" + m;
    var a = t.toString();
    var n = a.localeCompare(alarmtime);



    //if time matches then alarm rings
    if (n === 0) {

        document.getElementById("stop").style.visibility = "visible";
        var x = document.getElementById("myAudio");

        x.play();
        return;

    }

    // setTimeout(check(alarmtime),1000);

}