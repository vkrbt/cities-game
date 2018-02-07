import React, { Component } from 'react';

class CityInput extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
    };
  }

  handleCityChange = (e) => {
    if (e.target.value.length > 0 || !this.props.lastLetter) {
      this.setState({
        city: e.target.value,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lastLetter !== nextProps.lastLetter) {
      this.setState({
        city: nextProps.lastLetter.toUpperCase(),
      })
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
          } else {
            alert('City not exist!')
          }
        })
        .catch()
    }
  }

  render() {
    const isCityInputDisabled = this.props.computerCities.loading || this.props.userCities.loading;
    const isButtonDisabled = isCityInputDisabled || !this.state.city;
    return (
      <React.Fragment>
        <input
          onChange={this.handleCityChange}
          value={this.state.city}
          type="text"
          name="city"
          id="city"
          disabled={isCityInputDisabled}
        />
        <button
          onClick={this.handleAnswer}
          disabled={isButtonDisabled}
        >
          Дальше!
        </button>
      </React.Fragment>
    );
  }
}

export default CityInput;
