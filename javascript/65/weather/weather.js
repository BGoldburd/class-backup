/*global $*/
(function () {
    'use strict';

    const zipInput = $('#zip');
    const unitsSelect = $('#units');
    const placeElem = $('#place');
    const weatherPicture = $('#weatherPicture');
    const weatherDescription = $('#weatherDescription');

    zipInput.change(fetchWeather);
    unitsSelect.change(fetchWeather);

    function fetchWeather() {
        //$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=08701&APPID=cb7c71219cf09eb0bb414b932669be97&units=imperial&callback=?', weatherData => {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97',
            { zip: zipInput.val(), units: unitsSelect.val() },
            weatherData => {
                console.log(weatherData);
                placeElem.text(weatherData.name);
                weatherPicture.attr('src', `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
                weatherDescription.text(`${weatherData.main.temp} and ${weatherData.weather[0].description}`);
            });
    }

    fetchWeather();
}());