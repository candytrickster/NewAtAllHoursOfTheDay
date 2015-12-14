function Weather() {
    var that = this;
    var insertFound = false;
    var insertion = {};
    var html = "<div id=\'forecastObject\'>\n    \n</div>";
    this.cityName = "";
    this.country = "";
    this.weatherObjects = [];
    this.sortedWeatherObjects = [];
    this.insertWeather = function() {
        if (!insertFound) {
            insertion = document.getElementById('Weather-Insert');
            insertFound = true;
            insertion.id = '';
            insertion.innerHTML += html;
        } else {
            insertion.innerHTML = html;
        }
        var forecastObject = document.getElementById('forecastObject');
        for (var i = 0; i < that.sortedWeatherObjects.length; i++) {
            forecastObject.innerHTML += "<div class=\'weatherPanel\'>\n    <span class=\"weatherPanelDate\">\n        <p>" + that.sortedWeatherObjects[i].numericalDate + "</p>\n    </span>\n    <br>\n    <span class=\"weatherPanelTime\">\n        <p>Time: " + that.sortedWeatherObjects[i].numericalTime + "</p>\n    </span>\n    <br>\n    <span class=\"weatherPanelTemperature\">\n        <p>" + that.sortedWeatherObjects[i].fahrenheit + "�F " + that.sortedWeatherObjects[i].celsius + "�C</p>\n    </span>\n    <br>\n    <span class=\"weatherPanelDescription\">\n        <p>" + that.sortedWeatherObjects[i].description + "</p>\n    </span>\n    <br>\n</div>";
        }
        forecastObject.id = '';
    };
    this.sortedWeather = function() {
        this.numericalDate = "0000-00-00";
        this.numericalTime = "00:00:00";
        this.humidity = 0;
        this.celsius = 0;
        this.fahrenheit = 0;
        this.description = "sky is clear";
        this.icon = "000";
        this.mainDesc = "Clear";
        this.windDeg = 0;
        this.windSpeed = 0;
    };
    this.get5DayWeather = function(cityName) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&appid=2de143494c0b295cca9337e1e96b00e0",
            dataType: "jsonp",

            success: function( data ) {
                that.cityName = data.city.name;
                that.country = data.city.country;
                that.weatherObjects = [];
                for (var i = 0; i < data.list.length; i++) {
                    if (that.weatherObjects.length == 0) {
                        that.weatherObjects.push(data.list[i]);
                    } else if (data.list[i].dt_txt.indexOf('12:00:00') > -1) {
                        that.weatherObjects.push(data.list[i]);
                    } else if (data.list[i].dt_txt.indexOf('21:00:00') > -1) {
                        that.weatherObjects.push(data.list[i]);
                    }
                }
                that.sortWeatherObjects();
                that.insertWeather();
            }
        });
    };
    this.sortWeatherObjects = function() {
        that.sortedWeatherObjects = [];
        for (var i = 0; i < that.weatherObjects.length; i++) {
            var obj = new that.sortedWeather();
            var s = that.weatherObjects[i].dt_txt.split(' ');
            obj.numericalDate = s[0];
            obj.numericalTime = s[1];
            obj.celsius = Math.round(obj.description = that.weatherObjects[i].main.temp - 273.15);
            obj.fahrenheit = Math.round(obj.celsius * 1.8 + 32);
            obj.description = that.weatherObjects[i].weather[0].description;
            obj.icon = that.weatherObjects[i].weather[0].icon;
            obj.mainDesc = that.weatherObjects[i].weather[0].main;
            obj.windDeg = that.weatherObjects[i].wind.deg;
            obj.windSpeed = that.weatherObjects[i].wind.speed;
            that.sortedWeatherObjects.push(obj);
        }
    };
}

var weather = {};
var weatherCheckInterval = setInterval(function(){
    if (document.readyState == 'complete') {
        weather = new Weather();
        weather.get5DayWeather('Salt Lake City, UT');
        clearInterval(weatherCheckInterval);
    }
}, 10);

window.onload = function()
{
    searchForCity("Salt Lake City, UT");
    weather.get5DayWeather('Salt Lake City, UT');
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





