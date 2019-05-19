import React, { Component } from 'react';
import Form from './Form';
import WeatherDisplay from './WeatherDisplay';

class App extends Component {
  state = {
    zip: '08701'
  };

  handleZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  }

  /*getWeather(e) {
    e.preventDefault();
    fetch('http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=foo&units=imperial')
      .then(response => {
        if (!response.ok) {
          const error = new Error('OOPS');
          error.response = response;
          throw error;
        } else {
          return response.json();
        }
      }).then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
  }*/

  getWeather = async e => {
    e.preventDefault();
    try {
      // could get zip from ${e.target.zip.value}
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=cb7c71219cf09eb0bb414b932669be97&zip=${this.state.zip}&units=imperial`)
      if (!response.ok) {
        const error = new Error('OOPS');
        error.response = response;
        throw error;
      }
      const data = await response.json();
      this.setState({
        weather: {
          city: data.name,
          temperature: data.main.temp,
          picture: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          description: data.weather[0].description
        }
      })
    } catch (error) {
      //console.error(error);
      this.setState({
        error: error.response ? 'Invalid zip'
          : 'Unable to fetch weather'
      })
    }
  }

  render() {
    return (
      <div>
        <Form getWeather={this.getWeather} zip={this.state.zip} onZipChange={this.handleZipChange} />
        {!this.state.error && <WeatherDisplay {/*weather={this.state.weather}*/ ...this.state.weather} />}
        {this.state.error && <h2 style={{ color: 'red' }}>{this.state.error}</h2>}
      </div>
    );
  }
}

export default App;
