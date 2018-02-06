import React, { Component } from 'react';

class CityInput extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
    };
  }

  handleCityChange = (e) => {
    this.setState({
      city: e.target.value,
    });
  }

  handleAnswer = () => {
    this.props.checkCity(this.state.city)
      .then(res => {
        const lastLetter = this.state.city[this.state.city.length - 1];
        this.props.addUserCity(this.state.city);
        this.props.generateRandomCity(this.state.city[this.state.city.length - 1]);
        this.setState({
          city: '',
        });
      })
      .catch()
  }

  render() {
    return (
      <React.Fragment>
        <span>A</span>
        <input
          onChange={this.handleCityChange}
          value={this.state.city}
          type="text"
          name="city"
          id="city"
        />
        <button
          onClick={this.handleAnswer}
          disabled={!this.state.city}
        >
          Дальше!
        </button>
      </React.Fragment>
    );
  }
}

export default CityInput;
