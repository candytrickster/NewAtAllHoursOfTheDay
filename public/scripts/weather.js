//exports.today = function(req, res) {
//    
//};

window.onload = function()
{
    searchForCity("Salt Lake City, UT");
    var json_obj = JSON.parse(getWeatherObject());
    write(json_obj);
}

function searchForCity(city)
{
    var location = document.getElementById('location');
    location.innerHTML = city;
}

function write(json_obj)
{
    var w = document.getElementById("weather");
    var temp = document.getElementById("temperature");
    var image = document.getElementById("weatherpic");
    image.setAttribute('src', "http://openweathermap.org/img/w/"+json_obj.weather[0].icon+".png");
    w.innerHTML = json_obj.weather[0].description.toUpperCase();
    temp.innerHTML = json_obj.main.temp+"&#176 F";
}

function getWeatherObject()
{
    var location = document.getElementById('location').innerHTML;
    var h = new XMLHttpRequest();
    h.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=2de143494c0b295cca9337e1e96b00e0&units=imperial",false);
    h.send(null);
    return h.responseText;
}

function search()
{
    var submitValue = document.getElementById("searchCity");
    searchForCity(submitValue.value);
    var json_obj = JSON.parse(getWeatherObject());
    write(json_obj);
}





