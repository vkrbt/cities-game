import React, { Component } from 'react';
import { checkYandexApi } from './cities';
import CityInputContainer from './components/cityInput/CityInputContainer';
import './styles/index.css';
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

  render() {
    if (!this.state.isYandexApiLoaded) {
      return (<div>Загрузка...</div>);
    }
    return (
      <div className="container">
        <CityInputContainer />
        <HistoryContainer />
      </div>
    );
  }
}

export default App;
