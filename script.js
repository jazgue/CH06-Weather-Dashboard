var apiKey = '83aa77b93c0b51b2cba02c88abf311b3';
var cities = [];

// function convertToLatLong(city) {
//     url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;
//     $.ajax({
//         url: url,
//         method: 'GET'
//     })
//     .then(function(response){
//         let lat = response[0].lat;
//         let lon = response[0].lon;
//     });
//     console.log(lat, lon);
// }

function searchWeather(){
    let getWeather = $('#get-weather');
    let city = getWeather.val().trim();
    cities.push(city);
    var message = document.querySelector('.invalid-message');

    queryWeather("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey);  
    get5DayForecast('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey);
    console.log(getWeather);
  
    function storeCities(){
      localStorage.setItem("cities", JSON.stringify(cities));
    }
  
    if (city === null || city === "" ){
      message.innerHTML = "Invalid input. Please try again!";
    } else {
      message.innerHTML = "";
      renderCities();
      storeCities();
      getCities();
    }
    function renderCities() {
      
      $(".search-data").prepend("<p>" + city  + "</p");
  
    } 
}

function currentLocation(){
    navigator.geolocation.getCurrentPosition(function(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var qURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' +  apiKey;
        queryWeather(qURL);
        let forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' +  apiKey;
        get5DayForecast(forecastURL);
    });
};

currentLocation();

function queryWeather(url) {
    $.ajax({
        url: url,
        method: 'GET'
    })

    .then(function(response){
        let iconCode = response.weather[0].icon;

        let iconURL = 'http://openweathermap.org/img/w/' + iconCode + '.png';
        $('.city').html('<h1> ' + response.name + ' </h1>');
        $('.temp').text('Temperature: ' + ((response.main.temp - 273.15) * 1.8 + 32).toFixed(0) + ' °F');
        $('.humidity').text('Humidity: ' + response.main.humidity + ' %');
        $('.wind').text('Wind Speed: ' + response.wind.speed +  ' mph');
        $('#icon').attr('src', iconURL);
    });
}


function get5DayForecast(forecastURL) {
    $.ajax({
        url:forecastURL,
        method: 'GET'
    }).then(function(responseA)
    {
        var icon1 = responseA.list[4].weather[0].icon;
        var icon1URL = 'http://openweathermap.org/img/w/' + icon1 + '.png';

        var icon2 = responseA.list[4].weather[0].icon;
        var icon2URL = 'http://openweathermap.org/img/w/' + icon2 + '.png';

        var icon3 = responseA.list[4].weather[0].icon;
        var icon3URL = 'http://openweathermap.org/img/w/' + icon3 + '.png';

        var icon4 = responseA.list[4].weather[0].icon;
        var icon4URL = 'http://openweathermap.org/img/w/' + icon4 + '.png';

        var icon5 = responseA.list[4].weather[0].icon;
        var icon5URL = 'http://openweathermap.org/img/w/' + icon5 + '.png';

        var temp1F = (responseA.list[4].main.temp - 273.15) * 1.8 + 32;
        var temp1 = temp1F.toFixed(1);
        var temp2F = (responseA.list[12].main.temp - 273.15) * 1.8 + 32;
        var temp2 = temp2F.toFixed(1);
        var temp3F = (responseA.list[20].main.temp - 273.15) * 1.8 + 32;
        var temp3 = temp3F.toFixed(1);
        var temp4F = (responseA.list[28].main.temp - 273.15) * 1.8 + 32;
        var temp4 = temp4F.toFixed(1);
        var temp5F = (responseA.list[36].main.temp - 273.15) * 1.8 + 32;
        var temp5 = temp5F.toFixed(1);

        var day1 = responseA.list[4].dt_txt;
        var day2 = responseA.list[12].dt_txt;
        var day3 = responseA.list[20].dt_txt;
        var day4 = responseA.list[28].dt_txt;
        var day5 = responseA.list[36].dt_txt;

        console.log(day1, day2, day3, day4, day5);


        $("#day-1").html('<h5>' + day1.substr(0, 10) + '</h5>');
        $("#day-1").append('<img src=' + icon1URL + '>');
        $("#day-1").append('<p>' + "Temp: " + temp1 + ' °F </p>');
        $("#day-1").append('<p>' + 'Humidity: ' + responseA.list[4].main.humidity + ' % </p>');
    
        $("#day-2").html('<h5>' + day2.substr(0, 10) + '</h5>');
        $("#day-2").append('<img src=' + icon2URL + '>');
        $("#day-2").append('<p>' + "Temp: " + temp2 + ' °F </p>');
        $("#day-2").append('<p>' + 'Humidity: ' + responseA.list[12].main.humidity + ' % </p>');

        $("#day-3").html('<h5>' + day3.substr(0, 10) + '</h5>');
        $("#day-3").append('<img src=' + icon3URL + '>');
        $("#day-3").append('<p>' + "Temp: " + temp3 + ' °F </p>');
        $("#day-3").append('<p>' + 'Humidity: ' + responseA.list[20].main.humidity + ' % </p>');

        $("#day-4").html('<h5>' + day4.substr(0, 10) + '</h5>');
        $("#day-4").append('<img src=' + icon4URL + '>');
        $("#day-4").append('<p>' + "Temp: " + temp4 + ' °F </p>');
        $("#day-4").append('<p>' + 'Humidity: ' + responseA.list[28].main.humidity + ' % </p>');

        $("#day-5").html('<h5>' + day5.substr(0, 10) + '</h5>');
        $("#day-5").append('<img src=' + icon5URL + '>');
        $("#day-5").append('<p>' + "Temp: " + temp5 + ' °F </p>');
        $("#day-5").append('<p>' + 'Humidity: ' + responseA.list[36].main.humidity + ' % </p>');
        });
}

function forecast(){

    $("button").on("click", function(event) {
        event.preventDefault();
        searchWeather();
    });
}

forecast();

function getCities(){
    var getCity = localStorage.getItem("cities");
    console.log(getCity);
}