import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkCityExistance } from '../../actions/cityActions';
import Modal from '../modal/Modal';
import ResultsContainer from '../results/ResultsContainer';

class CityInput extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      errorMessage: '',
      showErrorMessage: false,
      isModalOpened: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userCities.success || !nextProps.lastLetter) {
      this.setState({
        city: nextProps.lastLetter.toUpperCase(),
      }, () => {
        this.city.focus();
      });
    }
  }

  cityInputRef = (city) => {
    this.city = city;
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

  openModal = () => {
    this.setState({
      isModalOpened: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpened: false,
    });
  }

  handleAnswer = () => {
    const isCityWasUsed = checkCityExistance(
      this.state.city,
      this.props.userCities,
      this.props.computerCities,
    );
    if (isCityWasUsed) {
      this.setState({
        errorMessage: 'Этот город уже был назван.',
        showErrorMessage: true,
      });
    } else {
      this.props.checkCity(this.state.city.trim())
        .then((res) => {
          if (res) {
            this.props.generateRandomCity()
              .then((city) => {
                if (!city.location) {
                  this.setState({
                    errorMessage: 'Город не найден на карте.',
                    showErrorMessage: true,
                  });
                  setTimeout(() => {
                    this.setState({
                      showErrorMessage: false,
                    });
                  }, 2000);
                }
              })
              .catch(() => {
                this.setState({
                  isModalOpened: true,
                });
              });
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
        .catch();
    }
  }

  render() {
    const isButtonDisabled = this.props.computerCities.loading ||
      this.props.userCities.loading ||
      !this.state.city.trim();
    return (
      <div className="city-input">
        {this.props.lastLetter ?
          <button
            className={`btn btn--end-game${this.props.computerCities.loading || this.props.userCities.loading ? ' btn--disabled' : ''}`}
            onClick={this.openModal}
            disabled={this.props.computerCities.loading || this.props.userCities.loading}
          >
            Сдаться
          </button> :
          <label className="city-input__label" htmlFor="city">Введите название города ниже: </label>
        }
        <div>
          <input
            ref={this.cityInputRef}
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
            className={`btn btn--primary city-input__button${isButtonDisabled ? ' btn--disabled' : ''}`}
          >
            {
              this.props.computerCities.loading || this.props.userCities.loading ?
                <span className="small-spinner" /> :
                <span className="next-arrow" />
            }
          </button>
        </div>
        <p className={`error-message${this.state.showErrorMessage ? ' error-message--animate' : ''}`}>{this.state.errorMessage}</p>
        <Modal isOpen={this.state.isModalOpened} >
          <ResultsContainer closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

CityInput.propTypes = {
  userCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  computerCities: PropTypes.shape({
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  lastLetter: PropTypes.string.isRequired,
  checkCity: PropTypes.func.isRequired,
  generateRandomCity: PropTypes.func.isRequired,
};

export default CityInput;
