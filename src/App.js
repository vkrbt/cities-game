import React, { Component } from 'react';
import { checkYandexApi } from './cities';
import CityInputContainer from './components/cityInput/CityInputContainer';
import HistoryContainer from './components/history/HistoryContainer';
import CitiesMapContainer from './components/citiesMap/CitiesMapContainer';
import './styles/index.css';

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

  render() {
    if (!this.state.isYandexApiLoaded) {
      return (<div className="loading-overlay"><span className="spinner" /></div>);
    }
    return (
      <div className="container">
        <CitiesMapContainer />
        <CityInputContainer />
        <HistoryContainer />
      </div>
    );
  }
}

export default App;
