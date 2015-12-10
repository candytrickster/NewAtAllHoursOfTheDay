function setup()
{
    setTime();
    setDate();
}

function setTime() 
{
    var time = 0;
    var date = new Date();
    var millis = date.getHours() * 3600;
    millis += date.getMinutes() * 60;
    millis += date.getSeconds();
    time = millis;
    getTime(time);
}

function getTime(t)
{
    var second = t % 60;
    var minute = Math.floor(t / 60) % 60;
    var hour = Math.floor(t / 3600) % 60;
    
    second = (second < 10) ? '0'+second : second;
    minute = (minute < 10) ? '0'+minute : minute;
    hour = (hour < 10) ? '0'+hour : hour;
    var time = document.getElementById("time");
    time.innerHTML =hour + " : " + minute + " : " + second; 
}

function setDate()
{
    var d = new Date();
    var date = document.getElementById("date");
    date.innerHTML = d.toDateString();
}


