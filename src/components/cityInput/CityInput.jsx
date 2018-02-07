import React, { Component } from 'react';

class CityInput extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
    };
  }

  cityInputRef = (city) => {
    this.city = city;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      city: nextProps.lastLetter.toUpperCase(),
    }, () => {
      this.city.focus();
    });
  }

  handleCityChange = (e) => {
    const city = e.target.value.length > 0 || !this.props.lastLetter ?
      e.target.value :
      this.props.lastLetter.toUpperCase();
    this.setState({ city });
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.handleAnswer();
    }
  }

  handleAnswer = () => {
    const isCityWasUsed = this.props.userCities.items.includes(this.state.city.toLowerCase()) ||
      this.props.computerCities.items.includes(this.state.city.toLowerCase());
    if (isCityWasUsed) {
      alert('City was used!')
    } else {
      this.props.checkCity(this.state.city)
        .then(res => {
          if (res) {
            this.props.generateRandomCity();
            this.setState({
              city: '',
            })
          } else {
            alert('City not exist!');
          }
        })
        .catch()
    }
  }

  render() {
    const isCityInputDisabled = this.props.computerCities.loading || this.props.userCities.loading;
    const isButtonDisabled = isCityInputDisabled || !this.state.city;
    return (
      <div className="city-input">
        <label htmlFor="city">Введите название города ниже: </label>
        <div>
          <input
            ref={this.cityInputRef}
            autoFocus
            onChange={this.handleCityChange}
            value={this.state.city}
            type="text"
            name="city"
            id="city"
            disabled={isCityInputDisabled}
            onKeyPress={this.handleSubmit}
            className="city-input__input"
          />
          <button
            onClick={this.handleAnswer}
            disabled={isButtonDisabled}
            className="city-input__button"
          >
            Дальше!
          </button>
        </div>
      </div>
    );
  }
}

export default CityInput;
