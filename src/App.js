import React, { Component } from 'react';
import { checkYandexApi, getRandomCity, getCityCoordinatesComputer } from './cities';
import CityInputContainer from './components/cityInput/CityInputContainer';
import './index.css';
import HistoryContainer from './components/history/HistoryContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
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

  generateRandomCity = (lastLetter) => {
    getRandomCity(lastLetter)
      .then((city) => {
        this.setState({
          computerCities: [city, ...this.state.computerCities],
        });
        return getCityCoordinatesComputer(city);
      })
      .then(res => {
        console.log(res);
      })
  }

  render() {
    if (!this.state.isYandexApiLoaded) {
      return (<div>Загрузка...</div>);
    }
    return (
      <div>
        <CityInputContainer />
        <HistoryContainer />
      </div>
    );
  }
}

export default App;
