import React, { Component } from 'react';
import { getCityCoordinatesUser, checkYandexApi, getRandomCity, getCityCoordinatesComputer } from './cities';

class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      isYandexApiLoaded: false,
      computerCities: [],
      userCities: [],
    };
  }

  componentDidMount() {
    checkYandexApi()
      .then(
      () => {
        this.setState({ isYandexApiLoaded: true });
      },
      () => {
        this.setState({ isYandexApiLoaded: false });
      });
  }

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  }

  handleAnswer = () => {
    getCityCoordinatesUser(this.state.city)
      .then((res) => {
        if (res === null) {
          throw res;
        }
        this.generateRandomCity(this.state.city[this.state.city.length - 1]);
        this.setState({
          userCities: [this.state.city, ...this.state.userCities],
          city: '',
        })
      }, (res) => {
        console.log(res);
      });
  }

  generateRandomCity = (lastLetter) => {
    getRandomCity(lastLetter)
      .then(getCityCoordinatesComputer)
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div>
        {
          !this.state.isYandexApiLoaded ? <div>Загрузка...</div> : (
            <React.Fragment>
              <input onChange={this.handleCityChange} value={this.state.city} type="text" name="city" id="city" />
              <button onClick={this.handleAnswer} disabled={!this.state.city}>Дальше!</button>
            </React.Fragment>
          )
        }
        <div>
          <div>
            <h2>Пользователь</h2>
            {this.state.userCities.map(city => (<div key={city}>{city}</div>))}
          </div>
          <div>
            <h2>Компьютер</h2>
            {this.state.computerCities.map(city => (<div key={city}>{city}</div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
