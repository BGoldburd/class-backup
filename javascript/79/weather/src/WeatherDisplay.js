import React from 'react';

const WeatherDisplay = ({ city, picture, description, temperature }) => {
    /*if (!props.weather) {
        return null;
    }

    const { city, picture, description, temperature } = props.weather;*/

    if (!city) {
        return null;
    }

    return (
        <div>
            <p>The weather in {city}</p>
            <img src={picture} alt="weather conditions" />
            <p>{temperature} and {description}</p>
        </div>
    );
}

export default WeatherDisplay;