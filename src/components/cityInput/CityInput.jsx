import React, { Component } from 'react';

class CityInput extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      errorMessage: '',
      showErrorMessage: false,
    };
  }

  cityInputRef = (city) => {
    this.city = city;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userCities.success) {
      this.setState({
        city: nextProps.lastLetter.toUpperCase(),
      }, () => {
        this.city.focus();
      });
    }
  }

  handleCityChange = (e) => {
    const city = e.target.value.length > 0 || !this.props.lastLetter ?
      e.target.value :
      this.props.lastLetter.toUpperCase();
    this.setState({ city });
  }

  handleSubmit = (e) => {
    if (e.key === 'Enter' && !(this.props.computerCities.loading || this.props.userCities.loading || !this.state.city)) {
      this.handleAnswer();
    }
  }

  handleAnswer = () => {
    const isCityWasUsed = this.props.userCities.items.includes(this.state.city.toLowerCase()) ||
      this.props.computerCities.items.includes(this.state.city.toLowerCase());
    if (isCityWasUsed) {
      this.setState({
        errorMessage: 'Этот город уже был назван.',
        showErrorMessage: true,
      });
    } else {
      this.props.checkCity(this.state.city)
        .then(res => {
          if (res) {
            this.props.generateRandomCity();
            this.setState({
              showErrorMessage: false,
            });
          } else {
            this.setState({
              errorMessage: 'Такого города не существует.',
              showErrorMessage: true,
            });
          }
        })
        .catch()
    }
  }

  render() {
    const isButtonDisabled = this.props.computerCities.loading || this.props.userCities.loading || !this.state.city;
    return (
      <div className="city-input">
        <label className="city-input__label" htmlFor="city">Введите название города ниже: </label>
        <div>
          <input
            ref={this.cityInputRef}
            autoFocus
            onChange={this.handleCityChange}
            value={this.state.city}
            type="text"
            name="city"
            id="city"
            onKeyPress={this.handleSubmit}
            className="city-input__input"
          />
          <button
            onClick={this.handleAnswer}
            disabled={isButtonDisabled}
            className={`city-input__button${isButtonDisabled ? ' city-input__button--disabled' : ''}`}
          >
            Дальше!
          </button>
        </div>
        <p className={`error-message${this.state.showErrorMessage ? ' error-message--animate' : ''}`}>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default CityInput;
